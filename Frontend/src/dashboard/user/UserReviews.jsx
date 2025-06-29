import { useSelector } from 'react-redux';
import { useGetReviewsByUserIdQuery } from '../../../src/redux/features/reviews/reviewApi';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?._id);
  const navigate = useNavigate(); 

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <p className="text-gray-700 font-body">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <p className="text-gray-700 font-body">No reviews given yet.</p>
        </div>
      </div>
    );
  }

  const handleCardClick = () => {
    navigate('/shop'); 
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Your Reviews</h1>
        <p className="text-gray-600 font-body">Manage and track your product reviews</p>
      </div>
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews && reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {review.rating}/5
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-body font-semibold text-gray-900 mb-1">Comment:</h3>
                <p className="text-gray-700 font-body text-sm leading-relaxed">{review.comment}</p>
              </div>
              
              <div className="pt-3 border-t border-white/20">
                <p className="text-xs text-gray-500 font-body">
                  <span className="font-medium">Product ID:</span> {review.productId?.slice(-8) || 'N/A'}
                </p>
                <p className="text-xs text-gray-500 font-body mt-1">
                  <span className="font-medium">Date:</span> {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div
          className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-md border-2 border-dashed border-primary/30 rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center min-h-[250px] group hover:from-primary/30 hover:to-primary/20"
          onClick={handleCardClick}
        >
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="font-heading font-semibold text-gray-900 mb-2">Add New Review</h3>
          <p className="text-gray-600 font-body text-sm text-center">Share your experience with our products</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
