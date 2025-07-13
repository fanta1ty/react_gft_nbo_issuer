import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Link, Typography, Box, Button, styled } from "@mui/material";
import { ReactComponent as IconUpload } from "@/assets/icons/ic_upload.svg";
import { ReactComponent as IconBin } from "@/assets/icons/ic_bin.svg";

export type ImageInputProps = {
  value: File | null;
  onChange: (newFile: File | null) => void;
  className?: string;
};

const ImageInput = styled(({ value, onChange, className }: ImageInputProps) => {
  const { t } = useTranslation();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles?.[0] || null;
      onChange(newFile);
    },
    [onChange],
  );
  const preview = value ? URL.createObjectURL(value) : null;
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
  });
  const handleClear = () => {
    onChange(null);
  };
  return (
    <Root {...getRootProps({ className })}>
      <input {...getInputProps()} />
      {preview && (
        <Preview>
          <Image src={preview} />
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
        </Preview>
      )}
      {!preview && (
        <Content onClick={open}>
          <Box component={IconUpload} sx={{ mb: 1 }} />
          <Typography
            variant="text12"
            color="custom.blue.6"
            fontWeight={400}
            sx={{ textAlign: "center" }}
          >
            {t("input_avatarHelperText")}
            <Link sx={{ cursor: "pointer" }}>
              {t("input_avatarHelperTextLink")}
            </Link>
          </Typography>
        </Content>
      )}
    </Root>
  );
})({});

const Root = styled("div")({
  borderRadius: "50%",
  height: 148,
  width: 148,
  overflow: "hidden",
});

const Content = styled("div")(({ theme }) => ({
  position: "relative",
  border: `2px dashed ${theme.palette.custom.dark[8]}`,
  borderRadius: "inherit",
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
  display: "none",
  height: 32,
  width: 48,
  minWidth: 48,
  padding: 0,
  "& svg": {
    width: 16,
    height: 16,
  },
});

const Image = styled("img")({
  position: "absolute",
  inset: 0,
  objectFit: "cover",
  height: "100%",
  width: "100%",
});

const Preview = styled("div")(({ theme }) => ({
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),

  "&:hover": {
    "& img": {
      filter: "blur(4px)",
    },
    "& button": {
      display: "flex",
    },
  },
}));

export default ImageInput;
