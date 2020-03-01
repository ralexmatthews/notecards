import React from "react";
import styled from "styled-components";
import { NotecardManagement } from "../../components/NotecardManagement";
import { useDeck, Deck } from "../../context/decks";
import { NavigationProp, Route } from "@react-navigation/native";

interface AddNotecardRoute extends Route<any> {
  params: {
    deck: Deck;
  };
}

export const AddNotecardScreen = ({
  navigation,
  route
}: {
  navigation: NavigationProp<any, any>;
  route: AddNotecardRoute;
}) => {
  return (
    <NotecardManagement
      notecard={{
        term: "",
        description: ""
      }}
      deck={route.params.deck}
      onCommit={console.log}
    />
  );
};
