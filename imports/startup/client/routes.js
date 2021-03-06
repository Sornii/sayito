import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
// layouts
import '../../ui/layouts/app-body';
// pages
import '../../ui/pages/home/home';
import '../../ui/pages/said/said';
import '../../ui/pages/tag/tag';
import '../../ui/pages/thread/thread';
import '../../ui/pages/invalid/invalid';
// componentes
import '../../ui/components/dummy/dummy';
import '../../ui/components/loading/loading';
import '../../ui/components/messageInput/messageInput';
import '../../ui/components/messageItem/messageItem';
import '../../ui/components/messageThumbsup/messageThumbsup';
import '../../ui/components/sayitoHeader/sayitoHeader';
import '../../ui/components/threadKey/threadKey';
import '../../ui/components/threadModal/threadModal';
import '../../ui/components/threadPassword/threadPassword';

FlowRouter.route('/', {
  name: 'home',
  action: () => BlazeLayout.render('App_body', { content: 'home' }),
});

FlowRouter.route('/hashtag/:tag', {
  name: 'tag',
  action: () => BlazeLayout.render('App_body', { content: 'tag' }),
});

FlowRouter.route('/said/:hash', {
  name: 'said',
  action: () => BlazeLayout.render('App_body', { content: 'said' }),
});

FlowRouter.route('/thread/:thread', {
  name: 'thread',
  action: () => BlazeLayout.render('App_body', { content: 'thread' }),
});

FlowRouter.route('/thread/:thread/hashtag/:tag', {
  name: 'thread.tag',
  action: () => BlazeLayout.render('App_body', { content: 'tag' }),
});

FlowRouter.route('/thread/:thread/said/:hash', {
  name: 'thread.said',
  action: () => BlazeLayout.render('App_body', { content: 'said' }),
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('invalid', {});
  },
};
