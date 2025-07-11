import { useCallback } from "react";
import { type Accept, useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Link, Typography, Box, Button, styled, Stack } from "@mui/material";
import { ReactComponent as IconUpload } from "@/assets/icons/ic_upload.svg";
import { ReactComponent as IconDownload } from "@/assets/icons/ic_download.svg";
import { ReactComponent as IconEdit } from "@/assets/icons/ic_edit.svg";
import { ReactComponent as IconBin } from "@/assets/icons/ic_bin.svg";
import { ReactComponent as DocumentIcon } from "@/assets/icons/ic_document.svg";
import { downloadFileFromInput } from "@/utils/fileUtils";

export type FileUploaderInputProps = {
  value: File | null;
  onChange?: (newFile: File | null) => void;
  className?: string;
  onEdit?: () => void;
  isReview?: true;
  fileTypeLimitText?: string;
  fileTypeAccept?: Accept;
  fileThumbnail?: React.ReactNode;
};

export const InputFileUploader = (props: FileUploaderInputProps) => {
  const { t } = useTranslation();
  const { value, onChange, className, isReview } = props;
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles?.[0] || null;
      onChange?.(newFile);
    },
    [onChange],
  );
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: props.fileTypeAccept ?? {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/msword": [".doc"],
      "application/pdf": [".pdf"],
    },
  });
  const handleClear = () => {
    onChange?.(null);
  };
  return (
    <Root {...getRootProps({ className })}>
      <input {...getInputProps()} />
      {!!value && (
        <Stack
          direction={"row"}
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            alignItems: "center",
            borderRadius: "12px",
            justifyContent: "space-between",
            gap: (theme) => theme.spacing(1),
            border: "1px dashed",
            borderColor: "custom.blue.6",
            py: 4,
            px: 5,
          }}
        >
          <Stack
            direction={"row"}
            gap={2}
            sx={{
              alignItems: "center",
            }}
          >
            {props.fileThumbnail ?? (
              <Box component={DocumentIcon} color="custom.dark.6" />
            )}
            <Stack gap={0.5}>
              <Typography variant="text14" fontWeight={"normal"}>
                {value.name}
              </Typography>
              <Typography
                variant="text12"
                fontWeight={"normal"}
                color={"custom.blue.6"}
              >
                {Math.round(value.size / 1024 / 1000).toFixed(3)}MB
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={1}>
            {isReview ? (
              <>
                <SmallButton
                  size="small"
                  color="black"
                  variant="outlined"
                  onClick={() => {
                    downloadFileFromInput(value);
                  }}
                >
                  <IconDownload />
                </SmallButton>
                <SmallButton
                  size="small"
                  color="black"
                  variant="outlined"
                  onClick={props.onEdit}
                >
                  <IconEdit />
                </SmallButton>
              </>
            ) : (
              <>
                <SmallButton
                  size="small"
                  color="black"
                  variant="outlined"
                  onClick={open}
                >
                  <IconUpload />
                </SmallButton>
                <SmallButton
                  size="small"
                  color="black"
                  variant="outlined"
                  onClick={handleClear}
                >
                  <Box component={IconBin} color="custom.negative.6" />
                </SmallButton>
              </>
            )}
          </Stack>
        </Stack>
      )}
      {!value && (
        <Content onClick={open}>
          <Box component={IconUpload} sx={{ mb: 1 }} />
          <Typography
            variant="text12"
            color="custom.blue.6"
            fontWeight={400}
            sx={{ textAlign: "center", mb: 0.5 }}
          >
            {t("input_avatarHelperText")}
            <Link sx={{ cursor: "pointer" }}>
              {t("input_avatarHelperTextLink")}
            </Link>
          </Typography>
          <Typography
            variant="text12"
            color="custom.blue.6"
            fontWeight={400}
            sx={{ textAlign: "center" }}
          >
            {props.fileTypeLimitText ?? "PDF, doc, jpg or png, 5mb max"}
          </Typography>
        </Content>
      )}
    </Root>
  );
};

const Root = styled("div")({
  height: 148,
  width: "100%",
  overflow: "hidden",
});

const Content = styled("div")(({ theme }) => ({
  position: "relative",
  border: `2px dashed ${theme.palette.custom.dark[8]}`,
  borderRadius: "12px",
  height: "100%",
  width: "100%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(0, 3),
}));

const SmallButton = styled(Button)({
  // display: "none",
  height: 32,
  width: 48,
  minWidth: 48,
  padding: 0,
  "& svg": {
    width: 16,
    height: 16,
  },
});
