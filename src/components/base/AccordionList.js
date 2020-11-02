import * as React from 'react';
import {List, Divider} from 'react-native-paper';

const Accordion = ({titleStyle, dividerStyle}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Accordions" titleStyle={titleStyle}>
      <Divider style={dividerStyle} />
      <List.Accordion
        title="Uncontrolled Accordion"
        left={(props) => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={(props) => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

Accordion.defaultProps = {
  titleStyle: {
    color: 'white',
    fontSize: 18,
  },
  dividerStyle: {
    backgroundColor: 'white',
  },
};

export default Accordion;
