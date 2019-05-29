/**
 * Created by tangjie on 2019/5/29.
 */


import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');
import {FloatButton} from 'react-native-easy-floating-button';

export default class FloatingButtonWithoutMenu extends Component {

    static navigationOptions = {
        title: 'FloatingButtonWithoutMenu',
    };
    constructor(props){
        super(props);
        this.state={

        };

    }


    render() {


        return (

            <View style={{ flex : 1 }}>

                <FloatButton
                    withoutMenu={true}
                    buttonInitializeTop={height / 2}
                    buttonInitializeLeft={width - 60}
                    moveRange={{ width : width,height : height - 64 }}
                    // buttonImage={require('../resource/button.png')} // 用图片作为button
                    buttonView={  //自定义按钮view
                         <View style={{ width : 60, height : 60, backgroundColor : 'green', borderRadius: 30, justifyContent: 'center', alignItems : 'center' }}>
                              <View style={{ width : 30, height : 30, backgroundColor : 'yellow', borderRadius: 15 }}/>
                          </View>
                      }
                    // moveEnable={false} // 悬浮按钮是否可以移动
                    autoAdsorption={true} // 悬浮按钮是否自动吸附边缘
                    onClickButton={()=>{

                        alert('onClickButton')
                    }}
                    // 更多属性请查看GloablSupensionButtonView文件或github
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
