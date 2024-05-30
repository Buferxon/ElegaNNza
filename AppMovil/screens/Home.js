import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Catalog from './Catalog';
import Cart from './Cart';
import Offers from './Offers';



const Drawer = createDrawerNavigator();

export default function Home({ setLanguage, language, setModalVisible, modalVisible }) {

  const { t } = useTranslation();
  const [isLoad, setLoad] = useState(false);

  function ImageButton({ onPress }) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{ width: 30, height: 30, padding: 5, tintColor: 'white' }}
          source={require('../img/language.png')}
        />
      </TouchableOpacity>
    )
  }

  const HomeScreen = () => {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={{ backgroundColor: '#1A1A40', padding: 22 }}>
            <Button onPress={() => setLanguage('en')} title={t('idioma_in')} color="#FF5389" />
            <Button onPress={() => setLanguage('es')} title={t('idioma_es')} color="#FF5389" />
          </View>
        </Modal>
        <Image
          style={{
            width: 400,
            height: 400
          }}
          source={require('../img/LOGO.png')}
        />
        <Text style={styles.text}>
          {t("hm_bienvenida")}
        </Text>
      </ScrollView>
    )
  }


  return (

    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF5389',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name={'HomeScreen'}
        options={{
          headerTitle: () => (
            <Image
              source={require('../img/ELEGANNZA.png')}
              style={{
                width: 200,
                height: 25
              }}
            />
          ),
          drawerLabel: t('hm_HomeScreem'),
          headerRight: () => (
            <ImageButton onPress={() => setModalVisible(true)} />
          )
        }}
      >
        {
          () => (
            <HomeScreen />
          )
        }
      </Drawer.Screen>
      <Drawer.Screen
        name={'Catalog'}
        options={{
          headerTitle: () => (
            <Image
              source={require('../img/ELEGANNZA.png')}
              style={{
                width: 200,
                height: 25
              }}
            />
          ),
          drawerLabel: t('hm_Catalog'),
          headerRight: () => (
            <ImageButton onPress={() => setModalVisible(true)} />
          ),
          unmountOnBlur: true
        }}
      >
        {
          (props) => (
            <Catalog
              {...props} // Pasa todos los props de navegación
              setLanguage={setLanguage}
              language={language}
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
              navigation={props.navigation.navigate}
            />
          )
        }
      </Drawer.Screen>
      <Drawer.Screen
        name={'Cart'}
        options={{
          headerTitle: () => (
            <Image
              source={require('../img/ELEGANNZA.png')}
              style={{
                width: 200,
                height: 25
              }}
            />
          ),
          drawerLabel: t('hm_Carts'),
          headerRight: () => (
            <ImageButton onPress={() => setModalVisible(true)} />
          ),
          unmountOnBlur: true
        }}
      >
        {
          () => (
            <Cart />
          )
        }
      </Drawer.Screen>
      <Drawer.Screen
        name={'Offers'}
        options={{
          headerTitle: () => (
            <Image
              source={require('../img/ELEGANNZA.png')}
              style={{
                width: 200,
                height: 25
              }}
            />
          ),
          drawerLabel: t('hm_Offers'),
          headerRight: () => (
            <ImageButton onPress={() => setModalVisible(true)} />
          ),
          unmountOnBlur: true
        }}
      >
        {
          () => (
            <Offers />
          )
        }
      </Drawer.Screen>

    </Drawer.Navigator>
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