import {  StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, Button} from 'react-native'
import React from 'react'

const Cart = () => {
  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 25
  }
})

export default Cart