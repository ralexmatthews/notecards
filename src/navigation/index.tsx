import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native-appearance";
import { HomeScreen } from "./HomeScreen";
import { background, text, backgroundAccent, blue } from "../utils/colors";
import { positiveHeaderButtonStyles } from "../utils/navigation";
import { NewDeckScreen } from "./NewDeckScreen";
import { EditDeckScreen, EditDeckRoute } from "./EditDeckScreen";
import { EditNotecardScreen, EditNotecardRoute } from "./EditNotecardScreen";
import { AddNotecardScreen } from "./AddNotecardScreen";
import { BackButton } from "../components/BackButton";
import { PlaySelectorScreen } from "./PlaySelectorScreen";
import { MultipleChoiceScreen } from "./MultipleChoiceScreen";
import { GuessDescriptionFromTermScreen } from "./GuessDescriptionFromTermScreen";
import { GuessTermFromDescriptionScreen } from "./GuessTermFromDescriptionScreen";

const Stack = createStackNavigator();

export const NavigationRoot = () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: blue,
          background: background({ theme: { isDark: colorScheme === "dark" } }),
          card: backgroundAccent({ theme: { isDark: colorScheme === "dark" } }),
          text: text({ theme: { isDark: colorScheme === "dark" } }),
          border: "rgb(10, 10, 11)"
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: "Decks",
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
          options={({ navigation }) => ({
            headerTitle: "New Deck",
            headerLeft: () => <BackButton navigation={navigation} />
          })}
        />
        <Stack.Screen
          name="EditDeck"
          component={EditDeckScreen}
          options={({
            navigation,
            route
          }: {
            route: EditDeckRoute;
            navigation: NavigationProp<any, any>;
          }) => ({
            headerTitle: route.params.deckName,
            headerLeft: () => <BackButton navigation={navigation} />
          })}
        />
        <Stack.Screen
          name="AddNotecard"
          component={AddNotecardScreen}
          options={({ navigation }) => ({
            headerTitle: "Add Notecard",
            headerLeft: () => <BackButton navigation={navigation} />
          })}
        />
        <Stack.Screen
          name="EditNotecard"
          component={EditNotecardScreen}
          options={({
            navigation
          }: {
            navigation: NavigationProp<any, any>;
          }) => ({
            headerTitle: "Edit Notecard",
            headerLeft: () => <BackButton navigation={navigation} />
          })}
        />
        <Stack.Screen
          name="PlaySelector"
          component={PlaySelectorScreen}
          options={({
            navigation
          }: {
            navigation: NavigationProp<any, any>;
          }) => ({
            headerTitle: "Select Study Type",
            headerLeft: () => <BackButton navigation={navigation} />
          })}
        />
        <Stack.Screen
          name="MultipleChoice"
          component={MultipleChoiceScreen}
          options={({
            navigation
          }: {
            navigation: NavigationProp<any, any>;
          }) => ({
            headerTitle: "Multiple Choice Quiz",
            headerLeft: () => <BackButton navigation={navigation} />
          })}
        />
        <Stack.Screen
          name="GuessDescriptionFromTerm"
          component={GuessDescriptionFromTermScreen}
          options={({
            navigation
          }: {
            navigation: NavigationProp<any, any>;
          }) => ({
            headerTitle: "Guess Description From Term",
            headerLeft: () => <BackButton navigation={navigation} />
          })}
        />
        <Stack.Screen
          name="GuessTermFromDescription"
          component={GuessTermFromDescriptionScreen}
          options={({
            navigation
          }: {
            navigation: NavigationProp<any, any>;
          }) => ({
            headerTitle: "Guess Term From Description",
            headerLeft: () => <BackButton navigation={navigation} />
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
