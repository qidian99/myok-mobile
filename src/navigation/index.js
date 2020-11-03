import React from 'react';
import Feed from '../feed';
import Detail from '../detail';
import {SafeAreaView, TouchableOpacity} from 'react-native';
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

// This is used for testing, feel free to play with it
export const createTestStack = () => (
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
  const theme = useTheme();
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  return (
    <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
      {previous ? (
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
      )}
      <Appbar.Content
        title={previous ? title : <Icon name="twitter" size={40} />}
      />
    </Appbar.Header>
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
  <MaterialBottomTabs.Navigator>
    <MaterialBottomTabs.Screen
      name="Home"
      style={{marginBottom: 16}}
      component={DashboardTopTabs}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: () => (
          <Icon style={[{color: 'white'}]} size={25} name={'home'} />
        ),
      }}
    />
    <MaterialBottomTabs.Screen
      name="My Children"
      component={Tab3}
      options={{
        tabBarLabel: 'My Children',
        tabBarIcon: () => (
          <Icon
            style={[{color: 'white'}]}
            size={25}
            name={'human-male-child'}
          />
        ),
      }}
    />
  </MaterialBottomTabs.Navigator>
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
      options={{headerTitle: 'ISAFE Direct My Ok'}}
    />
  </Stack.Navigator>
);

export const HomeNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
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
