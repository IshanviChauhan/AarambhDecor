import blogData from "../../data/blogs.json";

export const Blogs = () => {
  return (
    <section className="bg-stone-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-stone-800 font-header">Testimonials</h2>
          <p className="mt-2 text-stone-600">What our happy customers say about us.</p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <img
                src={blog.imageUrl}
                alt="blog"
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary"
              />
              <blockquote className="text-stone-600 italic">
                "{blog.testimonial}"
              </blockquote>
              <div className="mt-4">
                <h4 className="font-semibold text-stone-800">{blog.title}</h4>
                <p className="text-sm text-stone-500">{blog.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
