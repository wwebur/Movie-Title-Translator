import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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

const Home: NextPage = () => {
  const [sourceLang, setSourceLang] = React.useState("en-us");
  const [destLang, setDestLang] = React.useState("pt-br");

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
    "en-us": {
      code: "en-us",
      label: "English",
    },
    "pt-br": {
      code: "pt-br",
      label: "Portuguese (BR)",
    },
  };

  let langMenuItems: Array<any> = [];

  for (const obj of Object.values(languages)) {
    langMenuItems.push(
      <MenuItem key={obj.code} value={obj.code}>
        {obj.label}
      </MenuItem>
    );
  }

  let searchQuery = "";

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
          <div className="grid justify-items-center mt-10">
            <Image
              src="/logo.png"
              alt="Clapperboard Logo"
              height="80"
              width="80"
              className="flex justify-items-center"
            />
          </div>

          <div className="mt-5">
            <h1 className={`${styles.title} uppercase font-bold`}>
              The Movie Title <br /> Translator
            </h1>
          </div>

          <div className="grid place-items-center mt-10">
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
                className="outline-prim-white"
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
