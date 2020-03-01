import React from "react";
import styled from "styled-components";
import { View, Text } from "../react-native-defaults";
import { TouchableHighlight } from "react-native";

const SubText = styled(Text)`
  color: rgb(178, 178, 181);
  font-size: 12px;
`;

export const ListItem = ({
  children,
  subText,
  onPress,
  ...rest
}: {
  children: string;
  subText?: string;
  onPress?: () => void;
}) => (
  <TouchableHighlight onPress={onPress ?? undefined}>
    <View {...rest}>
      <Text>{children}</Text>
      {subText && <SubText numberOfLines={1}>{subText}</SubText>}
    </View>
  </TouchableHighlight>
);
