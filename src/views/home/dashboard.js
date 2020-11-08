import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {fetchDocuments, fetchChildren} from 'sagas/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useTheme} from 'react-native-paper';
import DocumentCard from 'components/dashboard/DocumentCard';
import DashboardListContainer from 'components/dashboard/DashboardListContainer';

const Dashboard = ({
  dispatchFetchDocuments,
  dispatchFetchChildren,
  documents,
  children,
}) => {
  dispatchFetchDocuments();
  dispatchFetchChildren();

  const {colors} = useTheme();

  return (
    <View style={styles.containerStyle}>
      <View style={styles.recentDocContainerStyle}>
        <Text style={[styles.recentDocTextStyle, {color: colors.primary}]}>
          Recent Document
        </Text>
        <Text style={styles.recentDocViewAllStyle}>VIEW ALL</Text>
      </View>
      <FlatList
        data={documents}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <DocumentCard item={item} colors={colors} />}
        keyExtractor={(item) => item.document_id}
      />
      <DashboardListContainer documents={documents} colors={colors} />
      <DashboardListContainer children={children} colors={colors} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.document.documents,
    children: state.child.children,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatchFetchDocuments: fetchDocuments,
      dispatchFetchChildren: fetchChildren,
    },
    dispatch,
  );

const styles = {
  containerStyle: {
    margin: 24,
  },
  recentDocContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  recentDocTextStyle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
  },
  recentDocViewAllStyle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#7CB0D7',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
