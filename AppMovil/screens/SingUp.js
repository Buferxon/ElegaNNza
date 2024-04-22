import {
  StyleSheet,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const SingUp = ({ setLanguage, language, setModalVisible, modalVisible, navigation }) => {

  const { t } = useTranslation();
  const [isLoad, setLoad] = useState(false);
  //Estados de los inputs
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('')
  const [dateN, setDateN] = useState('')
  const [tDocument, setTDocument] = useState('')
  const [identification, setIdentification] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vPassword, setVPassword] = useState('')
  const [term, setTerm] = useState()


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
          onChangeText={setName}
          value={name}
          placeholder={t('rg_nombre')}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder={t('rg_apellido')}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={styles.input}
          placeholder={t('rg_fechaNaci')}
          value={dateN}
          // onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          // editable={false}
        />
        <TextInput
          style={styles.input}
          // onChangeText={setTDocument}
          // value={tDocument}
          placeholder={t('rg_tDocument')}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={styles.input}
          onChangeText={setIdentification}
          value={identification}
          placeholder={t('rg_indetificacio')}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder={t('rg_email')}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={t('rg_contrasena')}
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          style={styles.input}
          onChangeText={setVPassword}
          value={vPassword}
          placeholder={t('rg_validarContra')}
          placeholderTextColor="#FFFFFF"
        />

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
  }
});

export default SingUp