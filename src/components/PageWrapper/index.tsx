import React from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";
import { View } from "../react-native-defaults";

export const PageWrapper = styled(props => (
  <ScrollView
    keyboardShouldPersistTaps="never"
    keyboardDismissMode="on-drag"
    {...props}
  />
))`
  overflow: visible;
  margin: 0 16px;
  padding: 16px 0;
`;
