import React, { useState } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Route, NavigationProp } from "@react-navigation/native";
import { PageWrapper } from "../../components/PageWrapper";
import { StylishButton } from "../../components/StylishButton";
import { View, Text, TextInput } from "../../components/react-native-defaults";
import { useDeck } from "../../context/decks";
import { text } from "../../utils/colors";
import { inc, compose, clamp, dec, defaultTo } from "ramda";

interface PlaySelectorRoute extends Route<any> {
  params: {
    deckName: string;
  };
}

const CardCountWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;
const Icon = styled(Ionicons)`
  color: ${text};
  padding: 0 16px;
  margin: 0 16px;
`;

const toString = (v: number | string) => v.toString();

export const PlaySelectorScreen = ({
  navigation,
  route
}: {
  navigation: NavigationProp<any, any>;
  route: PlaySelectorRoute;
}) => {
  const [deck] = useDeck(route.params.deckName);
  const [cardCount, setCardCount] = useState(`${deck.notecards.length}`);

  return (
    <PageWrapper>
      <CardCountWrapper>
        <Text>Number of cards:</Text>
        <Icon
          onPress={() =>
            setCardCount(
              compose(
                toString,
                clamp(1, deck.notecards.length),
                dec,
                defaultTo(1),
                Number
              )
            )
          }
          name="md-arrow-dropleft"
          size={42}
          style={{ color: text }}
        />
        <TextInput
          value={`${cardCount}`}
          onBlur={() =>
            setCardCount(
              compose(
                toString,
                clamp(1, deck.notecards.length),
                defaultTo(1),
                Number
              )
            )
          }
          onChange={compose(setCardCount, (v: string) => v.substr(0, 5))}
        />
        <Icon
          onPress={() =>
            setCardCount(
              compose(
                toString,
                clamp(1, deck.notecards.length),
                inc,
                defaultTo(1),
                Number
              )
            )
          }
          name="md-arrow-dropright"
          size={42}
          style={{ color: text }}
        />
      </CardCountWrapper>
      {Number(cardCount) >= 4 && (
        <StylishButton
          onPress={() =>
            navigation.navigate("MultipleChoice", {
              deckName: deck.name,
              cardCount: Number(cardCount)
            })
          }
          title="Multiple Choice"
        />
      )}
      <StylishButton
        onPress={() =>
          navigation.navigate("", {
            deckName: deck.name,
            cardCount: Number(cardCount)
          })
        }
        title="Guess Description From Term"
      />
      <StylishButton
        onPress={() =>
          navigation.navigate("", {
            deckName: deck.name,
            cardCount: Number(cardCount)
          })
        }
        title="Guess Term From Description"
      />
    </PageWrapper>
  );
};
