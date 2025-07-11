import { useParams, Link as RouterLink } from "react-router-dom";
import { useModal } from "mui-modal-provider";
import { useTranslation } from "react-i18next";
import { Typography, Box, Grid, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { AppRoutes } from "@/router/routes";
import useGetStudentById from "@/api/useGetStudentById";
import { ReactComponent as IconCertificateApproved } from "@/assets/icons/ic_certificate_approved.svg";
import { ReactComponent as CertificateThumbnail } from "@/assets/icons/certificate-thumbnail.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/back.svg";
import { Certificate } from "@/components";
import AssignNewCertificateModal from "./AssignNewCertificateModal";
import { formatNationalId } from "@/utils/format";
import Avatar from "@/components/Avatar";

const IssuerStudentDetails = () => {
  const { id = "" } = useParams();

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { showModal } = useModal();

  const { data: studentDetails } = useGetStudentById({ id: id || "" });

  const openAssignCertificateModal = () => {
    if (studentDetails) {
      showModal(AssignNewCertificateModal, {
        studentDetails,
        onAssignSuccess() {
          queryClient.invalidateQueries({ queryKey: ["users", id] });
        },
      });
    }
  };

  if (!studentDetails) return null;

  return (
    <>
      <Box sx={{ py: 5, backgroundColor: "#fff", marginBottom: 5 }}>
        <Box sx={{ width: 1200, margin: "auto" }}>
          <RouterLink to={AppRoutes.ISSUER_STUDENTS}>
            <Box
              display="flex"
              gap={1.5}
              marginBottom={4}
              color="custom.dark.7"
            >
              <BackIcon />
              <Typography>{t("button_backText")}</Typography>
            </Box>
          </RouterLink>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Box display="flex" sx={{ gap: 1.5 }}>
                <Avatar
                  avatar={studentDetails.avatar}
                  firstName={studentDetails.firstName}
                  lastName={studentDetails.lastName}
                  size={80}
                />
                <Box>
                  <Typography
                    sx={{ marginBottom: 1.5 }}
                    variant="text20"
                    fontWeight={600}
                  >
                    {studentDetails.firstName} {studentDetails.lastName}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Typography variant="text14" fontWeight={400}>
                      {t("input_nationalIDLabel")}:
                    </Typography>
                    <Typography variant="text14" fontWeight={600}>
                      {formatNationalId(studentDetails.nationalId)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Button
                startIcon={<IconCertificateApproved width={16} height={16} />}
                color="primary"
                sx={{ marginTop: 4, px: 5 }}
                onClick={openAssignCertificateModal}
              >
                {t("button_assignCertificateText")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {studentDetails?.certificates?.length ? (
        <Grid
          container
          sx={{ width: 1240, margin: "auto", overflowWrap: "anywhere" }}
          spacing={2.5}
        >
          {studentDetails.certificates.map((certificate) => (
            <Grid item xs={4} sx={{ paddingRight: 5 }} key={certificate.id}>
              <Certificate
                image={<CertificateThumbnail />}
                certificate={certificate}
              />
              <Typography
                sx={{ marginBottom: 2, marginTop: 3, paddingLeft: 1 }}
                variant="text16"
                fontWeight={600}
              >
                {certificate.title}
              </Typography>
              <Typography
                variant="text14"
                fontWeight={400}
                sx={{ paddingLeft: 1, marginBottom: 2 }}
              >
                {certificate.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </>
  );
};

export default IssuerStudentDetails;
