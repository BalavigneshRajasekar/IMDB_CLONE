import { Provider } from "react-redux";
import "./App.css";
import Router from "./router";
import movieStore from "./store/movieStore";

function App() {
  return (
    <>
      <Provider store={movieStore}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
