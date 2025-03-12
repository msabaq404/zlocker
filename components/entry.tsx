import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface EntryProps {
  onEntryChange: (key: string) => void;
  wannaLogin: boolean;
}

export default function Entry(props: EntryProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [key, setKey] = React.useState("");

  React.useEffect(() => {
    props.onEntryChange(key);
  }, [key]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

 

  const handleMouseDownPassword = (event:  React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    
      <div>
        <FormControl sx={{ m: 0, width: "100%" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">{props.wannaLogin ? "Tell us Your Entry Key" : "Set Your Entry Key"}</InputLabel>
          <FilledInput
            onChange={e => setKey(e.target.value)}
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    
  );
}
