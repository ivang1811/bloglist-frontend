import React from "react";
import Togglable from "./Toggleable";

const Blog = ({ blog, editBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    width: 500,
  };

  const blogFormRef = React.createRef();

  const addLike = (event) => {
    event.preventDefault();
    editBlog(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id });
  };

  const removeBlog = (event) => {
    event.preventDefault();
    if (window.confirm("Do you really want to delete this?")) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="Blog">
      {blog.title} {blog.author}
      <Togglable
        buttonLabel="Show more"
        ref={blogFormRef}
        className="toggleBlogs"
      >
        <p>{blog.url}</p>
        <p>
          {blog.likes}{" "}
          <button onClick={addLike} className="likeButton">
            Like Post
          </button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={removeBlog}>Remove</button>
      </Togglable>
    </div>
  );
};

export default Blog;
