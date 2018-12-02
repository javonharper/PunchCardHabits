import React, { Component } from 'react';
import { ActionSheetIOS, ScrollView, SectionList, View } from 'react-native';
import { connect } from 'react-redux';
import { wrap, options } from 'react-native-style-tachyons';
import { groupBy, map, noop, findIndex } from 'lodash';
import moment from 'moment';
import {
  formatProgress,
  habitWithCompletions,
  titleCase
} from '../../../utils';
import { logCompletion, deleteHabit } from '../../../habits';
import {
  AddHabitButton,
  SectionHeader,
  HabitItem,
  Heading,
  SectionSpacing
} from './components';

class HomeScreen extends Component {
  handleHabitPressed = habitId => {
    const { navigation, habits, logCompletion, deleteHabit } = this.props;
    const habitActions = [
      {
        label: 'Cancel',
        onPress: noop
      },
      {
        label: 'Mark a completion',
        onPress: () => logCompletion(habitId)
      },
      {
        label: 'Edit',
        onPress: () => navigation.navigate('Edit', { habitId, isNew: false })
      },
      {
        label: 'Delete',
        onPress: () => deleteHabit(habitId)
      }
    ];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: map(habitActions, 'label'),
        destructiveButtonIndex: findIndex(habitActions, { label: 'Delete' }),
        cancelButtonIndex: findIndex(habitActions, { label: 'Cancel' })
      },
      buttonIndex => habitActions[buttonIndex].onPress()
    );
  };

  render() {
    const { habits, navigation, logCompletion } = this.props;
    return (
      <View cls="flx-i bg-white">
        <ScrollView cls="flx-i pa3">
          <Heading />
          <SectionList
            keyExtractor={(item, index) => item + index}
            sections={map(groupBy(habits, 'frequency'), (habits, title) => ({
              title,
              data: habits
            }))}
            renderSectionHeader={({ section: { title } }) => (
              <SectionHeader>{title}</SectionHeader>
            )}
            renderItem={({ item, index, section }) => (
              <HabitItem
                key={index}
                navigation={navigation}
                habit={item}
                onPress={() => this.handleHabitPressed(item.id)}
                onLongPress={() => logCompletion(item.id)}
              />
            )}
            renderSectionFooter={() => <SectionSpacing />}
          />
          <View cls="aic mb4">
            <AddHabitButton navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = { title: 'Home' };

const mapStateToProps = ({ habits = [], completions = [] }) => ({
  habits: habits.map(habit =>
    habitWithCompletions(habit, completions, moment().format('YYYY-MM-DD'))
  )
});

const mapDispatchToProps = dispatch => ({
  logCompletion: habitId => {
    dispatch(logCompletion(habitId));
  },
  deleteHabit: habitId => {
    dispatch(deleteHabit(habitId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrap(HomeScreen));
