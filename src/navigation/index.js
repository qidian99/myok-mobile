import React from 'react';
import Feed from '../feed';
import Detail from '../detail';

import Contacts from '../views/drawer/Contacts';
import Favorites from '../views/drawer/Favorites';
import Settings from '../views/drawer/Settings';

import Tab1 from '../views/tabs/Tab1';
import Tab2 from '../views/tabs/Tab2';
import Tab3 from '../views/tabs/Tab3';

import {DrawerActions} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../views/auth/Auth';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

export const linking = {
  prefixes: ['recipes://'],
  config: {
    screens: {
      Feed: 'feed/:title',
      Detail: 'detail/:foodName',
      BottomTabs: {
        path: 'bottom_tabs',
        screens: {
          Tab1: {
            path: 'bTab1',
            exact: true,
          },
          Tab2: {
            path: 'bTab2',
            exact: true,
          },
          Tab3: {
            path: 'bTab3',
            exact: true,
          },
        },
      },
      TopTabs: {
        path: 'top_tabs',
        screens: {
          Tab1: {
            path: 'tTab1',
            exact: true,
          },
          Tab2: {
            path: 'tTab2',
            exact: true,
          },
          Tab3: {
            path: 'tTab3',
            exact: true,
          },
        },
      },
      Favorites: 'favorites/:user/:id',
      Contacts: 'contacts/:user?',
      Settings: {
        path: 'settings/:color/:age/:isVerified',
        parse: {
          age: Number,
          isVerified: Boolean,
          color: (color) => `color-${color}`,
        },
      },
    },
  },
};

export const createHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Feed"
      children={createDrawer}
      options={({navigation}) => ({
        title: 'React Navigation',
        headerLeft: () => (
          <Icon
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={[{color: 'white', marginLeft: 8}]}
            size={24}
            name={'menu'}
          />
        ),
      })}
    />
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={{
        title: 'Detail Screen',
      }}
    />
    <Stack.Screen name="BottomTabs" component={BottomTabs} />
    <Stack.Screen name="TopTabs" children={createTopTabs} />
  </Stack.Navigator>
);

const createDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Feed" component={Feed} />
    <Drawer.Screen name="Contacts" component={Contacts} />
    <Drawer.Screen name="Favorites" component={Favorites} />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
);

const createTopTabs = (props) => {
  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen
        name="Tab1"
        component={Tab1}
        options={{title: props.route.params.name}}
      />
      <MaterialTopTabs.Screen name="Tab2" component={Tab2} />
      <MaterialTopTabs.Screen name="Tab3" component={Tab3} />
    </MaterialTopTabs.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <MaterialBottomTabs.Navigator>
      <MaterialBottomTabs.Screen
        name="Tab1"
        style={{marginBottom: 16}}
        component={Tab1}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon style={[{color: 'white'}]} size={25} name={'home'} />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="Tab2"
        component={Tab2}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Icon style={[{color: 'white'}]} size={25} name={'human'} />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="Tab3"
        component={Tab3}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => (
            <Icon style={[{color: 'white'}]} size={25} name={'map'} />
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  );
};

export const createAuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
        title: 'ISAFE Direct My Ok',
      }}
    />
  </Stack.Navigator>
);
