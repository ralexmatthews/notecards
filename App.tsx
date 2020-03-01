import React from "react";
import styled from "styled-components";
import { DecksContextProvider } from "./src/context/decks";
import { NavigationRoot } from "./src/navigation";
import { View } from "./src/components/react-native-defaults";

const AppRoot = styled(View)`
  background-color: rgb(30, 30, 32);
  height: 100%;
`;

export default function App() {
  return (
    <AppRoot>
      <DecksContextProvider>
        <NavigationRoot />
      </DecksContextProvider>
    </AppRoot>
  );
}
