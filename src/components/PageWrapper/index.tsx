import React, { useContext } from "react";
import styled from "styled-components";
import { ScrollView, Dimensions } from "react-native";
import { HeaderHeightContext } from "@react-navigation/stack";

export const PageWrapper = styled(props => {
  const { height } = Dimensions.get("window");
  const headerHeight = useContext(HeaderHeightContext);

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ height: height - headerHeight - 50 }}
      {...props}
    />
  );
})`
  overflow: visible;
  margin: 0 16px;
  padding: 16px 0;
`;
