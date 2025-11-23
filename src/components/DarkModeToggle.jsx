"use client";

import { IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "./ThemeProvider";

export default function DarkModeToggle() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
