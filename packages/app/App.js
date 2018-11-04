import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { applyMiddleware, createStore } from 'redux';
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

const logger = createLogger({});
const store = createStore(reducer, applyMiddleware(logger));
const navigationPersistenceKey = __DEV__ ? "XXXXXX" : null;

const Root = () => (
  <Provider store={store}>
    <Navigation persistenceKey={navigationPersistenceKey} />
  </Provider>
);

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}
