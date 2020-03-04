import React from "react";
import { TouchableHighlight } from "react-native";
import { View, Text } from "../react-native-defaults";
import styled from "styled-components";

const ButtonBackground = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  margin: 8px 0;
  border-radius: 4px;
  border-width: 1px;
  border-color: white;
  background-color: rgb(0, 200, 255);
  box-shadow: 0px 0px 5px #fff;
`;
const TextForeground = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const StylishButton = ({
  onPress,
  children,
  title,
  style,
  ...rest
}: {
  onPress: () => void;
  children?: React.ReactNode;
  title?: string;
  style?: any;
}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <ButtonBackground style={style} {...rest}>
        {title ? <TextForeground>{title}</TextForeground> : children}
      </ButtonBackground>
    </TouchableHighlight>
  );
};
