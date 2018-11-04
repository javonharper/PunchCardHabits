import moment from 'moment';
import uuid from 'uuid';
import {
  FREQUENCY,
  formatProgress,
  getCompletionsForHabitDaily
} from '../src/utils';

describe('utils', () => {
  it('formatProgress', () => {
    expect(formatProgress(FREQUENCY.DAILY)).toEqual('today');
    expect(formatProgress(FREQUENCY.WEEKLY)).toEqual('this week');
    expect(formatProgress('???')).toEqual('this [UNKNOWN FREQUENCY]');
  });
});
