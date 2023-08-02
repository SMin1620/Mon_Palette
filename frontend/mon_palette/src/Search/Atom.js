import { atom } from "recoil";

export const recentSearchesState = atom({
  key: 'recentSearches',
  default: [],
});

export const resultsState = atom({
  key: 'resultsState',
  default: [],
});
