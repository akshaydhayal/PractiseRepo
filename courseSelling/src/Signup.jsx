import {TextField} from "@mui/material";
import {Button} from "@mui/material";

function Signup(){
    return (
      <div>
        Welcome to Coursera Signup Below
        <div>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <Button variant="contained">Signup</Button>
        </div>
      </div>
    );
}
export default Signup;