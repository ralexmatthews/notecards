import React from "react";
import styled from "styled-components";
import { View } from "../react-native-defaults";
import { backgroundAccent } from "../../utils/colors";
import { Dimensions } from "react-native";

const CardWrapper = styled(View)`
  height: 95%;
  padding: 20px;
`;
const CardInner = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 20px;
  background-color: ${backgroundAccent};
  box-shadow: ${({ theme }) =>
    theme.isDark ? "0px 0px 6px #888" : "0px 0px 8px #555"};
`;

export const Card = (props: any) => {
  const { width } = Dimensions.get("window");

  return (
    <CardWrapper style={{ width }}>
      <CardInner {...props} />
    </CardWrapper>
  );
};
