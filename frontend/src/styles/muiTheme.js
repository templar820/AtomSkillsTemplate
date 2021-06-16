import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import colors from "./colors.modules.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    }
  }
});

theme.overrides.MuiButton = {
  root: {
    borderRadius: 0,
  },
}

export default theme;