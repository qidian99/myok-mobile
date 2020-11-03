import {AccordionList, Accordion} from 'components/base';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {useTheme, List, Button, HelperText} from 'react-native-paper';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginChild, loginParent} from 'sagas/actions';
import TextInput from 'components/common/TextInput';

const ChildLoginForm = ({login}) => {
  const [date, setDate] = useState(new Date());
  const [mode] = useState('date');
  const [parentCode, setParentCode] = useState('');
  const {colors} = useTheme();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onPress = useCallback(() => {
    if (parentCode.length === 0) {
      setParentCodeError(true);
      return;
    }
    login(parentCode, date);
  }, [date, parentCode, login]);

  const [parentCodeError, setParentCodeError] = useState(false);

  const onParentCodeChange = useCallback(
    (text) => {
      setParentCodeError(false);
      setParentCode(text);
    },
    [setParentCode, setParentCodeError],
  );

  const errorStyle = {display: parentCodeError ? 'flex' : 'none'};
  return (
    <View style={styles.container}>
      <TextInput
        label="Parent Code"
        value={parentCode}
        onChangeText={onParentCodeChange}
      />
      <HelperText
        type="error"
        visible={parentCodeError}
        //  style={errorStyle}
      >
        Parent Code is invalid!
      </HelperText>
      <HelperText theme={{colors: {text: colors.primary}}} type="info" visible>
        Date of Birth
      </HelperText>
      <DateTimePicker
        style={globalStyles.datepicker}
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
      <Button mode="contained" onPress={onPress}>
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
      login: loginChild,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(ChildLoginForm);
