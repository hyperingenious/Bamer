import { useLoaderData } from "react-router-dom";
import { getProduct } from "../services/apiProducts";
import { Badge, Button, Grid, Image, Text, Title } from "@mantine/core";
import { placeOrder } from "../services/apiOrder";

export default function ProductCheckout() {
  const [product] = useLoaderData();

  return (
    <Grid className="mx-5">
      <Grid.Col span={4} className="mx-1">
        <Image
          maw={240}
          mx="auto"
          miw={180}
          radius="md"
          src={product.image}
          alt="Random image"
        />
      </Grid.Col>
      <Grid.Col span={'auto'} className="mx-1">
        <Badge color="indigo">{product.brand}</Badge>
        <Badge color="indigo">{product.category}</Badge>
        <Title order={1} size="3rem" className="mt-2">
          {product.product_name}
        </Title>
        <Text>{product.description}</Text>
        <Text fz="md" className="mt-1">
          price
          <Title order={1} size="1.5rem" color="grey" className="mt-2 d-inline">
            {product.price}$
          </Title>
          <Title
            order={1}
            size="1rem"
            color="grey"
            style={{ textDecoration: "line-through" }}
            className="mt-2 ms-1 d-inline"
          >
            {(product.price / (1 - product.discount / 100)).toFixed(2)}$
          </Title>
          <Title
            order={1}
            size="1.5rem"
            color="green"
            className="mt-2 ms-1 d-inline"
          >
            {product.discount}% off
          </Title>
        </Text>
        <Text>{product.rating}.0⭐ ratings</Text>
        <Button color="violet" className="mt-4" size="md">
          Buy Now
        </Button>
      </Grid.Col>
    </Grid>
  );
}

export async function loader({ params }) {
  const productId: string = params.productId;
  const product = await getProduct(productId);
  placeOrder()
  return product;
}
