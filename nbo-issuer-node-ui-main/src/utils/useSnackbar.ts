import { GlobalSnackbarType, globalSnackbarState } from "@/recoil/atoms";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

type OptionsType = {
  severity: GlobalSnackbarType["severity"];
};

const useSnackbar = () => {
  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);

  const show = useCallback(
    (
      message: GlobalSnackbarType["message"],
      options: OptionsType = { severity: "success" },
    ) => {
      setGlobalSnackbar({ message, severity: options.severity });
    },
    [setGlobalSnackbar],
  );

  return { show };
};

export default useSnackbar;
