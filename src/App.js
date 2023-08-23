import "./App.css";
import theme from "./theme/Theme";
import LandingPage from "./pages/landingpage/Landingpage";
import AuthProvider from "./provider/AuthProvider";
import AppRoutes from "./appRoutes";
import Snackbar from "./components/gernal/Snackbar";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Snackbar />
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
