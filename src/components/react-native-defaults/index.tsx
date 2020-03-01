import React from "react";
import styled from "styled-components";
import {
  View as RNView,
  Text as RNText,
  TextInput as RNTextInput,
  Button as RNButton
} from "react-native";
import { text, background, borderColor } from "../../utils/colors";

export const View = styled(RNView)`
  background-color: ${background};
`;
export const Text = styled(RNText)`
  color: ${text};
  font-size: 16px;
`;
export const Input = styled(RNTextInput)`
  color: ${text};
  border: solid;
  border-width: 1px;
  border-color: ${borderColor};
  padding: 8px;
  border-radius: 8px;
  font-size: 16px;
`;

export const TextInput = ({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  multiline?: boolean;
}) => (
  <>
    <Text style={{ paddingBottom: 4 }}>{label}</Text>
    <Input {...rest} onChangeText={onChange} value={value} />
  </>
);

export const Button = styled(RNButton)`
  font-size: 12px;
`;
