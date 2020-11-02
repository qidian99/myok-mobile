import * as React from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native';
import ListAccordion from 'components/override/ListAccordion';
import {List} from 'react-native-paper';

const Accordion = ({title, children, style}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <ListAccordion
      style={style}
      title={title}
      left={(props) => <List.Icon {...props} icon="folder" />}
      expanded={expanded}
      onPress={handlePress}>
      {children}
    </ListAccordion>
  );
};

Accordion.prototype = {
  title: PropTypes.string,
  style: ViewPropTypes.style,
};

Accordion.defaultProps = {
  title: 'Accordion Title',
};

export default Accordion;
