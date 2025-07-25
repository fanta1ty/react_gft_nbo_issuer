import { MouseEvent, useState } from "react";
import { Grid, Avatar, Chip, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/router/Auth";
// import UserNotifications from "./UserNotifications";
import UserSectionMenu from "./UserSectionMenu";
import avatarIssuer from "@/assets/images/avatar-issuer.png";

const UserSection = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { firstName, lastName } = useAuthContext();

  const username = firstName && lastName ? `${firstName} ${lastName}` : "";

  const menuId = "user-menu";

  return (
    <Grid item display="flex" alignItems="center">
      <Grid container direction="row" gap={2}>
        {/* <Grid item>
          <UserNotifications />
        </Grid> */}

        <Grid item>
          <Button
            variant="text"
            sx={(theme) => ({
              borderRadius: "5px",
              border: "none",
              background: "none",
              p: "4px",
              "&:hover": {
                backgroundColor: theme.palette.custom.blue[2],
              },
              ".MuiTouchRipple-root": {
                color: "rgba(0, 0, 0, 0.54)",
              },
            })}
            id={`${menuId}-button`}
            aria-controls={open ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Grid container direction="row" gap={1}>
              <Grid item display="flex" alignItems="center">
                <Avatar alt="User Avatar" src={avatarIssuer} />
              </Grid>

              <Grid item>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Typography variant="text14" color="custom.dark.6">
                      {username}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Chip
                      label={t("user_section_issuer_Lbl")}
                      color="default"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Button>
          <UserSectionMenu
            handleClose={handleClose}
            anchorEl={anchorEl}
            id={menuId}
            open={open}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserSection;
