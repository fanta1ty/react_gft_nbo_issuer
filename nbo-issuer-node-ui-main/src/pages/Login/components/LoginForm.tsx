import { Link as RouterLink } from "react-router-dom";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Typography,
  Button,
  Link,
  Grid,
  Alert,
} from "@mui/material";
import { AppRoutes } from "@/router/routes";
import { useAuthContext } from "@/router/Auth";

type FormDataType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, isError, errorMessage = "" } = useAuthContext();

  const handleLogin: SubmitHandler<FormDataType> = ({ email, password }) => {
    login(email, password);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      sx={(theme) => ({
        width: 432,
        padding: theme.spacing(2),
      })}
    >
      <Grid item></Grid>
      <Grid item>
        <Typography
          variant="h3"
          color="custom.dark.10"
          sx={{ mb: 4.5 }}
          textAlign="center"
        >
          {t("login_heading")}
        </Typography>
        {isError && (
          <Alert severity="error" sx={{ borderRadius: "12px", mb: 4.5 }}>
            {`${t("error_login")} ${errorMessage}`}
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleLogin)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: t("validations_required") }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("input_emailLabel")}
                placeholder={t("input_emailPlaceholder")}
                sx={{ mb: 2.5 }}
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: t("validations_required") }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("input_passwordLabel")}
                placeholder={t("input_passwordPlaceholder")}
                type="password"
                sx={{ mb: 4.5 }}
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button color="primary" fullWidth sx={{ mb: 2.5 }} type="submit">
            {t("button_loginText")}
          </Button>
        </form>
      </Grid>
      <Grid item>
        <Typography
          variant="text16"
          fontWeight={400}
          color="custom.dark.6"
          sx={{ textAlign: "center" }}
          textAlign="center"
        >
          {`${t("login_signupQuestion")} ${t("login_signupLinkText")} ${t(
            "as",
          )} `}
          <Link
            variant="text16"
            fontWeight={400}
            component={RouterLink}
            to={AppRoutes.ONBOARDING_ISSUER}
          >
            {t("issuer")}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
