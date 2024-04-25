import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React,{ useState } from 'react'
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
//import { AsyncStorage } from 'react-native';

export default function Home({ setLanguage, language, setModalVisible, modalVisible, navigation }) {

    const { t } = useTranslation();
    const [isLoad, setLoad] = useState(false);

  return (
    <View style = {styles.container}>
      <Text>Home</Text>
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
})