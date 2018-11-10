import moment from 'moment';
import uuid from 'uuid';
import {
  FREQUENCY,
  formatProgress,
  getCompletionsForHabitDaily,
  getCompletionsForHabitWeekly
} from '../src/utils';

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

    const yesterdaysCompletion = {
      habitId: 'habit-1',
      date: moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
    };

    const otherCompletion = {
      habitId: 'habit-1',
      date: moment()
        .subtract(15, 'days')
        .format('YYYY-MM-DD')
    };

    const completions = [
      todaysCompletion,
      yesterdaysCompletion,
      otherCompletion
    ];

    expect(
      getCompletionsForHabitWeekly(
        habit,
        completions,
        moment().format('YYYY-MM-DD')
      )
    ).toEqual([todaysCompletion, yesterdaysCompletion]);
  });
});
