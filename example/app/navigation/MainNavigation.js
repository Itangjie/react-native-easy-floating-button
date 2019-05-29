/**
 * Created by tangjie on 2018/4/4.
 */

import {StackNavigator} from  'react-navigation';
import HomeView from '../screen/HomeView';
import FloatingButton from '../screen/FloatingbuttonTestView';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
const Navigation = StackNavigator({

    homeView : {screen: HomeView},
    floatingButton : {screen : FloatingButton},
},{
    initialRouteName : 'homeView',
    navigationOptions: {
        cardStack: {
            gesturesEnabled: true
        },
    },
    headerMode : 'screen',
    mode:'card',
    transitionConfig: () => ({
        screenInterpolator: (sceneProps) => {
            return CardStackStyleInterpolator.forHorizontal(sceneProps)
        },
    }),
});

export default Navigation;