import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { TopBar } from "@/components";
import Nav from "./components/Nav";
import UserSection from "./components/UserSection";

const additionalElements = [
  <Nav key="Nav" />,
  <UserSection key="UserSection" />,
];

const Issuer = () => {
  return (
    <Grid container direction="column">
      <Grid item sx={{ width: "100%" }}>
        <TopBar additionalElements={additionalElements} />
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Issuer;
