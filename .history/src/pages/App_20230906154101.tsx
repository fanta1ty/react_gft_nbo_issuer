import { Grid, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/logo.svg";
const App = () => {
  return (
    <Grid container direction="column">
      <Grid item sx={{ backgroundColor: "#FFF", fontSize: "20px" }}>
        <Box paddingX={4} paddingY={3}>
          <Logo />
        </Box>
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default App;
