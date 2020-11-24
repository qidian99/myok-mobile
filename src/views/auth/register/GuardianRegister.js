import React, {useState, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import DropDownPicker from 'react-native-dropdown-picker';
import DOBInput from 'components/auth/DOBInput';
import {STATES} from 'util/constant';
import {globalStyles} from 'styles/index';
import AuthHeader from 'components/auth/AuthHeader';
import AuthContainer from 'components/auth/AuthContainer';
import AuthInput from 'components/auth/AuthInput';
import Separator from 'components/common/Separator';
import {CenterButton} from 'components/auth/AuthButton';
import {getDistrictByState, getSchoolByDistrict} from 'sagas/actions';

const GuardianRegister = ({getDistrict, getSchool, schools, districts}) => {
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [inputSchool, setInputSchool] = useState('');
  const [inputDistrict, setInputDistrict] = useState('');
  const [date, setDate] = useState(new Date());

  const [school, setSchool] = useState('');
  const [district, setDistrict] = useState('');

  const onEmailChange = useCallback(
    (text) => {
      setEmail(text);
    },
    [setEmail],
  );

  const onSidChange = useCallback(
    (text) => {
      setStudentId(text);
    },
    [setStudentId],
  );

  let school_controller;
  let district_controller;

  const onStateChange = useCallback(
    (text) => {
      setState(text);
      getDistrict(text, '');
      school_controller.reset();
      district_controller.reset();
    },
    [setState, getDistrict, school_controller, district_controller],
  );

  const onDistrictChange = useCallback(
    (text) => {
      setDistrict(text);
    },
    [setDistrict],
  );

  const onSchoolChange = useCallback(
    (text) => {
      setSchool(text);
    },
    [setSchool],
  );

  const onInputDistrictChange = useCallback(
    (text) => {
      setInputDistrict(text);
      text.length && getDistrict(state, text);
    },
    [setInputDistrict, getDistrict, state],
  );

  const onInputSchoolChange = useCallback(
    (text) => {
      setInputSchool(text);
      text.length && getSchool(state, district, text);
    },
    [setInputSchool, getSchool, state, district],
  );

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={globalStyles.container}>
            <AuthContainer>
              <View style={globalStyles.authCard}>
                <AuthHeader
                  title="Guardian Registration"
                  intro="If you are here for the first time we’ll help you set up your MyOk account in a few quick steps. Then, we will help you review any current requests for your approval. Let’s start."
                />
                <Separator
                  text="I have an email address on file"
                  textStyle={{fontWeight: '600'}}
                />
                <AuthHeader intro="You may create an account with the email address you’ve provided the school. After entering your email address, you will receive a registration code to continue." />
                <AuthInput
                  title="Please enter your email address, then click “Send Code.”"
                  value={email}
                  hint="Email Address"
                  onChangeText={onEmailChange}
                />
                <CenterButton text="Send Code" disabled={email.length === 0} />
                <Separator
                  text="Create account another way"
                  textStyle={{fontWeight: '600'}}
                />
                <AuthHeader intro="If you haven’t provided the school with your email address, create an account by filling out the information below." />
                <DOBInput
                  title="Child’s Date of Birth"
                  date={date}
                  onChange={onDateChange}
                />
                <AuthInput
                  title="Student ID (SID)"
                  value={studentId}
                  hint="Student ID"
                  onChangeText={onSidChange}
                />
                <AuthInput
                  title="State"
                  items={Object.entries(STATES).map(
                    ([fullname, abbreviation]) => ({
                      label: `${fullname} (${abbreviation})`,
                      value: abbreviation,
                    }),
                  )}
                  picker
                  onChangeText={onStateChange}
                  hint="Select a State"
                />
                <Text
                  style={{
                    marginTop: 15,
                    color: '#195174',
                    fontSize: 12,
                    lineHeight: 16,
                  }}>
                  School District
                </Text>
                <DropDownPicker
                  controller={(c) => {
                    district_controller = c;
                  }}
                  zIndex={5000}
                  items={
                    districts
                      ? districts.map((d) => ({label: d, value: d}))
                      : []
                  }
                  defaultValue={district}
                  containerStyle={{
                    backgroundColor: 'rgba(17, 78, 117, 0.1);',
                    borderRadius: 4,
                    marginTop: 3,
                    paddingHorizontal: 0,
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    paddingRight: 10,
                    paddingLeft: 3,
                    borderWidth: 0,
                  }}
                  arrowColor="#2374A5"
                  arrowSize={16}
                  labelStyle={{
                    color: '#2374A5',
                    fontSize: 14,
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={(item) => {
                    setDistrict(item.value);
                    getSchool(state, district, '');
                  }}
                  placeholder="Select District"
                  searchable={true}
                  searchablePlaceholder="Search for a district"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Not Found</Text>}
                />
                {/* <AuthInput
                  title="School District"
                  value={inputDistrict}
                  hint="Select District"
                  onChangeText={onInputDistrictChange}
                  onSubmitEditing={() => {
                    // Keyboard.dismiss();
                    this.district_dropdown && this.district_dropdown.show();
                  }}
                  onFocus={() => {
                    this.district_dropdown && this.district_dropdown.show();
                  }}
                  dropdown
                  items={districts}
                /> */}
                <Text
                  style={{
                    marginTop: 15,
                    color: '#195174',
                    fontSize: 12,
                    lineHeight: 16,
                  }}>
                  School Name
                </Text>
                <DropDownPicker
                  controller={(c) => {
                    school_controller = c;
                  }}
                  zIndex={4000}
                  items={
                    schools ? schools.map((s) => ({label: s, value: s})) : []
                  }
                  defaultValue={school}
                  containerStyle={{
                    backgroundColor: 'rgba(17, 78, 117, 0.1);',
                    borderRadius: 4,
                    marginTop: 3,
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    paddingRight: 10,
                    paddingLeft: 3,
                    borderWidth: 0,
                  }}
                  arrowColor="#2374A5"
                  arrowSize={16}
                  labelStyle={{
                    color: '#2374A5',
                    fontSize: 14,
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={(item) => {
                    setSchool(item.value);
                  }}
                  placeholder="Select a School"
                  searchable={true}
                  searchablePlaceholder="Search for a school"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Not Found</Text>}
                />
                {/* <AuthInput
                  title="School Name"
                  value={inputSchool}
                  hint="Select a School"
                  onChangeText={onInputSchoolChange}
                /> */}
                <CenterButton
                  text="Submit"
                  disabled={
                    !(
                      studentId.length &&
                      state &&
                      state.length &&
                      district &&
                      district.length &&
                      school &&
                      school.length
                    )
                  }
                />
              </View>
            </AuthContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    schools: state.auth.schools,
    districts: state.auth.districts,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistrict: getDistrictByState,
      getSchool: getSchoolByDistrict,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(GuardianRegister);
