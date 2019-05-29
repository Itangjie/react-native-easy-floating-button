/**
 * Created by tangjie on 2019/5/25.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
    PanResponder,
    Animated
} from 'react-native';

import WindowView from './WindowView';
import PropTypes from 'prop-types'
const { width, height } = Dimensions.get('window');
export default class SuspensionButtonView extends Component {

    static propTypes = {

        buttonInitializeLeft : PropTypes.number,
        buttonInitializeTop : PropTypes.number,
        buttonSize : PropTypes.number,
        borderRadius : PropTypes.number,
        buttonImage : PropTypes.any,
        buttonView : PropTypes.any,
        moveRange : PropTypes.any,

        menus : PropTypes.array,
        numberOfRow : PropTypes.number,
        numberOfColumn : PropTypes.number,

        title : PropTypes.string,
        titleStyle : PropTypes.any,

        backgroundColor : PropTypes.string,

        menuWidth : PropTypes.number,
        menuHeight : PropTypes.number,
        menuBackgroundColor : PropTypes.string,
        menuButtonImageStyle : PropTypes.any,
        menuButtonTextStyle : PropTypes.any,
        menuButtonDeleteImage : PropTypes.any,

        onClickButton : PropTypes.func,
        onRemoveButton : PropTypes.func,

        clickAutoDismiss : PropTypes.bool,

        moveEnable : PropTypes.bool,
        autoAdsorption : PropTypes.bool,

        deleteAnimate : PropTypes.bool,
    };

    static defaultProps = {

        buttonInitializeLeft : 0,
        buttonInitializeTop : 0,
        buttonSize : 60,
        buttonImage : null,
        buttonView : null,
        borderRadius : 0,
        moveRange : {width : width,height : height},

        menus : [],
        numberOfRow : 3,
        numberOfColumn : 3,

        title : '',
        backgroundColor : 'rgba(0,0,0,0)',

        menuWidth : width - 60,
        menuHeight : width - 60,
        menuBackgroundColor : 'rgba(0,0,0,0.9)',

        clickAutoDismiss : true,
        moveEnable : true,
        autoAdsorption : true,

        menuButtonDeleteImage : null,

        deleteAnimate : true,

    };

    constructor(props){
        super(props);
        this.state={

            showWindow : false,
            left : this.props.buttonInitializeLeft,
            top : this.props.buttonInitializeTop,
            buttonSize : new Animated.Value(this.props.buttonSize),
            menus : this.props.menus,
            opacity : 0.7,
        };
        this.isMove = false;

    }

    componentWillMount(){

        this._panResponder = PanResponder.create({
            //开启点击手势响应
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            //开启点击手势响应是否劫持 true：不传递给子view false：传递给子view
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            //开启移动手势响应
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            //开启移动手势响应是否劫持 true：不传递给子view false：传递给子view
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            //手指触碰屏幕那一刻触发 成为激活状态。
            onPanResponderGrant: (evt, gestureState) => {

                this.touchX = this.state.left;
                this.touchY = this.state.top;
                this.timer && clearTimeout(this.timer)
                this.setState({opacity : 1})
            },
            // 表示手指按下时，成功申请为事件响应者的回调。
            onPanResponderStart: (evt, gestureState) => {
                // 表示申请成功，你成为了事件的响应者，这个时候开始，组件就进入了激活状态。
            },
            //手指在屏幕上移动触发
            onPanResponderMove: (evt, gestureState) => {

                if (this.props.moveEnable === false) return;

                let radius = this.props.buttonSize;
                let left = this.touchX + gestureState.dx;
                let top = this.touchY + gestureState.dy;

                if (parseInt(top) !== parseInt(this.state.top) || parseInt(left) !== parseInt(this.state.left)){

                    this.isMove = true;
                }

                if(left >= (this.props.moveRange.width - radius)) {
                    left = (this.props.moveRange.width - radius);
                }
                if(left <= 0) {
                    left = 0
                }
                if(top <= 0) {
                    top = 0;
                }
                if(top >= this.props.moveRange.height - radius) {
                    top = this.props.moveRange.height - radius
                }

                this.setState({top : top, left : left})
            },

            //当有其他不同手势出现，响应是否中止当前的手势
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            //手指离开屏幕触发
            onPanResponderRelease: (evt, gestureState) => {

                if (this.isMove === false){
                    this.setState({showWindow : true})
                }else {

                    if (this.props.autoAdsorption === true){

                        let left = this.touchX + gestureState.dx;
                        let top = this.touchY + gestureState.dy;


                        if (left !== 0 && left !== this.props.moveRange.width-this.props.buttonSize && top !== 0 && top !== this.props.moveRange.height-this.props.buttonSize){


                            let bottom = this.props.moveRange.height - top - this.props.buttonSize;
                            let right = this.props.moveRange.width - left - this.props.buttonSize;

                            let deArr = [
                                {top : top},{bottom : bottom},{left : left},{right : right}
                            ];

                            let result = deArr[0];

                            for (let i=1;i<deArr.length;i++){

                                if (this.getObjectValue(deArr[i]) < this.getObjectValue(result)){

                                    result = deArr[i];
                                }
                            }

                            if (result['top']){

                                this.setState({top  : 0})

                            }else if (result['bottom']){

                                this.setState({top  : this.props.moveRange.height - this.props.buttonSize})
                            }else if (result['left']){

                                this.setState({left  : 0})

                            }else {
                                this.setState({left  : this.props.moveRange.width-this.props.buttonSize})
                            }

                            this.timer = setTimeout(()=>{
                                this.setState({opacity : 0.7})
                            },5000)
                        }
                    }

                }
                this.isMove = false;

            },

            onShouldBlockNativeResponder: (evt, gestureState) => {

                return false;
            },
        });

    }


    getObjectValue(obj){

        let keyword = '';
        for(let key in obj){

            keyword = key;
        }

        return obj[keyword];
    }

    show(){

        this.setState({show : true})
    }

    dismiss(){

        this.setState({show : false})
    }


    addMenuButton(button,index){

        let menus = this.state.menus;
        if (index === -1){
            menus.push(button);
        }else {

            menus.splice(index,0,button);
        }

        this.setState({menus : menus})
    }

    replaceMenuButton(buttonArr){

        this.setState({menus : buttonArr})
    }

    getMenus(){

        return this.state.menus;
    }

    showWindow(){

        this.setState({showWindow : true})
    }

    componentDidMount(){

    }

    componentWillUnmount() {

        this.timer && clearTimeout(this.timer)
    }

    removeMenuButton(index){

        let menus = this.state.menus;

        menus.splice(index,1);
        this.setState({menus : menus})
    }

    renderButtonView(){

        const {buttonImage,buttonSize,buttonView} = this.props;

        let viewStyle = {width : this.state.buttonSize, height : this.state.buttonSize, backgroundColor : 'transparent', position :'absolute', top : this.state.top,left : this.state.left,opacity : this.state.opacity};
        if (buttonImage !== null){

            viewStyle = {width : this.state.buttonSize, height : this.state.buttonSize,position :'absolute', top : this.state.top,left : this.state.left}
        }

        let show = this.state.show;
        return(
            show === false ? null :
            <Animated.View
                {...this._panResponder.panHandlers}
                style={viewStyle}
            >
                {buttonImage !== null ? <Image style={{ width : buttonSize,height:buttonSize }} source={buttonImage} /> : (buttonView !== null ? buttonView : <View style={{ width : buttonSize, height : buttonSize, borderRadius : buttonSize / 2,backgroundColor : 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems:'center' }}>
                    <View style={{ width : buttonSize / 2, height : buttonSize / 2, borderRadius : buttonSize / 4, backgroundColor : 'rgba(255,255,255,1.0)' }}/>
                </View>)}

            </Animated.View>
        )
    }

    buttonAnimate(){

        Animated.timing(
            this.state.buttonSize,
            {
                toValue:this.props.buttonSize ,duration: 250,
            },
        ).start()
    }

    renderWindowView(){

        return(
            <WindowView
                title={this.props.title}
                titleStyle={this.props.titleStyle}
                backgroundColor={this.props.backgroundColor}
                menuBackgroundColor={this.props.menuBackgroundColor}
                buttonTextStyle={this.props.menuButtonTextStyle}
                buttonImageStyle={this.props.menuButtonImageStyle}
                width={this.props.menuWidth}
                height={this.props.menuHeight}
                contentRange={this.props.moveRange}
                left={this.state.left}
                top={this.state.top}
                buttonSize={this.props.buttonSize}
                menus={this.props.menus}
                numberOfRow={this.props.numberOfRow}
                numberOfColumn={this.props.numberOfColumn}
                onClose={()=>{
                    this.setState({showWindow : false})
                    this.timer = setTimeout(()=>{
                        this.setState({opacity : 0.7})
                    },5000)
                }}
                onClickButton={(index,data,isEdit)=>{

                    if (isEdit === true){

                        this.removeMenuButton(index);

                        if (this.props.onRemoveButton !== undefined && this.props.onRemoveButton !== null){

                            this.props.onRemoveButton(index,data);
                        }
                    }else {

                        if (this.props.onClickButton !== undefined && this.props.onClickButton !== null){
                            this.props.onClickButton(index,data);

                        }
                    }
                }}
                clickAutoDismiss={this.props.clickAutoDismiss}
                menuButtonDeleteImage={this.props.menuButtonDeleteImage}
                deleteAnimate={this.props.deleteAnimate}
            />
        )
    }

    render() {
        return (

            this.state.showWindow === false ? this.renderButtonView() : this.renderWindowView()
        );
    }
}

const styles = StyleSheet.create({


});
