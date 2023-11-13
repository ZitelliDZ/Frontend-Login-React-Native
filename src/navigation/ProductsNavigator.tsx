import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';



export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: {productId?:string, name?:string}
}
const Stack = createStackNavigator<ProductsStackParams>();

const ProductsNavigator = () => {
  return (
   
    <Stack.Navigator
      initialRouteName="ProductsScreen"
      screenOptions={{
        //headerShown: false,
        cardStyle: {
          backgroundColor: '#fff',
        },
        headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
        }
      }}

    >
        <Stack.Screen name="ProductScreen" component={ProductScreen} options={{title:'Producto',headerTitleAlign:'center'}} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen}  options={{title:'Productos',headerTitleAlign:'center'}}/>
    </Stack.Navigator> 
   
  )
}

export default ProductsNavigator
