import React from "react";
import { NotecardManagement } from "../../components/NotecardManagement";
import { Deck, Notecard } from "../../context/decks";
import { Route } from "@react-navigation/native";
import { useNavigationValue } from "../../context/navigation";

export interface EditNotecardRoute extends Route<any> {
  params: {
    id: string;
  };
}

export const EditNotecardScreen = ({ route }: { route: EditNotecardRoute }) => {
  const [{ deck, onCommit, notecardTerm }] = useNavigationValue<{
    notecardTerm: string;
    deck: Deck;
    onCommit: (notecard: Notecard) => void;
  }>(route.params.id);

  return (
    <NotecardManagement
      notecard={deck.notecards.find(({ term }) => term === notecardTerm)}
      deck={deck}
      onCommit={onCommit}
    />
  );
};
