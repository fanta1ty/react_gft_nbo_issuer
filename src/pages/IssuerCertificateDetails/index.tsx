import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import uniqBy from "lodash/uniqBy";
import { Typography, Box, Stack, InputAdornment } from "@mui/material";
import { useModal } from "mui-modal-provider";
import useGetCertificateById from "@/api/useGetCertificateById";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { ReactComponent as IconSearch } from "@/assets/icons/ic_search.svg";
import { DebounceTextField } from "@/components";
import StudentsAssignedCertificateDataGrid from "./components/CertificateDetailsDataGrid";
import CertificateTopSection from "./components/CertificateTopSection";
import NewAssignCertificateDialog from "@/components/NewAssignCertificateDialog";

import { format } from "date-fns";

const IssuerCertificateDetails = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { keyword, setKeyword } = useDataGridQueryParams();

  const { id = "" } = useParams();

  const { data: certificate, isLoading } = useGetCertificateById({ id });

  // TODO: remove when BE will validate students to be unique
  const uniqueUserCredentials = uniqBy(certificate?.userCredentials, "user.id");

  const filteredUserCredentials = useMemo(() => {
    if (!uniqueUserCredentials) {
      return [];
    }
    if (!keyword) {
      return uniqueUserCredentials;
    }
    const filtered = uniqueUserCredentials.filter((userCredential) => {
      const name =
        `${userCredential.user.firstName} ${userCredential.user.lastName}`
          .toLowerCase()
          .includes(keyword.toLowerCase());
      const matchNationalId = userCredential.user.nationalId
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchAssignedDate = format(
        new Date(userCredential.credential.createdAt),
        "MMM dd yyyy",
      )
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchExpirationDate = format(
        new Date(userCredential.credential.expiresAt),
        "MMM dd yyyy",
      )
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchStatus = userCredential.credential.status
        .toLowerCase()
        .includes(keyword.toLowerCase());

      return (
        name ||
        matchNationalId ||
        matchAssignedDate ||
        matchExpirationDate ||
        matchStatus
      );
    });

    return filtered;
  }, [keyword, uniqueUserCredentials]);

  const userCredentialsCount = filteredUserCredentials
    ? `(${filteredUserCredentials.length})`
    : "";

  const { showModal } = useModal();
  const showAssignCertificatesDialog = () => {
    if (certificate) {
      showModal(NewAssignCertificateDialog, {
        certificate,
        onAssignSuccess() {
          queryClient.invalidateQueries(["certificate", id]);
        },
      });
    }
  };

  return (
    <>
      <Box sx={{ py: 5, backgroundColor: "#fff", marginBottom: 5 }}>
        <CertificateTopSection
          userCredentials={uniqueUserCredentials}
          showAssignCertificatesDialog={showAssignCertificatesDialog}
          title={certificate?.title}
          description={certificate?.description}
        />
      </Box>
      <Box sx={{ width: 1360, margin: "auto" }}>
        <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2.5 }}>
          <Typography variant="text20" fontWeight={600}>
            {`${t("certificateDetails_tableTitle")} ${userCredentialsCount}`}
          </Typography>
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
        <StudentsAssignedCertificateDataGrid
          userCredentials={filteredUserCredentials}
          isLoading={isLoading}
        />
      </Box>
    </>
  );
};

export default IssuerCertificateDetails;
