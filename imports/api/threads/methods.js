import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { LoggedInMixin } from '../../utils/loggedin-mixin';
import { SimulationOffMixin } from '../../utils/simulationoff-mixin';

import { Threads } from './threads';

export function findChecked(name, password) {
  let threadFound = null;

  if (name || password) {
    threadFound = Threads.findOne({ name, password });
    if (!threadFound) {
      throw new Meteor.Error('invalid_information', 'The thread was not found. Invalid information');
    }
  }

  return threadFound;
}

export const insert = new ValidatedMethod({
  name: 'threads.insert',
  mixins: [LoggedInMixin],
  validate: new SimpleSchema({
    name: { type: String },
    password: { type: String },
    creator: { type: String },
  }).validator(),
  run({ name, password, creator }) {
    const thread = Threads.findOne({ name });
    if (thread) {
      throw new Meteor.Error('name_taken', 'Name already taken');
    }

    const createdAt = new Date();
    return Threads.insert({ name, password, creator, createdAt });
  },
});

export const verify = new ValidatedMethod({
  name: 'threads.verify',
  mixins: [LoggedInMixin, SimulationOffMixin],
  validate: new SimpleSchema({
    name: { type: String },
    password: { type: String },
  }).validator(),
  run({ name, password }) {
    const thread = Threads.findOne({ name, password });
    if (!thread) {
      throw new Meteor.Error('invalid_information', 'The thread was not found. Invalid information');
    }

    return true;
  },
});
