import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: true,
  typography: {
    fontFamily:
      '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  },
  components: {
    MuiStack: { defaultProps: { useFlexGap: true } },
    MuiTooltip: { defaultProps: { disableInteractive: true } },
    MuiIcon: { defaultProps: { fontSize: 'inherit' } },
  },
});

export default theme;
