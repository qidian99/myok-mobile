import color from 'color';
import * as React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TextStyle,
  I18nManager,
} from 'react-native';
import {TouchableRipple, Text, withTheme} from 'react-native-paper';
import {ListAccordionGroupContext} from './ListAccordionGroup';
import MaterialCommunityIcon from './MaterialCommunityIcon';

const ListAccordion = ({
  left,
  title,
  description,
  children,
  theme,
  titleStyle,
  descriptionStyle,
  titleNumberOfLines = 1,
  descriptionNumberOfLines = 2,
  style,
  styles: extendedStyles,
  id,
  testID,
  onPress,
  expanded: expandedProp,
}) => {
  const [expanded, setExpanded] = React.useState(expandedProp || false);

  const handlePressAction = () => {
    onPress();

    if (expandedProp === undefined) {
      // Only update state of the `expanded` prop was not passed
      // If it was passed, the component will act as a controlled component
      setExpanded(!expanded);
    }
  };

  const titleColor = color(theme.colors.text).alpha(0.87).rgb().string();
  const descriptionColor = color(theme.colors.text).alpha(0.54).rgb().string();

  const expandedInternal = expandedProp !== undefined ? expandedProp : expanded;

  const groupContext = React.useContext(ListAccordionGroupContext);
  if (groupContext !== null && !id) {
    throw new Error(
      'List.Accordion is used inside a List.AccordionGroup without specifying an id prop.',
    );
  }
  const isExpanded = groupContext
    ? groupContext.expandedId === id
    : expandedInternal;
  const handlePress =
    groupContext && id !== undefined
      ? () => groupContext.onAccordionPress(id)
      : handlePressAction;
  return (
    <View>
      <TouchableRipple
        style={[styles.container, style]}
        onPress={handlePress}
        accessibilityTraits="button"
        accessibilityComponentType="button"
        accessibilityRole="button"
        testID={testID}>
        <View
          style={[
            styles.row,
            isExpanded && styles.rowExpanded,
            isExpanded && extendedStyles.rowExpanded,
          ]}
          pointerEvents="none">
          {left
            ? left({
                // color: isExpanded ? theme.colors.primary : descriptionColor,
                color: descriptionColor,
              })
            : null}
          <View style={[styles.item, styles.content]}>
            <Text
              numberOfLines={titleNumberOfLines}
              style={[
                styles.title,
                {
                  // color: isExpanded ? theme.colors.primary : titleColor,
                  color: titleColor,
                },
                titleStyle,
              ]}>
              {title}
            </Text>
            {description && (
              <Text
                numberOfLines={descriptionNumberOfLines}
                style={[
                  styles.description,
                  {
                    color: descriptionColor,
                  },
                  descriptionStyle,
                ]}>
                {description}
              </Text>
            )}
          </View>
          <View
            style={[styles.item, description ? styles.multiline : undefined]}>
            <MaterialCommunityIcon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              color={titleColor}
              size={24}
              direction={I18nManager.isRTL ? 'rtl' : 'ltr'}
            />
          </View>
        </View>
      </TouchableRipple>
      {isExpanded
        ? React.Children.map(children, (child) => {
            if (
              left &&
              React.isValidElement(child) &&
              !child.props.left &&
              !child.props.right
            ) {
              return React.cloneElement(child, {
                style: [styles.child, child.props.style],
              });
            }

            return child;
          })
        : null}
    </View>
  );
};

// ListAccordion.displayName = 'List.Accordion';

const styles = StyleSheet.create({
  child: {
    paddingLeft: 64,
  },
  container: {
    padding: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
  },
  item: {
    margin: 8,
  },
  multiline: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowExpanded: {},
  title: {
    fontSize: 16,
  },
});

export default withTheme(ListAccordion);
