import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Home: NextPage = () => {
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
          <div className="grid justify-items-center mt-5">
            <Image
              src="/logo.png"
              alt="Clapperboard Logo"
              height="120"
              width="120"
              className="flex justify-items-center"
            />
          </div>

          <div className="mt-5">
            <h1 className={`${styles.title} uppercase font-bold`}>
              The Movie Title Translator
            </h1>
          </div>

          <div className="grid grid-cols-3 justify-content-center mt-5">
            <div className="">
              <p>From</p>
              <p>English</p>
            </div>

            <div>
              <Button variant="outlined">Switch</Button>
            </div>

            <div className="">
              <p>To</p>
              <p>Portuguese &#40;BR&#41;</p>
            </div>
          </div>

          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              className="text-prim-white"
            >
              <TextField
                id="outlined-basic"
                label="Search Movie"
                variant="outlined"
                className="outline-prim-white"
              />
            </Box>
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
