import { PropsWithChildren, ReactNode } from "react";
import { Card, CardContent, Typography, styled, Grid } from "@mui/material";

type Props = PropsWithChildren & {
  title: string;
  className?: string;
  actionElement?: ReactNode;
};

const NBOCard = styled(
  ({ title, children, className, actionElement }: Props) => {
    return (
      <Card
        variant="outlined"
        sx={{ border: "none", borderRadius: "12px" }}
        className={className}
      >
        <CardContent
          sx={{
            "&:last-child": {
              paddingTop: "28px",
              paddingBottom: 5,
              paddingX: 3,
            },
          }}
        >
          <Grid container direction="row" justifyContent="space-between" mb={3}>
            <Grid item>
              <Typography variant="text20" fontWeight={600}>
                {title}
              </Typography>
            </Grid>
            {actionElement && <Grid item>{actionElement}</Grid>}
          </Grid>
          {children}
        </CardContent>
      </Card>
    );
  },
)({});

export default NBOCard;
