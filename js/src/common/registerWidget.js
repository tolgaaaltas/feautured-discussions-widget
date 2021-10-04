import Widgets from 'flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets';

import FeauturedDiscussionsWidget from './components/FeauturedDiscussionsWidget';

export default function (app) {
  new Widgets()
    .add({
      key: 'FeauturedDiscWidget',
      component: FeauturedDiscussionsWidget,
      isDisabled: false,
      isUnique: true,
      placement: 'end',
      position: 1,
    })
    .extend(app, 'justoverclock-feautured-discussions-widget');
}
