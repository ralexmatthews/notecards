import React from "react";
import styled from "styled-components";
import { Text, View } from "../react-native-defaults";
import { text } from "../../utils/colors";

const SectionHeaderContainer = styled(View)`
  margin: 8px 0;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${text};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SectionHeader = ({
  rightButton,
  children,
  ...props
}: {
  children: string;
  rightButton?: React.ReactNode;
}) => {
  return (
    <SectionHeaderContainer>
      <Text {...props} children={children} />
      {rightButton || <View />}
    </SectionHeaderContainer>
  );
};
