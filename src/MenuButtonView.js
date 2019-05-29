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
    ScrollView,
    InteractionManager,
    Easing, Platform, PixelRatio
} from 'react-native';

import PropTypes from 'prop-types'
const { width, height } = Dimensions.get('window');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
export default class MenuButtonView extends Component {

    static propTypes = {

        width : PropTypes.number,
        height : PropTypes.number,
        buttonImageStyle : PropTypes.any,
        buttonTextStyle : PropTypes.any,
        data : PropTypes.any,
        menuButtonDeleteImage : PropTypes.any,

    };

    static defaultProps = {

        width : 0,
        height : 0,
        buttonView : null,
    };

    constructor(props){
        super(props);
        this.state={

            opacity : new Animated.Value(0),
        };
        this.animatedValue = new Animated.Value(0);

        this.stop = false;
    }

    componentWillMount(){

    }

    componentDidMount(){

        // setTimeout(()=>{
        //     this.startAnimate()
        //
        // },200)
        InteractionManager.runAfterInteractions(()=>{
            this.startAnimate()
        })
    }

    startAnimate(){

        Animated.timing(
            this.state.opacity,
            {
                toValue:1 ,duration: 250,
            },
        ).start()

    }

    endAnimate(){


        Animated.timing(
            this.state.opacity,
            {
                toValue:0 ,duration: 100,
            },
        ).start()
    }

    componentWillUnmount() {

        this.endDeleteAnimate()
    }

    deleteAnimate () {

        if (this.stop === true){
            this.animatedValue.setValue(1)
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.linear
                }
            ).stop()
            this.stop = false;
        }else {

            this.animatedValue.setValue(0)
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.linear
                }
            ).start(()=>this.deleteAnimate())
        }

    }

    endDeleteAnimate(){

        this.stop = true;
    }

    scaleFontSize(fontSize){

        if (Platform.OS === 'ios'){

            return fontSize;
        } else {

            return fontSize*(1.0/PixelRatio.getFontScale());
        }

    }

    render() {

        const {width,height,buttonImageStyle,buttonTextStyle,data,menuButtonDeleteImage} = this.props;

        let imageSize = width < height ? width : height;
        let imageStyle = { width : imageSize / 2, height : imageSize / 2};
        let textStyle = { color : 'white', fontSize : this.scaleFontSize(13), marginTop : 5 };

        let image = data.image;
        let text = data.name;
        let deleteImage = menuButtonDeleteImage !== null ? menuButtonDeleteImage : <Image style={{ width : 30, height : 30, position : 'absolute', right : 5, top : 0 }} source={require('./assets/delete.png')}/>;
        const rotateZ = this.animatedValue.interpolate({
            inputRange: [0, 0.3, 0.8,1],
            outputRange: ['0deg',  '-5deg','3deg', '0deg']
        })

        let allowEdit = true;
        if (data['allowEdit'] !== undefined && data['allowEdit'] == false){

            allowEdit = false;
            deleteImage = null;
        }

        return (

            <Animated.View style={{ opacity:this.state.opacity,transform: allowEdit === false ? [] : [
                {rotateZ:rotateZ},
            ], }}>
                <TouchableOpacity style={{ width : width, height : height, justifyContent : 'center', alignItems : 'center'}} onPress={()=>{

                    if (this.props.isEdit===false || allowEdit === true) {

                        this.props.onClickButton(data)

                    }

                }} onLongPress={this.props.onLongPress}>
                    {image === null || image === '' ? null : <Image style={[imageStyle,buttonImageStyle]} source={typeof(image) === 'string' && image.indexOf('http') !== -1 ? {uri : image} : image }/>}
                    {text === null || text === '' ? null : <Text style={[textStyle,buttonTextStyle]}>{text}</Text>}
                    {this.props.isEdit ? deleteImage : null}
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({


});
