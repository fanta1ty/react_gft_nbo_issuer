import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, type MenuProps } from "@mui/material";
import { useAuthContext } from "@/router/Auth";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router/routes";

export type Props = MenuProps & { handleClose: () => void };

const UserSectionMenu: FC<Props> = ({ handleClose, ...rest }) => {
  const { isAdmin, logout } = useAuthContext();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const onClickLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Menu
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      {...rest}
    >
      <MenuItem onClick={() => navigate(AppRoutes.PROFILE)}>
        {t("my_profile")}
      </MenuItem>
      <Divider sx={{ mx: 2 }} />
      <MenuItem onClick={() => navigate(AppRoutes.ISSUER_REPRESENTATIVE)}>
        {t("my_issuer_profile")}
      </MenuItem>
      {isAdmin && (
        <>
          <Divider sx={{ mx: 2 }} />
          <MenuItem onClick={() => navigate(AppRoutes.ISSUER_USER_MANAGEMENT)}>
            {t("user_section_menu_user_management_Lbl")}
          </MenuItem>{" "}
        </>
      )}
      <Divider sx={{ mx: 2 }} />
      <MenuItem onClick={onClickLogout}>{t("button_logoutText")}</MenuItem>
    </Menu>
  );
};

export default UserSectionMenu;
