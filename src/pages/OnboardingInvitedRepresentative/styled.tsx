import { Button, styled } from "@mui/material";

export const Header = styled("div")(({ theme }) => ({
  height: 72,
  padding: "22px 32px",
  backgroundColor: theme.palette.custom.dark[0],
}));

export const Content = styled("div")(({ theme }) => ({
  position: "relative",
  border: `2px dashed ${theme.palette.custom.dark[8]}`,
  borderRadius: "12px",
  display: "flex",
  padding: theme.spacing(3),
  gap: 12,
}));

export const ConnectButton = styled(Button)(() => ({
  backgroundColor: "#2CA569",
}));
export const SuccessContent = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  display: "flex",
  padding: theme.spacing(3),
  gap: 12,
  marginBottom: 24,
  backgroundColor: theme.palette.custom.positive[1],
}));
