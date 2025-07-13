import { RepresentativeStatus } from "@/constants";
import { blue, negative, positive } from "@/theme/colors";
import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

const StatusTag = ({
  type = RepresentativeStatus.ACTIVE,
}: {
  type?: RepresentativeStatus;
}) => {
  const [statusColor, setStatusColor] = useState({
    text: "",
    background: "",
    dot: "",
  });
  const getColor = useCallback(() => {
    switch (type) {
      case RepresentativeStatus.INVITED:
        setStatusColor({
          text: blue[10],
          background: blue[2],
          dot: blue[6],
        });
        break;
      case RepresentativeStatus.ACTIVE:
        setStatusColor({
          text: positive[10],
          background: positive[2],
          dot: positive[6],
        });
        break;
      default:
        setStatusColor({
          text: negative[10],
          background: negative[2],
          dot: negative[6],
        });
        break;
    }
  }, [type]);
  const statusText = useMemo(() => {
    switch (type) {
      case RepresentativeStatus.INVITED:
        return "Invited";
      case RepresentativeStatus.ACTIVE:
        return "Active";
      case RepresentativeStatus.EXPIRED:
        return "Invitation Expired";
      default:
        return "Blacklisted";
    }
  }, [type]);

  useEffect(() => {
    getColor();
  }, [getColor]);
  return (
    <Box
      display={"flex"}
      gap={1}
      justifyContent={"space-between"}
      height={32}
      sx={{
        padding: 1.5,
        backgroundColor: statusColor.background,
        lineHeight: "8px",
        borderRadius: 2,
        border: `1px solid ${statusColor.dot}`,
      }}
    >
      <Box
        width={8}
        height={8}
        sx={{ backgroundColor: statusColor.dot, borderRadius: "50%" }}
      />
      {statusText}
    </Box>
  );
};

export default StatusTag;
