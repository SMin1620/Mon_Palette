import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist(); //

export const isOAuth = atom({
	key: "isOAuth",
	default: false,
	effects_UNSTABLE: [persistAtom],
});
