import React from "react";
import { get } from "lodash";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function HookTextField(props) {
  const {
    control,
    name,
    label,
    defaultValue,
    errors,
    type,
    EndAdornment,
    ...rest
  } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          defaultValue={defaultValue ?? ""}
          className="mb-28"
          label={label}
          id={name}
          type={type}
          key={`${label}-${name}`}
          error={Boolean(get(errors, name))}
          helperText={get(errors, name)?.message}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: EndAdornment ? <EndAdornment /> : "",
          }}
          {...rest}
        />
      )}
    />
  );
}
