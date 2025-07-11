import { Link as RouterLink } from "react-router-dom";
import { AppRoutes } from "@/router/routes";
import logo from "@/assets/images/logo.png";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <RouterLink to={AppRoutes.ROOT}>
      <Box height="100%" display="flex">
        <img src={logo} />
      </Box>
    </RouterLink>
  );
};

export default Logo;
