import { NavLink as RouterNavLink } from "react-router-dom";
import { Link } from "@mui/material";

type Props = {
  route: string;
  label: string;
};

const NavLink = ({ route, label }: Props) => (
  <Link
    color="inherit"
    variant="text16"
    fontWeight={400}
    component={RouterNavLink}
    to={route}
    sx={{
      "&.active": { fontWeight: 600 },
    }}
  >
    {label}
  </Link>
);

export default NavLink;
