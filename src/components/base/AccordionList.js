import * as React from 'react';
import {List, Divider} from 'react-native-paper';

const AccordionList = ({titleStyle, dividerStyle, children, style}) => {
  return (
    <List.Section title="Accordions" titleStyle={titleStyle} style={style}>
      <Divider style={dividerStyle} />
      {children}
    </List.Section>
  );
};

AccordionList.defaultProps = {
  titleStyle: {
    color: 'white',
    fontSize: 18,
  },
  dividerStyle: {
    backgroundColor: 'white',
  },
};

export default AccordionList;
