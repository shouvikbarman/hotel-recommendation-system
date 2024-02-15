import { Theme } from "@mui/system";
import Radiobutton from "./Radiobutton";
import Checkbox from "./Checkbox";
import Button from "./Button";
import Link from "./Link";
import TextField from "./TextField";
import Chip from "./Chip";
import SvgIcon from "./SvgIcon";

const componentsOverride = (theme: Theme) =>
  Object.assign(
    Button(theme),
    Link(),
    Radiobutton(theme),
    Checkbox(theme),
    TextField(theme),
    Chip(theme),
    SvgIcon(theme),
  );

export default componentsOverride;
