import {AccordionList, Accordion} from 'components/base';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {useTheme, List, Button} from 'react-native-paper';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAction} from 'sagas/actions';
import TextInput from 'components/common/TextInput';

const ChildLoginForm = ({login}) => {
  const [date, setDate] = useState(new Date());
  const [mode] = useState('date');
  const [parentCode, setParentCode] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <TextInput
        label="Parent Code"
        value={parentCode}
        onChangeText={(text) => setParentCode(text)}
      />
      <DateTimePicker
        style={globalStyles.datepicker}
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
      <Button mode="contained" onPress={() => login('a', 'b')}>
        Log in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    padding: 16,
  },
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: loginAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(ChildLoginForm);
