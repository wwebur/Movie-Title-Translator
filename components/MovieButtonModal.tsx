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

interface MovieTranslate {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  overview: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  [key: string]: any;
}

const emptyMovieTranslateObj = {
  id: 0,
  title: "",
  poster_path: "",
  backdrop_path: "",
  genres: [
    {
      id: 0,
      name: "",
    },
  ],
  overview: "",
  imdb_id: "",
  original_language: "",
  original_title: "",
  release_date: "",
  runtime: 0,
  vote_average: 0,
};

interface MovieTranslateRes {
  data: MovieTranslate;
}

function MovieButtonModal(props: MovieButtonModalProps) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(emptyMovieTranslateObj);
  const [genres, setGenres] = React.useState([] as string[]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const movieId = props.movieId;
  const language = props.language;
  const mdbApi = process.env.NEXT_PUBLIC_MDB_API_KEY;

  const url = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${mdbApi}&language=${language}`;

  React.useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);

      let genresNamesArr: any = [];
      setGenres(genresNamesArr);
    });
  }, []);

  // const mData:

  const btnLabel = props.btnLabel || "See Details";

  return (
    <>
      <Button size="small" onClick={handleOpen} className="text-left">
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
          <div id="overview" className={styles.overview}>
            <p>Overview</p>
            <p>Directors, Actors, etc.</p>
            <p>{data.overview}</p>
          </div>
          <div id="poster" className={styles.poster}>
            <img
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w200${data.poster_path}`
                  : "/no-image-available.png"
              }
            />
          </div>
          <div id="title" className={styles.title}>
            {data.title}
          </div>
          <div id="info" className={styles.info}>
            <p>
              {`${data.runtime} min | ${String(genres).replace(",", ", ")}`}
            </p>
            <p></p>
            <p>Original Language: {data.original_language}</p>
            <p></p>
          </div>
          <div id="score" className={styles.score}>
            <p>
              {data.vote_average
                ? `${Math.round(data.vote_average * 10)}%`
                : "N/A"}
            </p>
          </div>
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MovieButtonModal;
