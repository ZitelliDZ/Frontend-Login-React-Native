import React, { useContext, useEffect } from 'react'
import { Keyboard, KeyboardAvoidingView, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import WhiteLogo from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/auth/AuthContext';

interface Props extends StackScreenProps<any,any> {}

const RegisterScreen = ({navigation}:Props) => {

  const {singUp , errorMessage, removeError} = useContext(AuthContext)

  const {email,password,name,onChange} = useForm({
    email: '',
    password: '',
    name: '',
  });

  
  useEffect(() => {
    
    if (!errorMessage) return
    if (errorMessage.length === 0) return;

    Alert.alert('Registro incorrecto', errorMessage,
    [{
      text: 'Ok',
      onPress: () => removeError(),
    }]
    )   
  
  }, [errorMessage])
  

  const onRegister = async () => {
    Keyboard.dismiss()
    await singUp({correo:email,password,nombre:name})
  }

  return (
    <>

      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor:'#5856D6'
        }}
        behavior="height">
        <View style={{...loginStyles.formContainer}}>
          <WhiteLogo />

          <Text style={{...loginStyles.title}}>Registro</Text>
          
          <Text style={{...loginStyles.label}}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su nombre."
            placeholderTextColor={'rgba(255, 255, 255,0.4)'}
            underlineColorAndroid={'white'}
            selectionColor={'white'}
            autoCapitalize="words"
            
            onChangeText={(value)=>onChange(value,'name')}
            value={name}
          />
          <Text style={{...loginStyles.label}}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email."
            placeholderTextColor={'rgba(255, 255, 255,0.4)'}
            keyboardType="email-address"
            underlineColorAndroid={'white'}
            selectionColor={'white'}
            autoCapitalize="none"
            autoCorrect={false}
            
            onChangeText={(value)=>onChange(value,'email')}
            value={email}
          />

          <Text style={{...loginStyles.label}}>Contraseña:</Text>
          <TextInput
            placeholder="*******"
            secureTextEntry={true}
            placeholderTextColor={'rgba(255, 255, 255,0.4)'}
            underlineColorAndroid={'white'}
            selectionColor={'white'}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value)=>onChange(value,'password')}
            value={password}
            onSubmitEditing={()=>onRegister()}
          />
          <View style={{...loginStyles.buttonContainer}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{...loginStyles.button}}
              
              onPress={()=>onRegister()}
              >
              <Text
                style={{
                  ...loginStyles.buttonText,
                }}>
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{...loginStyles.newUserContainer}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{...loginStyles.buttonNewUser}}
              onPress={() => {navigation.replace('LoginScreen')}}>
              <Text
                style={{
                  ...loginStyles.buttonTextNewUser,
                }}>
                Ya tienes una cuenta? Ingresa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen
