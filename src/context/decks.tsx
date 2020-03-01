import React, { useContext, useState, useEffect, useMemo } from "react";
import { AsyncStorage } from "react-native";
import { adjust, update } from "ramda";

export type Notecard = {
  term: string;
  description: string;
};
export type Deck = {
  name: string;
  notecards: Array<Notecard>;
};

const DECKS_ASYNC_KEY = "decks";

const DecksContext = React.createContext<
  [Deck[], React.Dispatch<React.SetStateAction<Deck[]>>]
>([[], () => {}]);

export const DecksContextProvider = (props: any) => {
  const [decks, setDecks] = useState<Array<Deck>>([]);

  useEffect(() => {
    AsyncStorage.getItem(DECKS_ASYNC_KEY).then(decks => {
      if (decks) {
        setDecks(JSON.parse(decks));
      }
    });
  }, []);

  return (
    <DecksContext.Provider
      {...props}
      value={[
        decks,
        (decks: Deck[]) => {
          AsyncStorage.setItem(DECKS_ASYNC_KEY, JSON.stringify(decks));
          setDecks(decks);
        }
      ]}
    />
  );
};

export const useDecksContext = () => useContext(DecksContext);

export const useDeck = (
  name: string
): [Deck, (value: ((deck: Deck) => Deck) | Deck) => void] => {
  const [decks, setDecks] = useDecksContext();

  const deckIndexToUse = useMemo(
    () => decks.findIndex(deck => deck.name === name),
    [decks, name]
  );

  return [
    decks[deckIndexToUse],
    (value: ((deck: Deck) => Deck) | Deck) =>
      setDecks(decks =>
        typeof value === "function"
          ? adjust(deckIndexToUse, value, decks)
          : update(deckIndexToUse, value, decks)
      )
  ];
};
