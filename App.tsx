import React from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme
} from "react-native-appearance";
import { DecksContextProvider } from "./src/context/decks";
import { NavigationRoot } from "./src/navigation";
import { View } from "./src/components/react-native-defaults";
import { NavigationValuesContextProvider } from "./src/context/navigation";
import { background } from "./src/utils/colors";

const AppRoot = styled(View)`
  background-color: ${background};
  height: 100%;
`;

export default function App() {
  return (
    <AppearanceProvider>
      <SubApp />
    </AppearanceProvider>
  );
}

const SubApp = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider theme={{ isDark: colorScheme === "dark" }}>
      <AppRoot>
        <NavigationValuesContextProvider>
          <DecksContextProvider>
            <NavigationRoot />
          </DecksContextProvider>
        </NavigationValuesContextProvider>
      </AppRoot>
    </ThemeProvider>
  );
};
