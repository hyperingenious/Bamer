import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { getProductsData } from "../services/apiProducts";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import Loader from "../ui/Loader";

export default function Products() {
  const products = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isLoading = navigation.state === "loading";
  const authenticated = true;
  

  function handleClick(productId: string) {
    if (!authenticated) navigate(`/register`);
    if (authenticated) navigate(`/productCheckout/${productId}`);
  }

  return (
    <>
      {isLoading && <Loader />}
      <div
        className="container-fluid cont-box bg-trasparent my-4 p-3"
        style={{ position: "relative" }}
      >
        <div className="row row-top row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
          {products.map((product) => (
            <div className="col hp" key={product.id}>
              <div className="card h-100 shadow-sm">
                <a href="#">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt="title"
                  />
                </a>

                <div className="label-top shadow-sm">
                  <a className="text-white" href="#">
                    {product.brand}
                  </a>
                </div>
                <div className="card-body">
                  <div className="clearfix mb-3">
                    <span className="float-start">
                      <span className="badge rounded-pill bg-success">
                        {product.price}$
                      </span>
                      {/* discount */}
                      <span className="me-2 ms-1 fw-bolder text-success">
                        {product.discount}% off
                      </span>
                      {/* original price */}
                      <span
                        style={{ textDecoration: "line-through" }}
                        className="rounded-pill fw-light strikethrough"
                      >
                        {(product.price / (1 - product.discount / 100)).toFixed(
                          2
                        )}
                        $
                      </span>
                    </span>

                    <span className="float-end">
                      <a className="small text-muted text-uppercase aff-link">
                        {product.rating}⭐
                      </a>
                    </span>
                  </div>
                  <span className="fw-bold">{product.product_name}</span>
                  <h3 className="card-title">
                    <a target="_blank">{product.description}</a>
                  </h3>

                  <div className="d-grid gap-2 my-4">
                    <button
                      onClick={() => handleClick(product.id)}
                      className="btn btn-warning bold-btn"
                    >
                      buy now
                    </button>
                    <a
                      href="#"
                      className="btn bg-transparent bold-btn border-2 border-warning"
                    >
                      <IconShoppingCartPlus className="me-2" />
                      ADD TO CART
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function loader({ params }) {

  const query: string = params.query;
  const response = await getProductsData(query);
  return response;
}
