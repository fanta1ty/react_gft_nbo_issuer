import { Typography, Box, Avatar } from "@mui/material";
import { TemplateIssuer } from "@/@types";
import { useTranslation } from "react-i18next";
import getImageUrl from "@/utils/getImageUrl";

type Props = { id: string; issuers?: TemplateIssuer[] };

const AssignIssuer = ({ issuers }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="text16" fontWeight="600">
          {t("issuer_assigne_to")}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        {issuers?.map((issuer, index) => {
          return (
            <Box
              key={issuer.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                py: 2,
                borderBottom:
                  index === issuers.length - 1
                    ? "none"
                    : "1px solid rgb(132 168 87 / 12%)",
              }}
            >
              <Box display="flex" gap={1} alignItems="center">
                <Avatar
                  sx={{ borderRadius: "4px" }}
                  src={getImageUrl(issuer.companyLogo)}
                />
                <Typography variant="text14" fontWeight="600">
                  {issuer.companyName}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default AssignIssuer;
