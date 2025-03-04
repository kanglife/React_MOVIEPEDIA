import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { LocaleProvider } from "./contexts/LocaleContext"; // Ensure you import LocaleProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProvider defaultValue="ko">
    <App />
  </LocaleProvider>
);
