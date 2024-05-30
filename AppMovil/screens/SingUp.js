import {
  StyleSheet,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert 
} from 'react-native';
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import FuntionReg from "../funtions/SignUp";

const SingUp = ({ setLanguage, language, setModalVisible, modalVisible, navigation }) => {

  const { t } = useTranslation();
  const [isLoad, setLoad] = useState(false);
  //Estados de los inputs
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    tDocument: '',
    identification: '',
    email: '',
    password: '',
    vPassword: '',
    phone: '',
    adress: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showVPassword, setShowVPassword] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowVPassword = () => {
    setShowVPassword(!showVPassword);
  };

const registUser = async ()=>{
  if (formData.password !== formData.vPassword) {
    Alert.alert('Error',t('rg_errPasworNConcide'));
    return;
  }else if(formData.name.length === 0){
    Alert.alert('Error', t('rg_errName'));
    return;
  }else if(formData.lastName.length === 0){
    Alert.alert('Error', t('rg_errLastName'));
    return;
  }else if(formData.tDocument.length === 0){
    Alert.alert('Error', t('rg_errTypeD'));
    return;
  }else if(formData.identification.length === 0){
    Alert.alert('Error', t('rg_errNidenty'));
    return;
  }else if(formData.phone.length === 0){
    Alert.alert('Error', t('rg_errNContact'));
    return;
  }else if(formData.adress.length === 0){
    Alert.alert('Error', t('rg_errAd'));
    return;
  }else if(formData.email.length === 0){
    Alert.alert('Error', t('rg_errEmail'));
    return;
  }else if(formData.password.length === 0){
    Alert.alert('Error', t('rg_errPassNo'));
    return;
  }else if(formData.vPassword.length === 0){
    Alert.alert('Error', t('rg_errPassVNo'));
    return;
  }
  //await FuntionReg.registerUser(formData);
  const response = await fetch('https://elegannza.onrender.com/user/registerMovil', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      name:formData.name,
      last_name:formData.lastName,
      user_name:formData.email,
      password:formData.password,
      user_type:0,
      status:1,
      identification_type:formData.tDocument,
      identification_number:formData.identification,
      phone:formData.phone,
      address:formData.adress
    }]),
  });
  if (!response.ok) {
    Alert.alert('Error','hubo un error')
  } else {
    const json = await response.json();
    console.log(json);
    clearFormData();
    navigation('Login'); 
  }
  //console.log('Registro exitoso');
}
const clearFormData = () => {
  setFormData({
    name: '',
    lastName: '',
    tDocument: '',
    identification: '',
    email: '',
    password: '',
    vPassword: '',
    phone: '',
    address: ''
  });
};

  return (
    isLoad ? (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : (
      <ScrollView contentContainerStyle={styles.container}>
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={{ backgroundColor: '#1A1A40', padding: 22 }}>
            <Button onPress={() => setLanguage('en')} title={t('idioma_in')} color="#FF5389" />
            <Button onPress={() => setLanguage('es')} title={t('idioma_es')} color="#FF5389" />
          </View>
        </Modal>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('name', text)}
          value={formData.name}
          placeholder={t('rg_nombre')}
          placeholderTextColor="#FFFFFF"
          required={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('lastName', text)}
          value={formData.lastName}
          placeholder={t('rg_apellido')}
          placeholderTextColor="#FFFFFF"
          required={true}
        />
        <RNPickerSelect
          style={{
            inputAndroid: styles.input
          }}
          onValueChange={(value)=> handleInputChange('tDocument', value)}
          items={[
            {label:t('rg_slCedula'), value: 'CC'},
            {label:t('rg_slTarjeta'), value: 'TI'},
            {label:t('rg_slCExt'), value: 'CE'},
          ]}
          placeholder={{ label:t('rg_tDocument'), value: '' }}
          //placeholderTextColor = "#FFFFFF"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('identification', text)}
          value={formData.identification}
          keyboardType={'numeric'}
          placeholder={t('rg_indetificacio')}
          placeholderTextColor="#FFFFFF"
          required={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('phone', text)}
          value={formData.phone}
          keyboardType={'numeric'}
          placeholder={t('rg_phone')}
          placeholderTextColor="#FFFFFF"
          required={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('adress', text)}
          value={formData.adress}
          placeholder={t('rg_adress')}
          placeholderTextColor="#FFFFFF"
          required={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('email', text)}
          value={formData.email}
          placeholder={t('rg_email')}
          placeholderTextColor="#FFFFFF"
          required={true}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={(text) => handleInputChange('password', text)}
            value={formData.password}
            placeholder={t('rg_contrasena')}
            placeholderTextColor="#FFFFFF"
            secureTextEntry={!showPassword} // Muestra o oculta la contraseña según el estado de showPassword
            required={true}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.togglePasswordButton}>
            <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={(text) => handleInputChange('vPassword', text)}
            value={formData.vPassword}
            placeholder={t('rg_validarContra')}
            placeholderTextColor="#FFFFFF"
            secureTextEntry={!showVPassword} // Muestra o oculta la contraseña según el estado de showPassword
            required={true}
          />
          <TouchableOpacity onPress={toggleShowVPassword} style={styles.togglePasswordButton}>
            <MaterialIcons name={showVPassword ? 'visibility-off' : 'visibility'} size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.button}
          onPress={registUser}
        >
          <Text style={styles.buttonText}>{t('rg_btnRegist')}</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1A1A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 5,
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
  scroll: {
    flexGrow: 1,
    backgroundColor: '#1A1A40',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '1px'
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    color: '#FFFFFF',
    fontSize: 16,
  },
  togglePasswordButton: {
    padding: 10,
  },
});

export default SingUp