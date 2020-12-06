import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {globalStyles} from 'styles/index';
import {fetchDocuments} from 'sagas/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import VideoPlayer from 'components/video_player/VideoPlayer';
import DocumentQuestions from './DocumentQuestions';
import DocumentSignature from './DocumentSignature';

const DocumentDeatils = ({
    dispatchFetchDocuments,
    documents,
  }) => {
  dispatchFetchDocuments();

  const [videoComplete, toggleVideo] = useState(false);
  const [questionsComplete, toggleQuestions] = useState(false);
  const [signed, toggleSigned] = useState(false);
  const [signature, changeSignature] = useState('');
  const [encodedSignature, changeEncodedSignature] = useState('');

  const onSubmit = () => {
    console.log('Submit!');
    if(signature != '') {
      console.log('Signed by ' + signature);
    }
    if(encodedSignature != '') {
      console.log('Base 64 Encoded Signature: ' + encodedSignature);
    }
  }

  const onDeny = () => {
  }

  function mockBody(info) {
    let res = '';
    for(let i = 0; i < 20; i++) {
      res += info + ' ';
    }
    return res;
  }

  const mockQuestions = [
      {
        question: 'The network facilities are to be used in all of the following manners except for:',
        choices: ['Responsible', 'Efficient', 'Ethical', 'Illegal'],
        answer: 3
      },
      {
        question: 'Users must do all of the following EXCEPT:',
        choices: ['Use the network in accordance with schoo\'s code of conduct', 'Site sources of information properly', 'Obtain the autor\'s permissoin before plaing copyrighted material on the system', 'Copy copyrighted material to share with others'],
        answer: 3
      }
  ];

  const mockAgreement = {
    option: 'sign',
    text: 'I have read and understood the school\'s Rules for Acceptable and Responsible Internet Use and give permission for my child to access the Internet. I understand that the school will take all reasonable precautions to ensure that the students will not gain access to inappropriate material.',
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <Text style={styles.title}>
          {documents[0].title}
        </Text>

        <Text style={styles.body}>
          {mockBody(documents[0].body)}
        </Text>

        <Text style={styles.videoText}>
          Video
        </Text>

        <VideoPlayer 
          style={styles.video}
          //url="https://www.youtube.com/watch?v=fCLI6kxFFTE"
          //url='https://vimeo.com/76979871'
          url="https://www.youtube.com/watch?v=P9x0o-qOCcM"
          toggleComplete={() => {toggleVideo(true)}}
        /> 

        {
          videoComplete ? 
            <Text style={styles.completeVideo}>
              The video section is complete
            </Text>
          : 
            null
        }

        <DocumentQuestions 
          questions={mockQuestions}
          toggleComplete={() => {toggleQuestions(true)}}
        />

        <DocumentSignature 
          option={mockAgreement.option} 
          text={mockAgreement.text}
          toggleComplete={(signed) => toggleSigned(signed)}
          changeSignature = {(text) => changeSignature(text)}
          changeEncodedSignature = {(encoding) => changeEncodedSignature(encoding)}
        />

        <View style={styles.buttonContainer}>
          <Button
            style={styles.approveButton}
            color={'#28A885'}
            mode="contained"
            onPress={onSubmit}
            disabled={!(videoComplete && questionsComplete && signed)}
          >
            Approve (Sign)
          </Button>

          <Button
            style={styles.denyButton}
            color='#E55151'
            mode="contained"
            onPress={onDeny}
            disabled={!(videoComplete && questionsComplete && signed)}
          >
            Deny
          </Button>
        </View>
   
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.document.documents,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatchFetchDocuments: fetchDocuments,
    },
    dispatch,
);

const styles = EStyleSheet.create({
  approveButton: {
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  body: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#000000',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15,
  },
  completeVideo: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#28A885',
    marginTop: 8,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 24,
    borderRadius: 5,
    padding: 8,
  },
  denyButton: {
    borderRadius: 5,
    flex: 1,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: 5,
    color: '#000000',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  video: {
    width:'100%',
    height: '100%',
  },
  videoText: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#000000',
    marginBottom: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDeatils);


