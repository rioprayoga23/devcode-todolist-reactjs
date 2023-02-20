import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "./routes/Dashboard";
import "./index.css";
import Details from "./routes/Details";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Dashboard />} />
      <Route path="/detail/:id" element={<Details />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
