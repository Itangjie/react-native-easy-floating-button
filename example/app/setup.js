/**
 * Created by tangjie on 17/6/13.
 */
import React, {
    Component,

} from 'react';

import {
    NativeModules,
    View,
    Platform
} from 'react-native';
import App from './app';

import {GlobalFloatButton} from 'react-native-easy-floating-button';
export default class Setup extends Component {

    constructor(props) {

        super(props);

        this.state={
        };



    }


    render() {

        const menu = [
            {name : 'notice', image : require('./resource/notice_v2.png'), action : 'ac://notice/view',},
            {name : 'customer', image : require('./resource/customer_v2.png'), action : ''},
            {name : 'attendance', image : require('./resource/kaoqing_v2.png'), action : ''},
            {name : 'sales', image : require('./resource/memberManage.png'), action : ''},
            {name : 'approval', image : require('./resource/shenpi_v2.png'), action : ''},
            {name : 'sign', image : require('./resource/wqqd_v2.png'), action : ''},
            {name : 'trace', image : require('./resource/yingyanguanli.png'), action : ''},
            {name : 'finance', image : require('./resource/finance.png'), action : ''},
            {name : 'add', allowEdit : false,image : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559124896260&di=d0fb3718e90a0fc0a4d90e78ab5711cb&imgtype=0&src=http%3A%2F%2Fpic28.photophoto.cn%2F20130710%2F1190119794154806_b.jpg', action : 'add'},
        ]
        return (
            <View style={[{flex:1}]}>
                <App/>
                <GlobalFloatButton
                    buttonInitializeTop={600}
                    buttonInitializeLeft={0}
                    menus={menu}
                    title={'GlobalFloatButton'}
                    // titleStyle={{color : 'red'}} //title样式
                    // backgroundColor={'rgba(0,0,0,0.3)'}
                    // buttonSize={60}
                    // buttonImage={require('./resource/yingyanguanli.png')} // 用图片作为button
                    // buttonView={  //自定义按钮view
                    //     <View style={{ width : 60, height : 60, backgroundColor : 'green', borderRadius: 30, justifyContent: 'center', alignItems : 'center' }}>
                    //         <View style={{ width : 30, height : 30, backgroundColor : 'yellow', borderRadius: 15 }}/>
                    //     </View>
                    // }
                    // numberOfRow={3} // 菜单每页几行
                    // numberOfColumn={3} // 菜单每页几列
                    // menuWidth={300}
                    // menuHeight={300}
                    // menuBackgroundColor={'rgba(255,255,255,0.9)'}
                    // menuButtonImageStyle={{width : 30, height : 30}}
                    // menuButtonTextStyle={{color : '#333333'}}
                    // clickAutoDismiss={false} // 点击按钮菜单是否自动消失
                    // moveEnable={false} // 悬浮按钮是否可以移动
                    // autoAdsorption={false} // 悬浮按钮是否自动吸附边缘
                    // deleteAnimate={false} // 是否显示菜单删除动画
                    // 更多属性请查看GloablSupensionButtonView文件或github
                />
            </View>
        );
    }
}
