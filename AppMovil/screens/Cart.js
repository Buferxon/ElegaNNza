import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {

  const [cartData, setCartData] = useState([]);
  const [user, setUser] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cart');
      if (jsonValue !== null) {
        setCartData(JSON.parse(jsonValue));
        //console.log(JSON.parse(jsonValue))
      }
    } catch (e) {
      console.error(e);
    }
  };
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        setUser(JSON.parse(jsonValue));
        //console.log(JSON.parse(jsonValue))
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
      await getUser();
      setLoad(false);
      //await deleteCar();
    };
    fetchData();
  }, []);
  const [isLoad, setLoad] = useState(true);

  const deleteCar = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartData([]);
    } catch (error) {
      console.error(error);
    }
  }
  const calculateTotal = () => {
    if (cartData) {
      return cartData.reduce((total, item) => total + parseFloat(item.precio * item.cantidad), 0).toFixed(2);
    }
  }

  const removeItem = async (index) => {
    try {
      const updatedCartData = cartData.filter((_, i) => i !== index);
      setCartData(updatedCartData);
      const jsonValue = JSON.stringify(updatedCartData);
      await AsyncStorage.setItem('cart', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const hacerPedido = async () => {
    try {
      if (user && cartData) {
        const productos = cartData.map(item => ({
          code: item.code,
          name: item.name,
          price: item.precio,
          amounth: item.cantidad,
          size: item.talla,
          subtotal: item.precio * item.cantidad
        }));
        const datos = [
          {
            name_user: user.user_name,
            name: user.name,
            last_name: user.last_name,
            total: calculateTotal(),
            products: productos
          }
        ]
        //console.log(productos);
        const response = await fetch('https://elegannza.onrender.com/sales/newSale', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            datos
          ),
        });

        const json = await response.json();
        //console.log(json);
        Alert.alert('Confirmación', json.message);

        await deleteCar();
      }

    } catch (error) {
      console.error(error);
    }
  }

  const Items = ({ item, index }) => (
    <View style={styles.itemList}>
      <View style={styles.item}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 10
          }}
          source={{ uri: item.img }}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>
          Talla: {item.talla ? item.talla : 'No hay talla'}
        </Text>
        <Text style={styles.text}>
          Cantidad: {item.cantidad ? item.cantidad : 1}
        </Text>
        <Text style={styles.text}>
          ${item.precio * item.cantidad}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeItem(index)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  const renderItem = ({ item, index }) => {
    return (
      <Items
        item={item}
        index={index}
      />
    );
  }

  return (
    isLoad ? (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          style={styles.lista}
          data={cartData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <Text style={styles.textPrecio}>
          Total: ${calculateTotal()}
        </Text>
        <TouchableOpacity style={styles.button}
          onPress={() => hacerPedido()}
        >
          <Text style={styles.buttonText}>
            Hacer pedido
          </Text>
        </TouchableOpacity>
      </View>
    )

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
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  textPrecio: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 25
  },
  button: {
    width: '90%',
    backgroundColor: '#FF5389',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
  itemList: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start'
  },
  item: {
    margin: 10
  },
  lista: {
    width: '95%'
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#1A1A40'
  },
})

export default Cart