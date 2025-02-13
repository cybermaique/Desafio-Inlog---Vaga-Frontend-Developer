import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { formatLicensePlate } from "../../utils/truck";

interface TruckFormFieldProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  isLicensePlate?: boolean;
}

const TruckFormField = ({
  name,
  label,
  control,
  errors,
  isLicensePlate,
}: TruckFormFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          onChange={(e) => {
            const value = isLicensePlate
              ? formatLicensePlate(e.target.value)
              : e.target.value;
            field.onChange(value);
          }}
        />
      )}
    />
  );
};

export default TruckFormField;
