import { useRef, useEffect, useState } from "react";
import { Link as RouterLink, generatePath } from "react-router-dom";
import { Typography, Box, Stack, Avatar as EmptyAvatar } from "@mui/material";
import { AppRoutes } from "@/router/routes";
import Avatar from "./Avatar";
import { UserType } from "@/api/useGetCertificates";
import { useTranslation } from "react-i18next";
interface IAvatarGroup {
  avatarList: UserType[];
}

const AvatarGroup = ({ avatarList }: IAvatarGroup) => {
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);

  const [toDisplay, setToDisplay] = useState(0);

  const [remain, setRemain] = useState(0);

  useEffect(() => {
    const avatarWidth = 44; // avatart width = 40px, gap = 4px
    const padding = 100; // leave 100px space to the right
    const width = containerRef.current?.offsetWidth || 0;
    const toDisplay = Math.floor((width - padding) / avatarWidth);
    const remain = avatarList.length - toDisplay;
    setToDisplay(toDisplay);
    setRemain(remain);
  }, [containerRef, setToDisplay, setRemain, avatarList]);
  return (
    <Box ref={containerRef} width={"100%"}>
      {toDisplay > 0 && (
        <Stack direction="row" gap={0.5}>
          {avatarList.slice(0, toDisplay).map((item) => (
            <Avatar
              key={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              size={40}
              url={generatePath(AppRoutes.ISSUER_STUDENT_DETAILS, {
                id: item.id,
              })}
            />
          ))}
          {remain > 0 && (
            <>
              <EmptyAvatar
                component={RouterLink}
                to={AppRoutes.ISSUER_STUDENTS}
                sx={{
                  color: "custom.dark.6",
                  backgroundColor: "custom.dark.1",
                  fontSize: (theme) => theme.typography.pxToRem(14),
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "custom.dark.2",
                  },
                }}
              >{`+${remain}`}</EmptyAvatar>{" "}
              <Typography
                variant="text14"
                fontWeight={400}
                sx={{
                  lineHeight: 3,
                  marginLeft: 1,
                }}
              >
                {t("haveThis")}
              </Typography>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default AvatarGroup;
