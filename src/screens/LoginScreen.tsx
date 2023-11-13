import React, { useContext, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import {loginStyles} from '../theme/loginTheme';
import {useForm} from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/auth/AuthContext';

interface Props extends StackScreenProps<any,any> {}

const LoginScreen = ({navigation}:Props) => {

  const {singIn , errorMessage, removeError} = useContext(AuthContext)

  const {email,password,onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    
    if (!errorMessage) return
    if (errorMessage.length === 0) return;

    Alert.alert('Login incorrect', errorMessage,
    [{
      text: 'Ok',
      onPress: () => removeError(),
    }]
    )   
  
  }, [errorMessage])
  

  const onLogin =async () => {
    Keyboard.dismiss()
    await singIn({correo:email,password})
  }

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior="height">
        <View style={{...loginStyles.formContainer}}>
          <WhiteLogo />

          <Text style={{...loginStyles.title}}>Login</Text>
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
            onSubmitEditing={()=>onLogin()}
          />
          <View style={{...loginStyles.buttonContainer}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{...loginStyles.button}}
              
              onPress={()=>onLogin()}
              >
              <Text
                style={{
                  ...loginStyles.buttonText,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{...loginStyles.newUserContainer}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{...loginStyles.buttonNewUser}}
              onPress={() => {navigation.replace('RegisterScreen')}}>
              <Text
                style={{
                  ...loginStyles.buttonTextNewUser,
                }}>
                Aún no tienes una cuenta?{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
