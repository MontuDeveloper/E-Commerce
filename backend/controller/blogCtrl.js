const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const validateMongobdid = require("../utils/validateMongodbid");
const cludinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

// create a blog
const createBlog = expressAsyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// update a blog
const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongobdid(id);

  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// get a blog
const getaBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongobdid(id);

  try {
    const getaBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    );
    res.json(getaBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// get all blogs

const getallBlog = expressAsyncHandler(async (req, res) => {
  try {
    const getallBlog = await Blog.find();
    res.json(getallBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// delete a blog
const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongobdid(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// link blog

const likeaBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;

  validateMongobdid(blogId);

  // find the blog which you went to be liked
  const blog = await Blog.findById(blogId);
  //find the login user
  const loginUserId = req?.user?._id;
  // console.log(loginUserId);
  //find if the user has link blog
  const isLiked = blog?.isLiked;
  // find if the user has deslike blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

// dislike Blog

const dislikeaBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;

  validateMongobdid(blogId);

  // find the blog which you went to be liked
  const blog = await Blog.findById(blogId);

  //find the login user
  const loginUserId = req?.user?._id;

  //find if the user has dislink blog
  const isDisLiked = blog?.isDisliked;

  // find if the user has deslike blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

const uploadImages = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongobdid(id);
  try {
    const uploader = (path) => cludinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBlog,
  updateBlog,
  getaBlog,
  getallBlog,
  deleteBlog,
  likeaBlog,
  dislikeaBlog,
  uploadImages,
};
