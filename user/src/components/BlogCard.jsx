import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="col-md-4">
      <div className="blog-card-inner">
        <div class="card border-0">
          <img
            src="https://img.freepik.com/free-photo/young-beautiful-smiling-female-trendy-summer-dress-sexy-carefree-woman-posing-near-blue-wall-studio-positive-model-having-fun-cheerful-happylooking-smartphone-using-apps_158538-25876.jpg?w=900&t=st=1717601432~exp=1717602032~hmac=96c4706c255fe04af2b68dcb5a1127d527d2c66ec714464dd840d138c4f36446"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link href="#" class="btn btn-dark">
              Go somewheres
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
