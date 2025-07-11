import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Box, styled, Stack, InputAdornment } from "@mui/material";
import useGetStudents from "@/api/useGetStudents";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { ReactComponent as IconSearch } from "@/assets/icons/ic_search.svg";
import { DebounceTextField } from "@/components";
import StudentsDataGrid from "./components/StudentsDataGrid";

const IssuerStudents = () => {
  const { t } = useTranslation();

  const { keyword, setKeyword } = useDataGridQueryParams();

  const { data: students, isLoading } = useGetStudents();

  const filteredStudents = useMemo(() => {
    if (!students) {
      return [];
    }
    if (!keyword) {
      return students;
    }
    const filtered = students.filter((student) => {
      const name = `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchNationalId = student.nationalId
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchCertificates =
        student.certificates?.some((certificate) =>
          certificate.title.toLowerCase().includes(keyword.toLowerCase()),
        ) || false;
      return name || matchNationalId || matchCertificates;
    });
    return filtered;
  }, [keyword, students]);

  const studentCount = filteredStudents ? `(${filteredStudents.length})` : "";

  return (
    <Root mt={5.5} mb={20} mx="auto">
      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2.5 }}>
        <Typography variant="h4">
          {`${t("students_tableTitle")} ${studentCount}`}
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
      <StudentsDataGrid students={filteredStudents} isLoading={isLoading} />
    </Root>
  );
};

const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 1400,
  padding: theme.spacing(0, 2.5),
}));

export default IssuerStudents;
