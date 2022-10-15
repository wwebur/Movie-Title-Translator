## The Movie Title Translator
<p align="center">
  <img src="https://user-images.githubusercontent.com/74467166/195982138-0813a4e0-33c8-4d0d-9240-17dabcbeb25e.gif" height="350"/>
</p>

## About
The Movie Title Translator is a project I made purely to learn and experiment with React and Next.js (coming from a Vue.js background as a developer). The project uses TMDB Rest Api to make the translations. The project is running fine, but some componentization refactoring is still needed to make the code clean and sparking joy :)

This project was also built using [TypeScript](https://www.typescriptlang.org/), [Tailwind](https://tailwindcss.com/), [Sass (.scss)](https://sass-lang.com/), [MUI Material Design](https://mui.com/), and E2E automated testing with [Cypress](https://www.cypress.io/).
## Running this project on your machine
Fork or clone this repo to your machine, then go the repo root directory on your terminal and install the dependencies with ```npm i```

In order to run this project you need to [register](https://www.themoviedb.org/signup) and have a [TMDB API key (v3)](https://developers.themoviedb.org/3/getting-started/introduction). It's free and doesn't require any credit card. After getting an api key, in the repo root directory create a file named ```.env.local``` and then insert your api key:

```bash
NEXT_PUBLIC_MDB_API_KEY=your_api_key_pasted_here
```
Run it with ```npm run dev```, open the browser at [http://localhost:3000/](http://localhost:3000/) and you're good to go!

*Note: I built this project using node version 12.22.10

## Cypress automated E2E test

While running the project, open another terminal tab and run ```npm run e2e```
