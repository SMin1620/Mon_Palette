import { atom } from "recoil";

export const modalState = atom({
	key: "modalState",
	default: false,
});

// 최근 검색어를 담을 atom
export const recentSearchesState = atom({
  key: 'recentSearches',
  default: [],
});
