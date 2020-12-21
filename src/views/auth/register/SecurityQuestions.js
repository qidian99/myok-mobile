import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';

import TextInput from 'components/common/TextInput';
import {Button} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

const SecurityQuestions = () => {
  const questions = [
    'What is your favorite sports team?', 
    'In what city did your parents first meet?', 
    'What is the name of the street you grew up on?'
  ];
  
  const [question1, setq1] = useState('');
  const [question2, setq2] = useState('');
  const [question3, setq3] = useState('');
  const [answer1, seta1] = useState('');
  const [answer2, seta2] = useState('');
  const [answer3, seta3] = useState('');
  const [buttonEnable, toggleButtonEnable] = useState(false);

  useEffect(() => {
    if(question1!==''&&question2!==''&&question3!==''&&answer1!==''&&answer2!==''&&answer3!=='') {
      toggleButtonEnable(true);
    }
    else {
      toggleButtonEnable(false);
    }
  }, [question1, question2, question3, answer1, answer2, answer3]);

  const onSubmit = () => {
    const data = [
      {question: question1, answer: answer1},
      {question: question2, answer: answer2},
      {question: question3, answer: answer3},
    ];
    console.log(data);
    toggleButtonEnable(false);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.inputContainer}>
        <Text style={styles.title}>Security Questions</Text>

        <Text style={styles.label}>Security Question 1</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(text) => {
              text === undefined ? setq1('') : setq1(text); 
            }}
            items={questions.map((q) => ({label: q, value: q}))}
            useNativeAndroidPickerStyle={false}
            textInputProps={styles.text}
            placeholder={{label: 'Select Question'}}
            Icon={() => {
              return (
                <MaterialIcon style={styles.icon} name="expand-more" size={30} color="#2374A5" />
              );
            }}
          />
        </View>
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={styles.answer}
          value={answer1}
          placeholder='Answer'
          placeholderTextColor='#2374A5'
          onChangeText={(text) => {
            seta1(text);
          }}
        />

        <Text style={styles.label}>Security Question 2</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(text) => {
              text === undefined ? setq2('') : setq2(text); 
            }}
            items={questions.map((q) => ({label: q, value: q}))}
            useNativeAndroidPickerStyle = {false}
            textInputProps={styles.text}
            touchableWrapperProps={styles.wrap}
            placeholder={{label: 'Select Question'}}
            Icon={() => {
              return (
                <MaterialIcon style={styles.icon} name="expand-more" size={30} color="#2374A5" />
              );
            }}
          />
        </View>
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={styles.answer}
          value={answer2}
          placeholder='Answer'
          placeholderTextColor='#2374A5'
          onChangeText={(text) => {
            seta2(text);
          }}
        />

        <Text style={styles.label}>Security Question 3</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(text) => {
              text === undefined ? setq3('') : setq3(text); 
            }}
            items={questions.map((q) => ({label: q, value: q}))}
            useNativeAndroidPickerStyle = {false}
            textInputProps={styles.text}
            touchableWrapperProps={styles.wrap}
            placeholder={{label: 'Select Question'}}
            Icon={() => {
              return (
                <MaterialIcon style={styles.icon} name="expand-more" size={30} color="#2374A5" />
              );
            }}
          />
        </View>
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={styles.answer}
          value={answer3}
          placeholder='Answer'
          placeholderTextColor='#2374A5'
          onChangeText={(text) => {
            seta3(text);
          }}
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={onSubmit}
          disabled={buttonEnable ? false : true}
          color={buttonEnable ? '#2374A5' : '#707070'}
          labelStyle={{fontSize: 16}}>
          Submit
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = EStyleSheet.create({
  answer: {
    height: 40,
    marginBottom: 16,
    backgroundColor: 'rgba(17, 78, 117, 0.1)',
    borderRadius: 4,
    fontSize: '1rem',
    color: '#2374A5',
  },
  button: {
    borderRadius: 5,
  },
  container: {
    // backgroundColor: 'white',
    margin: 24,
    // marginBottom: 80,
    borderRadius: 5,
  },
  icon: {
    padding:5,
  },
  inputContainer: {
    padding: 12,
    paddingVertical: 24,
    // paddingBottom: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  label: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#195174',
    marginBottom: 3,
  },
  pickerContainer: {
    backgroundColor: 'rgba(17, 78, 117, 0.1);',
    height: 40,
    marginBottom: 16,
    borderRadius: 4,
  },
  text: {
    color: '#2374A5',
    fontSize: '1rem',
    marginLeft: 5,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#195174',
    marginBottom: 10,
  },
});

export default SecurityQuestions;
