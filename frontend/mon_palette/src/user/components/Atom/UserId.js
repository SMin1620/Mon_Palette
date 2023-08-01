import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist(); //

export const userId = atom({
	key: "userId",
	default: false,
	effects_UNSTABLE: [persistAtom],
});
