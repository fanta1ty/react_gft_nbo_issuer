import { globalProgressOverlayShowState } from "@/recoil/atoms";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

const useProgressOverlay = () => {
  const setIsGlobalProgressOverlayShow = useSetRecoilState(
    globalProgressOverlayShowState,
  );

  const show = useCallback(() => {
    setIsGlobalProgressOverlayShow(true);
  }, [setIsGlobalProgressOverlayShow]);

  const hide = useCallback(() => {
    setIsGlobalProgressOverlayShow(false);
  }, [setIsGlobalProgressOverlayShow]);

  return {
    show,
    hide,
  };
};

export default useProgressOverlay;
