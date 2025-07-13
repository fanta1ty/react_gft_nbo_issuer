import { ProgressOverlay } from "..";
import { useRecoilValue } from "recoil";
import { globalProgressOverlayShowState } from "@/recoil/atoms";

const GlobalProgressOverlay = () => {
  const isGlobalProgressOverlayShow = useRecoilValue(
    globalProgressOverlayShowState,
  );

  if (!isGlobalProgressOverlayShow) {
    return null;
  }
  return <ProgressOverlay show={isGlobalProgressOverlayShow} />;
};

export default GlobalProgressOverlay;
