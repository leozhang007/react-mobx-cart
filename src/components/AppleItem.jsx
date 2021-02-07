import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import appleImage from '../images/apple.png'
import '../styles/appleItem.css';

@inject('appleStore')
@observer
class AppleItem extends Component {
  render() {
    let { apple, eatApple } = this.props;
    return (
      <div className="appleItem">
        <div className="apple">
          <img src={appleImage} alt="" />
        </div>
        <div className="info">
          <div className="name">红苹果 - {apple.id}号</div>
          <div className="weight">{apple.weight}克</div>
        </div>
        <div className="btn-div">
          <button onClick={() => eatApple(apple.id)}> 吃掉 </button>
        </div>
      </div>
    );
  }
}

export default AppleItem;