import React from "react";
import { DeckManagement } from "../../components/DeckManagement";
import { useDeck } from "../../context/decks";
import { Route, NavigationProp } from "@react-navigation/native";

export interface EditDeckRoute extends Route<any> {
  params: {
    deckName: string;
  };
}

export const EditDeckScreen = ({
  navigation,
  route
}: {
  navigation: NavigationProp<any, any>;
  route: EditDeckRoute;
}) => {
  const [deck, setDeck] = useDeck(route.params.deckName);

  return (
    <DeckManagement
      deck={deck}
      onCommit={deck => {
        setDeck(deck);
        navigation.goBack();
      }}
      navigation={navigation}
    ></DeckManagement>
  );
};
