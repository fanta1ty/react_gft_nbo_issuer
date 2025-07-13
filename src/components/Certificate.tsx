import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ReactComponent as IconRevoke } from "@/assets/icons/revoke.svg";
import { ReactComponent as IconCertificateRevoked } from "@/assets/icons/ic_certificate_revoked.svg";
import { ReactComponent as IconDownload } from "@/assets/icons/ic_download.svg";
import { StudentCertificateType } from "@/api/useGetStudents";
import useRevokeCertificate from "@/api/useRevokeCertificate";
import { globalSnackbarState } from "@/recoil/atoms";
import { downloadFileFromURL } from "@/utils/fileUtils";

type Props = {
  image: ReactNode;
  certificate: StudentCertificateType;
};

const Certificate: FC<Props> = ({ image, certificate }) => {
  const { t } = useTranslation();

  const { revNonce } = certificate?.userCredentials?.[0]?.credential ?? {};

  const { id } = useParams();

  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);

  const queryClient = useQueryClient();

  const { mutate: revokeCertificate, isLoading } = useRevokeCertificate({
    onSuccess: (data) => {
      setGlobalSnackbar({ message: data.message, severity: "success" });
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
    onError: (data) => {
      setGlobalSnackbar({
        message: (
          <>
            <p>{t("revokeRequestError")}</p>
            {data.response?.data?.message && (
              <p>{data.response.data.message}</p>
            )}
          </>
        ),
        severity: "error",
      });
    },
  });
  const handleDownloadCertificate = (certificate: StudentCertificateType) => {
    const credentialSubject =
      certificate.userCredentials[0].credential.credentialSubject;
    downloadFileFromURL(credentialSubject.image, credentialSubject.courseName);
  };

  const isRevoked =
    certificate.userCredentials?.[0]?.credential?.revoked ?? false;

  return (
    <Box position={"relative"}>
      {isRevoked ? (
        <Box
          sx={{
            position: "absolute",
            top: "16px",
            left: "16px",
          }}
        >
          <Alert
            icon={<IconCertificateRevoked fontSize="inherit" />}
            severity="error"
          >
            {t("button_revokeText")}
          </Alert>
        </Box>
      ) : (
        <Box
          borderRadius={1}
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            background: "rgba(0, 0, 0, 0.20)",
            backdropFilter: "blur(2px)",
            opacity: 0,
            "&:hover": {
              opacity: 1,
            },
          }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box sx={{ margin: "auto", width: 180, textAlign: "center" }}>
            <Button
              startIcon={<IconRevoke width={16} height={16} />}
              sx={{ marginTop: 1, px: 2, borderRadius: 1.5 }}
              variant="outlined"
              disabled={isLoading}
              onClick={() => revokeCertificate({ revokeNonce: revNonce })}
            >
              {isLoading ? (
                <CircularProgress size={20} />
              ) : (
                <Typography
                  variant="text14"
                  fontWeight={400}
                  color="custom.negative.7"
                >
                  {t("button_revokeText")}
                </Typography>
              )}
            </Button>
            <Button
              startIcon={<IconDownload width={16} height={16} />}
              sx={{ marginTop: 1, px: 2, borderRadius: 1.5 }}
              variant="outlined"
              onClick={() => handleDownloadCertificate(certificate)}
            >
              <Typography
                variant="text14"
                fontWeight={400}
                color="custom.dark.6"
              >
                {t("downloadPDF")}{" "}
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
      <Box sx={{ height: "100%", opacity: isRevoked ? 0.2 : 1 }}>{image}</Box>
    </Box>
  );
};
export default Certificate;
