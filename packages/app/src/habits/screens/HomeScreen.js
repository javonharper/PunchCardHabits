import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  SectionList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { wrap, options } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Feather';
import { formatProgress, habitsWithCompletions, titleCase } from '../../utils';
import { logCompletion } from '../../habits';
import { groupBy, map } from 'lodash';
import moment from 'moment';

const HomeScreen = wrap(({ habits, navigation, logCompletion }) => (
  <View cls="flx-i bg-white">
    <View cls="flx-i pa3">
      <Heading />
      <SectionList
        renderItem={({ item, index, section }) => (
          <HabitItem
            key={index}
            navigation={navigation}
            habit={item}
            logCompletion={logCompletion}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
        sections={map(groupBy(habits, 'frequency'), (habits, title) => ({
          title,
          data: habits
        }))}
        keyExtractor={(item, index) => item + index}
      />
      <View cls="aic">
        <AddHabitButton navigation={navigation} />
      </View>
    </View>
  </View>
));

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
      const { habit, navigation, logCompletion } = this.props;
      return (
        <TouchableOpacity
          onLongPress={() => {
            logCompletion(habit);
          }}
          cls="pa3 mv2 br3 ba b--black-10"
          style={{
            backgroundColor: habit.color,
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowColor: '#CCCCCC',
            shadowOffset: { height: 5, width: 0 }
          }}
        >
          <View cls="">
            <Text cls="white f4 mb2 fw6">{habit.name}</Text>
            <Text cls="white-90 f5 fw7">
              {habit.count} of {habit.goal} times{' '}
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

const mapStateToProps = ({ habits, completions }) => ({
  habits: habitsWithCompletions(
    habits,
    completions,
    moment().format('YYYY-MM-DD')
  )
});

const mapDispatchToProps = dispatch => ({
  logCompletion: habit => {
    dispatch(logCompletion(habit));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
