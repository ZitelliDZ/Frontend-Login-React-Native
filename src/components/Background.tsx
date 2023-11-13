import React from 'react'
import { View } from 'react-native'

const Background = () => {
  return (
    <View
        style={{
            position:'absolute',
            backgroundColor:'#5856D6',
            width:1000,
            height:1500,
            top:-520,
            transform:[
                {rotate:'-70deg'}
            ]
        }}
    />
      
  )
}

export default Background
