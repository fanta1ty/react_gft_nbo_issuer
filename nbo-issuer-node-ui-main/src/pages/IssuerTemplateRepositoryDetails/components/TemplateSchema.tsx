import { Typography, Box, styled, Button, IconButton } from "@mui/material";
import { dark } from "@/theme/colors";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ReactComponent as IconEmpty } from "@/assets/icons/ic_empty.svg";
import { ReactComponent as IconDocument } from "@/assets/icons/ic_document.svg";
import { ReactComponent as IconVisibility } from "@/assets/icons/ic_view.svg";
import { ReactComponent as IconEdit } from "@/assets/icons/ic_edit.svg";
import { ReactComponent as IconDownload } from "@/assets/icons/ic_download.svg";
import { downloadFileFromURL } from "@/utils/fileUtils";

type Props = {
  id: string;
  isReady?: boolean;
  isPublished?: boolean;
  fileName?: string;
  templateUrl?: string;
};

const TemplateSchema = ({
  id = "",
  isReady,
  isPublished,
  fileName,
  templateUrl = "",
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return isReady ? (
    <>
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        sx={{
          pb: 3,
          borderBottom: "1px solid rgb(132 168 87 / 12%)",
        }}
      >
        <Typography variant="text16" fontWeight="600">
          {t("template_schema_title")}
        </Typography>
        <Typography variant="text14" fontWeight="400" sx={{ mt: 2 }}>
          {t("template_schema_description")}
        </Typography>
      </Box>
      <Box
        sx={{ pt: 3 }}
        gap={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box gap={1} display="flex" alignItems="center">
          <Box component={IconDocument} color="custom.dark.6" />
          <Typography variant="text14" fontWeight="600">
            {`${fileName}.json`}
          </Typography>
        </Box>
        <Box gap={1} display="flex" alignItems="center">
          <ButtonWithIcon
            onClick={() =>
              navigate(
                `/issuer/template-repository/${id}/define-schema?readOnly=true`,
              )
            }
          >
            <IconVisibility />
          </ButtonWithIcon>
          {isPublished ? (
            <ButtonWithIcon
              onClick={() => downloadFileFromURL(templateUrl, fileName, "json")}
            >
              <IconDownload />
            </ButtonWithIcon>
          ) : (
            <ButtonWithIcon
              onClick={() =>
                navigate(`/issuer/template-repository/${id}/define-schema`)
              }
            >
              <IconEdit />
            </ButtonWithIcon>
          )}
        </Box>
      </Box>
    </>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ py: 2 }}
    >
      <IconEmpty />
      <Typography
        color="custom.blue.6"
        variant="text16"
        fontWeight="600"
        sx={{ mb: 1 }}
      >
        {t("define_schema_title")}
      </Typography>
      <Typography
        color="custom.blue.6"
        variant="text14"
        fontWeight="400"
        align="center"
        sx={{ mb: 4 }}
      >
        {t("define_schema_description")}
      </Typography>
      <Button
        sx={{ backgroundColor: dark[6] }}
        onClick={() =>
          navigate(`/issuer/template-repository/${id}/define-schema`)
        }
      >
        {t("define_schema")}
      </Button>
    </Box>
  );
};
const ButtonWithIcon = styled(IconButton)({
  width: "32px",
  height: "32px",
  borderRadius: "12px",
});

export default TemplateSchema;
