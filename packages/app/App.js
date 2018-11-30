import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { applyMiddleware, createStore } from 'redux';

// Combine these
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import NativeTachyons from 'react-native-style-tachyons';
import { palette } from './src/utils';

const config = {
  segmentWriteKey: 'XXX'
};

import {
  HomeScreen,
  CreateScreen,
  EditScreen,
  EditGoalScreen,
  EditFrequencyScreen,
  EditColorScreen,
  reducer
} from './src/habits';

NativeTachyons.build(
  {
    rem: 16,
    fontRem: 20,
    colors: { palette }
  },
  StyleSheet
);

const Navigation = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Create: { screen: CreateScreen },
    Edit: { screen: EditScreen },
    EditGoal: { screen: EditGoalScreen },
    EditFrequency: { screen: EditFrequencyScreen },
    EditColor: { screen: EditColorScreen }
  },
  {
    initialRouteName: 'Home'
  }
);

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const logger = createLogger({});
const store = createStore(persistedReducer, applyMiddleware(logger));
// const navigationPersistenceKey = __DEV__ ? 'XXXXXXX' : null;

const persistor = persistStore(store);

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Navigation />
    </PersistGate>
  </Provider>
);

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}
