import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import TabNav from './TabNav';
import TabContent from './TabContent';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from '../css/style.scss';
import { Seq } from 'immutable';
import PropTypes from 'prop-types';

/***
 * 使用react-css-modules之后，引入了style后，设置节点样式class时，统一使用className而不是styleName
 */

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class Tabs extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    const currProps = this.props;

    this.handleTabClick = this.handleTabClick.bind(this);
    this.immChildren = Seq(currProps.children);

    let activeIndex;
    if ('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex;
    } else if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex;

    /* if(this.state.activeIndex !== activeIndex &&
      'defaultActiveIndex' in this.props)
    */
    if (this.state.activeIndex !== activeIndex ) {
      this.setState({
        activeIndex,
        prevIndex,
      });

      this.props.onChangeTab(activeIndex)
      // this.props.onChange({ activeIndex, prevIndex });
    }
  }

  renderTabNav() {
    return (
      <TabNav
        key="tabBar"
        onTabClick={this.handleTabClick}
        panels={this.immChildren}
        activeIndex={this.state.activeIndex}
      />
    );
  }

  renderTabContent() {
    return (
      <TabContent
        key="tabcontent"
        activeIndex={this.state.activeIndex}
        panels={this.immChildren}
      />
    );
  }

  render() {
    const { className } = this.props;
    const cx = classnames(className, 'ui-tabs');

    return (
      <div className={cx}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    );
  }
}

export default Tabs;
