import {createAuthStack} from 'navigation';
import {createHomeStack} from 'navigation';
import React from 'react';
import {connect} from 'react-redux';

const Main = ({loggedIn}) => {
  if (loggedIn) {
    return createHomeStack();
  }

  return createAuthStack();
};

const mapStateToProps = (state) => {
  // console.log('State:');
  // console.log(state);
  return {
    loggedIn: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Main);
