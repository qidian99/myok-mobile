import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import TextInput from 'components/common/TextInput';
import {Button} from 'react-native-paper';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeProfile} from 'sagas/actions';
import {globalStyles} from 'styles/index';
import EStyleSheet from 'react-native-extended-stylesheet';

const Profile = ({update}) => {
  const route = useRoute();
  // console.log(route);

  const user = useSelector(state => state.auth.user);

  const [firstName, changeFirstName] = useState(user.first_name);
  const [lastName, changeLastName] = useState(user.last_name);
  const [address, changeAddress] = useState('9999 Address Drive');
  const [city, changeCity] = useState('Carlsbad');
  const [state, changeState] = useState('CA');
  const [zip, changeZip] = useState('99999');
  const [phone, changePhone] = useState('012-345-6789');
  const [email, changeEmail] = useState(user.email);

  const [buttonEnable, toggleButtonEnable] = useState(false);

  const onSubmit = () => {
    const profile = {
      firstName: firstName, 
      lastName: lastName, 
      address: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      email: email
    };
    update(profile);
    toggleButtonEnable(false);
  };

  return (
    <ScrollView> 
      <View style={styles.container}>
        <Text style={styles.title}>Personal Info</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.field}
          value={firstName}
          onChangeText={(text) => {
            changeFirstName(text);
            toggleButtonEnable(true);
          }}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.field}
          value={lastName}
          onChangeText={(text) => {
            changeLastName(text);
            toggleButtonEnable(true);
          }}
        />

        <Text style={styles.label}>Street Address</Text>
        <TextInput
          style={styles.field}
          value={address}
          onChangeText={(text) => {
            changeAddress(text);
            toggleButtonEnable(true);
          }}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.field}
          value={city}
          onChangeText={(text) => {
            changeCity(text);
            toggleButtonEnable(true);
          }}
        />


        <View style={styles.locationFieldRow}>
          <View style={styles.locationFieldContainer}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.field}
              value={state}
              onChangeText={(text) => {
                changeState(text);
                toggleButtonEnable(true);
              }}
            />
          </View>

          <View style={styles.locationFieldContainer}>
            <Text style={styles.label}>Zip Code</Text>
            <TextInput
              style={styles.field}
              value={zip}
              onChangeText={(text) => {
                changeZip(text);
                toggleButtonEnable(true);
              }}
            />
          </View>
        </View>

        <Text style={styles.title}>Contact Info</Text>

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.field}
          value={phone}
          onChangeText={(text) => {
            changePhone(text);
            toggleButtonEnable(true);
          }}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.field}
          value={email}
          onChangeText={(text) => {
            changeEmail(text);
            toggleButtonEnable(true);
          }}
        />
        
        <Button
          style={styles.button}
          mode="contained"
          onPress={onSubmit}
          disabled={buttonEnable ? false : true}
          color={buttonEnable ? '#2374A5' : '#707070'}
          labelStyle={{fontSize: 16}}>
          Save Changes
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  button: {
    borderRadius: 5,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 24,
    borderRadius: 5,
    padding: 12,
  },
  field: {
    height: 40,
    marginBottom: 16,
    backgroundColor: 'rgba(17, 78, 117, 0.1)',
    borderRadius: 4,
    fontSize: '1rem',
  },
  locationFieldContainer: {
    width: '48%',
  },
  locationFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#195174',
    marginBottom: 3,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#195174',
    marginBottom: 10,
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      update: changeProfile,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Profile);
