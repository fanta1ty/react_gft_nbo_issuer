import { styled, Stack, Typography } from "@mui/material";

type LabeledValueType = {
  label: string;
  value: string | React.ReactElement;
  className?: string;
};

const LabeledValue = styled((props: LabeledValueType) => {
  const { label, value, className } = props;
  return (
    <Stack direction="column" gap={1.5} className={className}>
      <Typography variant="text12" fontWeight={400} color="custom.blue.6">
        {label}
      </Typography>
      {typeof value === "string" ? (
        <Typography variant="text14" fontWeight={600} color="custom.dark.6">
          {value}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );
})({});

export default LabeledValue;
