/**
 * Created by tangjie on 2018/4/4.
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Dimensions
} from 'react-native';
import {GlobalFloatButton} from 'react-native-easy-floating-button';

const { width, height } = Dimensions.get('window');

const CLICK_ACTION_SHOW = 'show';
const CLICK_ACTION_DISMISS= 'dismiss';
const CLICK_ACTION_ADD = 'add';
const CLICK_ACTION_REMOVE= 'remove';
const CLICK_ACTION_REPLACE = 'replace';
const CLICK_ACTION_GET= 'get';
const CLICK_ACTION_FLOATBUTTON= 'floatbutton';
export default class HomeView extends Component {

    static navigationOptions = {
        title: 'HomeView',
    };
    constructor(props){
        super(props);
        this.state={

        };


    }

    componentDidMount(){

        GlobalFloatButton.onClickButton((index,data)=>{

            alert('click button : index->' + index + ' name->' + data.name )
        })

        GlobalFloatButton.onRemoveButton((index,data)=>{

            console.log('click button : index->' + index + ' name->' + data.name)
        })
    }

    onClick(action){

        switch (action){

            case CLICK_ACTION_SHOW: // 显示

                GlobalFloatButton.show();
                break;
            case CLICK_ACTION_DISMISS: // 消失
                GlobalFloatButton.dismiss();
                break;
            case CLICK_ACTION_ADD: // 添加一个button

                GlobalFloatButton.addMenuButton({name : 'new', image : require('../resource/kaohe.png'), action : ''},7);
                break;
            case CLICK_ACTION_REMOVE: // 移除一个button

                GlobalFloatButton.removeMenuButton(4);
                break;
            case CLICK_ACTION_REPLACE: // 替换所有button

                let menu = [
                    {name : 'notice', image : require('../resource/notice_v2.png'), action : 'ac://notice/view',},
                    {name : 'customer', image : require('../resource/customer_v2.png'), action : ''},
                    {name : 'attendance', image : require('../resource/kaoqing_v2.png'), action : ''},
                ]
                GlobalFloatButton.replaceMenuButton(menu)
                break;
            case CLICK_ACTION_GET: // 获取目前button

                let menus = GlobalFloatButton.getMenus();
                console.log(menus);
                break;
            case CLICK_ACTION_FLOATBUTTON: // FLOATBUTTON

                // 存在bug，正在修复
                // this.props.navigation.navigate('floatingButton')
                break;
        }
    }

    render() {
        return (

           <View style={{ flex : 1 }}>

               <TouchableOpacity style={{ height : 60, width:width, justifyContent : 'center', backgroundColor: 'white', marginTop : 10 }} onPress={()=>{this.onClick(CLICK_ACTION_SHOW)}}>
                   <Text style={{ color:'black', fontSize : 15,paddingLeft:15 }}>{'show'}</Text>
               </TouchableOpacity>

               <TouchableOpacity style={{ height : 60, width:width, justifyContent : 'center', backgroundColor: 'white', marginTop : 1 }} onPress={()=>{this.onClick(CLICK_ACTION_DISMISS)}}>
                   <Text style={{ color:'black', fontSize : 15,paddingLeft:15 }}>{'dismiss'}</Text>
               </TouchableOpacity>

               <TouchableOpacity style={{ height : 60, width:width, justifyContent : 'center', backgroundColor: 'white', marginTop : 1 }} onPress={()=>{this.onClick(CLICK_ACTION_ADD)}}>
                   <Text style={{ color:'black', fontSize : 15,paddingLeft:15 }}>{'addMenuButton'}</Text>
               </TouchableOpacity>

               <TouchableOpacity style={{ height : 60, width:width, justifyContent : 'center', backgroundColor: 'white', marginTop : 1 }} onPress={()=>{this.onClick(CLICK_ACTION_REMOVE)}}>
                   <Text style={{ color:'black', fontSize : 15,paddingLeft:15 }}>{'removeMenuButton'}</Text>
               </TouchableOpacity>

               <TouchableOpacity style={{ height : 60, width:width, justifyContent : 'center', backgroundColor: 'white' , marginTop : 1}} onPress={()=>{this.onClick(CLICK_ACTION_REPLACE)}}>
                   <Text style={{ color:'black', fontSize : 15,paddingLeft:15 }}>{'replaceMenuButton'}</Text>
               </TouchableOpacity>

               <TouchableOpacity style={{ height : 60, width:width, justifyContent : 'center', backgroundColor: 'white', marginTop : 1 }} onPress={()=>{this.onClick(CLICK_ACTION_GET)}}>
                   <Text style={{ color:'black', fontSize : 15,paddingLeft:15 }}>{'getMenus'}</Text>
               </TouchableOpacity>

               <TouchableOpacity style={{ height : 60, width:width, justifyContent : 'center', backgroundColor: 'white', marginTop : 10 }} onPress={()=>{this.onClick(CLICK_ACTION_FLOATBUTTON)}}>
                   <Text style={{ color:'black', fontSize : 15,paddingLeft:15 }}>{'FloatButton'}</Text>
               </TouchableOpacity>


           </View>
        );
    }
}

const styles = StyleSheet.create({

});
