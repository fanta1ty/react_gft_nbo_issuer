import { ReactNode } from "react";
import { Grid, styled } from "@mui/material";
import { Logo } from "@/components";
import LocaleSelect from "./LocaleSelect";

type Props = {
  isEnabledLogo?: boolean;
  isEnabledLocale?: boolean;
  additionalElements?: ReactNode[];
  className?: string;
};

const TopBar = styled(
  ({
    isEnabledLogo = true,
    isEnabledLocale = true,
    className,
    additionalElements = [],
  }: Props) => {
    return (
      <Grid
        item
        className={className}
        sx={{
          backgroundColor: "#FFF",
          display: "flex",
          flex: "0 1 auto",
        }}
      >
        <Grid
          container
          direction="row"
          paddingX={4}
          paddingY={1.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Grid container gap={2} alignItems="center">
              {isEnabledLogo && (
                <Grid item>
                  <Logo />
                </Grid>
              )}

              {isEnabledLocale && (
                <Grid item>
                  <LocaleSelect />
                </Grid>
              )}
            </Grid>
          </Grid>
          {additionalElements}
        </Grid>
      </Grid>
    );
  },
)({});

export default TopBar;
