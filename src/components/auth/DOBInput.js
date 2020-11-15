import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
const DOBInput = ({title = 'Date of Birth'}) => {
  const {
    containerStyle,
    titleStyle,
    inputContainerStyle,
    entryStyle,
    entryContainerStyle,
    entryTextStyle,
  } = styles;

  const [visible, setVisible] = useState(false);

  const [month, setMonth] = useState('Month');

  const onOptionPress = useCallback(
    (text, setText) => () => {
      setText(text);
      closeMenu();
    },
    [closeMenu],
  );

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <View style={inputContainerStyle}>
        <View style={entryContainerStyle}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity style={entryStyle} onPress={openMenu}>
                <Text style={entryTextStyle}>{month}</Text>
                <MaterialIcon name="expand-more" color="#2374A5" size={24} />
              </TouchableOpacity>
            }>
            <Menu.Item
              onPress={onOptionPress('January', setMonth)}
              title="January"
            />
            <Menu.Item
              onPress={onOptionPress('February', setMonth)}
              title="February"
            />
            <Divider />
            <Menu.Item
              onPress={onOptionPress('March', setMonth)}
              title="March"
            />
          </Menu>
        </View>
        <View style={entryContainerStyle}>
          <Text style={entryTextStyle}>Day</Text>
          <MaterialIcon name="expand-more" color="#2374A5" size={24} />
        </View>
        <View style={entryContainerStyle}>
          <Text style={entryTextStyle}>Year</Text>
          <MaterialIcon name="expand-more" color="#2374A5" size={24} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
  },
  entryContainerStyle: {
    alignItems: 'center',
    backgroundColor: 'rgba(17, 78, 117, 0.1);',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '30%',
  },
  entryStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
  },
  entryTextStyle: {
    color: '#2374A5',
    fontSize: 14,
  },
  inputContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  titleStyle: {
    color: '#195174',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default DOBInput;
