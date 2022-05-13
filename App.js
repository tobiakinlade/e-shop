

// This App is Build by Oluwatobi Fagbola AKinlade with student ID: 19135195
// The App was built with Expo
import React, {useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createSwitchNavigator } from 'react-navigation';
import Toast from 'react-native-toast-message'
import { LogBox } from "react-native";

// Redux
import {Provider} from 'react-redux'
import reduxStore from "./Redux/store";

LogBox.ignoreAllLogs(true);
// Context API
import Auth from "./Context/store/Auth";
import {PersistGate} from 'redux-persist/integration/react'
// Navigators
import Main from "./Navigator/Main";
import InitialNavigator from "./Navigator/InitialNavigator";

// Screens
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Shared/Header";
import {createStackNavigator} from "@react-navigation/stack";
const switchNavigator = createSwitchNavigator({
    "login": "InitialNavigator",
    "main": "Main"
});

export default function App() {
    const {store, persistor} = reduxStore()
  return (
      <Auth>
          <Provider  store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <NavigationContainer>
                  <Header/>
                  <Main />
                  <Toast ref={(ref) => Toast.setRef(ref)}/>
              </NavigationContainer>
              </PersistGate>


          </Provider>
      </Auth>



  );
}

