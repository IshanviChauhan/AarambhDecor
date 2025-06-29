import { Link } from 'react-router-dom';
import videoSrc from "./../../assets/HIMTAJ.mp4"; // Import your video file here



const Banner = () => {
    return (
      <div className="relative overflow-hidden lg:min-h-[700px] min-h-[400px] shadow-2xl">
        {/* Video Background with Enhanced Styling */}
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark Overlay for Better Content Visibility */}
        {/* <div className="absolute inset-0 bg-black/30"></div> */}
        
        {/* Gradient Overlays for Enhanced Visual Appeal */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-dark/30"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
        
        {/* Content Container */}
        {/* <div className="relative z-10 h-full flex items-center justify-center section__container">
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Main Heading */}
            {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block text-white/90">Transform Your Space</span>
              <span className="block bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                With Elegance
              </span>
            </h1> */}
            
            {/* Subtitle */}
            {/* <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover our curated collection of premium home decor that brings 
              sophistication and style to every corner of your home.
            </p> */}
            
            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/shop" 
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
              >
                Shop Collection
              </Link>
              <Link 
                to="/about" 
                className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 transform"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>  */}
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-light/30 rounded-full blur-lg"></div>
      </div>
    );
};

export default Banner;
