import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import useForm from "../../hooks/useForm";
import { startLogin } from "../../actions/auth";
import Alert from "../ui/Alert";
import { removeError, setError } from "../../actions/ui";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) dispatch(startLogin(email, password));
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password.trim().length === 0) {
      dispatch(setError("Password is required"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  const handleGoogleLoginClick = () => {
    const clientId = "1006583541945-c3pur533l7mt7vofn9f251heapao6qu7.apps.googleusercontent.com";
    // const redirectUri = "http://localhost:8080/api/auth/google/callback";
    const redirectUri="https://calendar-backend-wtlz.onrender.com/api/auth/google/callback";

    const state = "secure_random_state";

    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar",
    ];

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", scopes.join(" "));
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("state", state); // Use the fixed state value

    // Redirect the user to Google's OAuth consent screen
    window.location.href = authUrl.toString();
  };

  return (
    <section className="card">
      <div className="card__row card__row--right">
        <div className="card__body">
          <h1 className="card__title">Login</h1>
          <form className="form" onSubmit={handleLogin}>
            {msgError && <Alert type="error" description={msgError} />}
            <div className="form__field">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <input
                className="form__input"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form__field">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                className="form__input"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleGoogleLoginClick} className="btn btn-primary">
              Login with Google
            </button>
          </div>
        </div>
      </div>
      <div className="card__row card__row--colored card__row--left">
        <div className="card__body">
          <h2 className="card__subtitle">You're new?</h2>
          <p className="card__description">
            Register and discover a great amount of features
          </p>
          <Link className="btn btn-primary--outline" to={"/auth/register"}>
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
