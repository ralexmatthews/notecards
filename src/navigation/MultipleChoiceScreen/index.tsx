import React, { useMemo, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Route, NavigationProp } from "@react-navigation/native";
import { View, Text } from "../../components/react-native-defaults";
import { useDeck } from "../../context/decks";
import { ScrollView, Dimensions } from "react-native";
import { backgroundAccent } from "../../utils/colors";
import { MultipleChoiceCard } from "../../components/MultipleChoiceCard";
import { update } from "ramda";
import { positiveHeaderButtonStyles } from "../../utils/navigation";

const CardWrapper = styled(View)`
  height: 95%;
  padding: 20px;
`;
const Card = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 20px;
  background-color: ${backgroundAccent};
`;

export interface EditNotecardRoute extends Route<any> {
  params: {
    deckName: string;
    cardCount: number;
  };
}

export const MultipleChoiceScreen = ({
  navigation,
  route
}: {
  navigation: NavigationProp<any, any>;
  route: EditNotecardRoute;
}) => {
  const { width } = Dimensions.get("window");
  const [deck] = useDeck(route.params.deckName);
  const deckToQuiz = useMemo(
    () =>
      [...deck.notecards]
        .sort((_, __) => Math.random() - 0.5)
        .slice(0, route.params.cardCount),
    []
  );
  const [answers, setAnswers] = useState(deckToQuiz.map(() => null));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="ios-checkmark"
          {...positiveHeaderButtonStyles}
          onPress={() => {
            console.log("done");
          }}
        />
      )
    });
  }, [navigation]);

  return (
    <ScrollView style={{ height: "100%" }} horizontal pagingEnabled>
      {deckToQuiz.map((notecard, index) => (
        <MultipleChoiceCard
          answer={answers[index]}
          setAnswer={notecard => setAnswers(update(index, notecard))}
          deckName={deck.name}
          notecard={notecard}
        />
      ))}
    </ScrollView>
  );
};
