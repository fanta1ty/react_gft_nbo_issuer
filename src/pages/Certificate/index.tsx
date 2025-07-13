import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { TopBar } from "@/components";

const Certificate = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <TopBar sx={{ backgroundColor: "unset" }} />
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Certificate;
