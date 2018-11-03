import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import { wrap } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { formatProgress } from '../../utils';

const DetailsScreen = wrap(
  class extends Component {
    render() {
      const navigation = this.props.navigation;
      const habitId = navigation.state.params.habitId;
      const habit = this.props.habits[habitId];

      return (
        <View>
          <View cls="pa3" style={{ backgroundColor: habit.color }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <Text
            style={{ backgroundColor: habit.color }}
            cls="fw7 white f3 tc pb3"
          >
            {habit.name}
          </Text>
          <View cls="pa3" style={{ backgroundColor: habit.color }}>
            <View cls="flx-row jcc">
              <View cls="jcc pa3 ma2">
                <TouchableOpacity cls="bg-white-30 br4 pa1">
                  <Icon name="minus" size={22} color="white" />
                </TouchableOpacity>
              </View>
              <Text cls="white f1 fw9">{'XXX'}</Text>
              <Text cls="white-80 f1 fw9"> of {habit.goal}</Text>
              <View cls="jcc pa3 ma2">
                <TouchableOpacity onPress={() => {}} cls="bg-white-30 br4 pa1">
                  <Icon name="plus" size={22} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <Text cls="white-90 fw7 f3 tc">
              TIMES {formatProgress(habit.frequency).toUpperCase()}
            </Text>
          </View>
        </View>
      );
    }
  }
);

DetailsScreen.navigationOptions = { title: 'Details' };

const mapStateToProps = ({ habits }) => {
  return {
    habits: habits
  };
};

const mapDisptachToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(DetailsScreen);
