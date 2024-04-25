import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import SignUp from './screens/SingUp';
import Home from './screens/Home';
import { Image, Button, TouchableOpacity } from 'react-native';
import i18n from './language/translate'
import { useTranslation } from 'react-i18next';


const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 60, height: 40 }}
      source={require('./img/NN.png')}
    />
  )
}
function ImageButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={{ width: 30, height: 30, padding: 5, tintColor: 'white' }}
        source={require('./img/language.png')}
      />
    </TouchableOpacity>
  )
}

function MyStack() {

  const [language, setLanguage] = useState('es');
  const [modalVisible, setModalVisible] = useState(false);

  const cambiarIdioma = (idioma) => {
    i18n.changeLanguage(idioma);
    setLanguage(idioma); // Si usas un estado para el idioma actual
    setModalVisible(false); // Ocultar el modal después de cambiar el idioma
  };

  useEffect(() => {
    cambiarIdioma(language);
  }, [language])


  const { t } = useTranslation();

  return (
    <Stack.Navigator
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
      <Stack.Screen
        name="Login"
        options={{
          headerLeft: (props) => <LogoTitle {...props} />,
          headerTitle: `${t('inicio_sesion')}`,
          headerRight: () => (
            // Botón para cambiar idioma
            <ImageButton onPress={() => setModalVisible(true)} />
          )
        }}
      >
        {(props) => (
          <Login
            {...props} // Pasa todos los props de navegación
            setLanguage={setLanguage}
            language={language}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            navigation={props.navigation.navigate}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="SignUp"
        options={{
          headerLeft: (props) => <LogoTitle {...props} />,
          headerTitle: `${t('registro')}`,
          headerRight: () => (
            // Botón para cambiar idioma
            <ImageButton onPress={() => setModalVisible(true)} />
          )
        }}
      >
        {(props) => (
          <SignUp
            {...props} // Pasa todos los props de navegación
            setLanguage={setLanguage}
            language={language}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name='Home'
      >
        {(props) => (
          <Home
            {...props}
            setLanguage={setLanguage}
            language={language}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

