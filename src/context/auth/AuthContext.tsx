import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  Usuario,
} from '../../interfaces/appInterfaces';
import {AuthState, authReducer} from './AuthReducer';
import authApi from '../../api/authApi';
import axios from 'axios';

interface AuthContextProps {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  singUp: (registerData: RegisterData) => void;
  singIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
}

const authInitialState: AuthState = {
  status: 'checking',
  errorMessage: '',
  token: null,
  user: null,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch({type: 'NOT_AUTHENTICATED'});
    }

    const res = await authApi.get<LoginResponse>('/auth');

    if (res.status !== 200) {
      dispatch({type: 'NOT_AUTHENTICATED'});
      return;
    }

    dispatch({
      type: 'SIGN_UP',
      payload: {
        token: res.data.token,
        user: res.data.usuario,
      },
    });
    await AsyncStorage.setItem('token', res.data.token);
  };

  const singUp = async ({correo, password, nombre}: RegisterData) => {
    
    try {
        const res = await authApi.post<LoginResponse>('/usuarios', {
          correo,
          password,
          nombre,
        });
  
        dispatch({
          type: 'SIGN_UP',
          payload: {
            token: res.data.token,
            user: res.data.usuario,
          },
        });
        await AsyncStorage.setItem('token', res.data.token);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // console.log(err.response?.data)
          if (!error?.response) {
            dispatch({
              type: 'ADD_ERROR',
              payload: 'Registro incorrecto',
            });
          } else if (error.response?.status === 400) {
            dispatch({
              type: 'ADD_ERROR',
              payload: error.response.data.errors[0].msg,
            });
          } else {
            dispatch({
              type: 'ADD_ERROR',
              payload: 'Registro incorrecta',
            });
          }
        }
      }

  };

  const singIn = async ({correo, password}: LoginData) => {
    try {
      const res = await authApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });

      dispatch({
        type: 'SIGN_UP',
        payload: {
          token: res.data.token,
          user: res.data.usuario,
        },
      });
      await AsyncStorage.setItem('token', res.data.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.log(err.response?.data)
        if (!error?.response) {
          dispatch({
            type: 'ADD_ERROR',
            payload: 'Información incorrecta',
          });
        } else if (error.response?.status === 400) {
          dispatch({
            type: 'ADD_ERROR',
            payload: error.response.data.msg,
          });
        } else {
          dispatch({
            type: 'ADD_ERROR',
            payload: 'Información incorrecta',
          });
        }
      }
    }
  };

  const logOut = async () => {
    dispatch({
      type: 'LOG_OUT',
    });
    await AsyncStorage.removeItem('token');
  };

  const removeError = () => {
    dispatch({
      type: 'REMOVE_ERROR',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        errorMessage: state.errorMessage,
        token: state.token,
        user: state.user,
        status: state.status,
        // ...state
        singUp,
        singIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
