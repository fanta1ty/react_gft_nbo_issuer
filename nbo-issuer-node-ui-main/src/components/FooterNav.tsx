import { FC } from "react";
import { Button, type ButtonProps, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router/routes";
import { useTranslation } from "react-i18next";

type Props = {
  hideCancelButton?: boolean;
  onClickBack?: () => void;
  onClickNext?: () => void;
  buttonNextText?: string;
  NextButtonProps?: ButtonProps;
  BackButtonProps?: ButtonProps;
  CancelButtonProps?: ButtonProps;
};

const FooterNav: FC<Props> = ({
  hideCancelButton,
  buttonNextText,
  onClickBack,
  onClickNext,
  NextButtonProps = {},
  BackButtonProps = {},
  CancelButtonProps = {},
}) => {
  const navigate = useNavigate();
  const {
    formState: { isDirty },
  } = useFormContext();
  const { t } = useTranslation();
  const handleCancelClick = () => {
    let canCancel = true;
    if (isDirty) {
      canCancel = window.confirm(t("cancelConfirmation"));
    }
    if (canCancel) {
      navigate(AppRoutes.LOGIN);
    }
  };

  return (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item>
        {!hideCancelButton && (
          <Button
            color="black"
            variant="outlined"
            sx={{ width: 148 }}
            onClick={handleCancelClick}
            {...CancelButtonProps}
          >
            {t("button_cancel")}
          </Button>
        )}
      </Grid>
      <Grid item>
        {onClickBack && (
          <Button
            color="black"
            variant="outlined"
            sx={{ width: 148, mr: 1 }}
            onClick={onClickBack}
            {...BackButtonProps}
          >
            {t("button_backText")}
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 180 }}
          onClick={onClickNext}
          {...NextButtonProps}
        >
          {buttonNextText || t("button_nextText")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default FooterNav;
