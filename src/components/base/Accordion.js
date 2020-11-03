import * as React from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native';
import ListAccordion from 'components/override/ListAccordion';

const Accordion = ({
  title,
  left,
  children,
  style,
  styles,
  expanded,
  onPress,
  titleStyle,
  noChevron,
  id,
}) => {
  const [isExpanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!isExpanded);

  if (expanded === undefined) {
    return (
      <ListAccordion
        id={id}
        style={style}
        styles={styles}
        title={title}
        left={left}
        noChevron={noChevron}
        expanded={isExpanded}
        onPress={handlePress}>
        {children}
      </ListAccordion>
    );
  }

  return (
    <ListAccordion
      id={id}
      style={style}
      styles={styles}
      title={title}
      left={left}
      expanded={expanded}
      onPress={onPress}
      titleStyle={titleStyle}>
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
