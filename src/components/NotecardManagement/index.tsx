import React, { useState } from "react";
import styled from "styled-components";
import { assoc } from "ramda";
import { Notecard, Deck } from "../../context/decks";
import { Button, TextInput } from "../react-native-defaults";
import { PageWrapper } from "../PageWrapper";
import { Space, Sizes } from "../Space";
import { Alert } from "react-native";

export const NotecardManagement = ({
  notecard,
  deck,
  onCommit
}: {
  notecard: Notecard;
  deck: Deck;
  onCommit: (notecard: Notecard) => void;
}) => {
  const [notecardState, setNotecardState] = useState(notecard);
  return (
    <PageWrapper>
      <TextInput
        label="Term"
        value={notecardState.term}
        onChange={newTerm => setNotecardState(assoc("term", newTerm))}
      />
      <Space vertical={Sizes.medium} />
      <TextInput
        label="Description"
        value={notecardState.description}
        onChange={newDescription =>
          setNotecardState(assoc("description", newDescription))
        }
        multiline
      />
      <Space vertical={Sizes.medium} />
      <Button
        title="Save"
        onPress={() => {
          const duplicate = deck.notecards.find(
            notecardState =>
              notecard.term === notecardState.term ||
              notecard.description === notecardState.description
          );
          if (duplicate) {
            Alert.alert(
              "Duplicate Notecard",
              `This notecard appears to have the same term or description as another notecard with term of "${duplicate.term}" and description of "${duplicate.description}".`
            );
          } else if (!notecardState.term || !notecardState.description) {
            const missingTerm = !notecardState.term;
            const missingDescription = !notecardState.description;
            Alert.alert(
              `Missing Field${missingTerm && missingDescription ? "s" : ""}`,
              `You are missing the notecard's ${missingTerm ? "term" : ""}${
                missingTerm && missingDescription ? " and " : ""
              }${missingDescription ? "description" : ""}.`
            );
          } else {
            onCommit(notecardState);
          }
        }}
      />
    </PageWrapper>
  );
};
