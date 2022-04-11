import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { makeStyles } from "@material-ui/core/styles";

import { MainContainer } from "./components/MainContainer";
import { useData } from "./DataContext";
import { PrimaryButton } from "./components/PrimaryButton";

const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
});

export const Results = () => {
  const { data } = useData();
  const styles = useStyles();
  const [success, setSuccess] = useState(false);

  const { files } = data;
  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");

  const onSubmit = async () => {
    const formData = new FormData();
    if (data.files) {
      data.files.forEach((file) => formData.append("files", file, file.name));
    }
    entries.forEach((entry) => formData.append(entry[0], entry[1]));

    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      Swal.fire("Great job!", "You've passed the challenge!", "success");
      setSuccess(true);
    }
  };

  if (success) {
    return <Confetti />;
  }

  return (
    <MainContainer>
      <Typography component="h2" varian="h5">
        Form Values
      </Typography>
      <TableContainer component={Paper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell>{entry[0]}</TableCell>
                <TableCell>{entry[1].toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {files && (
        <>
          <Typography component="h2" varian="h5">
            Files
          </Typography>
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={file.name} secondary={file.size} />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      <Link to="/">Start Over</Link>
    </MainContainer>
  );
};
