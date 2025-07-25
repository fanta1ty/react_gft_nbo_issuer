import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  IconButton,
  Stack,
  Box,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import type { DialogProps } from "@mui/material";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { ReactComponent as LogoIcon } from "@/assets/icons/wallet_logo.svg";
import QRCodePlaceHolderImg from "@/assets/images/qr_code_placeholder.png";
import { useEffect, useMemo, useRef, useState } from "react";
import { ConnectionRequested } from "./ConnectionRequested";
import { NoAccountCreated } from "./NoAccountCreated";
import useGetOnboardingQRCode from "@/api/useGetOnboardingQRCode";
import QRCode from "react-qr-code";
import useGetOnboardingQRCodeApprovalStatus, {
  ResponseType,
} from "@/api/useGetOnboardingQRCodeApprovalStatus";
import { type InferType } from "yup";
import schema from "../schema";
import { useLocation } from "react-router-dom";

type Props = DialogProps & {
  setValue: (v: InferType<typeof schema>["personalDetails"]) => void;
  getValue: () => InferType<typeof schema>["personalDetails"];
  setConnected: () => void;
};

const ConnectWalletDialog = ({
  setValue,
  getValue,
  onClose,
  setConnected,
  ...dialogProps
}: Props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionIdQueryParam = searchParams.get("sessionId");
  const [isConnectRequestSent, setIsConnectRequestSent] = useState(false);
  const [isNoAccountCreated, setIsNoAccountCreated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { data: qrCodeResponse, isFetching } = useGetOnboardingQRCode(
    sessionIdQueryParam ?? undefined
  );
  const checkOnboardApproval = useGetOnboardingQRCodeApprovalStatus();
  const checkApprovalInterval = useRef<NodeJS.Timeout>();

  const sessionId =
    qrCodeResponse?.callback.split("session=").slice(-1)[0] ?? "";

  const handleSuccessApproved = (data: ResponseType) => {
    const fields = data.verifiedFields ?? [];
    const firstName =
      fields.find((field) => field.fieldName === "firstName")?.fieldValue ?? "";
    const lastName =
      fields.find((field) => field.fieldName === "lastName")?.fieldValue ?? "";
    const dob = fields.find((field) => field.fieldName === "dateOfBirth")
      ?.fieldValue;
    const dobObj = dob ? new Date(dob) : null;
    const email =
      fields.find((field) => field.fieldName === "email")?.fieldValue ?? "";
    const country =
      fields.find((field) => field.fieldName === "country")?.fieldValue ?? "";
    const nationId =
      fields.find((field) => field.fieldName === "nationalID")?.fieldValue ??
      "";
    const phoneNumber =
      fields.find((field) => field.fieldName === "phoneNumber")?.fieldValue ??
      "";

    setValue({
      firstName,
      lastName,
      dateOfBirth: dobObj,
      email,
      nationality: country,
      nationalId: nationId,
      phone: phoneNumber,
      confirmPassword: getValue().confirmPassword,
      password: getValue().password,
      avatar: null,
      did: data.did,
      sessionId,
    });
    setConnected();
    handleClose();
  };

  const handleInitConnection = () => {
    setIsNoAccountCreated(false);
    setIsConnectRequestSent(false);
  };

  const handleGetStarted = () => {
    setIsNoAccountCreated(true);
  };

  const handleClose = () => {
    onClose?.({}, "backdropClick");
  };

  const FormModalContent = useMemo(
    () => (
      <>
        {isVerifying && (
          <Box
            sx={{
              zIndex: 1000,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "custom.dark.10",
              opacity: 0.8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Typography
          variant="h6"
          sx={{
            mb: 2,
          }}
        >
          {t("onboarding_connect_modal_title")}
        </Typography>
        <List
          component={"ol"}
          sx={{
            marginBottom: 1.5,
            listStyleType: "number",
          }}
        >
          <ListItem disableGutters sx={{ display: "list-item", p: 0 }}>
            <Typography variant="text14" fontWeight={"normal"}>
              {t("onboarding_connect_modal_íntruction_1")}
            </Typography>
          </ListItem>
          <ListItem disableGutters sx={{ display: "list-item", p: 0 }}>
            <Typography variant="text14" fontWeight={"normal"}>
              {t("onboarding_connect_modal_íntruction_2")}
            </Typography>
          </ListItem>
          <ListItem disableGutters sx={{ display: "list-item", p: 0 }}>
            <Typography variant="text14" fontWeight={"normal"}>
              {t("onboarding_connect_modal_íntruction_3")}
            </Typography>
          </ListItem>
          <ListItem disableGutters sx={{ display: "list-item", p: 0 }}>
            <Typography variant="text14" fontWeight={"normal"}>
              {t("onboarding_connect_modal_íntruction_4")}
            </Typography>
          </ListItem>
        </List>
        <Box
          sx={{
            position: "relative",
            marginBottom: 1.5,
          }}
        >
          {qrCodeResponse && !isFetching ? (
            <QRCode
              value={qrCodeResponse?.callback}
              width={240}
              height={240}
              viewBox={`0 0 240 240`}
              style={{
                maxWidth: 240,
                maxHeight: 240,
              }}
            />
          ) : (
            <>
              <img
                src={QRCodePlaceHolderImg}
                width={240}
                style={{
                  borderRadius: 12,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "custom.dark.10",
                  opacity: 0.8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 3,
                }}
              >
                <CircularProgress />
              </Box>
            </>
          )}
        </Box>
        <Typography
          variant="text14"
          fontWeight={"normal"}
          sx={{
            mb: 2,
          }}
        >
          {t("onboarding_connect_modal_no_account")}
        </Typography>
        <Button
          variant="outlined"
          sx={{
            width: "100%",
            color: "custom.dark.6",
          }}
          onClick={handleGetStarted}
        >
          {t("onboarding_connect_modal_no_account_get_started")}
        </Button>
      </>
    ),
    [qrCodeResponse, isFetching, isVerifying]
  );

  useEffect(() => {
    const periodicallyCheckApprovalStatus = async () => {
      if (qrCodeResponse) {
        let result: null | ResponseType = null;
        result = await checkOnboardApproval({
          sessionId,
        });
        clearInterval(checkApprovalInterval.current);
        checkApprovalInterval.current = setInterval(async () => {
          if (
            !result ||
            (typeof result === "string" && result === "verifying")
          ) {
            if (typeof result === "string" && result === "verifying") {
              setIsVerifying(true);
            } else {
              setIsVerifying(false);
            }
            result = await checkOnboardApproval({
              sessionId,
            });
          } else {
            clearInterval(checkApprovalInterval.current);
            setIsVerifying(false);
            handleSuccessApproved(result);
          }
        }, 3000);
      }
    };
    periodicallyCheckApprovalStatus();
  }, [sessionId]);

  useEffect(() => {
    return () => {
      clearInterval(checkApprovalInterval.current);
    };
  }, []);

  return (
    <StyledDialog {...dialogProps} maxWidth={false}>
      <DialogTitle>
        <IconButton size="small" onClick={handleClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        <Stack alignItems="center" justifyContent={"center"} sx={{ mb: 4.5 }}>
          <Box
            sx={{
              mb: 3.5,
            }}
          >
            <LogoIcon width={80} height={80} />
          </Box>

          {isNoAccountCreated ? (
            <NoAccountCreated initConnectWallet={handleInitConnection} />
          ) : !isConnectRequestSent ? (
            FormModalContent
          ) : (
            <ConnectionRequested />
          )}
        </Stack>
      </DialogContent>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    maxWidth: 440,
    minWidth: 440,
  },
  "& .MuiDialogContent-root": {
    padding: "0 32px",
  },
});

export default ConnectWalletDialog;
