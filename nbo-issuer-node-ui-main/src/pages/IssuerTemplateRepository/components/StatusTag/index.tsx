import { Status } from "@/@types";
import { blue, negative, positive } from "@/theme/colors";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const StatusTag = ({
  type = Status.DRAFT,
  negativeStatus = false,
}: {
  type?: Status;
  negativeStatus?: boolean;
}) => {
  const [statusColor, setStatusColor] = useState({
    text: "",
    background: "",
    dot: "",
  });
  const getColor = useCallback(() => {
    switch (type) {
      case Status.DRAFT:
        setStatusColor({
          text: blue[10],
          background: blue[2],
          dot: blue[6],
        });
        break;
      case Status.INACTIVE:
        if (negativeStatus) {
          setStatusColor({
            text: negative[10],
            background: negative[2],
            dot: negative[6],
          });
        } else {
          setStatusColor({
            text: blue[10],
            background: blue[2],
            dot: blue[6],
          });
        }
        break;
      case Status.ACTIVE:
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
  }, [type, negativeStatus]);

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
      {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
    </Box>
  );
};

export default StatusTag;
