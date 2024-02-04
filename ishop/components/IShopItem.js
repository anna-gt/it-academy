import React from 'react';

import './IShopItem.css';

class IShopItem extends React.Component {
  render() {
    return (
        <tr className='IShopItem'>
          <td>{this.props.name}</td>
          <td><img src={this.props.image} alt={this.props.name} width = '100' height = '100'/></td>
          <td>{this.props.price}</td>
          <td>{this.props.qt}</td>
        </tr>
    )

  }

}

export default IShopItem;
