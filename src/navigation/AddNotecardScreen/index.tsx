import React from "react";
import styled from "styled-components";
import { NotecardManagement } from "../../components/NotecardManagement";
import { NavigationProp, Route } from "@react-navigation/native";
import { useNavigationValue } from "../../context/navigation";
import { Deck, Notecard } from "../../context/decks";

interface AddNotecardRoute extends Route<any> {
  params: {
    id: string;
  };
}

export const AddNotecardScreen = ({ route }: { route: AddNotecardRoute }) => {
  const [{ deck, onCommit }] = useNavigationValue<{
    deck: Deck;
    onCommit: (notecard: Notecard) => void;
  }>(route.params.id);

  return (
    <NotecardManagement
      notecard={{
        term: "",
        description: ""
      }}
      deck={deck}
      onCommit={onCommit}
    />
  );
};
