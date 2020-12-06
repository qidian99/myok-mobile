import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';
import RadioButton from 'components/common/RadioButton';
import SignatureCapture from 'react-native-signature-capture';
import TextInput from 'components/common/TextInput';
import {Button} from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';

const DocumentSignature = (props) => {

  const [checked, check] = useState(false);
  const [signature, changeSignature] = useState('');
  const [hasSigned, toggleSigned] = useState(false);
  const inputEl = useRef(null);

  const onClear = () => {
    toggleSigned(false);
    inputEl.current.resetImage();
  }

  const onSave = () => {
    inputEl.current.saveImage();
  }

  const storeSignature = (result) => {
    props.changeEncodedSignature(result.encoded);
    props.toggleComplete(true);
  }

  const sign = () => {
    props.toggleComplete(!checked);
    check(!checked);
  }

  const checkWrittenSignature = (text) => {
    // Check if there is any text in the TextInput field
    if(text === '') {
      props.toggleComplete(false);
    }
    else {
      props.toggleComplete(true);
    }
  }

  return (
    <View>
      <Text style={styles.title}>
        Agreement
      </Text>
      {props.option === 'radio' ?
        <View style={styles.radio}>
          <RadioButton
            selected={checked}
            onPress={sign}
          />       
          <Text style={styles.text}>
            {props.text}
          </Text>
        </View>
      : props.option === 'type'?
        <View style={styles.typeSignature}>
          <TextInput
            style={styles.input}
            value={signature}
            onChangeText={(text) => {
              changeSignature(text);
              props.changeSignature(text);
              checkWrittenSignature(text);
            }}
          />
          <Text style={styles.text}>
            {props.text}
          </Text>
        </View>
      :
        <View>
          <Text style={styles.text}>
            {props.text}
          </Text>
          <SignatureCapture
            style={styles.signature}
            ref={inputEl}
            onDragEvent={() => toggleSigned(true)}
            onSaveEvent={storeSignature}
            showNativeButtons={false}
            viewMode={'portrait'}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={onClear}
            >
              Clear
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              onPress={onSave}
              disabled={!hasSigned}
            >
              Save Signature
            </Button>
          </View>
        </View>
      }
    </View>
  );
}

const styles = EStyleSheet.create({
  button: {
    borderRadius: 5,
    color: '#2374A5',
  },
  buttonContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15,
  },
  input: {
    height: 40,
    marginBottom: 16,
    backgroundColor: 'rgba(17, 78, 117, 0.1)',
    borderRadius: 4,
    fontSize: '1rem',
  },
  radio: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  signature: {
    height: 200,
  },
  text: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#000000',
    marginBottom: 15,
  },
  title: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#000000',
    marginBottom: 15,
    marginTop: 15,
  },
  typeSignature: {
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    marginBottom: 15,
  },
});


export default DocumentSignature;