import React, { Component,  cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([ //一个对象可以是几种类型中的任意一种类型
      PropTypes.string, //PropTypes进行类型检查
      PropTypes.node,
    ]).isRequired,
    order: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    isActive: PropTypes.bool,
  };

  render() {
    const { classPrefix, className, isActive, children } = this.props;

    const classes = classnames({
      [className]: className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-active`]: isActive,
    });

    return (
      <div
        role="tabpanel"
        className={classes}
        aria-hidden={!isActive}>
        {children}
      </div>
    );
  }
}

export default TabPane;
