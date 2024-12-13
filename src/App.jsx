import { Provider } from "react-redux";

import store from "./store";
import AppRouter from "./routers/AppRouter";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token in localStorage or your global state
      localStorage.setItem("token", token);

      // Optionally, redirect to another page after storing the token
      window.location.href = "/dashboard"; // Example redirection
    }
  }, []);
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
export default App;
