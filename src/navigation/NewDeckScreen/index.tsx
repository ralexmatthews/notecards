import React from "react";
import { DeckManagement } from "../../components/DeckManagement";

export const NewDeckScreen = ({ navigation }) => {
  return (
    <DeckManagement
      deck={{
        name: "",
        notecards: []
      }}
      onCommit={console.log}
      navigation={navigation}
    ></DeckManagement>
  );
};
