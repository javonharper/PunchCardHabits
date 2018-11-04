import { Segment } from 'expo';

export const initAnalytics = iosWriteKey => Segment.initialize({ iosWriteKey });

export const identify = id => Segment.identify(id);

export const track = (action, properties) =>
  Segment.trackWithProperties(action, properties);

export const screen = (screenName, properties) =>
  Segment.screenWithProperties(screenName, properties);
