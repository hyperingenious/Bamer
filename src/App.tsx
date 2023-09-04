import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import NotFoundImage from "./ui/NotFoundImage";
import CardsCarousel from "./landing/CardsCarousel";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundImage />,

    children: [
      {
        path: "/",
        element: <CardsCarousel />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
