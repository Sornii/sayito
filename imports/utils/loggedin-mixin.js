import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import _ from 'underscore';

export const LoggedInMixin = function loggedInMixinConfiguration(methodOptions) {
  check(methodOptions.checkLoggedInError, Match.ObjectIncluding({
    error: String,
    message: Match.Optional(String),
    reason: Match.Optional(String),
  }));
  const runFunc = methodOptions.run;
  methodOptions.run = function loggedInMixinRun(...args) {
    if (!this.userId) {
      throw new Meteor.Error(..._.values(methodOptions.checkLoggedInError));
    }
    return runFunc.call(this, ...args);
  };
  return methodOptions;
};
