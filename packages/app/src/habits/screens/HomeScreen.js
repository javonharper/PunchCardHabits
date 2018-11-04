import React, { Component } from 'react';
import {
  ActionSheetIOS,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { wrap, options } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Feather';
import { groupBy, map, noop, findIndex } from 'lodash';
import moment from 'moment';
import { formatProgress, habitWithCompletions, titleCase } from '../../utils';
import { screen } from '../../analytics';
import { logCompletion } from '../../habits';

class HomeScreen extends Component {
  componentDidMount() {
    screen('HomeScreen');
  }

  handleHabitPressed = habitId => {
    const { logCompletion, navigation, habits } = this.props;
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
        onPress: () => console.log('Delete')
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
        <View cls="flx-i pa3">
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
          <View cls="aic">
            <AddHabitButton navigation={navigation} />
          </View>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = { title: 'Home' };

const AddHabitButton = wrap(({ navigation }) => (
  <TouchableOpacity
    style={{ borderWidth: 5, borderRadius: 900 }}
    cls="b--black"
    onPress={() => navigation.navigate('Create')}
  >
    <View cls="">
      <Icon
        cls="pa3"
        name="plus"
        size={30}
        color={options.colors.palette.black}
      />
    </View>
  </TouchableOpacity>
));

const SectionHeader = wrap(({ children }) => (
  <View cls="bg-white-80">
    <Text cls="f3 fw9 mb2 black ">{titleCase(children)}</Text>
  </View>
));

const HabitItem = wrap(
  class extends Component {
    render() {
      const { habit, navigation, onPress, onLongPress } = this.props;
      return (
        <TouchableOpacity
          cls="pa3 mv2 br3 ba b--black-10"
          onPress={onPress}
          onLongPress={onLongPress}
          style={{
            backgroundColor: habit.color,
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowColor: '#CCCCCC',
            shadowOffset: { height: 5, width: 0 }
          }}
        >
          <View cls="">
            <View />
            <Text cls="white f4 mb2 fw6">{habit.name}</Text>
            <Text cls="white-90 f5 fw7">
              {habit.completions.length} of {habit.goal} times{' '}
              {formatProgress(habit.frequency)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
);

const Heading = wrap(() => (
  <View cls="mb3">
    <Text style={{ fontSize: 13 }} cls="b black-60">
      YOU CAN DO THIS
    </Text>
    <Text cls="fw9 black f2">Habits</Text>
  </View>
));

const SectionSpacing = wrap(() => <View cls="bg-red mb3" />);

const mapStateToProps = ({ habits, completions }) => ({
  habits: habits.map(habit =>
    habitWithCompletions(habit, completions, moment().format('YYYY-MM-DD'))
  )
});

const mapDispatchToProps = dispatch => ({
  logCompletion: habitId => {
    dispatch(logCompletion(habitId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrap(HomeScreen));
