import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Typography,
  Box,
  styled,
  Stack,
  InputAdornment,
  Button,
} from "@mui/material";
import useGetCertificates from "@/api/useGetCertificates";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { ReactComponent as IconSearch } from "@/assets/icons/ic_search.svg";
import { DebounceTextField } from "@/components";
import CertificatesDataGrid from "./components/CertificatesDataGrid";
import { ReactComponent as IconUpload } from "@/assets/icons/ic_upload.svg";
import { useModal } from "mui-modal-provider";
import { UploadCertificatesDialog } from "./components/UploadCertificatesDialog";

const IssuerCertificates = () => {
  const { t } = useTranslation();
  const { showModal } = useModal();
  const { keyword, setKeyword } = useDataGridQueryParams();

  const { data: certificates, isLoading, refetch } = useGetCertificates();

  const filteredCertificates = useMemo(() => {
    if (!certificates) {
      return [];
    }
    if (!keyword) {
      return certificates;
    }
    const filtered = certificates.filter((certificate) => {
      return certificate.title.toLowerCase().includes(keyword.toLowerCase());
    });

    return filtered;
  }, [keyword, certificates]);

  const certificateCount = filteredCertificates
    ? `(${filteredCertificates.length})`
    : "";

  const handleUploadCertificatesCSX = () => {
    showModal(UploadCertificatesDialog, {
      onUploadSuccess() {
        refetch();
      },
    });
  };
  return (
    <Root mt={5.5} mb={20} mx="auto">
      <Typography variant="h4">
        {`${t("certificates_heading")} ${certificateCount}`}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{ mb: 2.5, mt: 5 }}
      >
        <Button
          variant="contained"
          color="black"
          sx={{
            gap: 1,
          }}
          onClick={handleUploadCertificatesCSX}
        >
          <IconUpload />
          <Typography variant="text16" fontWeight={"normal"}>
            {t("issuer_certificates_create_dialog_title")}
          </Typography>
        </Button>
        <DebounceTextField
          defaultValue={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t("input_searchPlaceholder")}
          sx={{ ml: "auto", width: 320 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <CertificatesDataGrid
        certificates={filteredCertificates}
        isLoading={isLoading}
      />
    </Root>
  );
};

const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 1400,
  padding: theme.spacing(0, 2.5),
}));

export default IssuerCertificates;
