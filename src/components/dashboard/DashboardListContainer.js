import React from 'react';
import {View, Text} from 'react-native';
import DocumentRow from './DocumentRow';
import ChildRow from './ChildRow';
import EStyleSheet from 'react-native-extended-stylesheet';

const DashboardListContainer = ({documents, children, colors}) => {
  const {containerStyle, titleContainerStyle, dataContainerStyle} = styles;
  const titleTextStyle = {...styles.titleTextStyle, color: colors.background};

  // Trim only first three rows
  let title, rows, size;

  if (documents) {
    title = 'My Documents';
    size = Math.min(documents.length, 2);
    rows = documents
      .slice(0, size)
      .map((doc, index) => (
        <DocumentRow
          key={doc.document_id}
          document={doc}
          colors={colors}
          isLast={index === size - 1}
        />
      ));
  } else if (children) {
    title = 'My Children';
    size = Math.min(children.length, 2);
    rows = children
      .slice(0, size)
      .map((child, index) => (
        <ChildRow
          key={child.student_id}
          child={child}
          colors={colors}
          isLast={index === size - 1}
        />
      ));
  } else {
    return <View />;
  }

  return (
    <View style={containerStyle}>
      <View style={[titleContainerStyle, {backgroundColor: colors.darkBlue}]}>
        <Text style={titleTextStyle}>{title}</Text>
        <Text style={titleTextStyle}>VIEW ALL</Text>
      </View>
      <View style={[dataContainerStyle, {backgroundColor: colors.primary}]}>
        {rows}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  containerStyle: {
    marginTop: 18,
    borderRadius: 5,
    overflow: 'hidden',
  },
  titleContainerStyle: {
    padding: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTextStyle: {
    fontWeight: '600',
    fontSize: '1rem',
  },
  dataContainerStyle: {
    paddingHorizontal: 9,
    paddingBottom: 5,
  },
});

export default DashboardListContainer;
