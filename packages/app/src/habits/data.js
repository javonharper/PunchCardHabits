import moment from 'moment';
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

const habitId1 = uuid();
const habitId2 = uuid();
const today = moment().format();

const initialState = {
  completions: [
    {
      date: moment(today).format('YYYY-MM-DD'),
      timestamp: moment(today).format(),
      habitId: habitId1
    },
    {
      date: moment(today).format('YYYY-MM-DD'),
      timestamp: moment(today).format(),
      habitId: habitId2
    },
    {
      date: moment(today).subtract(1, 'days').format('YYYY-MM-DD'),
      timestamp: moment(today).format(),
      habitId: habitId2
    },
    {
      date: moment(today).subtract(9, 'days').format('YYYY-MM-DD'),
      timestamp: moment(today).format(),
      habitId: habitId2
    },

  ],
  habits: [
    {
      id: habitId1,
      name: 'Meditate',
      goal: '2',
      frequency: FREQUENCY.DAILY,
      color: palette.purple
    },
    {
      id: habitId2,
      name: 'Go to the gym',
      goal: '3',
      frequency: FREQUENCY.WEEKLY,
      color: palette.red
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

