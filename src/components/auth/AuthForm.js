import {AccordionList, Accordion} from 'components/base';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, List} from 'react-native-paper';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme';

const AuthAccordion = () => {
  const {colors} = useTheme();
  console.log('colors', colors.background);
  return (
    <AccordionList title="Your Privacy. Your Control.">
      <Accordion
        left={(props) => <List.Icon {...props} icon="login" />}
        title="I've Already Signed up, and"
        style={styles.accordion}
        styles={accordionStyle}>
        <View style={[globalStyles.container, styles.container]} />
      </Accordion>

      <Accordion
        left={(props) => <List.Icon {...props} icon="login" />}
        title="I'm new here, and"
        style={styles.accordion}
        styles={accordionStyle}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </Accordion>
    </AccordionList>
  );
};

const accordionStyle = {
  rowExpanded: {
    backgroundColor: '#47697A',
  },
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: appColors.primary,
    color: appColors.text,
    margin: 16,
  },
  container: {
    backgroundColor: '#FFF',
    padding: 16,
  },
});

export default AuthAccordion;
