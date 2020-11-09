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
import Login from '../views/auth/Auth';
import Dashboard from 'views/home/dashboard';
import Documents from 'views/home/documents';
import Profile from 'views/home/profile';
import {Appbar, Avatar, useTheme} from 'react-native-paper';
import {DrawerContent} from './drawer';
import {createTestStack} from './test';
import Children from 'views/children/children';
import Announcements from 'views/announcements/announcements';

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
            // alignItems: 'flex-start',
            alignItems: 'center',
            paddingBottom: 0,
            paddingHorizontal: 0,
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

export const createAuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'ISAFE Direct My Ok',
      }}
    />
  </Stack.Navigator>
);

export {createTestStack};
