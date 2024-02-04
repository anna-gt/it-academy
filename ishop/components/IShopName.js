import React from 'react';
import PropTypes from 'prop-types';


class IShopName extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
  };
  
  render() {
    return <div className='IShopName'>{this.props.name}</div>;
  }

}

export default IShopName;
