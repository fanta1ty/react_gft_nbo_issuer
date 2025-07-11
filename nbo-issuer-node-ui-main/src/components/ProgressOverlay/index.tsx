import { CircularProgress, Stack } from "@mui/material";
import { FC } from "react";

type Props = {
  show?: boolean;
};

const ProgressOverlay: FC<Props> = ({ show }) => {
  if (!show) {
    return null;
  }
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default ProgressOverlay;
