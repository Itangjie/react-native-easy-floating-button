
# react-native-easy-floating-button

[![npm downloads](https://img.shields.io/npm/dt/react-native-easy-floating-button.svg)](https://npm.im/react-native-easy-floating-button)

## Preview

## Getting started

`$ npm install react-native-easy-floating-button --save`

## Example
Check [example](https://github.com/Itangjie/react-native-easy-floating-button/tree/master/example) in the  folder.

```bash
$ cd example
$ npm install
$ react-native run-ios
```

## Usage
### GlobalFloatButton
edit your project root view,like this(detail please see [example](https://github.com/Itangjie/react-native-easy-floating-button/tree/master/example)): 
```javascript
import {GlobalFloatButton} from from 'react-native-easy-floating-button';

let menu = [
        {name : 'notice', image : require('./notice_v2.png'), action : 'vt://notice/view'},
        {name : 'customer', image : require('./customer_v2.png'), action : ''},
        {name : 'attendance', image : require('./kaoqing_v2.png'), action : ''},
        {name : 'sales', image : require('./memberManage.png'), action : ''},
        {name : 'approval', image : require('./shenpi_v2.png'), action : ''},
        {name : 'add', image : ‘https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559109867602&di=3c152907ea75909f79d79a96ac66b715&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20140417%2F13343689.png’, action : 'add', allowEdit : false} // allowEdit默认为true，为false时不可长按删除
    ];

<GlobalFloatButton
    buttonInitializeLeft={0} // 按钮初始化距离left位置
    buttonInitializeTop={400} // 按钮初始化距离top位置
    menus={menu} // 菜单数组
 />
 
 GlobalFloatButton.show(); //显示
 GlobalFloatButton.dismiss(); // 隐藏
 GlobalFloatButton.addMenuButton(button,index); //添加按钮,index可选，默认最后追加
 GlobalFloatButton.removeMenuButton(index); //移除按钮
 GlobalFloatButton.replaceMenuButton(buttonArr); //替换所有按钮
 GlobalFloatButton.getMenus(); //获取所有按钮数据
 GlobalFloatButton.onClickButton((index,data)=>{});//点击了某个按钮
 GlobalFloatButton.onRemoveButton((index,data)=>{});//删除了某个按钮
```
### FloatButton
single page usage
```javascript
import {FloatButton} from from 'react-native-easy-floating-button';
<FloatButton
    buttonInitializeLeft={0} // 按钮初始化距离left位置
    buttonInitializeTop={400} // 按钮初始化距离top位置
    menus={menu} // 菜单数组,和GlobalFloatButton一样
    moveRange={{width : 320,height:480}} // 可移动范围,对应父视图的宽高
    onClickButton={(index,data)=>{}} // 点击了某个按钮
    onRemoveButton={(index,data)=>{}} // 删除了某个按钮
 />
```

### Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| buttonInitializeLeft | 0 | `number` | Initializes the left position of the button |
| buttonInitializeTop | 0 | `number` | Initializes the top position of the button |
| buttonSize | 60 | `number` | button size |
| buttonImage | null | `image` | image style button, require('./image.png') or {uri : 'http://'} |
| buttonView | null | `view` | custom button view ,View componment|
| moveRange | {width : screenW,height : screenH} | `object` | button can move range |
| title | null | `string` | menu top title |
| titleStyle |  | `style` | menu top title style |
| backgroundColor | rgba(0,0,0,0) | `string` | menu container background color |
| menuWidth | screenW - 60 | `number` | menu default with |
| menuHeight | screenW - 60 | `number` | menu default height |
| menuBackgroundColor | rgba(0,0,0,0.9) | `string` | menu background color |
| menuButtonImageStyle |  | `style` | menu button image style |
| menuButtonTextStyle | | `style` | menu button text style |
| menuButtonDeleteImage | null | `image` |  menu button right top delete image |
| menus |  | `array` | menu array |
| numberOfRow | 3 | `number` | menu page number of row |
| numberOfColumn | 3 | `number` | menu page number of column |
| clickAutoDismiss | true | `bool` | on click menu button, close menu |
| moveEnable | true | `bool` | button is allow move |
| autoAdsorption | true | `bool` | whether the button automatically approaches the edge  |
| deleteAnimate | true | `bool` | is show delete animated |
| onClickButton |  | `func` | on click button |
| onRemoveButton |  | `func` | on remove button |

### Methods

#### show()

#### dismiss(text, extraTop, bkColor)

#### addMenuButton(button, index)

Parameters:

| Name  | Type     | default | Description | optional |
| :---- | :------: | :------: | :--- | :--- |
| button | `object`   | null | botton data | NO |
| index | `number`   | -1 | button index | YES |

#### removeMenuButton(index)

Parameters:

| Name  | Type     | default | Description | optional |
| :---- | :------: | :------: | :--- | :--- |
| index | `number`   |  | button index | YES |

#### replaceMenuButton(buttonArr)

Parameters:

| Name  | Type     | default | Description | optional |
| :---- | :------: | :------: | :--- | :--- |
| buttonArr | `array`   |  | replace buttons | NO |

#### getMenus()

#### onClickButton(callback)

Parameters:

| Name  | Type     | default | Description | optional |
| :---- | :------: | :------: | :--- | :--- |
| callback | `func`   |  | on click button callback | NO |

#### onRemoveButton(callback)

Parameters:

| Name  | Type     | default | Description | optional |
| :---- | :------: | :------: | :--- | :--- |
| callback | `func`   |  | on remove button callback | NO |
  
