import {
  createAuthStack,
  createTestStack,
  HomeNavigator,
  HomeStack,
} from 'navigation/index';
import React from 'react';
import {connect} from 'react-redux';

const Main = ({loggedIn}) => {
  if (loggedIn) {
    return <HomeNavigator />;
    // return HomeStack();
    // return createTestStack();
  }
  return <HomeNavigator />;
  // return createAuthStack();
};

const mapStateToProps = (state) => {
  // console.log('State:');
  // console.log(state);
  return {
    loggedIn: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Main);
