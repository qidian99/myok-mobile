import * as React from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native';
import ListAccordion from 'components/override/ListAccordion';

const Accordion = ({title, left, children, style, styles}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <ListAccordion
      style={style}
      styles={styles}
      title={title}
      left={left}
      expanded={expanded}
      onPress={handlePress}>
      {children}
    </ListAccordion>
  );
};

Accordion.prototype = {
  title: PropTypes.string,
  left: PropTypes.func,
  style: ViewPropTypes.style,
  styles: PropTypes.object,
};

Accordion.defaultProps = {
  title: 'Accordion Title',
};

export default Accordion;
