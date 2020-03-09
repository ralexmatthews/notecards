import React, { useRef, useMemo } from "react";
import { NavigationProp, Route } from "@react-navigation/native";
import { Dimensions, ScrollView } from "react-native";
import { useDeck } from "../../context/decks";
import { GuessingNotecard } from "../../components/GuessingNotecard";

export interface EditNotecardRoute extends Route<any> {
  params: {
    deckName: string;
    cardCount: number;
  };
}

export const GuessDescriptionFromTermScreen = ({
  route
}: {
  route: EditNotecardRoute;
}) => {
  const { width } = Dimensions.get("window");
  const ref = useRef();
  const currentPageRef = useRef(0);
  const [deck] = useDeck(route.params.deckName);
  const deckToQuiz = useMemo(
    () =>
      [...deck.notecards]
        .sort((_, __) => Math.random() - 0.5)
        .slice(0, route.params.cardCount),
    []
  );

  return (
    <ScrollView
      ref={ref}
      onScroll={v => {
        currentPageRef.current = Math.round(
          v.nativeEvent.contentOffset.x / width
        );
      }}
      scrollEventThrottle={100}
      style={{ height: "100%" }}
      horizontal
      pagingEnabled
    >
      {deckToQuiz.map(notecard => (
        <GuessingNotecard
          key={notecard.term}
          term={notecard.term}
          answer={notecard.description}
        />
      ))}
    </ScrollView>
  );
};
