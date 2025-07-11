import { useTranslation } from "react-i18next";
import {
  Dialog,
  Box,
  styled,
  type DialogProps,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { globalSnackbarState } from "@/recoil/atoms";
import { useSetRecoilState } from "recoil";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import { ReactComponent as IconCaution } from "@/assets/icons/ic_caution.svg";
import { dark } from "@/theme/colors";
import { ReactComponent as IconTemplate } from "@/assets/icons/ic_template.svg";
import usePublishTemplate from "@/api/usePublishTemplate";
import { queryClient } from "@/reactQuery/queryClient";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
  templateName: string;
  schemaId: string;
  isReady: boolean;
  navigateToSchema?: () => void;
};

const PublishTemplateModal = ({
  onClose,
  templateName,
  isReady,
  schemaId,
  navigateToSchema,
  ...dialogProps
}: Props) => {
  const { t } = useTranslation();
  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);
  const { mutate: publish } = usePublishTemplate({
    onSuccess: () => {
      setGlobalSnackbar({
        message: "Add Issuer Success",
        severity: "success",
      });
      onClose?.();
      queryClient.invalidateQueries(["register-schema-by-id", schemaId]);
    },
    onError: (data) => {
      setGlobalSnackbar({
        message: (
          <p>
            {data?.response?.data.message ||
              "There was an error when Add Issuer"}
          </p>
        ),
        severity: "error",
      });
    },
  });
  return (
    <StyledDialog {...dialogProps} onClose={onClose} maxWidth={false} fullWidth>
      <DialogTitle>
        {isReady
          ? t("confirm_publish_template_title")
          : t("publish_template_title")}
        <IconButton size="small" onClick={onClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box display={"flex"} gap={2}>
          <IconTemplate width={48} />
          <Typography
            variant="text20"
            sx={{
              fontWeight: 600,
              lineHeight: "48px",
              textTransform: "capitalize",
              whiteSpace: "pre-wrap",
              marginBottom: 2,
            }}
          >
            {templateName}
          </Typography>
        </Box>
        {isReady && (
          <Box display={"flex"} justifyContent={"center"} my={4}>
            <IconCaution />
          </Box>
        )}
        {isReady ? (
          <Typography variant="text16" fontWeight="400">
            {t("confirm_publish_template_msg")}
          </Typography>
        ) : (
          <Typography variant="text16" fontWeight="400">
            {t("publish_template_msg")}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="black"
          sx={{ width: 150 }}
          size="large"
          onClick={onClose}
        >
          {t("button_cancel")}
        </Button>
        {isReady ? (
          <Button
            color="primary"
            size="large"
            sx={{ width: 200 }}
            onClick={() => publish({ schemaId })}
          >
            {t("publish")}
          </Button>
        ) : (
          <Button
            color="primary"
            size="large"
            sx={{ width: 200, backgroundColor: dark[6] }}
            onClick={() => {
              navigateToSchema && navigateToSchema();
              onClose && onClose();
            }}
          >
            {t("define_schema_btn")}
          </Button>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    maxWidth: 800,
  },
}));

export default PublishTemplateModal;
