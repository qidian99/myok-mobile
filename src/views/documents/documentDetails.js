import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {globalStyles} from 'styles/index';
import {fetchDocuments} from 'sagas/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import VideoPlayer from 'components/video_player/VideoPlayer';

const DocumentDeatils = ({dispatchFetchDocuments, documents}) => {
  dispatchFetchDocuments();

  console.log(documents);
  const [videoComplete, toggleComplete] = useState(false);

  function mockBody(info) {
    let res = '';
    for (let i = 0; i < 20; i++) {
      res += info + ' ';
    }
    return res;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{documents[0].title}</Text>

        <Text style={styles.body}>{mockBody(documents[0].body)}</Text>

        <Text style={styles.videoText}>Video</Text>

        <VideoPlayer
          style={styles.video}
          // url="https://www.youtube.com/watch?v=M7lc1UVf-VE"
          url="https://vimeo.com/76979871"
          toggleComplete={() => {
            toggleComplete(true);
          }}
        />

        {videoComplete ? (
          <Text style={styles.completeVideo}>
            The video section is complete
          </Text>
        ) : null}
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
  body: {
    fontStyle: 'normal',
    fontSize: '1rem',
    color: '#000000',
    marginBottom: 16,
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
    width: '100%',
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
