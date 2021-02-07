import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import AppleItem from './AppleItem'
import '../styles/appleBasket.css'

@inject('appleStore')
@observer
class Apple extends Component {
  getAppleItem() {
    let data = [];
    this.props.appleStore.apples.forEach(apple => {
      if (!apple.isEaten) {
        data.push(
          <AppleItem
            eatApple={this.props.appleStore.eatApple}
            apple={apple}
            key={apple.id}
          />
        );
      }
    });
    if (!data.length) return <div>its empth</div>;
    return data;
  }
  render() {
    let { status, isPicking, pickApple, buttonText } = this.props.appleStore;
    console.log(this.props);
    let {
      appleNow: { quantity: notEatenQuantity, weight: notEatenWeight },
      appleEaten: { quantity: EatenQuantity, weight: EatenWeight }
    } = status;
    return (
      <div className="appleBusket">
        <div className="title">苹果篮子</div>

        <div className="stats">
          <div className="section">
            <div className="head">当前</div>
            <div className="content">
              {notEatenQuantity}个苹果，{notEatenWeight}克
            </div>
          </div>
          <div className="section">
            <div className="head">已吃掉</div>
            <div className="content">
              {EatenQuantity}个苹果，{EatenWeight}克
            </div>
          </div>
        </div>

        <div className="appleList">{this.getAppleItem()}</div>

        <div className="btn-div">
          <button  className={isPicking ? 'disabled' : ''}  onClick={pickApple} >{buttonText}</button>
        </div>
      </div>
    );
  }
}

export default Apple;
