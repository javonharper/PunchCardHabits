import moment from 'moment';
import uuid from 'uuid';
import { map, find, dropWhile } from 'lodash';
import { FREQUENCY, palette } from '../utils';

const SAVE_HABIT = 'SAVE_HABIT';
const DELETE_HABIT = 'DELETE_HABIT';
const UPDATE_HABIT = 'UPDATE_HABIT';
const LOG_COMPLETION = 'LOG_COMPLETION';

export const saveHabit = habit => ({
  type: SAVE_HABIT,
  habit
});

export const updateHabit = habit => ({
  type: UPDATE_HABIT,
  habit
});

export const logCompletion = habitId => ({
  type: LOG_COMPLETION,
  habitId
});

export const deleteHabit = habitId => ({
  type: DELETE_HABIT,
  habitId
});

const initialState = {};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_HABIT:
      return {
        ...state,
        habits: [...state.habits, action.habit]
      };

    case UPDATE_HABIT:
      return {
        ...state,
        habits: map(
          state.habits,
          habit => (habit.id === action.habit.id ? action.habit : habit)
        )
      };

    case LOG_COMPLETION:
      const now = moment();

      return {
        ...state,
        completions: [
          ...state.completions,
          {
            date: now.format('YYYY-MM-DD'),
            timestamp: now.format(),
            habitId: action.habitId
          }
        ]
      };

    case DELETE_HABIT:
      return {
        ...state,
        habits: dropWhile(state.habits, { id: action.habitId }),
        completions: dropWhile(state.completions, { habitId: action.habitId })
      };

    default:
      return state;
  }
};
