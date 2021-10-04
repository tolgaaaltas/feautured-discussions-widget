/*
 * This file is part of Feautured discussion Widget.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import Widget from 'flarum/extensions/afrux-forum-widgets-core/common/components/Widget';
import app from 'flarum/forum/app';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Link from "flarum/common/components/Link";

export default class FeauturedDiscussionsWidget extends Widget {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
  }

  oncreate(vnode) {
    const limitFeatured = app.forum.attribute('justoverclock-feautured-discussions-widget.feautLimit') || 5;
    // get posts json
    const feauturedDisc = app.store
      .find('discussions', {
        isFeatured: true,
        sort: '-featuredFrom',
        include: 'user',
        page: { limit: limitFeatured },
        filter: { type: 'featured' },
      })
      .then((results) => {
        this.feauturedDisc = results;
        console.log(results)
        this.loading = false;
        m.redraw();
      });
  }

  className() {
    // css class for the container
    return 'feauturedDisc-widget';
  }

  icon() {
    // Widget icon.
    return 'fas fa-thumbtack';
  }

  title() {
    // Widget title.
    return app.translator.trans('justoverclock-feautured-discussions-widget.forum.widget-title');
  }

  content() {
    if (this.loading) {
      return <LoadingIndicator />;
    }
    return (
      <div className="feauturedDisc-content">
        <ul className="feauturedDisc fa-ul">
          {this.feauturedDisc.map((ftdisc) => {
            return (
              <li class="feauturedDiscwg">
                <Link href={app.route.discussion(ftdisc)} className="feautlink">
                  <i class="fas fa-bookmark feauturedDisc"/>{ftdisc.title()}
                </Link>
                <div className="feautpostedby"><b>Author:</b> {ftdisc.user().displayName()}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
