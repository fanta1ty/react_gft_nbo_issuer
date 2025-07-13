import { List, ListItem, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import WalletConnectRequestedImg from "@/assets/images/wallet_connect_requested.png";
import { Stack } from "@mui/system";

export const ConnectionRequested = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
        }}
      >
        {t("onboarding_connect_requested_modal_title")}
      </Typography>
      <Typography
        variant="text14"
        fontWeight={"normal"}
        sx={{
          mb: 3.5,
          textAlign: "center",
        }}
      >
        {t("onboarding_connect_requested_modal_description")}
      </Typography>
      <img
        src={WalletConnectRequestedImg}
        width={360}
        style={{
          borderRadius: 12,
          marginBottom: 16,
        }}
      />
      <List
        sx={{
          marginBottom: 7,
          listStyleType: "disc",
        }}
      >
        <ListItem disableGutters sx={{ display: "list-item" }}>
          <Typography variant="text14" fontWeight={"normal"}>
            {t("onboarding_connect_requested_modal_instruction_1")}
          </Typography>
        </ListItem>
        <ListItem disableGutters sx={{ display: "list-item" }}>
          <Typography variant="text14" fontWeight={"normal"}>
            {t("onboarding_connect_requested_modal_instruction_2")}
          </Typography>
        </ListItem>
      </List>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography
          variant="text14"
          fontWeight={"normal"}
          sx={{
            textAlign: "center",
          }}
        >
          {t("onboarding_connect_requested_modal_cant_find_notification")}
        </Typography>
        <Button
          variant="text"
          size="small"
          sx={{
            paddingLeft: 1,
          }}
        >
          {t("onboarding_connect_requested_modal_resend")}
        </Button>
      </Stack>
    </>
  );
};
