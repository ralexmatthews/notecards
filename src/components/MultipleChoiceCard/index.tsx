import React, { useMemo } from "react";
import styled from "styled-components";
import { Notecard, useDeck } from "../../context/decks";
import { Text, View } from "../react-native-defaults";
import { backgroundAccent } from "../../utils/colors";
import { Dimensions } from "react-native";
import { Space, Sizes } from "../Space";
import { StylishButton } from "../StylishButton";
import { insert } from "ramda";

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
const QuestionTitle = styled(Text)`
  font-size: 24px;
`;

export const MultipleChoiceCard = ({
  notecard,
  deckName,
  answer,
  setAnswer,
  graded
}: {
  notecard: Notecard;
  deckName: string;
  answer: Notecard | null;
  setAnswer: (answer: Notecard) => void;
  graded: boolean;
}) => {
  const { width } = Dimensions.get("window");
  const [deck] = useDeck(deckName);
  const options = useMemo(
    () =>
      insert(
        Math.round(Math.random() * 3),
        notecard,
        [...deck.notecards]
          .sort((_, __) => Math.random() - 0.5)
          .reduce<Notecard[]>(
            (acc, currentNotecard) =>
              acc.length < 3 && notecard.term !== currentNotecard.term
                ? [...acc, currentNotecard]
                : acc,
            []
          )
      ),
    []
  );

  return (
    <CardWrapper style={{ width }}>
      <Card>
        <QuestionTitle>{notecard.description}</QuestionTitle>
        <Space
          vertical={Sizes.large}
          style={{ backgroundColor: backgroundAccent }}
        />
        {options.map(option => (
          <StylishButton
            active={
              graded
                ? option.term === notecard.term
                : !!answer && answer.term === option.term
            }
            wrong={
              graded &&
              option.term === answer?.term &&
              notecard.term !== answer.term
            }
            key={option.term}
            onPress={() => !graded && setAnswer(option)}
            title={option.term}
          />
        ))}
      </Card>
    </CardWrapper>
  );
};
