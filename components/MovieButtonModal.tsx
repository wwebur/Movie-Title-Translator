import * as React from "react";

import Image from "next/image";
import axios from "axios";

import styles from "../styles/MovieButtonModal.module.scss";
import CssBaseline from "@mui/material/CssBaseline";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export interface MovieButtonModalProps {
  movieId: number;
  language: string;
  btnLabel?: string;
}

const MovieButtonModal = (props: MovieButtonModalProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const movieId = props.movieId;
  const language = props.language;
  const btnLabel = props.btnLabel || "See Details";

  const [sourceLang, setSourceLang] = React.useState("en-US");
  const [destLang, setDestLang] = React.useState("pt-BR");
  const [titleSearch, setTitleSearch] = React.useState("");
  const [movieCards, setMovieCards] = React.useState([]);

  const mdbApi = process.env.NEXT_PUBLIC_MDB_API_KEY;

  const changeSourceLang = (event: SelectChangeEvent) => {
    setSourceLang(event.target.value as string);
  };

  const changeDestLang = (event: SelectChangeEvent) => {
    setDestLang(event.target.value as string);
  };

  return (
    <>
      <Button size="small" onClick={handleOpen}>
        {btnLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.dialog}
        maxWidth="md"
        fullWidth
      >
        <div className={styles.container}>
          <nav id="nav" className={styles.nav}>
            Navbar
          </nav>
          <main id="main" className={styles.main}>
            Main
          </main>
          <div id="sidebar" className={styles.sidebar}>
            Sidebar
          </div>
          <div id="content1" className={styles.content1}>
            Content1
          </div>
          <div id="content2" className={styles.content2}>
            Content2
          </div>
          <footer id="footer" className={styles.footer}>
            Footer
          </footer>
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieButtonModal;
