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
import ChildSignupForm from './ChildSignupForm';
import AdultSignupForm from './AdultSignupForm';

const IDS = {
  guaridan: 'guaridan',
  kid: 'kid',
  educator: 'educator',
  employee: 'employee',
};

const PARENT_ACCORDION_ID = 'parentlogin';
const CHILD_ACCORDION_ID = 'childlogin';

const LoginAccordions = ({login}) => {
  const {colors} = useTheme();

  const [educatorExpanded, setEducatorExpanded] = useState(false);
  const [guardianExpanded, setGuardianExpanded] = useState(false);
  const [employeeExpanded, setEmployeeExpanded] = useState(false);
  const [kidExpanded, setKidExpanded] = useState(false);
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
        setGuardianExpanded(false);
        setEducatorExpanded(false);
        setEmployeeExpanded(false);
        setKidExpanded(false);
        setExpandedId(null);
        return;
      }

      if (id === IDS.guaridan) {
        setGuardianExpanded(true);
        setEducatorExpanded(false);
        setEmployeeExpanded(false);
        setKidExpanded(false);
      }

      if (id === IDS.educator) {
        setGuardianExpanded(false);
        setEducatorExpanded(true);
        setEmployeeExpanded(false);
        setKidExpanded(false);
      }

      if (id === IDS.employee) {
        setGuardianExpanded(false);
        setEducatorExpanded(false);
        setEmployeeExpanded(true);
        setKidExpanded(false);
      }

      if (id === IDS.kid) {
        setGuardianExpanded(false);
        setEducatorExpanded(false);
        setEmployeeExpanded(false);
        setKidExpanded(true);
      }

      if (id === null) {
        setGuardianExpanded(false);
        setEducatorExpanded(false);
        setEmployeeExpanded(false);
        setKidExpanded(false);
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
        id={IDS.guaridan}
        left={getIcon(guardianExpanded)}
        title="Guardian"
        style={[styles.accordion, styles.accordionFirst]}
        styles={accordionStyle}>
        <AdultSignupForm />
      </Accordion>
      <Accordion
        id={IDS.kid}
        left={getIcon(kidExpanded)}
        title="Kid"
        style={[styles.accordion, styles.accordionMid]}
        styles={accordionStyle}>
        <ChildSignupForm />
      </Accordion>
      <Accordion
        id={IDS.educator}
        left={getIcon(educatorExpanded)}
        title="Educator"
        style={[styles.accordion, styles.accordionMid]}
        styles={accordionStyle}>
        <AdultSignupForm />
      </Accordion>
      <Accordion
        id={IDS.employee}
        left={getIcon(employeeExpanded)}
        title="Employee"
        style={[styles.accordion, styles.accordionLast]}
        styles={accordionStyle}>
        <AdultSignupForm />
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
    marginTop: 0,
  },
  accordionLast: {
    marginVertical: 16,
  },
  accordionMid: {
    marginTop: 16,
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
