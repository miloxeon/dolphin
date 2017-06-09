// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';

/**
* This component is used to augment Grommet Button
* with routing/history capabilities
*/
export default class NavButton extends Component {

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick (event) {
    event.preventDefault();
    this.context.router.push(this.props.path);
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render () {
    const { path } = this.props;
    const { router } = this.context;
    let className = this.props.className || '';
    if (router.isActive(path)) {
      className += ' active';
    }
    let href = router.createPath(path);
    return (
      <Button {...this.props} className={className} href={href}
        onClick={this._onClick} />
    );
  }
};

NavButton.propTypes = {
  ...Button.propTypes,
  onClick: PropTypes.func,
  path: PropTypes.string.isRequired
};

NavButton.contextTypes = {
  router: PropTypes.object.isRequired
};
