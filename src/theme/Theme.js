import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createTheme({
  palette: {
    primary: {
      main: "#003A91",
    },
    secondary: {
      main:"#444444"
    },
   
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "'Mohave', sans-serif !important",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    h1: {
      fontFamily: "'Mohave', sans-serif !important",
      fontSize: '38px',
      fontWeight: '600',
      lineHeight:"46px",
    },
    h2: {
      fontFamily: "'Mohave', sans-serif !important",
        fontSize: '34px',
        fontWeight: '600',
        
    },
    h3: {
        fontSize: '22px',
        fontWeight: '600',
        letterSpacing:"0.05em",
    },
    subtitle1:{
      fontFamily: "'Mohave', sans-serif !important",
fontsize: "16px",
fontWeight: 400,
lineheight: "22px",
letterSpacing: "0.05em",
textAlign: "justified",

    },
   
    button: {
      fontFamily: "'Mohave', sans-serif !important",
        fontSize: '16px',
        fontWeight: 600,
        borderRadius: '0px',
        boxShadow:"none !important",
        label: {
            textTransform: 'uppercase',
        },
        root: {
            borderRadius: '0px !important',
            paddingTop: 8,
            paddingRight: 24,
            paddingBottom: 8,
            paddingLeft: 24,
        },
    },
},

});
export default theme;