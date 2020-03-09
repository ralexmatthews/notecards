import React from "react";
import styled from "styled-components";
import { FlatList, Alert } from "react-native";
import { remove } from "ramda";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useDecksContext } from "../../context/decks";
import { ListItem } from "../../components/ListItem";
import { Text } from "../../components/react-native-defaults";
import { blue } from "../../utils/colors";

const NoDecksText = styled(Text)`
  text-align: center;
  margin: 16px;
`;

export const HomeScreen = ({
  navigation
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const [decks, setDecks] = useDecksContext();
  return decks.length ? (
    <FlatList
      data={decks}
      renderItem={({ item }) => (
        <ListItem
          onDelete={() => {
            Alert.alert(
              "Delete Deck?",
              "Are you sure you wish to delete this deck? this cannot be undone",
              [
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () =>
                    setDecks(currentDecks =>
                      remove(
                        currentDecks.findIndex(deck => deck.name === item.name),
                        1,
                        currentDecks
                      )
                    )
                },
                {
                  text: "Cancel"
                }
              ]
            );
          }}
          onPress={() =>
            navigation.navigate("EditDeck", { deckName: item.name })
          }
          sideButton={
            <Ionicons
              name="ios-play-circle"
              size={24}
              style={{
                color: blue,
                padding: 8,
                paddingLeft: 24
              }}
              onPress={() =>
                navigation.navigate("PlaySelector", { deckName: item.name })
              }
            />
          }
        >
          {item.name}
        </ListItem>
      )}
      keyExtractor={notecard => notecard.name}
    />
  ) : (
    <NoDecksText>
      You do not have any decks. Add one with the button in the top left corner
    </NoDecksText>
  );
};
