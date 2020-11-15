import React from 'react';
import Feed from '../feed';
import Detail from '../detail';
import {
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import Contacts from '../views/drawer/Contacts';
import Favorites from '../views/drawer/Favorites';
import Settings from '../views/drawer/Settings';

import Tab1 from '../views/tabs/Tab1';
import Tab2 from '../views/tabs/Tab2';
import Tab3 from '../views/tabs/Tab3';

import {
  DrawerActions,
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Auth from '../views/auth/Auth';
import Login from '../views/auth/login';
import Register from '../views/auth/register';
import EmailLogin from '../views/auth/login/EmailLogin';
import ParentCodeLogin from '../views/auth/login/ParentCodeLogin';
import GuardianRegister from '../views/auth/register/GuardianRegister';
import EmployeeRegister from '../views/auth/register/EmployeeRegister';
import Dashboard from 'views/home/dashboard';
import Documents from 'views/home/documents';
import Profile from 'views/profile/profile';
import {Appbar, Avatar, Button, useTheme} from 'react-native-paper';
import {DrawerContent} from './drawer';
import {createTestStack} from './test';
import Children from 'views/children/children';
import Announcements from 'views/announcements/announcements';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {globalStyles} from 'styles';
import StackScreen, {HeaderBackImage} from './StackScreen';

const HEADER_BACKGROUND = require('assets/image/father_children.png');
const APP_BACKGROUND = require('assets/image/isafe_background.jpeg');

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

// TODO: the below approach is used in react-navigation 4.x but not in 5.x
// const SafeAreaMaterialTopTabBar = ({...props}) => (
//   <SafeAreaView>
//     <MaterialTopTabBar {...props} />
//   </SafeAreaView>
// );

// const options = {
//   tabBarComponent: (props) => <SafeAreaMaterialTopTabBar {...props} />,
// };

// const HomeTopTabs = createMaterialTopTabNavigator(
//   {
//     dashboard: {
//       screen: Dashboard,
//       navigationOptions: {
//         title: 'Dashboard',
//       },
//     },
//   },
//   options,
// );

const Header = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;
  // console.log({options});
  const theme = useTheme();
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  return (
    <ImageBackground
      source={HEADER_BACKGROUND}
      style={{
        width: '100%',
        height: 140, // TODO: make it dynamic, in particular for iPhone X and above
      }}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
      />
      <Appbar.Header
        style={{
          backgroundColor: 'transparent',
          // borderWidth: 1,
          // borderColor: 'red',
        }}>
        {/* {previous ? (
          <Appbar.BackAction
            onPress={navigation.pop}
            color={theme.colors.primary}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Avatar.Image
              size={40}
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
              }}
            />
          </TouchableOpacity>
        )} */}
        <Appbar.Content
          title={title}
          titleStyle={{
            fontWeight: '600',
            fontSize: 22,
            color: 'white',
            textShadowColor: 'rgba(0, 0, 0, 0.4)',
            textShadowOffset: {width: 0, height: 2},
            textShadowRadius: 4,
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            // alignItems: 'center',
            paddingBottom: 0,
            paddingHorizontal: 0,
            marginLeft: -32,
            // borderWidth: 1,
          }}
        />
      </Appbar.Header>
    </ImageBackground>
  );
};

const DashboardTopTabs = (props) => {
  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen name="Dashboard" component={Dashboard} />
      <MaterialTopTabs.Screen name="My Documents" component={Documents} />
      <MaterialTopTabs.Screen name="My Profile" component={Profile} />
    </MaterialTopTabs.Navigator>
  );
};

const HomeBottomTabs = (props) => (
  <ImageBackground
    source={APP_BACKGROUND}
    style={{width: '100%', height: '100%'}}>
    <MaterialBottomTabs.Navigator>
      <MaterialBottomTabs.Screen
        name="Home"
        style={{marginBottom: 16}}
        component={Dashboard}
        options={{
          headerTitle: 'Test',
          // headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon style={[{color: 'white'}]} size={25} name={'home'} />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="Documents"
        component={Documents}
        options={{
          // headerShown: false,
          tabBarLabel: 'Documents',
          tabBarIcon: () => (
            <Icon style={[{color: 'white'}]} size={25} name={'file-document'} />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="Announcements"
        component={Announcements}
        options={{
          // headerShown: false,
          tabBarLabel: 'Announcements',
          tabBarIcon: () => (
            <Icon style={[{color: 'white'}]} size={25} name={'email'} />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          // headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Icon style={[{color: 'white'}]} size={25} name={'account'} />
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  </ImageBackground>
);

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Dashboard"
    headerMode="screen"
    screenOptions={{
      header: ({scene, previous, navigation}) => (
        <Header scene={scene} previous={previous} navigation={navigation} />
      ),
    }}>
    <Stack.Screen
      name="Dashboard"
      component={HomeBottomTabs}
      options={({route}) => ({
        headerTitle: getHeaderTitle(route),
      })}
    />
  </Stack.Navigator>
);

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  console.log({routeName});
  switch (routeName) {
    case 'Home':
      return 'Dashboard';
    case 'Documents':
      return 'My Documents';
    case 'Announcements':
      return 'Announcements';
    case 'Profile':
      return 'Profile';
    default:
      return routeName;
  }
}

export const HomeNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

/*

The interpolator will be called for each screen. For example, say you have a 2 screens in the stack, A & B. B is the new screen coming into focus and A is the previous screen. The interpolator will be called for each screen:

The interpolator is called for B: Here, the current.progress value represents the progress of the transition, which will start at 0 and end at 1. There won't be a next.progress since B is the last screen.
The interpolator is called for A: Here, the current.progress will stay at the value of 1 and won't
change, since the current transition is running for B, not A. The next.progress value represents the
progress of B and will start at 0 and end at 1.


*/

export const createAuthStack = () => (
  <ImageBackground
    source={APP_BACKGROUND}
    style={{width: '100%', height: '100%'}}>
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        cardStyle: {backgroundColor: 'transparent'},
        cardStyleInterpolator: ({
          current,
          next,
          inverted,
          layouts: {screen},
        }) => {
          const progress = Animated.add(
            current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                })
              : 0,
          );
          return {
            cardStyle: {
              transform: [
                {
                  translateX: Animated.multiply(
                    progress.interpolate({
                      inputRange: [0, 1, 2],
                      outputRange: [
                        screen.width, // Focused, but offscreen in the beginning
                        0, // Fully focused
                        screen.width * -1, // Fully unfocused
                      ],
                      extrapolate: 'clamp',
                    }),
                    inverted,
                  ),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{
          title: 'ISAFE Direct My Ok',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerBackImage: HeaderBackImage,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerBackImage: HeaderBackImage,
        }}
      />
      <Stack.Screen
        name="EmailLogin"
        component={EmailLogin}
        options={{
          title: 'Email Login',
          headerBackImage: HeaderBackImage,
        }}
      />
      <Stack.Screen
        name="ParentCodeLogin"
        component={ParentCodeLogin}
        options={{
          title: 'Parent Code Login',
          headerBackImage: HeaderBackImage,
        }}
      />
      <Stack.Screen
        name="GuardianRegister"
        component={GuardianRegister}
        options={{
          title: 'Register Guardian',
          headerBackImage: HeaderBackImage,
        }}
      />
      <Stack.Screen
        name="EmployeeRegister"
        component={EmployeeRegister}
        options={{
          title: 'Register Employee',
          headerBackImage: HeaderBackImage,
        }}
      />
    </Stack.Navigator>
  </ImageBackground>
);

export {createTestStack};
