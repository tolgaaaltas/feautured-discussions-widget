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
    // get posts json
    const feauturedDisc = app.store
      .find('discussions', {
        isFeatured: true,
        sort: '-featuredFrom',
        include: 'user',
        page: { limit: 5 },
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
                <div className="feautpostedby"><b>By:</b> {ftdisc.user().displayName()}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
