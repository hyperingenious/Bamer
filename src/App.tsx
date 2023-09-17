import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import NotFoundImage from "./ui/NotFoundImage";
import CardsCarousel from "./landing/CardsCarousel";
import Products, { loader as productsLoader } from "./pages/Products";
import ProductCheckout, {
  loader as productCheckoutLoader,
} from "./pages/ProductCheckout";
import Register, { action as registerAction } from "./pages/Register";
import Cart from "./pages/Cart";
import ProtectedRoutes from "./redux/ProtectedRoutes";

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
      {
        path: "productCheckout/:productId",
        element: <ProductCheckout />,
        loader: productCheckoutLoader,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
