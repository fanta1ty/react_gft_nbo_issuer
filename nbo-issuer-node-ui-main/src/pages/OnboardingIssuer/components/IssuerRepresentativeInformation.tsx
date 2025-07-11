import { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type InferType } from "yup";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "@/router/routes";
import FooterNav from "@/components/FooterNav";
import NBOCard from "@/components/NBOCard";
import schema from "../schema";
import { Content, ConnectButton, SuccessContent } from "../styled";
import { ReactComponent as GBOLogo } from "@/assets/icons/gbo_logo.svg";
import { useModal } from "mui-modal-provider";
import ConnectWalletDialog from "./ConnectWalletDialog";
import { ReactComponent as IconCheck } from "@/assets/icons/ic_check.svg";
import { positive } from "@/theme/colors";
import { Country } from "country-state-city";
import { formatDate } from "@/utils/datetime";

const IssuerRepresentativeInformation = () => {
  const {
    control,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<InferType<typeof schema>>();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConnected, setIsConnected] = useState(
    !!getValues("personalDetails.firstName"),
  );
  const { showModal } = useModal();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClickNext = async () => {
    const isStepValid = await trigger("personalDetails");
    if (isStepValid) {
      navigate(AppRoutes.ONBOARDING_ISSUER_DOCUMENTS);
    }
  };

  const handleSetFormValue = (
    v: InferType<typeof schema>["personalDetails"],
  ) => {
    setValue("personalDetails", v);
  };
  const showConnectWalletModal = () => {
    showModal(ConnectWalletDialog, {
      setValue: handleSetFormValue,
      getValue: () => {
        return getValues("personalDetails");
      },
      setConnected: () => {
        setIsConnected(true);
      },
    });
  };

  return (
    <Grid container direction="column" gap={2.5}>
      <Grid item>
        <NBOCard title="Representative Details">
          {isConnected ? (
            <Box>
              <SuccessContent>
                <Box flexBasis={100}>
                  <GBOLogo />
                </Box>
                <Box display={"flex"} flexDirection={"column"} gap={1}>
                  <Typography variant="text20" fontWeight={600}>
                    {t("onboarding_representative_connected_section_title")}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: positive[2],
                      width: 115,
                      padding: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      className="label-achieved"
                      gap={0.5}
                      color="custom.positive.8"
                    >
                      <IconCheck />
                      <Typography variant="text14" fontWeight={400}>
                        {t(
                          "onboarding_representative_connected_section_connected",
                        )}
                      </Typography>
                    </Stack>
                  </Box>
                  <Typography variant="text14" fontWeight={400}>
                    {t("connect_wallet_success")}{" "}
                    <Box
                      component={"span"}
                      sx={{ color: "#84A857", cursor: "pointer" }}
                      onClick={() => {
                        setIsConnected(false);
                      }}
                    >
                      {t(
                        "onboarding_representative_connected_section_click_here",
                      )}
                    </Box>
                  </Typography>
                </Box>
              </SuccessContent>
              <Grid container direction="column" gap={2.5}>
                <Grid item>
                  <Grid container direction="row" gap={2.5}>
                    <Grid item xs>
                      <Controller
                        name={"personalDetails.firstName"}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={t("first_name_Lbl")}
                            variant="outlined"
                            fullWidth
                            required
                            disabled
                            value={field.value ?? ""}
                            error={!!errors.personalDetails?.firstName}
                            helperText={
                              errors.personalDetails?.firstName?.message
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Controller
                        name={"personalDetails.lastName"}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={t("last_name_Lbl")}
                            variant="outlined"
                            fullWidth
                            required
                            disabled
                            value={field.value ?? ""}
                            error={!!errors.personalDetails?.lastName}
                            helperText={
                              errors.personalDetails?.lastName?.message
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row" gap={2.5}>
                    <Grid item xs>
                      <Controller
                        name={"personalDetails.phone"}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={t("phone_Lbl")}
                            variant="outlined"
                            fullWidth
                            required
                            disabled
                            value={field.value ?? ""}
                            error={!!errors.personalDetails?.phone}
                            helperText={errors.personalDetails?.phone?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Controller
                        name={"personalDetails.dateOfBirth"}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={t("date_of_birth_Lbl")}
                            variant="outlined"
                            fullWidth
                            required
                            disabled
                            value={formatDate(field.value) ?? ""}
                            error={!!errors.personalDetails?.dateOfBirth}
                            helperText={
                              errors.personalDetails?.dateOfBirth?.message
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="row" gap={2.5}>
                    <Grid item xs>
                      <Controller
                        name={"personalDetails.nationality"}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={t("nationality_Lbl")}
                            variant="outlined"
                            fullWidth
                            required
                            disabled
                            value={
                              field.value
                                ? Country.getCountryByCode(field.value)?.name
                                : ""
                            }
                            error={!!errors.personalDetails?.nationality}
                            helperText={
                              errors.personalDetails?.nationality?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs>
                      <Controller
                        name={"personalDetails.nationalId"}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={t("nationalId_Lbl")}
                            required
                            fullWidth
                            disabled
                            value={field.value ?? ""}
                            error={!!errors.personalDetails?.nationalId}
                            helperText={
                              errors.personalDetails?.nationalId?.message
                            }
                          ></TextField>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Content>
              <Box flexBasis={100}>
                <GBOLogo />
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={2}>
                <Typography variant="text20" fontWeight={600}>
                  {t("connect_wallet_title")}
                </Typography>
                <Typography variant="text14" fontWeight={400}>
                  {t("connect_wallet_description")}
                </Typography>
                <ConnectButton
                  variant="contained"
                  onClick={showConnectWalletModal}
                  sx={{ width: 180 }}
                >
                  {t("connect_btn")}
                </ConnectButton>
              </Box>
            </Content>
          )}
        </NBOCard>
        <NBOCard title="Log in details" sx={{ my: 2.5 }}>
          {isConnected && (
            <Grid item>
              <Grid
                container
                direction="row"
                gap={2.5}
                sx={{ marginBottom: 3 }}
              >
                <Grid item xs>
                  <Controller
                    name={"personalDetails.email"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="email"
                        label={t("email_Lbl")}
                        variant="outlined"
                        fullWidth
                        disabled
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.email}
                        helperText={errors.personalDetails?.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs></Grid>
              </Grid>
            </Grid>
          )}
          <Grid item>
            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.password"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("input_createPasswordLabel")}
                        variant="outlined"
                        type={isShowPassword ? "text" : "password"}
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.password}
                        helperText={errors.personalDetails?.password?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.confirmPassword"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("confirm_password_Lbl")}
                        variant="outlined"
                        type={isShowPassword ? "text" : "password"}
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.confirmPassword}
                        helperText={
                          errors.personalDetails?.confirmPassword?.message
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={isShowPassword}
                  onChange={(e) => {
                    setIsShowPassword(e.target.checked);
                  }}
                />
              }
              label={
                <Box height={20} display="flex" gap={1.5}>
                  <Typography variant="text14" fontWeight={400}>
                    {t("show_password_Lbl")}
                  </Typography>
                </Box>
              }
            />
          </Grid>
        </NBOCard>
      </Grid>

      <Grid item>
        <FooterNav
          onClickBack={() => {
            navigate(AppRoutes.ONBOARDING_ISSUER_COMPANY_INFORMATION);
          }}
          onClickNext={handleClickNext}
        />
      </Grid>
    </Grid>
  );
};

export default IssuerRepresentativeInformation;
