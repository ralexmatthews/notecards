import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";
import { useDecksContext } from "../../context/decks";
import { ListItem } from "../../components/ListItem";
import { Text } from "../../components/react-native-defaults";

const NoDecksText = styled(Text)`
  text-align: center;
  margin: 16px;
`;

export const HomeScreen = () => {
  const [decks] = useDecksContext();
  return decks.length ? (
    <FlatList
      data={decks}
      renderItem={({ item }) => <ListItem>{item.name}</ListItem>}
      keyExtractor={notecard => notecard.name}
    />
  ) : (
    <NoDecksText>
      You do not have any decks. Add one with the button in the top left corner
    </NoDecksText>
  );
};
