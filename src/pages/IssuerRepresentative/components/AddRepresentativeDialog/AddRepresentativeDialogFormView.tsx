import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Alert,
  Radio,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import { FC } from "react";
import {
  FormDataType,
  Props as AddRepresentativeDialogProps,
} from "./AddRepresentativeDialog";
import { useTranslation } from "react-i18next";
import { OptionBox, StyledFormControlLabel, StyledRadioGroup } from "./styles";
import { HelpOutline } from "@mui/icons-material";

type Props = Pick<AddRepresentativeDialogProps, "onClose"> & {
  errorMessage?: string;
};

const AddRepresentativeDialogFormView: FC<Props> = ({
  errorMessage,
  onClose,
}) => {
  const {
    control,
    setValue,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useFormContext<FormDataType>();

  const { t } = useTranslation();

  const superAdminValue = watch("superAdmin");

  // Permission options for Representative role
  const permissionOptions: Array<{
    key: keyof FormDataType["permissions"];
    label: string;
    defaultChecked: boolean;
  }> = [
    { key: "myProfile", label: "My profile", defaultChecked: true },
    {
      key: "myIssuerProfile",
      label: "My Issuer profile",
      defaultChecked: true,
    },
    { key: "users", label: "Users", defaultChecked: true },
    { key: "certificates", label: "Certificates", defaultChecked: true },
    { key: "batchIssuance", label: "Batch Issuance", defaultChecked: false },
    {
      key: "templateRepository",
      label: "Template repository",
      defaultChecked: false,
    },
    {
      key: "accountSettings",
      label: "Account settings",
      defaultChecked: false,
    },
    {
      key: "apiKeyManagement",
      label: "API Key Management",
      defaultChecked: false,
    },
  ];

  const handleClose = () => {
    let canClose = true;
    if (isDirty) {
      // TODO: create MUI confirm dialog
      canClose = window.confirm(t("warning_confirmDiscardChanges"));
    }
    if (canClose) {
      onClose?.();
    }
  };

  return (
    <>
      <DialogTitle>
        {t("add_representative_dialog_add_admin_Lbl")}
        <IconButton size="small" onClick={handleClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              {t("add_representative_dialog_role_Lbl")} *
            </Typography>
            <Controller
              name="superAdmin"
              control={control}
              render={({ field: radioGroupField }) => (
                <StyledRadioGroup {...radioGroupField}>
                  <OptionBox onClick={() => setValue("superAdmin", true)}>
                    <StyledFormControlLabel
                      disableTypography
                      value={true}
                      control={<Radio />}
                      label={t("input_radio_super_representative_lbl")}
                    />
                  </OptionBox>
                  <OptionBox onClick={() => setValue("superAdmin", false)}>
                    <StyledFormControlLabel
                      disableTypography
                      value={false}
                      control={<Radio />}
                      label={t("input_radio_representative_lbl")}
                    />
                  </OptionBox>
                </StyledRadioGroup>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {t("add_representative_access_permission_Lbl")} *
              </Typography>
              <Tooltip title={t("add_representative_select_role_tooltip_Lbl")}>
                <HelpOutline
                  sx={{
                    fontSize: 16,
                    color: "text.secondary",
                    cursor: "help",
                  }}
                />
              </Tooltip>
            </Box>

            {superAdminValue === true ? (
              <Box
                sx={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  borderRadius: 2,
                  p: 2.5,
                  minHeight: 80,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ lineHeight: 1.5 }}
                >
                  {t("add_representative_select_role_to_see_permissions_Lbl")}
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {permissionOptions.map((permission, _) => (
                  <Grid item xs={4} key={permission.key}>
                    <Controller
                      name={`permissions.${permission.key}`}
                      control={control}
                      defaultValue={permission.defaultChecked}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              checked={
                                typeof field.value === "boolean"
                                  ? field.value
                                  : Boolean(field.value)
                              }
                              sx={{
                                "&.Mui-checked": {
                                  color: "#4caf50",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{ fontSize: "0.875rem" }}
                            >
                              {permission.label}
                            </Typography>
                          }
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "0.875rem",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_firstNameLabel")}
                  type="text"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  required
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_lastNameLabel")}
                  type="text"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  required
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_emailLabel")}
                  type="text"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="confirmEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_confirmEmailLabel")}
                  type="email"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  required
                  error={!!errors.confirmEmail}
                  helperText={errors.confirmEmail?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="black"
          sx={{ width: 180 }}
          onClick={handleClose}
          size="large"
          disabled={isSubmitting}
        >
          {t("button_cancel")}
        </Button>
        <Button
          color="primary"
          sx={{ width: 180 }}
          type="submit"
          size="large"
          disabled={isSubmitting}
        >
          {t("onboarding_invitation_send_button_lbl")}
        </Button>
      </DialogActions>
    </>
  );
};

export default AddRepresentativeDialogFormView;
