import { atom } from "recoil";

export const recentSearchesState = atom({
  key: 'recentSearches',
  default: [],
});
