import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function HookCheckbox({ name, label, control }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          label={label}
        />
      )}
    />
  );
}
