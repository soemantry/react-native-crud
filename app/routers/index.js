import { SwitchNavigator } from 'react-navigation';
import { OnBoardingStack, HomeStack, LoginStack } from './stackNavigator';
import { Drawer } from './drawerNavigator';

export default SwitchNavigator(
  {
    OnBoarding: OnBoardingStack,
    Login: LoginStack,
    Home: HomeStack,
    App: Drawer
  },
  {
    initialRouteName: 'Login'
  }
);
