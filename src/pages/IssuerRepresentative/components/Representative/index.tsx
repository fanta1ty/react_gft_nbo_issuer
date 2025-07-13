import { useTranslation } from "react-i18next";
import { Box, InputAdornment, Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { ReactComponent as IconSearch } from "@/assets/icons/ic_search.svg";
import { DebounceTextField } from "@/components";
import { useMemo } from "react";
import useGetRepresentative from "@/api/useGetRePresentative";
import RepresentativeDataGrid from "./components/RepresentativeDataGrid";
import AddRepresentativeDialog from "../AddRepresentativeDialog/AddRepresentativeDialog";

const Representative = () => {
  const { t } = useTranslation();

  const { showModal } = useModal();

  const { keyword, setKeyword } = useDataGridQueryParams();

  const { data } = useGetRepresentative();

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
      <Box display={"flex"} justifyContent={"space-between"} sx={{ my: 2.5 }}>
        <DebounceTextField
          defaultValue={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t("input_searchPlaceholder")}
          sx={{ width: 320 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch />
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleClickCreate}
          color="primary"
          sx={{ minWidth: "180px" }}
        >
          {t("add_representative")}
        </Button>
      </Box>
      <RepresentativeDataGrid data={filteredData || []} />
    </>
  );
};

export default Representative;
