import {AccordionBase} from 'components/base';
import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {styles} from 'styles/index';

const Accordion = () => {
  const {colors} = useTheme();
  console.log('colors', colors.background);
  return <AccordionBase />;
};

export default Accordion;
