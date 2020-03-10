import React from "react";
import styled from "styled-components";
import {
  View as RNView,
  Text as RNText,
  TextInput as RNTextInput,
  TextInputProps,
  Button as RNButton
} from "react-native";
import { text, borderColor } from "../../utils/colors";

export const View = styled(RNView)``;
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

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type TextInputType = Overwrite<
  TextInputProps,
  { onChange: (newValue: string) => void }
>;

export const TextInput = ({
  label,
  value,
  onChange,
  ...rest
}: TextInputType & {
  label?: string;
  value: string;
}) => (
  <>
    {!!label && <Text style={{ paddingBottom: 4 }}>{label}</Text>}
    <Input {...rest} onChangeText={onChange} value={value} />
  </>
);

export const Button = styled(RNButton)`
  font-size: 12px;
`;
