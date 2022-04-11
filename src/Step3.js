import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { useData } from "./DataContext";
import { PrimaryButton } from "./components/PrimaryButton";
import { FileInput } from "./components/FileInput";

export const Step3 = () => {
  const history = useHistory();
  const { data, setValues } = useData();

  const { control, handleSubmit } = useForm({
    defaultValues: { files: data.files },
  });

  const onSubmit = (data) => {
    history.push("/results");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" varian="h5">
        Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control} />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
