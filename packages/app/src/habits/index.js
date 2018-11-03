import moment from 'moment';
import { size } from 'lodash';
import { FREQUENCY, palette } from '../utils';
import uuid from 'uuid';

const SAVE_HABIT = 'SAVE_HABIT';
const LOG_COMPLETION = 'LOG_COMPLETION';

export const saveHabit = habit => ({
  type: SAVE_HABIT,
  habit
});

export const logCompletion = habit => ({
  type: LOG_COMPLETION,
  habit
});

const habitId = uuid();

const initialState = {
  completions: [
    {
      date: moment().format('YYYY-MM-DD'),
      timestamp: moment().format(),
      habitId
    }
  ],
  habits: [
    {
      id: habitId,
      name: 'Meditate',
      goal: '2',
      frequency: FREQUENCY.DAILY,
      color: palette.purple
    }
  ]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_HABIT:
      return {
        ...state,
        habits: [...state.habits, action.habit]
      };

    case LOG_COMPLETION:
      return {
        ...state,
        completions: [
          ...state.completions,
          {
            date: moment().format('YYYY-MM-DD'),
            timestamp: moment().format(),
            habitId: action.habit.id
          }
        ]
      };

    default:
      return state;
  }
};

export * from './screens';
