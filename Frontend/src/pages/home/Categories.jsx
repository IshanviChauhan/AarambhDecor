import { Link } from "react-router-dom";
import category1 from "../../assets/category3.png";
import category2 from "../../assets/category1.png";
import category3 from "../../assets/category5.png";
import category4 from "../../assets/Anklets.webp";
import category5 from "../../assets/GOLD.png";
import category6 from "../../assets/category10.png";
import category7 from "../../assets/category11.png";
import category8 from "../../assets/category8.png";
import category9 from "../../assets/category2.png";
import category10 from "../../assets/FJ.webp";
import category11 from "../../assets/category4.png";
import category12 from "../../assets/category9.png";

const Categories = () => {
  const categories = [
    { name: "Earrings", path: "Earrings", image: category2 },
    { name: "Necklaces", path: "Necklaces", image: category9 },
    { name: "Studs", path: "Studs", image: category1 },
    { name: "Bracelets", path: "Bracelets", image: category11 },
    { name: "Rings", path: "Rings", image: category3 },
    { name: "Anklets", path: "Anklets", image: category4 },
    { name: "Idols & Coins", path: "Idols & Coins", image: category10 },
    { name: "Men's Jewellery", path: "Men's Jewellery", image: category8 },
    { name: "Kid's Jewellery", path: "Kid's Jewellery", image: category12 },
    { name: "Bridal Jewellery", path: "Bridal Jewellery", image: category6 },
    { name: "Fashion Jewellery", path: "Fashion Jewellery", image: category7 },
    { name: "Gold Jewellery", path: "Gold Jewellery", image: category5 },
  ];

  return (
    <div className="mx-auto mt-16 max-w-[1200px] px-4">
      {/* Desktop View */}
      <div className="hidden grid-cols-6 gap-8 md:grid">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/shop/category/${category.path}`}
            className="group text-center transition-transform duration-300"
          >
            <div className="bg-white rounded-full p-2 border-2 border-transparent group-hover:border-primary-light group-hover:shadow-lg transition-all duration-300">
                <img
                src={category.image}
                alt={category.name}
                className="mx-auto max-w-[100px] rounded-full transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h4 className="mt-4 font-header text-md font-semibold text-dark group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h4>
          </Link>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
          {categories.map((category) => (
           <Link
           key={category.name}
           to={`/shop/category/${category.path}`}
           className="flex-shrink-0 text-center w-[100px]"
         >
            <div className="bg-white rounded-full p-1 border">
                <img
                    src={category.image}
                    alt={category.name}
                    className="mx-auto w-full rounded-full"
                />
            </div>
           <h4 className="mt-2 text-xs font-semibold w-full text-center truncate">
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
