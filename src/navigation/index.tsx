import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./HomeScreen";
import { background, text, backgroundAccent, blue } from "../utils/colors";
import { positiveHeaderButtonStyles } from "../utils/navigation";
import { NewDeckScreen } from "./NewDeckScreen";
import { AddNotecardScreen } from "./AddNotecard";

const Stack = createStackNavigator();

export const NavigationRoot = () => {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: blue,
          background,
          card: backgroundAccent,
          text,
          border: "rgb(10, 10, 11)"
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: props => (
              <Ionicons
                {...positiveHeaderButtonStyles}
                {...props}
                name="ios-add"
                onPress={() => navigation.navigate("NewDeck")}
              />
            )
          })}
        />
        <Stack.Screen
          name="NewDeck"
          component={NewDeckScreen}
          options={{
            headerTitle: "New Deck"
          }}
        />
        <Stack.Screen
          name="AddNotecard"
          component={AddNotecardScreen}
          options={{
            headerTitle: "Add Notecard"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
