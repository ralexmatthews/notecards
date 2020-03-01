import React, { useState } from "react";
import { assoc, prop } from "ramda";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, Text, Button } from "../react-native-defaults";
import { Deck } from "../../context/decks";
import { PageWrapper } from "../PageWrapper";
import { SectionHeader } from "../SectionHeader";
import { ListItem } from "../ListItem";
import { blue } from "../../utils/colors";
import { NavigationProp } from "@react-navigation/native";

export const DeckManagement = ({
  deck,
  onCommit,
  navigation
}: {
  deck: Deck;
  onCommit: (deck: Deck) => void;
  navigation: NavigationProp<any, any>;
}) => {
  const [deckState, setDeckState] = useState(deck);

  return (
    <PageWrapper>
      <TextInput
        label="Deck Name"
        value={deckState.name}
        onChange={newName => setDeckState(assoc("name", newName))}
      />
      <SectionHeader
        rightButton={
          <Ionicons
            name="ios-add"
            size={24}
            style={{ color: blue, paddingLeft: 16, paddingRight: 16 }}
            onPress={() =>
              navigation.navigate("AddNotecard", {
                deck: deckState
              })
            }
          />
        }
      >
        Notecards
      </SectionHeader>
      {deckState.notecards.length ? (
        <FlatList
          data={deckState.notecards}
          renderItem={({ item }) => (
            <ListItem subText={item.description}>{item.term}</ListItem>
          )}
          keyExtractor={prop("term")}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>
          This deck has no notecards. Add notecards by pressing the add button
        </Text>
      )}
    </PageWrapper>
  );
};
