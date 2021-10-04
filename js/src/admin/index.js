/*
 * This file is part of Feautured discussion Widget.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import app from 'flarum/admin/app';
import registerWidget from '../common/registerWidget';

app.initializers.add('justoverclock/feautured-discussions-widget', () => {
  registerWidget(app);
  app.extensionData
    .for('justoverclock-feautured-discussions-widget')
    .registerSetting({
      setting: 'justoverclock-feautured-discussions-widget.feautLimit',
      name: 'justoverclock-feautured-discussions-widget.feautLimit',
      type: 'number',
      label: app.translator.trans('justoverclock-feautured-discussions-widget.admin.limit'),
      help: app.translator.trans('justoverclock-feautured-discussions-widget.admin.limit-help'),
    })
});
