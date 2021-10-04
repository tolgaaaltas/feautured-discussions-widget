import app from 'flarum/admin/app';
import registerWidget from '../common/registerWidget';

app.initializers.add('justoverclock/feautured-discussions-widget', () => {
  registerWidget(app);
});
