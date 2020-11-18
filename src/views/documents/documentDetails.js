import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {globalStyles} from 'styles/index';
import {fetchDocuments} from 'sagas/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import VideoPlayer from 'components/video_player/VideoPlayer';

const DocumentDeatils = ({
    dispatchFetchDocuments,
    documents,
  }) => {
  dispatchFetchDocuments();

  console.log(documents);
  const [videoComplete, toggleComplete] = useState(false);

  function gen (info) {
    let res = '';
    for(let i = 0; i < 20; i++) {
      res += info + ' ';
    }
    return res;
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <Text style={styles.title}>
          {documents[0].title}
        </Text>

        <Text style={styles.body}>
          {gen(documents[0].body)}
        </Text>

        <Text style={styles.body}>
          Video
        </Text>

        {/* //<VideoPlayer platform='Youtube' id='KVZ-P-ZI6W4'/>   */}
        <VideoPlayer 
          platform='Vimeo' 
          id='76979871'
          toggleComplete={() => {toggleComplete(true); console.log("here")}}
        /> 

        <Text style={videoComplete ? styles.completeVideo : styles.incompleteVideo}>
          The Video section is {videoComplete ? '' : 'not'} complete
        </Text>

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
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#195174',
    marginBottom: 10,
  },
  body: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#195174',
    marginBottom: 3,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 24,
    borderRadius: 5,
    padding: 12,
  },
  completeVideo: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#008000',
  },
  incompleteVideo: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#FF0000',
  },
  full: {
    height: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDeatils);


