import { Badge, IconButton } from "@mui/material";
import { ReactComponent as IconNotification } from "@/assets/icons/ic_notification.svg";

const UserNotifications = () => {
  return (
    <Badge
      color="success"
      variant="dot"
      invisible={false}
      overlap="rectangular"
      badgeContent=" "
      sx={{ span: { top: "3px", right: "3px" } }}
    >
      <IconButton
        sx={{
          backgroundColor: "unset",
        }}
      >
        <IconNotification width={24} height={24} />
      </IconButton>
    </Badge>
  );
};

export default UserNotifications;
