import { ItemCard } from "./ItemCard";
import { data } from "../Assets/data";

export default function MainContent(props) {
  const { search, price, category, applyFilter } = props;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data
          .filter((item) => {
            return search && search.toLocaleLowerCase() === ""
              ? item
              : item.name.toLocaleLowerCase().includes(search);
          })
          .filter((item) => {
            return !applyFilter ? item : item.price <= price;
          })
          .filter((item) => {
            return !applyFilter || category === "none"
              ? item
              : item.category === category;
          })
          .map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
