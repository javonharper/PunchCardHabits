import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { map, sample, pick, find, defaults } from 'lodash';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { wrap } from 'react-native-style-tachyons';
import { FREQUENCY, habitColors } from '../../utils';
import { saveHabit, updateHabit } from '../data';

class EditScreen extends Component {
  componentWillMount() {
    const { habit, habitId, isNew } = this.props.navigation.state.params;

    const getHabit = isNew ? this.initHabit(habit) : this.loadHabit(habitId);
    this.setState(getHabit);

    this.props.navigation.setParams({
      handleDonePressed: this.handleDonePressed
    });
  }

  initHabit = habitValues => {
    return defaults(habitValues, {
      id: uuid(),
      name: '',
      goal: 3,
      frequency: FREQUENCY.WEEKLY,
      color: sample(habitColors)
    });
  };

  loadHabit = habitId => {
    return find(this.props.habits, { id: habitId });
  };

  commitEdits = state => {
    this.setState(state);
  };

  handleDonePressed = () => {
    const { saveHabit, updateHabit } = this.props;
    const { isNew } = this.props.navigation.state.params;

    const saveFn = isNew ? saveHabit : updateHabit;
    saveFn(pick(this.state, 'id', 'name', 'goal', 'frequency', 'color'));

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

const mapStateToProps = ({ habits }) => ({
  habits
});

const mapDispatchToProps = dispatch => ({
  saveHabit: habit => {
    dispatch(saveHabit(habit));
  },
  updateHabit: habit => {
    dispatch(updateHabit(habit));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrap(EditScreen));
