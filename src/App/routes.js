import SettingsPage from "../Elements/SettingsPage";
import MainPage from "./MainPage";

const routes = [
  {
    location: "/main",
    element: <MainPage />,
  },
  {
    location: "/settings",
    element: <SettingsPage />,
  },
];

export default routes;
