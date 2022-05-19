import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HookTextField from "../../shared-compnents/hooks/HookTextField";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("You must enter a email!")
    .email("Please enter valid email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - should be 4 chars minimum."),
});

const defaultValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { control, formState, handleSubmit, setError, watch } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(model) {
    const { email, password } = model;
  }

  const EndAdornment = () => {
    return (
      <IconButton onClick={() => setShowPassword((prevState) => !prevState)}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    );
  };

  return (
    <div className="w-full h-screen">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="h-full"
      >
        <Grid item lg={4} md={6} sm={11} xs={11}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-center font-semibold text-3xl"> Login </h2>
            <HookTextField
              name="email"
              label="Email"
              control={control}
              errors={errors}
            />
            <HookTextField
              name="password"
              label="Password"
              control={control}
              errors={errors}
              type={showPassword ? "text" : "password"}
              EndAdornment={EndAdornment}
            />
            <Button type="submit" color="primary" variant="contained" fullWidth>
              {" "}
              Login{" "}
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
export default Login;
