import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SectionList
} from 'react-native';
import { connect } from 'react-redux';
import { wrap, options } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Feather';
import { formatProgress, palette } from '../../utils';

const CreateScreen = wrap(({ navigation }) => (
  <React.Fragment>
    <View cls="pa3 bg-white">
      <View cls="mb3">
        <Text cls="fw9 black f2">Start your habit</Text>
      </View>
      <CreateHabitButton
        onPress={() => navigation.navigate('Edit', { habit: {} })}
        label="Create your own"
        labelColor={palette.black}
        color={palette.smokeDarker}
      />
      <SectionList
        renderItem={({ item, index, section }) => (
          <CreateHabitButton
            onPress={() => navigation.navigate('Edit', { habit: item })}
            key={index}
            label={item.name}
            color={item.color}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
        sections={suggestions}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  </React.Fragment>
));

const SectionHeader = wrap(({ children }) => (
  <View cls="bg-white-80">
    <Text cls="f3 fw9 mb2 black ">{children}</Text>
  </View>
));

CreateScreen.navigationOptions = { title: 'Create' };

const CreateHabitButton = wrap(({ label, labelColor, color, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    cls="pa3 mv3 br3"
    style={{
      backgroundColor: color,
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowColor: '#CCCCCC',
      shadowOffset: { height: 5, width: 0 }
    }}
  >
    <Text
      cls="f4 fw6"
      style={{
        color: labelColor || palette.white
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
));

const suggestions = [
  {
    title: 'Exercise',
    data: [
      { name: 'Go for a walk', color: palette.blue },
      { name: 'Go for a run', color: palette.orange },
      { name: 'Do Yoga', color: palette.yellow }
    ]
  },
  {
    title: 'Diet',
    data: [
      { name: 'Eat a salad', color: palette.green },
      { name: 'Drink water', color: palette.blue },
      { name: 'Eat a piece of fruit', color: palette.red }
    ]
  },
  {
    title: 'Focus',
    data: [
      { name: 'Meditate', color: palette.tealblue },
      { name: 'Read', color: palette.purple },
      { name: 'Pray', color: palette.yellow }
    ]
  },
  {
    title: 'Sleep',
    data: [
      { name: 'Wake up early', color: palette.orange },
      { name: 'Go to sleep early', color: palette.blue },
      { name: 'Do a nightly routine', color: palette.pink }
    ]
  }
];

export default connect()(CreateScreen);
