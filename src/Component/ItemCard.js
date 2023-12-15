import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { addToCartThunk } from "../app/reducers/productReducers";
import { useDispatch } from "react-redux";

export function ItemCard(props) {
  const dispatch = useDispatch();

  const { name, price, image, category } = props.item;

  return (
    <Card
      className={`cardContainer w-96 rounded-3xl shadow-md p-8 transition-all duration-200 ease-in-out flex flex-col `}
    >
      <CardHeader shadow={false} floated={false} className="h-96 rounded-t-lg">
        <img
          src={image}
          alt={category}
          className="h-full w-full object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardBody className="itemInfo flex-grow">
        <div className="namePrice mb-2 flex flex-col items-start justify-between">
          <Typography color="blue-gray" className="name font-medium">
            {name}
          </Typography>
          <Typography color="blue-gray" className="price font-bold">
            ₹{price}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="btnContainer pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="addBtn rounded-2xl  bg-red-500 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 py-4"
          onClick={() => dispatch(addToCartThunk(props.item))}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
