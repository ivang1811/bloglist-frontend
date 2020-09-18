import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Togglable />", () => {
  let component;

  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "www.test.com",
    likes: 0,
    user: {
      name: "test",
    },
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test("renders blog", () => {
    expect(component.container).toHaveTextContent("Test Title Test Author");
  });

  test("after clicking the button, url and likes are shown", () => {
    const content = component.container.querySelector(".togglableContent");
    expect(content).not.toHaveStyle("display: block");

    const button = component.getByText("Show more");
    fireEvent.click(button);
    expect(content).not.toHaveStyle("display: none");
  });

  test("Clicking like twice calls event handler twice", () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "www.test.com",
      likes: 0,
      user: {
        name: "test",
      },
    };

    const mockHandler = jest.fn();

    const component = render(<Blog blog={blog} editBlog={mockHandler} />);

    const button = component.container.querySelector(".likeButton");
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
