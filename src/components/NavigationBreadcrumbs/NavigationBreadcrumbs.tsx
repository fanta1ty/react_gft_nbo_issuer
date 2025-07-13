import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type Props = {
  breadcrumbs: BreadcrumbItem[];
};

const NavigationBreadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => {
        const lastItem = index === breadcrumbs.length - 1;
        return lastItem ? (
          <Typography
            color="textPrimary"
            key={index}
            fontWeight="600"
            variant="text14"
          >
            {breadcrumb.label}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            color="inherit"
            to={breadcrumb.path || "#"}
            key={index}
            sx={{ fontSize: "14px" }}
          >
            {breadcrumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
