import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import TextInput from 'components/common/TextInput';
import {useTheme, List, Button, HelperText} from 'react-native-paper';

import {globalStyles} from 'styles/index';

const Settings = () => {
  const route = useRoute();
  // console.log(route);

  // Hard code initial state for now
  const [firstName, changeFirstName] = useState("Dawid");
  const [lastName, changeLastName] = useState("Urbaniak");
  const [address, changeAddress] = useState("9999 Address Drive");
  const [city, changeCity] = useState('Carlsbad');
  const [state, changeState] = useState('CA');
  const [zip, changeZip] = useState('99999');
  const [phone, changePhone] = useState('858-555-6666');
  const [email, changeEmail] = useState('durbaniak@.com');

  const personalInfo = [{label: 'First Name', state: firstName, change: changeFirstName}, 
  {label: 'Last Name', state: lastName, change: changeLastName}, 
  {label: 'Address', state: address, change: changeAddress}, {label: 'City', state: city, change: changeCity}, 
  {label: 'State', state: state, change: changeState}, {label: 'Zip', state: zip, change: changeZip}]

  const contactInfo = [{label: 'Phone Number', state: phone, change: changePhone}, 
  {label: 'Email Address', state: email, change: changeEmail}];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.title}>Personal Info</Text>

      {personalInfo.map(field =>
        <TextInput
          label={field.label}
          value={field.state}
          onChangeText={text => field.change(text)}
          key={field.label}
        />
      )}

      <Text style={styles.title}>Contact Info</Text>

      {contactInfo.map(field =>
        <TextInput
          label={field.label}
          value={field.state}
          onChangeText={text => field.change(text)}
          key={field.label}
        />      
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    padding: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default Settings;
