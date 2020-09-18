import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notifications";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = React.createRef();

  const editBlog = (id, changedBlog) => {
    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch((error) => {
        setErrorMessage(`post already deleted from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const deleteBlog = (id) => {
    blogService
      .remove(id)
      .then((returnedBlog) => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        setErrorMessage(`post already deleted from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const createBlog = (blogObject) => {
    try {
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      });
      setErrorMessage(
        `${blogObject.newBlogTitle} Successfuly Added to Database.`
      );
    } catch (exception) {
      setErrorMessage(exception);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handlelogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  function sortByLikes(a, b) {
    // Use toUpperCase() to ignore character casing
    const likesA = a.likes;
    const likesB = b.likes;

    let comparison = 0;
    if (likesA > likesB) {
      comparison = -1;
    } else if (likesA < likesB) {
      comparison = 1;
    }
    return comparison;
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={handlelogout}>Log Out</button>
          </p>
          {blogForm()}
          {blogs.sort(sortByLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              editBlog={editBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
