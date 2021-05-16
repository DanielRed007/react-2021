import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 bg-light rounded">
      <Link href={`/product/${product._id}`}>
        <Card.Img src={product.image}></Card.Img>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="text-dark">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text className="text-dark" as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text className="text-dark" as="h3">
          {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
