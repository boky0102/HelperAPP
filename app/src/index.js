import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import theme from "./theme";






ReactDOM.render(
    <ThemeProvider theme={theme}>

        <App>

        </App>

    </ThemeProvider>,
     document.getElementById("root"));

