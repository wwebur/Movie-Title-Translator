import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import styles from "../styles/Home.module.css";
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export interface MovieItem {
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

type MovieSearchRes = {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
};

type GetMovieRes = {
  data: MovieSearchRes;
};

async function getMovies(
  languageCode: string,
  searchQuery: string,
  mdbApiKey: string
) {
  try {
    const { data, status } = await axios.get<GetMovieRes>(
      `https://api.themoviedb.org/3/search/movie?&page=1&include_adult=false` +
        `&api_key=${mdbApiKey}` +
        `&language=${languageCode}` +
        `&query=${searchQuery}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    console.log(">>> status");
    console.log(status);
    console.log(">>> data");
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❗Error:", error.message);
      if (error.response && error.response.data) {
        const errorResponse: any = error.response.data;
        if (errorResponse["errors"]) {
          for (const err of errorResponse["errors"]) {
            console.log("❗" + err);
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

const Home: NextPage = () => {
  const [sourceLang, setSourceLang] = React.useState("en-US");
  const [destLang, setDestLang] = React.useState("pt-BR");
  const [titleSearch, setTitleSearch] = React.useState("");
  const [resData, setResData] = React.useState();

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

  let movieCards: JSX.Element[] = [];

  function populateMovieCards(searchRes: MovieSearchRes) {
    for (const movie in searchRes.results) {
      console.log(movie);
    }
  }

  return (
    <div
      className={`${styles.container} grid content-between bg-prim-dark-blue text-prim-white`}
    >
      <Head>
        <title>Movie Title Translator</title>
        <meta name="description" content="Accurate movie title translations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <main className={styles.main}>
          <div className="grid justify-items-center mt-12">
            <div className="flex">
              <Image
                src="/logo.png"
                alt="Clapperboard Logo"
                height="80"
                width="80"
                className="flex justify-items-center translate-x-[-5px]"
              />
              <h1
                className={`${styles.title} uppercase font-bold translate-y-[10px] translate-x-[10px]`}
              >
                The Movie Title <br /> Translator
              </h1>
            </div>
          </div>

          <div className="grid place-items-center mt-[100px]">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, minWidth: 408 },
              }}
              noValidate
              autoComplete="off"
              className="text-prim-white"
            >
              <TextField
                id="outlined-basic"
                label="Search Movie Title"
                variant="outlined"
                type="search"
                className="outline-prim-white"
                value={titleSearch}
                onChange={(e) => {
                  setTitleSearch(e.target.value);
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

          <div className="grid place-content-center mt-3">
            <div className="flex">
              <div>
                <Box sx={{ width: 180 }}>
                  <FormControl fullWidth>
                    <InputLabel>From</InputLabel>
                    <Select
                      value={sourceLang}
                      label="From"
                      onChange={changeSourceLang}
                    >
                      {langMenuItems}
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className="mt-2 ml-1 mr-1">
                <IconButton onClick={swapLangs}>
                  <SwapHorizIcon></SwapHorizIcon>
                </IconButton>
              </div>

              <div>
                <Box sx={{ width: 180 }}>
                  <FormControl fullWidth>
                    <InputLabel>To</InputLabel>
                    <Select
                      value={destLang}
                      label="To"
                      onChange={changeDestLang}
                    >
                      {langMenuItems}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          </div>

          <div className="grid place-items-center mt-10">
            <Button
              variant="contained"
              size="large"
              className="bg-prim-light-blue text-prim-dark-blue font-bold"
              onClick={() => {
                getMovies(sourceLang, titleSearch, mdbApi as string);
              }}
            >
              Search
            </Button>
          </div>
        </main>
      </ThemeProvider>

      <footer className={styles.footer}>
        <a
          href="https://github.com/it-jhack"
          target="_blank"
          rel="noopener noreferrer"
        >
          {new Date().getFullYear()} -<span className="ml-1">Amaral, T.P.</span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
