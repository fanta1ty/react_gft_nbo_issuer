import { styled, Grid } from "@mui/material";
import loginCover from "@/assets/images/login-cover.jpg";
import { TopBar } from "@/components";
import LoginForm from "./components/LoginForm";

const customWrapperStyles = {
  backgroundColor: "unset",
  color: "#FFF",
  display: "inline-flex",
  position: "absolute",
  width: "100%",
};

const Login = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{ flexFlow: "column" }}
      height="100%"
    >
      <TopBar sx={customWrapperStyles} />

      <Grid item display="flex" flex="1 1 auto">
        <Grid container direction="row" width="100%">
          <Grid item xs>
            <Cover src={loginCover} />
          </Grid>

          <Grid item display="flex" justifyContent="center" xs>
            <LoginForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Cover = styled("img")({
  display: "block",
  maxWidth: "100%",
  height: "100%",
  objectFit: "cover",
});

export default Login;
