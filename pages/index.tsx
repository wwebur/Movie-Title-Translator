import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import styles from "../styles/Home.module.scss";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import MovieButtonModal from "../components/MovieButtonModal";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export interface MovieItemInterf {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type MovieSearchResType = {
  page: number;
  results: MovieItemInterf[];
  total_pages: number;
  total_results: number;
};

type GetMoviesResType = {
  data: MovieSearchResType;
};

const Home: NextPage = () => {
  const [sourceLang, setSourceLang] = React.useState("en-US");
  const [destLang, setDestLang] = React.useState("pt-BR");
  const [titleSearch, setTitleSearch] = React.useState("");
  const [movieCards, setMovieCards] = React.useState([]);
  const [warningMsg, setWarningMsg] = React.useState("");

  const mdbApi = process.env.NEXT_PUBLIC_MDB_API_KEY;

  const changeSourceLang = (event: SelectChangeEvent) => {
    setSourceLang(event.target.value as string);
  };

  const changeDestLang = (event: SelectChangeEvent) => {
    setDestLang(event.target.value as string);
  };

  function swapLangs() {
    const finalSrcLang = destLang;
    const finalDestLang = sourceLang;

    setSourceLang(finalSrcLang);
    setDestLang(finalDestLang);
  }

  function populateMovieCards(searchRes: MovieSearchResType) {
    if (!searchRes || !searchRes.results) return;

    const smallImgBaseUrl = "https://image.tmdb.org/t/p/w200";
    let arr = [];

    for (const movie of searchRes.results) {
      let imgPath: string;
      let overview: string;

      if (movie.poster_path === null) {
        if (movie.backdrop_path === null) {
          imgPath = "/no-image-available.png";
        } else {
          imgPath = `${smallImgBaseUrl}${movie.backdrop_path}`;
        }
      } else {
        imgPath = `${smallImgBaseUrl}${movie.poster_path}`;
      }

      if (movie.overview.length === 0 || movie.overview === null) {
        overview = "No overview avaliable";
      } else if (movie.overview.length > 170) {
        overview = movie.overview.substring(0, 170);
        overview = overview.substring(0, overview.lastIndexOf(" "));
        overview += "...";
      } else {
        overview = movie.overview;
      }

      arr.push(
        <Card
          key={movie.id}
          sx={{ display: "flex", maxWidth: "700px" }}
          className="my-2"
        >
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={imgPath}
            alt="Movie cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {movie.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {movie.release_date.slice(0, 4)}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                className={styles.movieOverview}
              >
                {overview}
              </Typography>
              <CardActions className={styles.cardActions}>
                <MovieButtonModal
                  movieId={movie.id}
                  language={destLang}
                  btnLabel="See Translation"
                ></MovieButtonModal>
              </CardActions>
            </CardContent>
            <Box
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            ></Box>
          </Box>
        </Card>
      );
    }
    return arr;
  }

  async function getMovies(
    languageCode: string,
    searchQuery: string,
    mdbApiKey: string
  ) {
    if (!searchQuery) {
      setWarningMsg("Search field cannot be empty");
      return false;
    }
    if (sourceLang === destLang) {
      setWarningMsg("Idioms must be different");
      return false;
    }

    setWarningMsg("");

    try {
      const { data, status } = await Promise.resolve(
        axios.get<GetMoviesResType>(
          `https://api.themoviedb.org/3/search/movie?&page=1&include_adult=false` +
            `&api_key=${mdbApiKey}` +
            `&language=${languageCode}` +
            `&query=${searchQuery}`,
          {
            headers: { Accept: "application/json" },
          }
        )
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(`❗Error ${error.status}: ${error.message}`);
        if (error.response && error.response.data) {
          const errorResponse: any = error.response.data;
          if (errorResponse["errors"]) {
            for (const err of errorResponse["errors"]) {
              console.log(`❗ ${err}`);
            }
          }
          return errorResponse["errors"];
        }
        return error;
      } else {
        console.log("❗Unexpected error: ", error);
        return error;
      }
    }
  }

  const languages = {
    "en-US": {
      code: "en-US",
      label: "English",
    },
    "pt-BR": {
      code: "pt-BR",
      label: "Portuguese (BR)",
    },
  };

  let langMenuItems: JSX.Element[] = [];

  for (const obj of Object.values(languages)) {
    langMenuItems.push(
      <MenuItem key={obj.code} value={obj.code}>
        {obj.label}
      </MenuItem>
    );
  }

  return (
    <div className={`${styles.container} bg-prim-dark-blue text-prim-white`}>
      <Head>
        <title>Movie Title Translator</title>
        <meta name="description" content="Accurate movie title translations" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400&display=block"
          rel="stylesheet"
        />
      </Head>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <main className={styles.main}>
          <div className={`${styles.theLogo} grid justify-items-center`}>
            <Image
              src="/logo.png"
              alt="Clapperboard Logo"
              height="80"
              width="80"
              className={styles.clapperboardImg}
            />
            <h1 className={`${styles.title}`}>
              The Movie Title <br /> Translator
            </h1>
          </div>

          <div className={`${styles.searchBox}`}>
            <Box
              component="form"
              sx={{}}
              noValidate
              autoComplete="off"
              className="text-prim-white"
            >
              <TextField
                id="search-box"
                className={styles.searchTextField}
                label="Search Movie Title"
                variant="outlined"
                type="search"
                value={titleSearch}
                onChange={(e) => {
                  setTitleSearch(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    getMovies(sourceLang, titleSearch, mdbApi as string).then(
                      (data) => {
                        const moviesData: any = data;
                        const movieCardsArr: any =
                          populateMovieCards(moviesData);
                        setMovieCards(movieCardsArr);
                      }
                    );
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </div>

          <div className={styles.sourceLang}>
            <Box sx={{}}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select
                  id="source-lang"
                  value={sourceLang}
                  label="From"
                  onChange={changeSourceLang}
                >
                  {langMenuItems}
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className={`${styles.switchLangBtn}`}>
            <IconButton id="swap-btn" onClick={swapLangs}>
              <SwapHorizIcon></SwapHorizIcon>
            </IconButton>
          </div>

          <div className={styles.destLang}>
            <Box sx={{}}>
              <FormControl fullWidth>
                <InputLabel>To</InputLabel>
                <Select
                  id="dest-lang"
                  value={destLang}
                  label="To"
                  onChange={changeDestLang}
                >
                  {langMenuItems}
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className={`${styles.searchBtn} grid place-items-center`}>
            <Button
              id="search-btn"
              variant="contained"
              size="large"
              className="bg-prim-light-blue text-prim-dark-blue font-bold"
              onClick={() => {
                getMovies(sourceLang, titleSearch, mdbApi as string).then(
                  (data) => {
                    const moviesData: any = data;
                    const movieCardsArr: any = populateMovieCards(moviesData);
                    setMovieCards(movieCardsArr);
                  }
                );
              }}
            >
              Search
            </Button>
          </div>

          {warningMsg === "" ? (
            <></>
          ) : (
            <div id="warning-message" className={styles.warningMessage}>
              {warningMsg}
            </div>
          )}

          <div
            id="movie-cards-list"
            className={`${styles.movieCards} grid place-content-center`}
          >
            {movieCards}
          </div>
        </main>
      </ThemeProvider>

      <footer className={styles.footer}>
        <a
          href="https://github.com/it-jhack"
          target="_blank"
          rel="noopener noreferrer"
        >
          {new Date().getFullYear()} -
          <span className="ml-1">Amaral, T. P.</span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
