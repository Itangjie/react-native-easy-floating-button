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
    TouchableOpacity,
    PanResponder,
    Animated,
    ScrollView, Platform, PixelRatio
} from 'react-native';

import PropTypes from 'prop-types'
import MenuButton from './MenuButtonView';

export default class WindowView extends Component {

    static propTypes = {

        width : PropTypes.number,
        height : PropTypes.number,
        position : PropTypes.any,
        buttonSize : PropTypes.any,
        menus : PropTypes.array,
        numberOfRow : PropTypes.number,
        numberOfColumn : PropTypes.number,
        title : PropTypes.string,
        titleStyle : PropTypes.any,
        backgroundColor : PropTypes.string,
        menuBackgroundColor : PropTypes.string,

        buttonImageStyle : PropTypes.any,
        buttonTextStyle : PropTypes.any,

        clickAutoDismiss : PropTypes.bool,

        contentRange : PropTypes.any,
        deleteAnimate : PropTypes.bool,
    };

    static defaultProps = {

        width : 0,
        height : 0,
        position : {top : 0, left : 0},
        buttonSize : 0,
    };

    constructor(props){
        super(props);
        this.state={

            position : this.props.position,
            left : new Animated.Value(this.props.left),
            top : new Animated.Value(this.props.top),
            width : new Animated.Value(this.props.buttonSize),
            height : new Animated.Value(this.props.buttonSize),
            bgColorOp : new Animated.Value(0),
            currentPage : 0,
            isEdit : false,
        };

        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this)
    }

    componentWillMount(){

        this._panResponder = PanResponder.create({
            //开启点击手势响应
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            //开启点击手势响应是否劫持 true：不传递给子view false：传递给子view
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => false,
            //开启移动手势响应是否劫持 true：不传递给子view false：传递给子view
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderGrant: (evt, gestureState) => {

                let onMenu = this.isOnMenuView(evt.nativeEvent)
                if (onMenu === false){

                    if (this.state.isEdit === false){

                        this.endAnimate('close');
                        this.buttonEndAnimated();
                    }else {

                        if (this.props.deleteAnimate){

                            this.endButtonDeleteAnimate()
                        }
                        this.setState({isEdit : false})

                    }

                }
            },

        });

    }

    buttonEndAnimated(){

        let buttonNum = this.props.menus.length;
        for (let i = 0;i<buttonNum;i++){

            let ref = ('button' + i);
            this.refs[ref].endAnimate();
        }
    }

    isOnMenuView(nativeEvent){

        let pageX = nativeEvent.pageX;
        let locationX = nativeEvent.locationX;
        let pageY = nativeEvent.pageY;
        let locationY = nativeEvent.locationY;
        return !(pageX === locationX && pageY === locationY);
    }

    componentDidMount(){

        this.startAnimate()
    }

    startAnimate(){

        let left = (this.props.contentRange.width - this.props.width) / 2;
        let top = (this.props.contentRange.height - this.props.height) / 2;


        const animations = [
            Animated.timing(
                this.state.left,
                {
                    toValue:left ,duration: 250,
                },
            ),

            Animated.timing(
                this.state.top,
                {
                    toValue:top ,duration: 250,
                },
            ),

            Animated.timing(
                this.state.width,
                {
                    toValue:this.props.width ,duration: 250,
                },
            ),

            Animated.timing(
                this.state.height,
                {
                    toValue:this.props.height ,duration: 250,
                },
            ),

            Animated.timing(
                this.state.bgColorOp,
                {
                    toValue: 1,duration: 250,
                },
            )
        ]
        Animated.parallel(animations).start()

    }

    endAnimate(type){

        const animations = [
            Animated.timing(
                this.state.left,
                {
                    toValue:this.props.left ,duration: 250,
                },
            ),

            Animated.timing(
                this.state.top,
                {
                    toValue:this.props.top ,duration: 250,
                },
            ),

            Animated.timing(
                this.state.width,
                {
                    toValue:this.props.buttonSize ,duration: 250,
                },
            ),

            Animated.timing(
                this.state.height,
                {
                    toValue:this.props.buttonSize ,duration: 250,
                },
            ),

            Animated.timing(
                this.state.bgColorOp,
                {
                    toValue: 0,duration: 250,
                },
            )
        ]
        Animated.parallel(animations).start()

        setTimeout(()=>{

            this.props.onClose();
        },250)
    }

    startButtonDeleteAnimated(){

        let buttonNum = this.props.menus.length;
        for (let i = 0;i<buttonNum;i++){

            let ref = ('button' + i);
            if (!this.props.menus[i]['allowEdit'] && this.props.menus[i].allowEdit === false) {

            }else {
                this.refs[ref].deleteAnimate();

            }
        }
    }

    endButtonDeleteAnimate(){

        let buttonNum = this.props.menus.length;
        for (let i = 0;i<buttonNum;i++){

            let ref = ('button' + i);
            this.refs[ref].endDeleteAnimate();
        }
    }

    scaleFontSize(fontSize){

        if (Platform.OS === 'ios'){

            return fontSize;
        } else {

            return fontSize*(1.0/PixelRatio.getFontScale());
        }

    }

    componentWillUnmount() {


    }

    renderMenuItem(pageMenu,page,pageW,pageH){

        let menuW = (pageW - 30) / this.props.numberOfColumn;
        let menuH = (pageH) / this.props.numberOfRow;
        return pageMenu.map((item,key)=>{

            let index = page * this.props.numberOfColumn * this.props.numberOfRow + key;
            return(

                <MenuButton
                    key={key}
                    data={item}
                    width={menuW}
                    height={menuH}
                    ref={('button' + index)}
                    buttonImageStyle={this.props.buttonImageStyle}
                    buttonTextStyle={this.props.buttonTextStyle}
                    menuButtonDeleteImage={this.props.menuButtonDeleteImage}
                    isEdit={this.state.isEdit}
                    onClickButton={(data)=>{

                        this.props.onClickButton(index,data,this.state.isEdit)
                        if (this.props.clickAutoDismiss === true && this.state.isEdit === false){

                            this.endAnimate('close')
                            this.buttonEndAnimated();
                        }
                    }}
                    onLongPress={()=>{
                        if (this.props.deleteAnimate){
                            this.startButtonDeleteAnimated()
                        }
                        this.setState({isEdit : true})
                    }}
                />
            )
        })
    }

    renderPage(menus,pageOfNumber,page){

        let pageArr = [];
        for (let i = 0;i<page;i++){

            if (i !== page - 1){

                pageArr.push(menus.slice(i * pageOfNumber,i * pageOfNumber + pageOfNumber))
            } else {

                pageArr.push(menus.slice(i*pageOfNumber,menus.length))
            }
        }

        return pageArr.map((item,key)=>{

            return(

                <TouchableOpacity style={{width : this.props.width, height : this.props.height - 30, paddingHorizontal: 15, flexDirection : 'row', flexWrap:'wrap' }} key={key} activeOpacity={1.0}>
                    {this.renderMenuItem(item,key,this.props.width,this.props.height - 30)}
                </TouchableOpacity>
            )
        })

    }

    renderMenuView(){

        const {numberOfColumn,numberOfRow,menus,buttonSize,menuBackgroundColor} = this.props;

        let pageCount = numberOfColumn * numberOfRow;
        let page = 0;
        if (menus.length % pageCount === 0){

            page = menus.length / pageCount;
        } else {

            page = parseInt(menus.length / pageCount) + 1;
        }

        return(

            <Animated.View
                style={{
                    width : this.state.width, height : this.state.height, left : this.state.left, top : this.state.top,
                    backgroundColor : menuBackgroundColor, position : 'absolute', borderRadius : buttonSize / 2,
                    paddingVertical : 15
                }}>

                <ScrollView
                    style={{ flex : 1}}
                    contentContainerStyle={{  width : this.props.width * page }}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                >
                    {this.renderPage(menus,pageCount,page)}

                </ScrollView>

                {this.renderDotView(page)}
            </Animated.View>
        )
    }

    _onMomentumScrollEnd(e){

        let offsetX = e.nativeEvent.contentOffset.x;
        let page = Math.round(offsetX / (this.props.width));

        this.setState({currentPage:page})

    }

    renderDotItem(page){

        let dots = [];
        for (let i = 0;i<page;i++){
            dots.push(1)
        }
        return dots.map((item,key)=>{

            return (

                <View style={{ height : 6, width : 6, borderRadius : 3, backgroundColor : key === this.state.currentPage ? 'rgba(255,255,255,1.0)' : 'rgba(255,255,255,0.5)', marginHorizontal: 3 }} key={key}/>
            )
        })
    }

    renderDotView(page){

        return(
            <View style={{ width : this.props.width - 30, height : 15, position : 'absolute', bottom: 0, left : 15, flexDirection: 'row', justifyContent: 'center' }}>
                {this.renderDotItem(page)}
            </View>
        )
    }

    render() {
        return (
            <View style={{...StyleSheet.absoluteFillObject, width : this.props.contentRange.width,height : this.props.contentRange.height, backgroundColor : this.props.backgroundColor,position : 'absolute',top: 0, left: 0}}  {...this._panResponder.panHandlers}>
                {this.renderMenuView()}
                <Animated.Text style={[styles.titleStyle,this.props.titleStyle,{width : this.props.contentRange.width, top : (this.props.contentRange.height - this.props.height) / 2 - 50,left : 0,  opacity : this.state.bgColorOp, fontSize : this.scaleFontSize(25),}] }>
                    {this.props.title}
                </Animated.Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    titleStyle : {

        position : 'absolute',
        textAlign : 'center',
        color : '#333333'
    }
});
