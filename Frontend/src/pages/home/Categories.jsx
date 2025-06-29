import { Link } from "react-router-dom";
import category1 from "../../assets/category1.png";
import category2 from "../../assets/category2.png";
import category3 from "../../assets/category3.png";
import category4 from "../../assets/category4.png";
import category5 from "../../assets/category5.png";
import category6 from "../../assets/category6.png";
import category7 from "../../assets/category7.png";

const Categories = () => {
  const categories = [
    { name: "Mirrors", path: "Mirrors", image: category1 },
    { name: "Table Decor", path: "Table+Decor", image: category2 },
    { name: "Tables", path: "Tables", image: category3 },
    { name: "Wall Accents", path: "Wall+Accents", image: category4 },
    { name: "Wall Art", path: "Wall+Art", image: category5 },
    { name: "Wall Shelves", path: "Wall+Shelves", image: category6 },
    { name: "Table Top", path: "Table+Top", image: category7 },
  ];

  return (
    <div className="section__container">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Shop by Category
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated collections designed to transform every space in your home
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/shop/category/${category.path}`}
            className="group text-center transition-all duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-xl bg-white/20 backdrop-blur-md border border-white/30 p-4 pl-1 pr-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/30">
              {/* Image Container */}
              <div className="relative mb-2 bg-white mx-auto w-32 h-32 lg:w-32 lg:h-32 rounded-xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="mx-auto w-32 h-32 lg:w-32 lg:h-32 object-contain rounded-xl"
                />
                {/* Gradient overlay on hover */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div> */}
              </div>
              
              {/* Category Name */}
              <h4 className="font-semibold text-gray-900 text-sm lg:text-base group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h4>
              
              {/* Hover Effect Arrow */}
              {/* <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="ri-arrow-right-line text-primary"></i>
              </div> */}
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile View - Enhanced Horizontal Scroll */}
      <div className="md:hidden">
        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex space-x-4 pb-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/shop/category/${category.path}`}
                className="group flex-shrink-0 text-center transition-all duration-300 w-[120px]"
              >
                <div className="relative overflow-hidden rounded-xl bg-white/20 backdrop-blur-md border border-white/30 p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/30">
                  {/* Image Container */}
                  <div className="relative mb-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="mx-auto w-20 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                  
                  {/* Category Name */}
                  <h4 className="font-semibold text-gray-900 text-xs group-hover:text-primary transition-colors duration-300 leading-tight">
                    {category.name}
                  </h4>
                  
                  {/* Hover Effect Arrow */}
                  <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="ri-arrow-right-line text-primary text-sm"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary/30"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
