import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProductContext } from '../context/product/ProductContext'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { RefreshControl } from 'react-native-gesture-handler';
import { AuthContext } from '../context/auth/AuthContext';


interface Props extends StackScreenProps<ProductsStackParams,'ProductsScreen'>{}


const ProductsScreen = ({navigation}:Props) => {
  
  const { products,loadProducts } = useContext(ProductContext)
  
  const [isRefreshing, setIsRefreshing] = useState(false)
  const {logOut} = useContext(AuthContext);
  
  useEffect(() => {
    
    navigation.setOptions({
        title: 'Productos',
        headerLeft:() => (
          <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => logOut()}>
            <Text style={{marginLeft:20}}>{'< '}LogOut</Text>
          </TouchableOpacity>
        ),

        headerRight: () => (
          <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('ProductScreen',{name:'Nuevo Producto'})}>
            <Text style={{marginRight:20}}>Agregar</Text>
          </TouchableOpacity>
        )
    })
  }, [])

  
  const loadProductFromBackend = async() => {

    setIsRefreshing(true)
    await loadProducts()
    setIsRefreshing(false)
  }
  
    return (
    <View
      style={{
        flex: 1,
        paddingHorizontal:20,
        backgroundColor: '#F5FCFF',
      }}
    >
        <FlatList
        data={products}
        keyExtractor={
            (item) => item._id
        }
        renderItem={
            ({item}) => (
                <View style={{marginVertical:10}}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>navigation.navigate('ProductScreen', {productId: item._id,name: item.nombre})}
                    >
                    <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        ItemSeparatorComponent={
            () => (
                <View style={styles.itemSeparator}/>
            )
        }
        
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadProductFromBackend()}
          />
        }
        />
      
    </View>
  )
}

export default ProductsScreen


const styles = StyleSheet.create({
    productName:{
        fontSize:20,
        fontWeight:'400'
    },
    itemSeparator:{
        borderBottomWidth:2,
        borderBlockColor:'rgba(0,0,0,0.1)'
    }
})