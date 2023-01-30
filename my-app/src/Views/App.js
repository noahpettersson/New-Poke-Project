import React from 'react';
import Menu from '../Presenters/menuPresenter';
import Pokedex from '../Presenters/pokedexPresenter';
import Authentication from '../Presenters/authenticationPresenter';
import Quiz from '../Presenters/quizPresenter';
import QuizMenu from '../Presenters/quizMenuPresenter';
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import {ThemeProvider} from "@mui/material"
import {theme} from "../theme";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authentication />,
    },
    {
      path: "/pokedex",
      element: <Pokedex />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
    {
      path: "/quizmenu",
      element: <QuizMenu />,
    },
  ]);

  return (
      <ThemeProvider theme={theme}>
        <div>
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
  );
}

export default App;

