import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormDataType, SupportedTypeEnum } from "./types";
import FieldItem from "./FieldItem";
import { useSelectedIndexContext } from "./context";

type Props = {
  className?: string;
  readOnly?: boolean;
};

const FieldsBoxBase = ({ readOnly, className }: Props) => {
  const { t } = useTranslation();
  const { selectedIndex, setSelectedIndex } = useSelectedIndexContext();

  const {
    fields: formFields,
    remove,
    append,
  } = useFieldArray<FormDataType>({
    name: "fields",
  });
  const {
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<FormDataType>();

  const onClickAdd = () => {
    const fieldsLength = getValues("fields").length;
    append({
      fieldName: `field${fieldsLength + 1}`,
      type: SupportedTypeEnum.STRING,
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      isRequired: false,
    });
    setSelectedIndex(fieldsLength);
  };

  const onClickItem = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClickDelete = (index: number) => {
    if (selectedIndex === null) {
      remove(index);
      return;
    }
    if (index < selectedIndex) {
      setSelectedIndex(selectedIndex - 1);
    } else if (index === selectedIndex) {
      setSelectedIndex(null);
    }
    remove(index);
  };

  return (
    <Root className={className}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
        <Typography variant="text16">{t("subject")}</Typography>
        {!readOnly && (
          <Button size="small" color="black" onClick={onClickAdd}>
            {t("add_field")}
          </Button>
        )}
      </Stack>
      <Stack sx={{ mt: 4 }}>
        {formFields.map((field, index) => (
          <FieldItem
            isError={!!errors?.fields?.[index]}
            isSelected={selectedIndex === index}
            key={field.id}
            fieldName={watch(`fields.${index}.fieldName`)}
            onClick={() => onClickItem(index)}
            onClickDelete={() => handleClickDelete(index)}
            showRemoveButton={!readOnly && formFields.length > 1}
          />
        ))}
      </Stack>
    </Root>
  );
};

const Root = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: theme.spacing(3, 2),
  borderRadius: 12,
}));

const FieldsBox = styled(FieldsBoxBase)({});

export default FieldsBox;
