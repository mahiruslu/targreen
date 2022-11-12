import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "swiper/css/bundle";
import "./index.css";
import "./assets/styles/main.scss";
import { BrowserRouter as Router } from "react-router-dom";

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </MantineProvider>
    </Router>
  </React.StrictMode>
);
