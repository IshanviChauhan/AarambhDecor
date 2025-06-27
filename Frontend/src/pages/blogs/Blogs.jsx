import blogData from "../../data/blogs.json";

export const Blogs = () => {
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">What Our Customers Say</h2>
      <p className="section__subheader">
        Read testimonials from our happy customers and see why they love our decor.
      </p>
      
      <div className="blog__grid">
        {blogData.map((blog) => (
          <div key={blog.id} className="blog__card">
            <img
              src={blog.imageUrl}
              alt="blog"
              className="h-48 w-full object-cover"
            />
            <div className="blog__card__content">
              <h6>{blog.subtitle}</h6>
              <h4>{blog.title}</h4>
              <p>"{blog.testimonial}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
