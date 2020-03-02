import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDecksContext } from "../../context/decks";
import { ListItem } from "../../components/ListItem";
import { Text } from "../../components/react-native-defaults";
import { text, blue } from "../../utils/colors";

const NoDecksText = styled(Text)`
  text-align: center;
  margin: 16px;
`;

export const HomeScreen = ({ navigation }) => {
  const [decks] = useDecksContext();
  return decks.length ? (
    <FlatList
      data={decks}
      renderItem={({ item }) => (
        <ListItem
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
              onPress={() => console.log("play")}
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
