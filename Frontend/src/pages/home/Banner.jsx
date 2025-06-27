import { Link } from 'react-router-dom';

const Banner = () => {
    return (
      <div className="header__container">
        <div className="header__content">
          <h1>Discover Your Signature Style</h1>
          <p>
            Explore Aarambh Decor's curated collection of home decor that tells a
            story. Find pieces that resonate with your soul and transform your
            space into a sanctuary of style and comfort.
          </p>
          <Link to="/shop">
            <button className="btn flex items-center gap-2 mx-auto">
              <i className="ri-shopping-bag-3-line"></i>
              Shop The Collection
            </button>
          </Link>
        </div>
      </div>
    );
};

export default Banner;
