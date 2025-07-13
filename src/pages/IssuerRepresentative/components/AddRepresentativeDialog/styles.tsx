import { Box, styled, RadioGroup, FormControlLabel } from "@mui/material";

export const OptionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  padding: theme.spacing(2.5, 3),
  borderRadius: 12,
  border: `1px solid ${theme.palette.custom.blue[2]}`,
  minHeight: 88,
}));

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2.5),
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 400,
  marginRight: 0,
}));
