import { Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import QRCodePlaceHolderImg from "@/assets/images/qr_code_placeholder.png";
import AppleStoreImg from "@/assets/images/download_from_Apple_store.png";
import GooglePlaceImg from "@/assets/images/download_from_Google_play.png";
import { Stack } from "@mui/system";

type Props = {
  initConnectWallet: () => void;
};

export const NoAccountCreated = ({ initConnectWallet }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
        }}
      >
        {t("onboarding_connect_no_account_modal_title")}
      </Typography>
      <Typography
        variant="text14"
        fontWeight={"normal"}
        sx={{
          mb: 3.5,
          textAlign: "center",
        }}
      >
        {t("onboarding_connect_no_account_modal_description")}
      </Typography>
      <img
        src={QRCodePlaceHolderImg}
        width={200}
        style={{
          borderRadius: 12,
          marginBottom: 16,
        }}
      />
      <Typography
        variant="text14"
        fontWeight={"normal"}
        sx={{
          mb: 3.5,
          textAlign: "center",
        }}
      >
        {t("onboarding_connect_no_account_modal_instruction")}
      </Typography>
      <Stack direction={"row"} gap={1.5}>
        <img
          src={AppleStoreImg}
          width={180}
          style={{
            borderRadius: 12,
            marginBottom: 16,
          }}
        />
        <img
          src={GooglePlaceImg}
          width={180}
          style={{
            borderRadius: 12,
            marginBottom: 16,
          }}
        />
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography
          variant="text14"
          fontWeight={"normal"}
          sx={{
            textAlign: "center",
          }}
        >
          {t("onboarding_connect_no_account_modal_already_have_account")}
        </Typography>
        <Button
          variant="text"
          size="small"
          sx={{
            paddingLeft: 1,
            paddingRight: 1,
          }}
          onClick={initConnectWallet}
        >
          {t("onboarding_connect_no_account_modal_connect_here")}
        </Button>
      </Stack>
    </>
  );
};
