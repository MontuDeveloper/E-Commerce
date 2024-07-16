import React from "react";
import BlogCard from "../components/BlogCard";
import PageTitle from "../components/PageTitle";

const Blog = () => {
  return (
    <section className="pt-70">
      <div className="container">
        <div className="text-center pb-50 ">
          <PageTitle title="Welcome to Our Clothing Store" />
          <h1>Blog</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>
  );
};

export default Blog;
