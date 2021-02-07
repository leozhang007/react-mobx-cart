import { observable, computed, action, configure, flow, runInAction } from 'mobx';

// 通过配置强制程序使用action函数更改应用程序中的状态
configure({enforceActions: 'observed'});

class appleStore {

  @observable apples = [];
  @observable newAppleId = 0;
  @observable isPicking = false;
  @observable buttonText = '摘苹果';

  /**  计算当前已吃和未吃苹果的状态 */
  @computed get status() {
    let status = {
      appleNow: {
        quantity: 0,
        weight: 0
      },
      appleEaten: {
        quantity: 0,
        weight: 0
      }
    };
    this.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
      status[selector].quantity++;
      status[selector].weight += apple.weight;
    });
    return status;
  }

  /*摘苹果的异步操作*/
  @action.bound pickApple () {

    if (this.isPicking) {
      return;
    }

    this.isPicking = true;
    this.buttonText = '正在采摘...';

    setTimeout(() => {
      runInAction(() => {
        let weight = Math.floor(200 + Math.random() * 50);
        this.isPicking = false;
        this.buttonText = '摘苹果';
        this.apples.push({
          id: this.newAppleId++,
          weight: weight,
          isEaten: false
        });
      })
    }, 500);
  }

  /* 这里需要写成箭头函数的形式，这样此函数从父组件传递到子组件的时候才能调用成功*/
  @action.bound eatApple (appleId) {
    let targetIndex = '';
    this.apples.forEach((apple, index) => {
      if (apple.id == appleId) {
        targetIndex = index
      }
    });
    this.apples[targetIndex].isEaten = true;
  }
}

export default new appleStore();