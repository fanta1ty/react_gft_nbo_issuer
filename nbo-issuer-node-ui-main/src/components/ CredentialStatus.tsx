import { CREDENTIAL_STATUS } from "@/constants";
import { blue, dark, negative, positive, warning } from "@/theme/colors";
import { useMemo } from "react";
import { Box, styled } from "@mui/material";

const CredentialStatus = ({ status }: { status: string }) => {
  const color = useMemo(() => {
    switch (status) {
      case CREDENTIAL_STATUS.PENDING:
        return warning[6];
      case CREDENTIAL_STATUS.ASSIGNED:
        return positive[6];
      case CREDENTIAL_STATUS.REVOKED:
        return negative[6];
      case CREDENTIAL_STATUS.EXPIRED:
        return blue[6];
      default:
        return dark[6];
    }
  }, [status]);

  return (
    <Box display={"flex"} gap={1}>
      <StyledDiv style={{ backgroundColor: color }} />
      {status}
    </Box>
  );
};
const StyledDiv = styled("div")(() => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  marginTop: 6,
}));
export default CredentialStatus;
