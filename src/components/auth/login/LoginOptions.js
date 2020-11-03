import {AccordionList, Accordion} from 'components/base';
import ListAccordionGroup from 'components/override/ListAccordionGroup';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, List, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAdult} from 'sagas/actions';
import {globalStyles} from 'styles/index';
import {appColors} from 'theme';
import ChildLoginForm from './ChildLoginForm';
import ParentLoginForm from './AdultLoginForm';

const PARENT_ACCORDION_ID = 'parentlogin';
const CHILD_ACCORDION_ID = 'childlogin';

const LoginAccordions = ({login}) => {
  const {colors} = useTheme();

  const [parentExpanded, setParentExpanded] = useState(false);
  const [childExpanded, setChildExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const getIcon = useCallback(
    (expanded) => (props) => (
      <List.Icon {...props} icon={expanded ? 'minus' : 'plus'} />
    ),
    [],
  );

  const onAccordionPress = useCallback(
    (id) => {
      if (id === expandedId) {
        setParentExpanded(false);
        setChildExpanded(false);
        setExpandedId(null);
        return;
      }

      if (id === PARENT_ACCORDION_ID) {
        setParentExpanded(true);
        setChildExpanded(false);
      }

      if (id === CHILD_ACCORDION_ID) {
        setParentExpanded(false);
        setChildExpanded(true);
      }

      if (id === null) {
        setParentExpanded(false);
        setChildExpanded(false);
      }

      setExpandedId(id);
    },
    [expandedId],
  );
  return (
    <ListAccordionGroup
      expandedId={expandedId}
      onAccordionPress={onAccordionPress}>
      <Accordion
        id={PARENT_ACCORDION_ID}
        left={getIcon(parentExpanded)}
        title="I have an account and password"
        expanded={parentExpanded}
        style={[styles.accordion, styles.accordionFirst]}
        styles={accordionStyle}>
        <ParentLoginForm />
      </Accordion>
      <Accordion
        id={CHILD_ACCORDION_ID}
        left={getIcon(childExpanded)}
        title="I have a parent code"
        expanded={childExpanded}
        style={[styles.accordion, styles.accordionLast]}
        styles={accordionStyle}>
        <ChildLoginForm />
      </Accordion>
    </ListAccordionGroup>
  );
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
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: loginAdult,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(LoginAccordions);
