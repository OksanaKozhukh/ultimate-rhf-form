import React from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { useData } from "./DataContext";
import { Input } from "./components/Input";
import { PrimaryButton } from "./components/PrimaryButton";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
});

const normalizePhoneNumber = (val) => {
  const phoneNumber = parsePhoneNumberFromString(val);
  return phoneNumber ? phoneNumber.formatInternational() : val;
};

export const Step2 = () => {
  const history = useHistory();
  const { data, setValues } = useData();

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phonenumber: data.phonenumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    history.push("/step3");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" varian="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          type="email"
          name="email"
          label="Email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Do you have a phone?"
          defaultValue={data.hasPhone}
          defaultChecked={data.hasPhone}
          color="primary"
          inputRef={register}
          name="hasPhone"
        />

        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            onChange={(ev) =>
              (ev.target.value = normalizePhoneNumber(ev.target.value))
            }
          />
        )}

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
