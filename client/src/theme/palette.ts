const INFO = {
  light: "#7F9FAD",
  main: "#608899",
  dark: "#435F6B",
};

const SUCCESS = {
  light: "#AAF27F",
  main: "#348958",
  dark: "#229A16",
};

const ERROR = {
  light: "#E4713F",
  main: "#DE4E10",
  dark: "#9B360B",
};

const palette = {
  // primary: { ...PRIMARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...ERROR },
  error: { ...ERROR },
  // text: { primary: "#161546", secondary: "#878798" },
  // background: {
  //   paper: "#FFFFFF",
  //   default: "#FFFFFF",
  //   grey: "#F6F7FB",
  //   light: "#FCFCFC",
  // },
  action: {
    disabledBackground: "#A6A6A6",
    disabled: "#FFFFFF",
  },
};

export default palette;
