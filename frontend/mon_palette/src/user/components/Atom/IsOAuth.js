import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const IsOAuth = atom({
	key: "IsOAuth",
	default: false,
	effects_UNSTABLE: [persistAtom],
});
