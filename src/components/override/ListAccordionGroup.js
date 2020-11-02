import * as React from 'react';

export const ListAccordionGroupContext = React.createContext(null);
const ListAccordionGroup = ({
  expandedId: expandedIdProp,
  onAccordionPress,
  children,
}) => {
  const [expandedId, setExpandedId] = React.useState(undefined);

  const onAccordionPressDefault = (newExpandedId) => {
    setExpandedId((currentExpandedId) =>
      currentExpandedId === newExpandedId ? undefined : newExpandedId,
    );
  };

  return (
    <ListAccordionGroupContext.Provider
      value={{
        expandedId: expandedIdProp || expandedId, // component can be controlled or uncontrolled
        onAccordionPress: onAccordionPress || onAccordionPressDefault,
      }}>
      {children}
    </ListAccordionGroupContext.Provider>
  );
};

ListAccordionGroup.displayName = 'List.AccordionGroup';

export default ListAccordionGroup;
