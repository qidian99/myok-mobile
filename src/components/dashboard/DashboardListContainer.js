import React from 'react';
import {View, Text} from 'react-native';
import DocumentRow from './DocumentRow';
import ChildRow from './ChildRow';

const DashboardListContainer = ({documents, children, colors}) => {
  const {containerStyle, titleContainerStyle, dataContainerStyle} = styles;
  const titleTextStyle = {...styles.titleTextStyle, color: colors.background};

  // Trim only first three rows
  let title, rows;
  if (documents) {
    title = 'My Documents';
    rows = documents
      .slice(0, 2)
      .map((doc, index) => (
        <DocumentRow
          key={doc.document_id}
          document={doc}
          colors={colors}
          isLast={index === 1}
        />
      ));
  } else if (children) {
    title = 'My Children';
    rows = children
      .slice(0, 2)
      .map((child, index) => (
        <ChildRow
          key={child.student_id}
          child={child}
          colors={colors}
          isLast={index === 1}
        />
      ));
  } else {
    return <View />;
  }

  return (
    <View style={containerStyle}>
      <View style={titleContainerStyle}>
        <Text style={titleTextStyle}>{title}</Text>
        <Text style={titleTextStyle}>VIEW ALL</Text>
      </View>
      <View style={[dataContainerStyle, {backgroundColor: colors.primary}]}>
        {rows}
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    marginTop: 18,
    borderRadius: 5,
    overflow: 'hidden',
  },
  titleContainerStyle: {
    padding: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#7CB0D7',
  },
  titleTextStyle: {
    fontWeight: '600',
    fontSize: 14,
  },
  dataContainerStyle: {
    paddingHorizontal: 9,
    paddingBottom: 5,
  },
};

export default DashboardListContainer;
