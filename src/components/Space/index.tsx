import React from "react";
import styled from "styled-components";
import { View } from "../react-native-defaults";

export enum Sizes {
  small = "8",
  medium = "16",
  large = "32"
}

type Props = {
  vertical: Sizes | number;
  horizontal: Sizes | number;
};

export const Space = styled<typeof View & React.FunctionComponent<Props>>(View)`
  ${({ vertical }: { vertical: Sizes | number }) => {
    if (!!vertical) {
      return `height: ${vertical}px;`;
    } else {
      return "";
    }
  }}
  ${({ horizontal }: { horizontal: Sizes | number }) => {
    if (!!horizontal) {
      return `width: ${horizontal}px;`;
    } else {
      return "";
    }
  }}
`;
