import React from "react";
import { get } from "lodash";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  FormHelperText,
} from "@mui/material";

export default function HookSelect(props) {
  const { control, options, name, label, defaultValue, errors, ...rest } =
    props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl
          fullWidth
          id={name}
          error={Boolean(get(errors, name))}
          // helperText={get(errors, name)?.message}
          className="mb-24"
          {...rest}
          variant="outlined"
        >
          <InputLabel className="text-12 bg-white px-2" htmlFor="cityId">
            {label}
          </InputLabel>
          <Select
            endAdornment={<SelectIcon />}
            defaultValue={0}
            label={label}
            {...field}
            input={
              <OutlinedInput
                inputProps={{
                  className: "bg-white",
                }}
                labelWidth={label.length * 10}
                name="group_id"
              />
            }
          >
            <MenuItem value={0}>Please Select</MenuItem>
            {options.map((val) => (
              <MenuItem key={val.value} value={val.value}>
                {val.label}
              </MenuItem>
            ))}
          </Select>
          {Boolean(get(errors, name)) && (
            <FormHelperText>{get(errors, name)?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

const SelectIcon = () => {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
        fill="#374253"
      />
    </svg>
  );
};
