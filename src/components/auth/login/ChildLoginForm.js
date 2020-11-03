import {AccordionList, Accordion} from 'components/base';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, List} from 'react-native-paper';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme';

const ChildLoginForm = () => {
  const {colors} = useTheme();
  return <></>;
};

const accordionStyle = {
  rowExpanded: {
    backgroundColor: '#47697A',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: appColors.primary,
    borderRadius: 6,
    color: appColors.text,
  },
  accordionFirst: {
    marginTop: 16,
  },
  accordionLast: {
    marginVertical: 16,
  },
  container: {
    backgroundColor: '#FFF',
    padding: 16,
  },
});

export default ChildLoginForm;
