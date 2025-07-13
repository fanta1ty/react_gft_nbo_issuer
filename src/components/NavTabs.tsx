import React from "react";
import { Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

type LinkTabProps = { label: string; href: string; value: string };

const LinkTab = (props: LinkTabProps) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      sx={{ textTransform: "capitalize" }}
      {...props}
    />
  );
};

type NavTabsProps = {
  tabs: { label: string; href: string; value: string }[];
};

const NavTabs = ({ tabs }: NavTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.hash.replace("#", "") || tabs[0].value;

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string,
  ) => {
    // Navigate to the new hash value
    navigate(`#${newValue}`);
  };

  return (
    <Tabs value={currentTab} onChange={handleChange}>
      {tabs.map((tab) => (
        <LinkTab
          key={tab.value}
          label={tab.label}
          href={tab.href}
          value={tab.value}
        />
      ))}
    </Tabs>
  );
};

export default NavTabs;
