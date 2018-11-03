import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { map, max } from 'lodash';
import { connect } from 'react-redux';
import { wrap, options } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Feather';

const EditGoalScreen = wrap(
  class extends Component {
    state = {
      goal: null
    };

    componentWillMount() {
      const goal = this.props.navigation.state.params.goal;
      this.setState({ goal });
    }

    componentWillUnmount() {
      const commitEdits = this.props.navigation.state.params.commitEdits;
      commitEdits({ goal: this.state.goal });
    }

    decrement = () => {
      this.setGoal(max([1, this.state.goal - 1]));
    };

    increment = () => {
      this.setGoal(this.state.goal + 1);
    };

    setGoal = goal => {
      this.setState({ goal });
    };

    render() {
      const { goal } = this.state;
      return (
        <View cls="flx-i pa3 bg-white">
          <View cls="pb3 flx-row flx-i jcc aic">
            <TouchableOpacity onPress={this.decrement}>
              <View cls="">
                <Icon
                  cls="pa3"
                  name="minus"
                  size={30}
                  color={options.colors.palette.black}
                />
              </View>
            </TouchableOpacity>
            <View>
              <Text cls="black f2">{goal}</Text>
            </View>
            <TouchableOpacity onPress={this.increment}>
              <View cls="">
                <Icon
                  cls="pa3"
                  name="plus"
                  size={30}
                  color={options.colors.palette.black}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
);

EditGoalScreen.navigationOptions = { title: 'Choose a goal' };

export default EditGoalScreen;
