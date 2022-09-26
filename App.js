import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store'
import StackNavigator from './Navigations/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
     <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
        </Provider>
  );
}
