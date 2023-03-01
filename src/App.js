import { createTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import theme from './theme/Theme';
import LandingPage from './pages/landingpage/Landingpage';
import AuthProvider from './provider/AuthProvider';
import AppRoutes from './appRoutes';
import Snackbar from "./components/gernal/Snackbar";


function App() {
 
    

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      
        <AuthProvider>
        <Snackbar/>
      <AppRoutes/>
        </AuthProvider>
     
      </ThemeProvider>
    
    
  </div>
  );
}

export default App;
