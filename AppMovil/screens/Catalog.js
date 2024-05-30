import {
  StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Button, FlatList,
  SafeAreaView, Alert
} from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import Datos from "../componentes/datos.json";
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


const Catalog = ({ setLanguage, language, setModalVisible, modalVisible }) => {

  const { t } = useTranslation();
  const [selectId, setSelectId] = useState();
  const [modalDetalle, setModalDetalle] = useState(false)
  const [formData, setFormData] = useState({
    talla: '',
    cantidad: ''
  });
  //const [pr_name, setPr_name] = useState('');

  const [products, setProducts] = useState([])

  const [isLoad, setLoad] = useState(true);

  const getProducts = async () => {
    try {
      const response = await fetch('https://elegannza.onrender.com/product')
      if (response) {
        const json = await response.json();
        //console.log(json)
        setProducts(json);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      setLoad(false);
    };
    fetchData();
  }, [])


  const storeData = async (value) => {
    try {
      const existingData = await AsyncStorage.getItem('cart');
      const cart = existingData ? JSON.parse(existingData) : [];
      cart.push(value);
      const jsonValue = JSON.stringify(cart);
      await AsyncStorage.setItem('cart', jsonValue);
    } catch (error) {
      console.error(error)
    }
  };

  const Items = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.contenido}>
        <Image
          style={{
            width: 280,
            height: 280,
            borderRadius: 10
          }}
          source={{ uri: item.image }}
        />
        <Text
          style={styles.text}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => {
    return (
      <Items
        item={item}
        onPress={() => {
          setModalDetalle(true);
          setSelectId(item._id);
        }}
      />
    );
  }

  const itemModal = () => {
    const itemSe =  products.find(item => item._id === selectId)
    if (itemSe) {
      return (
        <View>
          <Image
            style={{
              width: 300,
              height: 300,
              borderRadius: 10
            }}
            source={{ uri: itemSe.image }}
          />
          <Text
            style={styles.textModal}
          >
            {itemSe.name}
          </Text>
          <Text
            style={styles.textModal}
          >
            Precio: ${itemSe.price}
          </Text>
          <RNPickerSelect
            style={{
              inputAndroid: styles.input
            }}
            onValueChange={(value) => handleInputChange('talla', value)}
            items={[
              { label: 'xs', value: 'xs' },
              { label: 's', value: 's' },
              { label: 'm', value: 'm' },
              { label: 'l', value: 'l' },
              { label: 'xl', value: 'xl' },
            ]}
            placeholder={{ label: 'Talla', value: '' }}
          />
          <RNPickerSelect
            style={{
              inputAndroid: styles.input
            }}
            onValueChange={(value) => handleInputChange('cantidad', value)}
            items={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
            ]}
            placeholder={{ label: 'Cantidad', value: '' }}
          />
          <TouchableOpacity style={styles.button}
            onPress={() =>  addCar(itemSe.name, itemSe.price, itemSe.code, itemSe.image)}
          >
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
  const handleInputChange = async (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };


  const addCar = async (name, precio, codigo, img) => {
    
    if (!name || !precio || !codigo || !img || !formData.talla || !formData.cantidad) {
      return Alert.alert('Error', 'Por favor complete todos los campos.');
    }
  
    const itemToStore = {
      code: codigo,
      name: name,
      precio: precio,
      talla: formData.talla,
      cantidad: formData.cantidad,
      img: img
    };
  
    await storeData(itemToStore);
    setModalDetalle(false);
  }

  return (
    isLoad ? (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : (
      <View
        style={styles.container}
      >
        <Modal isVisible={modalDetalle} onBackdropPress={() => setModalDetalle(false)}>
          <View style={{ backgroundColor: '#1A1A40', padding: 22 }}>
            {itemModal()}
          </View>
        </Modal>
        <FlatList
          style={styles.lista}
          data={products}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          extraData={selectId}
        />

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
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 25
  },
  textModal: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'left',
    paddingHorizontal: 25
  },
  lista: {
    width: '90%'
  },
  contenido: {
    backgroundColor: '#FF5389',
    margin: 15,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  input: {
    height: 40,
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    color: '#FFFFFF',
    fontSize: 16,
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
  activity: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#1A1A40'
  },
})

export default Catalog