import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  };

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    });

    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div className="formDiv">
        Title:
        <input value={newBlogTitle} onChange={handleTitleChange} id="title" />
      </div>
      <div>
        Author:
        <input
          value={newBlogAuthor}
          onChange={handleAuthorChange}
          id="author"
        />
      </div>
      <div>
        Url:
        <input value={newBlogUrl} onChange={handleUrlChange} id="url" />
      </div>

      <button type="submit">Creaet</button>
    </form>
  );
};

export default BlogForm;
