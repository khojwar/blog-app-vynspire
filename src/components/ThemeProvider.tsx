"use client";

import { createTheme, ThemeProvider, CssBaseline, PaletteMode } from "@mui/material";
import { createContext, useMemo, useState, useContext, type ReactNode } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}


export default function ThemeRegistry({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<PaletteMode>(() =>
        typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
            ? "dark"
            : "light"
    );

    const colorMode = useMemo(
        () => ({
        toggleColorMode: () => {
            setMode((prev) => {
            const newMode = prev === "light" ? "dark" : "light";
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", newMode);
            }
            return newMode;
            });
        },
        }),
        []
    );

    const theme = useMemo(
        () =>
        createTheme({
            palette: {
            mode,
            primary: { main: "#1976d2" },
            },
        }),
        [mode]
    );


    return (
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
