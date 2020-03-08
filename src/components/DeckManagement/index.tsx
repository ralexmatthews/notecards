import React, { useState, useLayoutEffect } from "react";
import { assoc, prop, update, equals } from "ramda";
import { FlatList, Alert } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { TextInput, Text, Button, View } from "../react-native-defaults";
import { Deck, Notecard, useDecksContext } from "../../context/decks";
import { PageWrapper } from "../PageWrapper";
import { SectionHeader } from "../SectionHeader";
import { ListItem } from "../ListItem";
import { blue } from "../../utils/colors";
import { NavigationProp } from "@react-navigation/native";
import { Space, Sizes } from "../Space";
import { positiveHeaderButtonStyles } from "../../utils/navigation";
import { useCreateNavigationValue } from "../../context/navigation";

export const DeckManagement = ({
  deck,
  onCommit,
  navigation
}: {
  deck: Deck;
  onCommit: (deck: Deck) => void;
  navigation: NavigationProp<any, any>;
}) => {
  const [decks] = useDecksContext();
  const [deckState, setDeckState] = useState(deck);
  const createNavigationValue = useCreateNavigationValue();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Entypo
          size={42}
          style={{ marginBottom: 8, color: blue }}
          name="chevron-small-left"
          onPress={() => {
            if (equals(deckState, deck)) {
              navigation.goBack();
            } else {
              Alert.alert(
                "Unsaved Changes",
                "You have unsaved changes. Are you sure you want to lose your changes?",
                [
                  {
                    text: "Go Back",
                    style: "destructive",
                    onPress: () => navigation.goBack()
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => {}
                  }
                ]
              );
            }
          }}
        />
      ),
      headerRight: () => (
        <Ionicons
          name="ios-checkmark"
          {...positiveHeaderButtonStyles}
          onPress={() => {
            const duplicate =
              deckState.name !== deck.name &&
              !!decks.find(deck => deck.name === deckState.name);
            if (duplicate) {
              Alert.alert(
                "Duplicate Deck",
                "This deck appears to have the same name as another deck."
              );
            } else if (!deckState.name) {
              Alert.alert("Missing Name", `You are missing the deck's name.`);
            } else {
              onCommit(deckState);
            }
          }}
        />
      )
    });
  }, [navigation, deckState]);

  return (
    <PageWrapper as={View}>
      <TextInput
        label="Deck Name"
        value={deckState.name}
        onChange={newName => setDeckState(assoc("name", newName))}
      />
      <Space vertical={Sizes.medium} />
      <SectionHeader
        rightButton={
          <Ionicons
            name="ios-add"
            size={24}
            style={{ color: blue, paddingLeft: 16, paddingRight: 16 }}
            onPress={() =>
              navigation.navigate("AddNotecard", {
                id: createNavigationValue({
                  deck: deckState,
                  onCommit: (newNotecard: Notecard) => {
                    setDeckState(currentDeck => ({
                      ...currentDeck,
                      notecards: currentDeck.notecards.concat(newNotecard)
                    }));
                    navigation.goBack();
                  }
                })
              })
            }
          />
        }
      >
        Notecards
      </SectionHeader>
      {deckState.notecards.length ? (
        <FlatList
          style={{ height: "100%" }}
          data={deckState.notecards}
          renderItem={({ item }) => (
            <ListItem
              subText={item.description}
              onPress={() => {
                navigation.navigate("EditNotecard", {
                  id: createNavigationValue({
                    deck: deckState,
                    notecardTerm: item.term,
                    onCommit: (newNotecard: Notecard) => {
                      setDeckState(currentDeck => ({
                        ...currentDeck,
                        notecards: update(
                          currentDeck.notecards.indexOf(item),
                          newNotecard,
                          currentDeck.notecards
                        )
                      }));
                      navigation.goBack();
                    }
                  })
                });
              }}
            >
              {item.term}
            </ListItem>
          )}
          keyExtractor={prop("term")}
        />
      ) : (
        <>
          <Space vertical={Sizes.medium} />
          <Text style={{ textAlign: "center" }}>
            This deck has no notecards. Add notecards by pressing the add button
          </Text>
        </>
      )}
    </PageWrapper>
  );
};
