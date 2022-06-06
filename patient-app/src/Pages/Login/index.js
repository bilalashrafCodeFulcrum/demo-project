import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, Grid, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HookTextField from "../../shared-compnents/hooks/HookTextField";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../Services";

const loginSchema = yup.object().shape({
  username: yup.string().required("You must enter a username!"),
  // .email("Please enter valid username"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - should be 4 chars minimum."),
});

const defaultValues = {
  username: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const { errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(model) {
    // handleLogin(model);

    axios({
      url: "/api/login/",
      method: "post",
      data: model,
    })


  }

  const { mutate: handleLogin } = useMutation(
    (payload) =>
      axios({
        url: "/api/login/",
        method: "post",
        data: payload,
      }),
    {
      onSuccess: (res) => {
        saveToken(res.data?.token ?? null);
        navigate("/patients");
      },
    }
  );

  const EndAdornment = () => {
    return (
      <IconButton onClick={() => setShowPassword((prevState) => !prevState)}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    );
  };

  return (
    <div className="w-full h-screen">
      <Grid className="h-full items-center " container>
        <Grid
          style={{ background: "#1976D2" }}
          className="h-full"
          item
          xs={12}
          sm={12}
          md={6}
        >
          <div className="left-side-wrapper h-full flex items-center justify-center">
            <div className="w-6/12 shadow-xl h-3/4 p-4 bg-white flex items-center rounded-md">
              <form
                className="flex flex-col space-y-6 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="text-center font-semibold text-3xl"> Login </h2>
                <HookTextField
                  name="username"
                  label="Username"
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
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  {" "}
                  Login{" "}
                </Button>
              </form>
            </div>
          </div>
        </Grid>
        <Grid className="h-full w-full" item xs={12} sm={12} md={6}>
          <div className="flex items-center justify-center h-full">
            <div className="w-7/12 h-auto">
              <img src="/assets/arts/login.svg" alt="login-img" />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default Login;
