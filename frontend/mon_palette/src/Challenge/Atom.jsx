import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const [persistAtom] = recoilPersist()

export const isClickedChallenge = atom({
  key: 'clickedChallenge',
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const FollowChallengeList = atom({
  key: 'followChallengeList',
  default: '',
  effects_UNSTABLE: [persistAtom]
})

export const PopularChallengeList = atom({
  key: 'popularChallengeList',
  default: '',
  effects_UNSTABLE: [persistAtom]
})