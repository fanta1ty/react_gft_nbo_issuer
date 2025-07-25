import { DebounceTextField } from "@/components";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import RepresentativeDataGrid from "../IssuerRepresentative/components/Representative/components/RepresentativeDataGrid";
import useGetRepresentative from "@/api/useGetRePresentative";
import { useModal } from "mui-modal-provider";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import AddRepresentativeDialog from "../IssuerRepresentative/components/AddRepresentativeDialog/AddRepresentativeDialog";
import { useMemo } from "react";

const IssuerUserManagement = () => {
  const { t } = useTranslation();
  const { data } = useGetRepresentative();

  const { showModal } = useModal();

  const { keyword, setKeyword } = useDataGridQueryParams();

  const handleClickCreate = () => {
    showModal(AddRepresentativeDialog);
  };

  const filteredData = useMemo(() => {
    if (!keyword) {
      return data;
    }
    const filtered = (data || []).filter((representative) => {
      const name =
        representative.firstName
          .toLowerCase()
          .includes(keyword.toLowerCase()) ||
        representative.lastName.toLowerCase().includes(keyword.toLowerCase());
      const roleToText = representative.isAdmin
        ? t("super_representative")
        : t("representative");
      const matchRole = roleToText
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchPhone = representative.phone
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchEmail = representative.email
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchStatus = representative.status
        .toLowerCase()
        .includes(keyword.toLowerCase());

      return name || matchRole || matchEmail || matchPhone || matchStatus;
    });

    return filtered;
  }, [keyword, t, data]);

  return (
    <>
      <Box sx={{ pt: 5, backgroundColor: "#fff" }}>
        <Box sx={{ width: 1200, margin: "auto", pb: 4 }}>
          <Box display="flex" gap={2} alignItems="center">
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography
                variant="h4"
                fontWeight="600"
                textTransform="capitalize"
              >
                {t("issuer_user_management_issuers_representatives_Lbl")} (
                {data ? data.length : 0})
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ width: 1200, margin: "auto", my: 2.5, mt: 5 }}
      >
        <DebounceTextField
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t("issuer_user_management_search_Lbl")}
          sx={{ width: 280 }}
        />
        <Button
          onClick={handleClickCreate}
          color="primary"
          sx={{ minWidth: "180px" }}
        >
          {t("add_representative")}
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ width: 1200, margin: "auto", my: 2.5, mt: 5 }}
      >
        <RepresentativeDataGrid data={filteredData ?? []} />
      </Box>
    </>
  );
};

export default IssuerUserManagement;
