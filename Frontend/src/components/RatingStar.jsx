import PropTypes from 'prop-types';

const RatingStar = ({ rating = 0 }) => {
  const stars = [];
  const validRating = Math.max(0, Math.min(5, rating || 0)); // Ensure rating is between 0-5

  // Generate 5 stars
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span 
        key={i} 
        className={`ri-star${i < validRating ? '-fill' : '-line'} text-yellow-400`}
      ></span>
    );
  }

  return (
    <div className="product__rating flex items-center">
      {stars}
    </div>
  );
};

RatingStar.propTypes = {
  rating: PropTypes.number,
};

export default RatingStar;
