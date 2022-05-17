import "../sass/login.scss";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  interface InitialState {
    username: string;
    password: string;
  }

  const initialState: InitialState = {
    username: "",
    password: "",
  };

  let navigate = useNavigate();
  //let location: any = useLocation()

  //let from = '/' || `location.state?.from?.pathname`

  async function login() {
    try {
      const res = await axios.post(
        "https://stark-hollows-08546.herokuapp.com/api/v1/users/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        setState(initialState);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const [state, setState] = useState<InitialState>(initialState);
  let { username, password } = state;
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  return (
    <div className="login__container">
      <div className="login__border">
        <h2>Login</h2>
        <label>
          Username:
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <Button variant="contained" size="small" onClick={login}>
          login
        </Button>
      </div>
      <p>
        don't have an account <Link to="/register">register here</Link>
      </p>
    </div>
  );
}
