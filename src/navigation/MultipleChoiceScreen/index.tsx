import React, { useMemo, useState, useLayoutEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Route, NavigationProp } from "@react-navigation/native";
import { useDeck } from "../../context/decks";
import { ScrollView, Dimensions, Alert } from "react-native";
import { MultipleChoiceCard } from "../../components/MultipleChoiceCard";
import { update, zip } from "ramda";
import { positiveHeaderButtonStyles } from "../../utils/navigation";

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
  const ref = useRef();
  const [graded, setGraded] = useState(false);
  const currentPageRef = useRef(0);
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
          onPress={async () => {
            const numberOfRightAnswers = zip(answers, deckToQuiz).filter(
              ([answer, correctAnswer]) => answer?.term === correctAnswer.term
            ).length;
            new Promise((res, rej) => {
              if (answers.some(v => !v)) {
                Alert.alert(
                  "Unfinished Quiz",
                  "You have unanswered questions. Are you sure you want to submit?",
                  [
                    {
                      text: "Submit Answers",
                      style: "destructive",
                      onPress: res
                    },
                    {
                      text: "Answer Questions",
                      onPress: rej
                    }
                  ]
                );
              } else {
                res();
              }
            })
              .then(() => {
                setGraded(true);

                Alert.alert(
                  "Results",
                  `You have gotten ${numberOfRightAnswers}/${
                    deckToQuiz.length
                  } correct, giving a score of ${(
                    (numberOfRightAnswers / deckToQuiz.length) *
                    100
                  ).toFixed(1)}%.`
                );
              })
              .catch(() => {});
          }}
        />
      )
    });
  }, [navigation, answers]);

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
      {deckToQuiz.map((notecard, index) => (
        <MultipleChoiceCard
          key={notecard.term}
          graded={graded}
          answer={answers[index]}
          setAnswer={notecard => {
            if (currentPageRef.current < deckToQuiz.length) {
              ref.current?.scrollTo({
                x: width * (currentPageRef.current + 1)
              });
            }
            setAnswers(update(index, notecard));
          }}
          deckName={deck.name}
          notecard={notecard}
        />
      ))}
    </ScrollView>
  );
};
