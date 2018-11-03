import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { map, sample, pick } from 'lodash';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { wrap } from 'react-native-style-tachyons';
import { FREQUENCY, habitColors } from '../../utils';
import { saveHabit } from '../';

const EditScreen = wrap(
  class extends Component {
    componentWillMount() {
      this.initHabit(this.props.navigation.state.params.habit);

      this.props.navigation.setParams({
        handleDonePressed: this.handleDonePressed
      });
    }

    initHabit = habit => {
      this.setState({
        id: habit.id || uuid(),
        name: habit.name || '',
        goal: habit.goal || 3,
        frequency: habit.frequency || FREQUENCY.WEEKLY,
        color: habit.color || sample(habitColors)
      });
    };

    commitEdits = state => {
      this.setState(state);
    };

    handleDonePressed = () => {
      this.props.saveHabit(
        pick(this.state, 'id', 'name', 'goal', 'frequency', 'color')
      );

      this.props.navigation.popToTop();
    };

    render() {
      const { navigation } = this.props;
      const { name, color, goal, frequency } = this.state;
      return (
        <React.Fragment>
          <View cls="pa3 bg-white flx-i">
            <Field>
              <Label>Habit Name</Label>
              <TextInput
                cls="bg-smokeDarker pa2 black f4 br3"
                value={name}
                onChangeText={name => this.commitEdits({ name })}
              />
            </Field>
            <Field>
              <Label>How often?</Label>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditGoal', {
                    goal,
                    commitEdits: this.commitEdits
                  })
                }
              >
                <ReadOnly>{`${goal} times`}</ReadOnly>
              </TouchableOpacity>
            </Field>
            <Field>
              <Label>Frequency</Label>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditFrequency', {
                    frequency,
                    commitEdits: this.commitEdits
                  })
                }
              >
                <ReadOnly>{frequency}</ReadOnly>
              </TouchableOpacity>
            </Field>
            <Field>
              <Label>Color</Label>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditColor', {
                    color,
                    commitEdits: this.commitEdits
                  })
                }
              >
                <ColorBar color={color} />
              </TouchableOpacity>
            </Field>
          </View>
        </React.Fragment>
      );
    }
  }
);

const Field = wrap(({ children }) => <View cls="mb4">{children}</View>);

const Label = wrap(({ children }) => (
  <View cls="mb2">
    <Text cls="black f4 fw7">{children}</Text>
  </View>
));

const ReadOnly = wrap(({ children }) => (
  <View cls="bg-smokeDarker pa2 br3">
    <Text cls="black f4">{children}</Text>
  </View>
));

const ColorBar = wrap(({ color }) => (
  <View
    cls="pa2 br3"
    style={{
      backgroundColor: color
    }}
  >
    <Text cls="f4" style={{ color }}>
      Color
    </Text>
  </View>
));

// TODO JAVON: Disable this when not able to
// disabled={true}
EditScreen.navigationOptions = ({ navigation }) => ({
  title: 'Edit',
  headerRight: (
    <Button
      title="Done"
      onPress={() => navigation.state.params.handleDonePressed()}
    />
  )
});

const mapDispatchToProps = dispatch => ({
  saveHabit: habit => {
    dispatch(saveHabit(habit));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(EditScreen);
