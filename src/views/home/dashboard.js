import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {globalStyles} from 'styles/index';

const Dashboard = () => {
  const {colors} = useTheme();
  return (
    <View style={globalStyles.center}>
      <Text style={[globalStyles.title, {color: colors.accent}]}>
        Dashboard
      </Text>
    </View>
  );
};

export default Dashboard;
