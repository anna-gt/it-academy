import React from 'react';

class IShopHeader extends React.Component {
  render() {
    return (
      <tr className = 'IShopHeader'>
        <td>{this.props.names}</td>
        <td>{this.props.images}</td>
        <td>{this.props.prices}</td>
        <td>{this.props.qts}</td>
      </tr>
    )
  }
}

export default IShopHeader;