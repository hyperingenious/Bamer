import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import NotFoundImage from "./ui/NotFoundImage";
import CardsCarousel from "./landing/CardsCarousel";
import Products, { loader as productsLoader } from "./pages/Products";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundImage />,
    children: [
      {
        path: "/",
        element: <CardsCarousel />,
      },
      {
        path: "product/:query",
        element: <Products />,
        loader: productsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
