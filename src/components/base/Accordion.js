import * as React from 'react';
import {List} from 'react-native-paper';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native';

const Accordion = ({title, children, style}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      style={style}
      title={title}
      left={(props) => <List.Icon {...props} icon="folder" />}
      expanded={expanded}
      onPress={handlePress}>
      {children}
    </List.Accordion>
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
