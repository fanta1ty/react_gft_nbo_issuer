import { CasbinState } from "@/types";
import { atom, selector } from "recoil";

export const casbinState = atom<CasbinState>({
  key: "casbinState",
  default: {
    isInitialized: false,
    isLoading: false,
    error: null,
    currentUser: null,
    authorizer: null,
  },
});

export const casbinUserSelector = selector({
  key: "casbinUserSelector",
  get: ({ get }) => {
    const casbin = get(casbinState);
    return {
      isReady: casbin.isInitialized && !casbin.isLoading && !casbin.error,
      currentUser: casbin.currentUser,
      hasError: !!casbin.error,
      error: casbin.error,
    };
  },
});
