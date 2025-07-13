import { styled, Typography } from "@mui/material";

const LineClampTypography = styled(Typography)<{ lines: number }>((props) => ({
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: props.lines,
  WebkitBoxOrient: "vertical",
}));

export default LineClampTypography;
