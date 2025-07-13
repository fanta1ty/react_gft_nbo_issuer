import {
  Box,
  IconButton,
  type IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
import { ReactComponent as IconBin } from "@/assets/icons/ic_bin.svg";
import { ReactComponent as IconTreeBranch } from "@/assets/icons/ic_tree_branch.svg";
import { ReactComponent as IconDocument } from "@/assets/icons/ic_document.svg";

type FieldItemProps = {
  fieldName: string;
  onClick: () => void;
  onClickDelete: () => void;
  isSelected: boolean;
  showRemoveButton: boolean;
  isError: boolean;
};
const FieldItem = ({
  fieldName,
  onClickDelete,
  onClick,
  isSelected,
  showRemoveButton,
  isError,
}: FieldItemProps) => {
  const handleClickDelete: IconButtonProps["onClick"] = (e) => {
    e.stopPropagation();
    onClickDelete();
  };

  return (
    <ItemRoot onClick={onClick} isSelected={isSelected}>
      <TreeBranchWrapper sx={{ ml: 1 }}>
        <TreeBranch component={IconTreeBranch} />
      </TreeBranchWrapper>
      <StyledIconDocument component={IconDocument} isError={isError} />
      <Typography color={isError ? "custom.negative.6" : "custom.dark.6"}>
        {fieldName}
      </Typography>
      {showRemoveButton && (
        <RemoveButton
          className="delete-icon"
          size="small"
          onClick={handleClickDelete}
          sx={{ ml: "auto" }}
        >
          <StyledIconBin component={IconBin} />
        </RemoveButton>
      )}
    </ItemRoot>
  );
};

const ItemRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  height: 40,
  cursor: "pointer",
  borderRadius: 8,
  padding: theme.spacing(0, 3),
  transitionDuration: "300ms",
  backgroundColor: isSelected ? theme.palette.custom.blue[1] : "transparent",
  "& .delete-icon": {
    display: isSelected ? "block" : "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.custom.blue[2],
    "& .delete-icon": {
      display: "block",
    },
  },
  "&:active": {
    backgroundColor: theme.palette.custom.blue[3],
    "& .delete-icon": {
      display: "block",
    },
  },
}));

const TreeBranchWrapper = styled(Box)({
  width: 26,
  alignSelf: "stretch",
  position: "relative",
});

const TreeBranch = styled(Box)({
  position: "absolute",
  bottom: 4,
});

const RemoveButton = styled(IconButton)({
  width: 32,
  height: 32,
});

const StyledIconBin = styled(Box)(({ theme }) => ({
  height: 16,
  width: 16,
  color: theme.palette.custom.negative[6],
}));

const StyledIconDocument = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isError",
})<{ isError: boolean }>(({ theme, isError }) => ({
  height: 20,
  width: 20,
  color: isError
    ? theme.palette.custom.negative[6]
    : theme.palette.custom.dark[6],
}));

export default FieldItem;
