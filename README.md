
# react-native-easy-floating-button

## Getting started

`$ npm install react-native-easy-floating-button --save`

## Usage
```javascript
import {GlobalFloatButton,FloatButton} from from 'react-native-easy-floating-button';

let menu = [
        {name : '公告', image : require('./notice_v2.png'), action : 'vt://notice/view'},
        {name : '客户', image : require('./customer_v2.png'), action : ''},
        {name : '考勤', image : require('./kaoqing_v2.png'), action : ''},
        {name : '销售管理', image : require('./memberManage.png'), action : ''},
        {name : '审批', image : require('./shenpi_v2.png'), action : ''}
    ];

<GlobalFloatButton
    buttonInitializeLeft={0}
    buttonInitializeTop={500}
    menus={menu}
 />
```
  