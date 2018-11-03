import { pick, map, filter, get } from 'lodash';

export const FREQUENCY = {
  WEEKLY: 'WEEKLY',
  DAILY: 'DAILY'
};

export const log = thing => {
  console.log('LOG: ', thing);
  return thing;
};

export const formatProgress = frequency => {
  switch (frequency) {
    case FREQUENCY.DAILY:
      return 'today';
    case FREQUENCY.WEEKLY:
      return 'this week';
    default:
      return 'this ???';
  }
};

export const titleCase = str => {
  str = str.toLowerCase();
  str = str.split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};

export const habitsWithCompletions = (habits, completions, date) => {
  return map(habits, habit => {
    const matchedCompletions = filter(completions, {
      habitId: habit.id,
      date: date
    });

    const count = get(matchedCompletions, 'length', 0);

    return {
      ...habit,
      count
    };
  });
};

export const palette = {
  black: '#1F2D3D',
  smoke: '#E0E6ED',
  smokeDark: '#D3DCE6',
  smokeDarker: '#C0CCDA',
  white: '#FFFFFF',
  pink: '#DB525D',
  red: '#DB5847',
  orange: '#E69C4D',
  yellow: '#F2CD60',
  green: '#8DD27C',
  tealblue: '#87C6F1',
  blue: '#3E7CEE',
  purple: '#545CC8',
  grape: '#2C1552'
};

export const habitColors = pick(palette, [
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'tealblue',
  'blue',
  'purple',
  'grape'
]);
