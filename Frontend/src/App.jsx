import { Provider } from "react-redux";
import "./App.css";
import Router from "./router";
import movieStore from "./store/movieStore";
import AuthProvider from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={movieStore}>
          <Router />
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
