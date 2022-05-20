import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import HookTextField from "../../shared-compnents/hooks/HookTextField";
import HookSelect from "../../shared-compnents/hooks/HookSelect";
import HookCheckbox from "../../shared-compnents/hooks/HookCheckbox";
import { useMutation } from "react-query";
import axios from "axios";

const genderOptions = [
  {
    label: "Male",
    value: 'MALE',
  },
  {
    label: "Female",
    value: 'FEMALE',
  },
];

const patientDefaultValues = {
  first_name: "",
  last_name: "",
  // i will use enum for this
  gender: 1,
  phone: "",
  isDisabled: false,
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const patientSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("Please enter your first name")
    .min(3, "First name can not be less then 3 charecters"),
  last_name: yup.string().required("Please enter your last name"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export default function AddPatientDialog(props) {
  const { open, handleClose } = props;

  const { control, handleSubmit, formState , reset} = useForm({
    mode: "onChange",
    defaultValues: patientDefaultValues,
    resolver: yupResolver(patientSchema),
  });
  const { errors } = formState;

  const onSubmit = (model) => {
      handleCreate(model)
      
  };

  const onModelClose = ()=>{
      reset(patientDefaultValues)
      handleClose()
  }

  const {mutate: handleCreate, isLoading} = useMutation('post/patient', (payload)=>axios({
    url: '/toBeFill',
    method: 'post',
    data: payload
  }), {
    onSuccess: ()=>{
      reset(patientDefaultValues)
      onModelClose()
    }
  })

  return (
    <div>
      <Dialog
        open={open}
        onClose={onModelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create New Patient</DialogTitle>
        <DialogContent>
            <form
            id="patient-form"
              className=" space-y-6 w-full mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <HookTextField
                name="first_name"
                label="First Name"
                control={control}
                errors={errors}
              />
              <HookTextField
                name="last_name"
                label="Last Name"
                control={control}
                errors={errors}
              />
              <HookTextField
                name="phone"
                label="Phone"
                control={control}
                errors={errors}
              />
              <HookSelect
                name="gender"
                label="Gender"
                control={control}
                errors={errors}
                options={genderOptions}
              />
              <HookCheckbox
                name="isDisabled"
                label="Are you Disabled?"
                control={control}
              />
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onModelClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type='submit'
            autoFocus
            form='patient-form'
            disabled={isLoading}
          >
            Create Patient
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
