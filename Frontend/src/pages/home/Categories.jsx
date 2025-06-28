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
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-stone-800 font-header">Shop by Category</h2>
        <p className="mt-2 text-stone-600">Explore our curated collections.</p>
      </div>

      {/* Desktop & Mobile Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/shop/category/${category.path}`}
            className="group text-center"
          >
            <div className="w-full aspect-square bg-stone-100 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
              <img
                src={category.image}
                alt={category.name}
                className="w-3/4 h-3/4 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h4 className="mt-4 font-semibold text-stone-700 tracking-wide transition-colors group-hover:text-primary">
              {category.name}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
