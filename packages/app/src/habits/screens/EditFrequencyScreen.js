import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { map, max } from 'lodash';
import { connect } from 'react-redux';
import { wrap } from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/Feather';
import { FREQUENCY, palette } from '../../utils';

const EditFreqencyScreen = wrap(
  class extends Component {
    state = {
      frequency: null
    };

    componentWillMount() {
      const frequency = this.props.navigation.state.params.frequency;
      this.setState({ frequency });
    }

    componentWillUnmount() {
      const commitEdits = this.props.navigation.state.params.commitEdits;
      commitEdits({ frequency: this.state.frequency });
    }

    setDaily = () => {
      this.setFreqency(FREQUENCY.DAILY);
    };

    setWeekly = () => {
      this.setFreqency(FREQUENCY.WEEKLY);
    };

    setFreqency = frequency => {
      this.setState({ frequency });
    };

    render() {
      const { frequency } = this.state;
      return (
        <View cls="flx-i pa3 bg-white">
          <View cls="pb3 flx-row flx-i jcc aic">
            <Button
              onPress={this.setWeekly}
              selected={frequency === FREQUENCY.WEEKLY}
            >
              WEEKLY
            </Button>
            <Button
              onPress={this.setDaily}
              selected={frequency === FREQUENCY.DAILY}
            >
              DAILY
            </Button>
          </View>
        </View>
      );
    }
  }
);

const Button = wrap(({ onPress, children, selected }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      cls="pa3 br3 ma2"
      style={{
        backgroundColor: selected ? palette.blue : palette.smoke
      }}
    >
      <Text
        cls="f3 fw6"
        style={{
          color: selected ? palette.white : palette.smokeDarker
        }}
      >
        {children}
      </Text>
    </View>
  </TouchableOpacity>
));

EditFreqencyScreen.navigationOptions = { title: 'Choose a frequency' };

export default EditFreqencyScreen;
