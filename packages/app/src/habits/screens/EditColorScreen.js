import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { map, noop } from 'lodash';
import { wrap } from 'react-native-style-tachyons';
import { formatProgress, palette, habitColors } from '../../utils';

const EditColorScreen = wrap(
  class extends Component {
    state = {
      color: null
    };

    componentWillMount() {
      const color = this.props.navigation.state.params.color;
      this.setState({ color });
    }

    componentWillUnmount() {
      const commitEdits =
        this.props.navigation.state.params.commitEdits || noop;
      commitEdits({ color: this.state.color });
    }

    setColor = color => {
      this.setState({ color });
      this.props.navigation.pop();
    };

    render() {
      return (
        <View cls="flx-i pa3 bg-white">
          <View cls="aic pb3">
            <View
              cls="br3 w5 h5"
              style={{ backgroundColor: this.state.color }}
            />
          </View>
          <View cls="flx-row flx-wrap jcc">
            {map(habitColors, (color, i) => {
              return (
                <TouchableOpacity onPress={() => this.setColor(color)} key={i}>
                  <View
                    cls="w3 h3 ma3 br3"
                    style={{ backgroundColor: color }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }
  }
);

EditColorScreen.navigationOptions = {
  title: 'Choose a color'
};

export default EditColorScreen;
