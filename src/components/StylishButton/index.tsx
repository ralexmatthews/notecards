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
  min-height: 48px;
  margin: 8px 0;
  padding: 8px;
  border-radius: 4px;
  border-width: 1px;
  border-color: white;
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
  active,
  wrong,
  ...rest
}: {
  onPress: () => void;
  children?: React.ReactNode;
  title?: string;
  style?: any;
  active?: boolean;
  wrong?: boolean;
}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <ButtonBackground
        style={[
          {
            backgroundColor: wrong
              ? "rgb(255, 100, 100)"
              : active
              ? "rgb(0, 255, 200)"
              : "rgb(0, 200, 255)"
          },
          style
        ]}
        {...rest}
      >
        {title ? <TextForeground>{title}</TextForeground> : children}
      </ButtonBackground>
    </TouchableHighlight>
  );
};
