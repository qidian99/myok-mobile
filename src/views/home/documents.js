import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTheme} from 'react-native-paper';
import {fetchDocuments} from 'sagas/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {mapDocumentStatus} from 'util/general';

const DocumentHeader = () => {
  const {colors} = useTheme();
  const [input, setInput] = useState('');

  const onInputChange = useCallback(
    (text) => {
      setInput(text);
    },
    [setInput],
  );

  const {
    buttonStyle,
    headerContainerStyle,
    headerTextStyle,
    searchContainerStyle,
    searchBoxContainerStyle,
    filterContainerStyle,
    filterTextStyle,
    inputStyle,
    inputContainerStyle,
    searchTextStyle,
    iconStyle,
  } = styles;
  return (
    <View style={[headerContainerStyle, {backgroundColor: colors.darkBlue}]}>
      <Text style={[headerTextStyle, {color: colors.background}]}>
        My Documents
      </Text>
      <View style={searchContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[filterContainerStyle, {backgroundColor: colors.myokBlue}]}>
          <Text style={[filterTextStyle, {color: colors.background}]}>
            Filter
          </Text>
        </TouchableOpacity>
        <View style={searchBoxContainerStyle}>
          <View
            style={[inputContainerStyle, {backgroundColor: colors.background}]}>
            <TextInput
              value={input}
              onChangeText={onInputChange}
              style={inputStyle}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[buttonStyle, {backgroundColor: colors.myokBlue}]}>
            <MaterialIcon
              name="search"
              style={[iconStyle, {color: colors.background}]}
            />
            <Text style={[searchTextStyle, {color: colors.background}]}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DocumentCardItem = ({name, value}) => {
  const {itemContainerStyle, itemKeyStyle, itemValueStyle} = styles;
  const {colors} = useTheme();

  return (
    <View style={itemContainerStyle}>
      <Text style={[itemKeyStyle, {color: colors.background}]}>{name}</Text>
      {typeof value === 'string' ? (
        <Text style={[itemValueStyle, {color: colors.background}]}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );
};

const DocumentCard = ({document, isLast}) => {
  const {colors} = useTheme();

  const {
    documentContentStyle,
    documentTitleContainerStyle,
    documentTitleTextStyle,
    documentIconStyle,
    statusContainerStyle,
    statusTextStyle,
  } = styles;

  const {
    title,
    first_name,
    last_name,
    inserted,
    has_responded,
    has_agreed,
    parent_code,
    organization,
    grade,
  } = document;

  const {statusText, statusColor} = mapDocumentStatus(
    has_responded,
    has_agreed,
  );

  return (
    <View
      style={[
        documentContentStyle,
        !isLast && {
          borderBottomWidth: 1,
          borderBottomColor: '#7CB0D7',
          paddingBottom: 10,
        },
      ]}>
      <View style={documentTitleContainerStyle}>
        <Text style={[documentTitleTextStyle, {color: colors.background}]}>
          {title}
        </Text>
        <TouchableOpacity activeOpacity={0.8}>
          <MaterialIcon
            name="remove-red-eye"
            style={[documentIconStyle, {color: colors.background}]}
          />
        </TouchableOpacity>
      </View>
      <DocumentCardItem name="Name" value={`${first_name} ${last_name[0]}.`} />
      <DocumentCardItem name="Parent Code" value={parent_code} />
      <DocumentCardItem
        name="Status"
        value={
          <View style={[statusContainerStyle, {backgroundColor: statusColor}]}>
            <Text style={[statusTextStyle, {color: colors.background}]}>
              {statusText}
            </Text>
          </View>
        }
      />
      <DocumentCardItem name="Date of Request" value={inserted} />
      <DocumentCardItem name="Organization" value={organization} />
      <DocumentCardItem name="Grade" value={`Grade ${grade}`} />
    </View>
  );
};

const Documents = ({dispatchFetchDocuments, documents}) => {
  dispatchFetchDocuments();

  const {colors} = useTheme();

  const {containerStyle, documentContainerStyle} = styles;
  // TODO: The scrollview should be wrapping DocumentCards
  // put the DocumentHeader outside
  return (
    <ScrollView style={containerStyle}>
      <DocumentHeader />
      <View
        style={[documentContainerStyle, {backgroundColor: colors.myokBlue}]}>
        {documents.map((document, index) => (
          <DocumentCard
            isLast={index === documents.length - 1}
            key={document.document_id}
            document={document}
          />
        ))}
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
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  containerStyle: {
    padding: 24,
    backgroundColor: 'transparent',
  },
  headerContainerStyle: {
    backgroundColor: '#195174',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
  },
  headerTextStyle: {
    fontSize: '1rem',
    fontWeight: '600',
  },
  searchContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  filterContainerStyle: {
    borderRadius: 4,
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  filterTextStyle: {
    fontSize: '0.85rem',
  },
  searchBoxContainerStyle: {
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
  },
  inputContainerStyle: {
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  inputStyle: {
    color: '#2374A5',
    fontSize: '0.85rem',
    width: 120,
  },
  searchTextStyle: {
    fontSize: '0.85rem',
  },
  iconStyle: {
    fontSize: '1.2rem',
  },
  documentTitleContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  documentTitleTextStyle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  documentIconStyle: {
    fontSize: '1.5rem',
  },
  documentContentStyle: {
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  documentContainerStyle: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 45,
  },
  itemContainerStyle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemKeyStyle: {
    width: 110,
    fontSize: '0.85rem',
    fontWeight: '600',
    paddingVertical: 3,
  },
  itemValueStyle: {
    fontSize: '0.85rem',
    flexWrap: 'wrap',
    paddingVertical: 3,
  },
  statusContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
  },
  statusTextStyle: {
    fontWeight: '600',
    fontSize: '0.6rem',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
