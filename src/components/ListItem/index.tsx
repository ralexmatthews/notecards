import React from "react";
import styled from "styled-components";
import { View, Text } from "../react-native-defaults";
import { TouchableHighlight } from "react-native";
import Swipeout from "react-native-swipeout";
import { text } from "../../utils/colors";

const SubText = styled(Text)`
  color: rgb(178, 178, 181);
  font-size: 12px;
`;
const ListItemRoot = styled(View)`
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${text};
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListItem = ({
  children,
  subText,
  onPress,
  onDelete,
  sideButton,
  ...rest
}: {
  children: string;
  subText?: string;
  onPress?: () => void;
  onDelete?: () => void;
  sideButton?: React.ReactElement;
}) => (
  <Swipeout
    right={
      onDelete
        ? [
            {
              text: "Delete",
              color: text,
              backgroundColor: "rgb(255, 100, 100)",
              onPress: onDelete
            }
          ]
        : undefined
    }
  >
    <TouchableHighlight onPress={onPress ?? undefined}>
      <ListItemRoot {...rest}>
        <View>
          <Text
            style={
              !subText
                ? {
                    marginTop: 8,
                    marginBottom: 8
                  }
                : undefined
            }
          >
            {children}
          </Text>
          {subText && <SubText numberOfLines={1}>{subText}</SubText>}
        </View>
        {sideButton || <View />}
      </ListItemRoot>
    </TouchableHighlight>
  </Swipeout>
);
