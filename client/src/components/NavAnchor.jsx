// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Anchor from 'grommet/components/Anchor';

/**
* This component is used to augment Grommet anchor
* with routing/history capabilities
*/
export default class NavAnchor extends Component {

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
      <Anchor {...this.props} className={className} href={href}
        onClick={this._onClick} />
    );
  }
};

NavAnchor.propTypes = {
  ...Anchor.propTypes,
  onClick: PropTypes.func,
  path: PropTypes.string.isRequired
};

NavAnchor.contextTypes = {
  router: PropTypes.object.isRequired
};
