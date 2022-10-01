import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {StatusBar} from 'react-native'
import store from './redux/store'
import StackNavigator from './Navigations/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
     <NavigationContainer style={{paddingTop:StatusBar.currentHeight}}>
            <StackNavigator/>
        </NavigationContainer>
        </Provider>
  );
}
