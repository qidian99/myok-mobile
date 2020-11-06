import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useTheme} from 'react-native-paper';

const styles = {
  containerStyle: {
    margin: 24,
  },
  recentDocContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

const renderDocumentCard = ({item}) => {
  const {document_id, title, created_by} = item;
  return <Text>Test</Text>;
};

const Dashboard = () => {
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
        data={[]}
        renderItem={renderDocumentCard}
        keyExtractor={(item) => item.document_id}
      />
    </View>
  );
};

export default Dashboard;
