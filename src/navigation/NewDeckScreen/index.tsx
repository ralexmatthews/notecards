import React from "react";
import { DeckManagement } from "../../components/DeckManagement";
import { useDecksContext } from "../../context/decks";

export const NewDeckScreen = ({ navigation }) => {
  const [, setDecks] = useDecksContext();
  return (
    <DeckManagement
      deck={{
        name: "",
        notecards: []
      }}
      onCommit={deck => {
        setDecks(decks => decks.concat(deck));
        navigation.goBack();
      }}
      navigation={navigation}
    ></DeckManagement>
  );
};
