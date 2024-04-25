import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
//const funtionlog = require('../funtions/login')

const Login = ({ setLanguage, language, setModalVisible, modalVisible, navigation }) => {

  const { t } = useTranslation();
  const [isLoad, setLoad] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState()

  function Logo() {
    return (
      <Image
        style={{ width: 120, height: 120, padding: 5 }}
        source={require('../img/LOGO.png')}
      />
    )
  }
  const createAlert = (cod) => {
    const valCod = cod._j === "E1" ? t('al_usuarioInc') : t('al_passwordInc')
    Alert.alert(t('al_tlAlertCredencial'), valCod, [
      {
        text: 'Salir',
        onPress: () => console.log('Ask me later pressed'),
      },
    ])
  }

  return (
    isLoad ? (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : (
      <View style={styles.container}>
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={{ backgroundColor: '#1A1A40', padding: 22 }}>
            <Button onPress={() => setLanguage('en')} title={t('idioma_in')} color="#FF5389" />
            <Button onPress={() => setLanguage('es')} title={t('idioma_es')} color="#FF5389" />
          </View>
        </Modal>
        <Logo />
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          placeholder={t('nombre_usuario')}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={t('contraseña')}
          secureTextEntry={true}
          placeholderTextColor="#FFFFFF"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={
            () =>  navigation('Home')
          }
        >
          <Text style={styles.buttonText}>{t('ingresar')}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#696969' }} />
          <Text style={styles.text}>{t('separador')}</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#696969' }} />
        </View>
        <TouchableOpacity style={styles.button}
          onPress={
            () => navigation('SignUp')
          }
        >
          <Text style={styles.buttonText}>{t('registrarse')}</Text>
        </TouchableOpacity>
      </View>
    )
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A40',
    alignItems: 'center',
    justifyContent: 'center',
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
  activity: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 5,
  }
});

export default Login;
