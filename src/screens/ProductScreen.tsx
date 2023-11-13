import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import {ProductsStackParams} from '../navigation/ProductsNavigator';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductContext} from '../context/product/ProductContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductScreen = ({navigation, route}: Props) => {
  const {productId = '', name = ''} = route.params;

  const {loadProductById, addProduct, updateProduct,uploadImage} =
    useContext(ProductContext);
  const {categories, isLoading} = useCategories();

  const [tempUrl, setTempUrl] = useState('');

  const {_id, category, nombre, img, onChange, form, setFormValue} = useForm({
    _id: productId,
    category: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: nombre ? nombre : 'Nuevo Producto',
    });
  }, [nombre]);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (productId.length === 0) return;

    const product = await loadProductById(productId);
    setFormValue({
      _id: product._id,
      category: product.categoria._id,
      nombre: product.nombre,
      img: product.img || '',
    });
  };

  const saveOrUpdate = async () => {
    if (productId.length > 0) {
      updateProduct(category, nombre, _id);
    } else {
      if (category.length === 0) {
        onChange(categories[0]._id, 'category');
      }
      const tempCateory = category || categories[0]._id;
      const product = await addProduct(tempCateory, nombre);
      setFormValue({
        _id: product._id,
        category: product.categoria._id,
        nombre: product.nombre,
        img: product.img || '',
      });
    }
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      res => {
        if (res.didCancel) return;

        if (res.assets![0].uri === undefined) return;
        setTempUrl(res.assets![0].uri);
        uploadImage(res,_id)
      },
    );
  };

  const takePhotoFromGalery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      res => {
        if (res.didCancel) return;

        if (res.assets![0].uri === undefined) return;
        setTempUrl(res.assets![0].uri);
        uploadImage(res,_id)
      },
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder="Producto"
          value={nombre}
          style={styles.textInput}
          onChangeText={value => onChange(value, 'nombre')}
        />

        <Text style={styles.label}>Selecciones la categoría:</Text>

        <Picker
          selectedValue={category}
          style={{
            borderWidth: 2,
            borderColor: '#000',
            borderRadius: 5,
            padding: 10,
          }}
          onValueChange={itemValue => onChange(itemValue, 'category')}>
          {categories.map(category => (
            <Picker.Item
              key={category._id}
              label={category.nombre}
              value={category._id}
            />
          ))}
        </Picker>

        <View style={styles.button}>
          <Button
            title="Guardar"
            onPress={() => {
              saveOrUpdate();
            }}
            color={'#5856D6'}
          />
        </View>
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Button
              title="Cámara"
              onPress={() => {
                takePhoto();
              }}
              color={'#5856D6'}
            />
            <View style={{width: 20}} />
            <Button title="Galería" onPress={() => {takePhotoFromGalery()}} color={'#5856D6'} />
          </View>
        )}

        {img.length > 0 && !tempUrl && (
          <Image
            source={{uri: img}}
            style={{
              width: '100%',
              height: 300,
              marginTop: 20,
            }}
          />
        )}
        { tempUrl && (
          <Image
            source={{uri: tempUrl}}
            style={{
              width: '100%',
              height: 300,
              marginTop: 20,
            }}
          />
        )}

        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 4,
  },
  textInput: {
    height: 40,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
  },
});
