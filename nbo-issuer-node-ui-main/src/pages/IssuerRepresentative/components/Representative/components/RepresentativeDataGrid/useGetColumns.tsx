import { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  styled,
  type MenuProps,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { ReactComponent as MoreIcon } from "@/assets/icons/ic_more.svg";
import { RepresentativeType } from "@/api/useGetRePresentative";
import StatusTag from "../StatusTag";
import { dark } from "@/theme/colors";
import { RepresentativeStatus } from "@/constants";
import avatarIssuer from "@/assets/images/avatar-issuer.png";
import { type ShowFn, useModal } from "mui-modal-provider";
import ResetEmailModal from "./ResetEmailModal";
import ResetPasswordModal from "./ResetPasswordModal";
import ChangeRoleModal from "./ChangeRoleModal";
import BlacklistModal from "./BacklistModal";
import DeleteModal from "./DeleteModal";
import WhitelistModal from "./WhitelistModal";

const menuId = "representative-menu";
type MenuParams = {
  handleClose: () => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  openId: string;
  setOpenId: (id: string) => void;
  showModal: ShowFn;
} & MenuProps;

const columns = (
  t: TFunction,
  menuProps: MenuParams,
): GridColDef<RepresentativeType>[] => [
  {
    field: "name",
    headerName: t("th_certificateName"),
    disableColumnMenu: true,
    minWidth: 250,
    renderCell({ row }) {
      return (
        <Box display={"flex"} gap={1} sx={{ marginLeft: 1 }}>
          <Avatar alt="User Avatar" src={avatarIssuer} />
          <Typography
            variant="text14"
            whiteSpace="pre-wrap"
            textTransform="capitalize"
            fontWeight={400}
            lineHeight={3.5}
            sx={{
              overflowWrap: "anywhere",
            }}
          >
            {`${row.firstName} ${row.lastName}`}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "role",
    headerName: t("role"),
    flex: 0.5,
    disableColumnMenu: true,
    minWidth: 200,
    renderCell({ row }) {
      return (
        <Typography
          variant="text14"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          fontWeight={400}
        >
          {row.isAdmin ? t("super_representative") : t("representative")}
        </Typography>
      );
    },
  },
  {
    field: "email",
    headerName: t("input_emailLabel"),
    flex: 0.5,
    disableColumnMenu: true,
    minWidth: 200,
    sortComparator: (v1, v2) => {
      return v1.getDate() - v2.getDate();
    },
    renderCell({ row }) {
      return (
        <Typography
          variant="text14"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          fontWeight={400}
          sx={{
            overflowWrap: "anywhere",
          }}
        >
          {row.email}
        </Typography>
      );
    },
  },
  {
    field: "phone",
    headerName: t("input_phoneLabel"),
    flex: 0.5,
    disableColumnMenu: true,
    minWidth: 150,
    renderCell({ row }) {
      return (
        <Typography
          variant="text14"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          fontWeight={400}
        >
          {row.phone}
        </Typography>
      );
    },
  },
  {
    field: "status",
    headerName: t("th_studentStatus"),
    flex: 0.5,
    disableColumnMenu: true,
    minWidth: 100,
    renderCell({ row }) {
      return <StatusTag type={row.status} />;
    },
  },
  {
    field: "action",
    headerName: "",
    flex: 0.5,
    minWidth: 200,
    sortable: false,
    disableColumnMenu: true,
    renderCell({ row }) {
      const showModal = menuProps.showModal;
      const handleResetEmail = () => {
        const modal = showModal(ResetEmailModal, {
          onClose: () => {
            modal.hide();
            menuProps.handleClose();
          },
          name: `${row.firstName} ${row.lastName}`,
        });
      };
      const handleResetPassword = () => {
        const modal = showModal(ResetPasswordModal, {
          onClose: () => {
            modal.hide();
            menuProps.handleClose();
          },
          userId: row.id,
          name: `${row.firstName} ${row.lastName}`,
        });
      };
      const handleChangeRole = () => {
        const modal = showModal(ChangeRoleModal, {
          onClose: () => {
            modal.hide();
            menuProps.handleClose();
          },
          name: `${row.firstName} ${row.lastName}`,
        });
      };
      const handleBlackList = () => {
        const modal = showModal(BlacklistModal, {
          onClose: () => {
            modal.hide();
            menuProps.handleClose();
          },
          userId: row.id,
          name: `${row.firstName} ${row.lastName}`,
        });
      };
      const handleWhiteList = () => {
        const modal = showModal(WhitelistModal, {
          onClose: () => {
            modal.hide();
            menuProps.handleClose();
          },
          userId: row.id,
          name: `${row.firstName} ${row.lastName}`,
        });
      };
      const handleDelete = () => {
        const modal = showModal(DeleteModal, {
          onClose: () => {
            modal.hide();
            menuProps.handleClose();
          },
          userId: row.id,
          name: `${row.firstName} ${row.lastName}`,
        });
      };
      return (
        <Box display="flex" justifyContent={"space-between"} width={"100%"}>
          <Box>
            {row.status === RepresentativeStatus.EXPIRED ? (
              <Button size="small" sx={{ backgroundColor: dark[6], mt: 1 }}>
                {t("resend_btn")}
              </Button>
            ) : null}
          </Box>
          <StyledIconButton
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
            id={`${row.id}`}
            aria-controls={menuProps.open ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={menuProps.open ? "true" : undefined}
            onClick={(e) => {
              menuProps.setOpenId(row.id);
              menuProps.handleClick(e);
            }}
          >
            <MoreIcon />
          </StyledIconButton>
          <Menu
            hideBackdrop
            onClose={menuProps.handleClose}
            onClick={menuProps.handleClose}
            anchorEl={menuProps.anchorEl}
            id={menuId}
            open={menuProps.open && menuProps.openId === row.id}
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
          >
            <MenuItem
              onClick={handleResetEmail}
              sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}
            >
              {t("reset_email")}
            </MenuItem>
            <Divider sx={{ mx: 2 }} />
            <MenuItem
              onClick={handleResetPassword}
              sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}
            >
              {t("reset_password")}
            </MenuItem>
            <Divider sx={{ mx: 2 }} />
            <MenuItem
              onClick={handleChangeRole}
              sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}
            >
              {t("change_role")}
            </MenuItem>
            <Divider sx={{ mx: 2 }} />
            {row.status === "blacklisted" ? (
              <MenuItem
                onClick={handleWhiteList}
                sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}
              >
                {t("whitelist")}
              </MenuItem>
            ) : (
              <MenuItem
                onClick={handleBlackList}
                sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}
              >
                {t("blacklist")}
              </MenuItem>
            )}
            <Divider sx={{ mx: 2 }} />
            <MenuItem
              onClick={handleDelete}
              sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}
            >
              {t("delete")}
            </MenuItem>
          </Menu>
        </Box>
      );
    },
  },
];

const useGetColumns = () => {
  const { showModal } = useModal();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openId, setOpenId] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return useMemo(
    () =>
      columns(t, {
        open,
        handleClick,
        handleClose,
        anchorEl,
        openId,
        setOpenId,
        showModal,
      }),
    [t, anchorEl, open, openId],
  );
};

const StyledIconButton = styled(IconButton)(() => ({
  border: "1px solid #E3E6ED !important",
  backgroundColor: "#F3F5F7 !important",
}));

export default useGetColumns;
