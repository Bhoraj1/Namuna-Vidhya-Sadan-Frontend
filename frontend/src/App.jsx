import { RouterProvider } from "react-router-dom";
import { indexRouter } from "./router/IndexRoutes";

const App = () => {
  return <RouterProvider router={indexRouter} />;
};

export default App;
