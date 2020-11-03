/* eslint-disable react-native/no-unused-styles */
import {AccordionList, Accordion} from 'components/base';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, List} from 'react-native-paper';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme';
import ParentLoginForm from './login/AdultLoginForm';
import ChildLoginForm from './login/ChildLoginForm';
import ListAccordionGroup from 'components/override/ListAccordionGroup';
import LoginAccordions from './login/LoginOptions';
import SignupOptions from './signup/SignupOptions';

const AuthForms = () => {
  return (
    <AccordionList title="Your Privacy. Your Control.">
      <View style={styles.pad}>
        <ListAccordionGroup>
          <Accordion
            id="1"
            noChevron
            title="I've already signed up, and..."
            style={[styles.accordion, styles.accordionFirst]}
            styles={extendedStyles}>
            <View style={[styles.container]}>
              <LoginAccordions />
            </View>
          </Accordion>

          <Accordion
            id="2"
            noChevron
            title="I'm new here, and..."
            style={[styles.accordion, styles.accordionLast]}
            styles={extendedStyles}>
            <View style={[styles.container]}>
              <SignupOptions />
            </View>
          </Accordion>
        </ListAccordionGroup>
      </View>
    </AccordionList>
  );
};

const extendedStyles = StyleSheet.create({
  child: {
    padding: 16,
  },
  row: {
    padding: 12,
  },
  rowExpanded: {
    backgroundColor: '#47697A',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  title: {
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: appColors.primary,
    borderRadius: 6,
    color: appColors.text,
  },
  accordionLast: {
    marginTop: 16,
  },
  container: {
    backgroundColor: '#FFF',
    padding: 16,
  },
  pad: {
    padding: 16,
  },
});

export default AuthForms;
