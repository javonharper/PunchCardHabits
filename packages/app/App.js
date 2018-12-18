import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { applyMiddleware, createStore } from 'redux';
import Sentry from 'sentry-expo';

// Combine these
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import NativeTachyons from 'react-native-style-tachyons';
import { palette } from './src/utils';

import {
  HomeScreen,
  CreateScreen,
  EditScreen,
  EditGoalScreen,
  EditFrequencyScreen,
  EditColorScreen,
  reducer
} from './src/habits';

Sentry.enableInExpoDevelopment = true
Sentry.config('https://19888c396062460a8932090acb747cba@sentry.io/1335440').install();

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
