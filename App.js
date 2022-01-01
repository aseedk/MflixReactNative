import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppMain from './src/App';
import firebase from "firebase/compat";
import {useState, useEffect} from "react";
import {firebaseConfig} from "./config";

firebase.initializeApp(firebaseConfig)
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};

export default function App() {
    return (

        <PaperProvider theme={theme}>
            <AppMain />
        </PaperProvider>
    );
}
