import { Link } from "react-router-dom";
import category1 from "../../assets/category3.png";
import category2 from "../../assets/category1.png";
import category3 from "../../assets/category5.png";
import category4 from "../../assets/Anklets.webp";
import category9 from "../../assets/category2.png";
import category11 from "../../assets/category4.png";

const Categories = () => {
  const categories = [
    { name: "Mirrors", path: "Mirrors", image: category2 },
    { name: "Table Decor", path: "Table+Decor", image: category9 },
    { name: "Tables", path: "Tables", image: category1 },
    { name: "Wall Accents", path: "Wall+Accents", image: category11 },
    { name: "Wall Art", path: "Wall+Art", image: category3 },
    { name: "Wall Shelves", path: "Wall+Shelves", image: category4 },
  ];

  return (
    <div className="mx-auto mt-16 max-w-[1200px]">
      {/* Desktop View */}
      <div className="hidden grid-cols-6 gap-8 md:grid">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/shop/category/${category.path}`}
            className="text-center transition-transform duration-500 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={category.image}
              alt={category.name}
              className="mx-auto mb-4 max-w-[100px] rounded-lg border-4 border-primary-light shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-xl"
            />
            <h4 className="font-header text-lg font-semibold text-dark">
              {category.name}
            </h4>
          </Link>
        ))}
      </div>

      {/* Mobile View - Single Scrollable Row */}
      <div className="overflow-x-auto space-y-4 md:hidden scrollbar-hide  px-5">
        <div className="flex space-x-6 ">
          {categories.map((category, index) => (
           <Link
           key={index}
           to={`/shop/category/${category.path}`}
           className="flex-shrink-0 text-center transition-transform duration-500 hover:scale-105 hover:shadow-lg w-[100px]" // Ensures all cards have the same width
         >
           <img
             src={category.image}
             alt={category.name}
             className="mx-auto mb-2 w-full rounded-lg border-2 border-primary-light"
           />
           <h4 className="text-xs font-semibold w-full text-center truncate">
             {category.name}
           </h4>
         </Link>
         
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
