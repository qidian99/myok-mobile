import {AccordionList, Accordion} from 'components/base';
import React from 'react';
import {View} from 'react-native';
import {useTheme, List} from 'react-native-paper';
import {styles} from 'styles/index';

const AuthAccordion = () => {
  const {colors} = useTheme();
  console.log('colors', colors.background);
  return (
    <AccordionList>
      <Accordion
        title="Uncontrolled Accordion"
        style={styles.authAccordionStyle}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </Accordion>

      <Accordion title="Controlled Accordion" style={styles.authAccordionStyle}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </Accordion>
    </AccordionList>
  );
};

export default AuthAccordion;
