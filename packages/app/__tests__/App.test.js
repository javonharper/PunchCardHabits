import moment from 'moment';
import uuid from 'uuid';
import {
  FREQUENCY,
  formatProgress,
  getCompletionsForHabitDaily,
  getCompletionsForHabitWeekly
} from '../src/utils';
import { reducer, deleteHabit } from '../src/habits';

describe('utils', () => {
  it('formats habit frequencies', () => {
    expect(formatProgress(FREQUENCY.DAILY)).toEqual('today');
    expect(formatProgress(FREQUENCY.WEEKLY)).toEqual('this week');
    expect(formatProgress('???')).toEqual('this [UNKNOWN FREQUENCY]');
  });

  it('gets completions for daily habits', () => {
    const habit = {
      id: 'habit-1'
    };

    const todaysCompletion = {
      habitId: 'habit-1',
      date: moment().format('YYYY-MM-DD')
    };

    const yesterdaysCompletion = {
      habitId: 'habit-1',
      date: moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
    };

    const completions = [todaysCompletion, yesterdaysCompletion];

    expect(
      getCompletionsForHabitDaily(
        habit,
        completions,
        moment().format('YYYY-MM-DD')
      )
    ).toEqual([todaysCompletion]);
  });

  it('gets completions for weekly habits', () => {
    const habit = {
      id: 'habit-1'
    };

    const todaysCompletion = {
      habitId: 'habit-1',
      date: moment().format('YYYY-MM-DD')
    };

    const otherCompletion = {
      habitId: 'habit-1',
      date: moment()
        .subtract(15, 'days')
        .format('YYYY-MM-DD')
    };

    const completions = [todaysCompletion, otherCompletion];

    expect(
      getCompletionsForHabitWeekly(
        habit,
        completions,
        moment().format('YYYY-MM-DD')
      )
    ).toEqual([todaysCompletion]);
  });
});

describe('habits reducer', () => {
  it('deletes a habit', () => {
    const habit1 = {
      id: 'habit-1'
    };

    const habit2 = {
      id: 'habit-2'
    };

    const state = {
      habits: [habit1, habit2]
    };

    const actualState = reducer(state, deleteHabit(habit2.id));
    expect(actualState.habits.length).toEqual(1);
    expect(actualState.habits[0].id).toEqual('habit-1');
  });
});
