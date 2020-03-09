import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback } from "react-native";
import FlipCard from "react-native-flip-card";
import { Card } from "../Card";
import { Text, View } from "../react-native-defaults";
import { backgroundAccent } from "../../utils/colors";
import { not } from "ramda";

const CenteredView = styled(View)`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundAccent};
`;
const LargeText = styled(Text)`
  font-size: 24px;
  text-align: center;
`;

export const GuessingNotecard = ({
  term,
  answer
}: {
  term: string;
  answer: string;
}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setPressed(not)}>
      <FlipCard flipHorizontal flipVertical={false} flip={pressed}>
        <Card>
          <CenteredView>
            <LargeText>{term}</LargeText>
          </CenteredView>
        </Card>
        <Card>
          <CenteredView>
            <LargeText>{answer}</LargeText>
          </CenteredView>
        </Card>
      </FlipCard>
    </TouchableWithoutFeedback>
  );
};
