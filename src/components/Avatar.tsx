import { Avatar as MuiAvatar, Typography, styled } from "@mui/material";
import type { AvatarProps } from "@mui/material/Avatar/Avatar";
import getImageUrl from "@/utils/getImageUrl";
import { getGradient } from "@/utils/getGradient";
import { useNavigate } from "react-router-dom";

interface Props {
  size: number;
  avatar?: string;
  firstName: string;
  lastName: string;
  url?: string;
}

const Avatar: React.FC<Props> = ({
  size,
  avatar,
  firstName,
  lastName,
  url,
}) => {
  const variant = size <= 40 ? "text18" : "h4";
  const navigate = useNavigate();
  const handleClick = () => {
    if (url) {
      navigate(url);
    }
  };
  if (avatar) {
    return <StyledAvatar src={getImageUrl(avatar)} size={size} />;
  }
  return (
    <StyledAvatar
      size={size}
      background={getGradient(`${firstName} ${lastName}`)}
      onClick={handleClick}
    >
      <Typography variant={variant} textTransform="uppercase" fontWeight={600}>
        {`${firstName[0]}${lastName[0]}`}
      </Typography>
    </StyledAvatar>
  );
};

interface ExtendedAvatarProps extends AvatarProps {
  size: number;
  background?: string;
}

const StyledAvatar = styled(MuiAvatar)<ExtendedAvatarProps>(
  ({ size, background }) => ({
    height: size,
    width: size,
    background,
  }),
);

export default Avatar;
