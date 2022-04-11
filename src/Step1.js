import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { yupResolver } from "@hookform/resolvers/yup";

import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { MainContainer } from "./components/MainContainer";
import { PrimaryButton } from "./components/PrimaryButton";
import { useData } from "./DataContext";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

export const Step1 = () => {
  const history = useHistory();
  const { data, setValues } = useData();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    history.push("/step2");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" varian="h5">
        Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          name="firstName"
          type="text"
          placeholder="First Name"
          label="First Name"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />

        <Input
          ref={register}
          name="lastName"
          type="text"
          placeholder="Last Name"
          label="Last Name"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
