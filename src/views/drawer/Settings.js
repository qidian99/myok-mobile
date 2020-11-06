import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import TextInput from 'components/common/TextInput';
import {useTheme, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeProfile} from 'sagas/actions';
import {globalStyles} from 'styles/index';

const Settings = ({update}) => {
  const route = useRoute();
  // console.log(route);

  // Hard code initial state for now
  const [firstName, changeFirstName] = useState("Dawid");
  const [lastName, changeLastName] = useState("Urbaniak");
  const [address, changeAddress] = useState("9999 Address Drive");
  const [city, changeCity] = useState('Carlsbad');
  const [state, changeState] = useState('CA');
  const [zip, changeZip] = useState('99999');
  const [phone, changePhone] = useState('012-345-6789');
  const [email, changeEmail] = useState('durbaniak@.com');

  const personalInfo = [{label: 'First Name', state: firstName, change: changeFirstName}, 
  {label: 'Last Name', state: lastName, change: changeLastName}, 
  {label: 'Address', state: address, change: changeAddress}, {label: 'City', state: city, change: changeCity}, 
  {label: 'State', state: state, change: changeState}, {label: 'Zip', state: zip, change: changeZip}]

  const contactInfo = [{label: 'Phone Number', state: phone, change: changePhone}, 
  {label: 'Email Address', state: email, change: changeEmail}];

  const [buttonEnable, enable] = useState(false);

  const onSubmit = () => {
    const profile = {personalInfo: personalInfo, contactInfo: contactInfo};
    update(profile);
    enable(false);
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Edit Profile</Text> */}

      <Text style={styles.title}>Personal Info</Text>

      {personalInfo.map(field =>
        <TextInput style={styles.field}
          label={field.label}
          value={field.state}
          onChangeText={text => {field.change(text); enable(true)}}
          key={field.label}
        />
      )}

      <Text style={styles.title}>Contact Info</Text>

      {contactInfo.map(field =>
        <TextInput style={styles.field}
          label={field.label}
          value={field.state}
          onChangeText={text => {field.change(text); enable(true)}}
          key={field.label}
        />      
      )}

      <Button mode="contained" onPress={onSubmit} disabled={buttonEnable ? false : true} style={styles.button}> 
        Save Changes 
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    paddingRight: 16,
    paddingLeft: 16,
  },
  title: {
    fontSize: 24,
    margin: 8,
  },
  field: {
    height: 52,
  },
  button: {
    marginTop: 24,
  }
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      update: changeProfile,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Settings);
