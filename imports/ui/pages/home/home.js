import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import '../../components/messageInput/messageInput';
import '../../components/messageList/messageList';
import '../../components/loading/loading';
import '../../components/dummy/dummy';

import './home.html';

Template.home.onCreated(function homeOnCreated() {
  this.autorun(() => {
    const thread = Session.get('name');
    const password = Session.get('password');
    const limit = Session.get('limit');
    this.subscribe('messages', { limit, thread, password });
  });
});

Template.home.helpers({});
