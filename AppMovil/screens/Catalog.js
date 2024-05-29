import {
  StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Button, FlatList,
  SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import Datos from "../componentes/datos.json";
import RNPickerSelect from 'react-native-picker-select';


const Catalog = ({ setLanguage, language, setModalVisible, modalVisible }) => {

  const { t } = useTranslation();
  const [selectId, setSelectId] = useState();
  const [modalDetalle, setModalDetalle] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    precio: '',
    talla: '',
    cantidad: ''
  });

  const Items = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.contenido}>
        <Image
          style={{
            width: 300,
            height: 300,
            borderRadius: 10
          }}
          source={require('../img/1.png')}
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
          setSelectId(item.id);
        }}
      />
    );
  }

  const itemModal = () => {
    const itemSe = Datos.find(item => item.id === selectId)
    if (itemSe) {
      return (
        <View>
          <Image
            style={{
              width: 300,
              height: 300,
              borderRadius: 10
            }}
            source={require('../img/1.png')}
          />
          <Text
            style={styles.textModal}
          >
            {itemSe.name}
          </Text>
          <Text
            style={styles.textModal}
          >
            Precio: ${itemSe.precio}
          </Text>
          <RNPickerSelect
            style={{
              inputAndroid: styles.input
            }}
            onValueChange={(value) => handleInputChange('talla', value)}
            items={[
              { label: 'S', value: 'S' },
              { label: 'M', value: 'M' },
              { label: 'L', value: 'L' },
              { label: 'XL', value: 'XL' },
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
            onPress={()=>addCar(itemSe.name,itemSe.precio)}
          >
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  

  const addCar = (name,precio)=>{
    if(name){
      handleInputChange('name',name)
    }
    if(precio){
      handleInputChange('precio',precio)
    }

    setModalDetalle(false);

    return console.log(formData);
  }

  return (
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
        data={Datos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        extraData={selectId}
      />

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
})

export default Catalog