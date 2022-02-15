import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store";
import Nav from "../Nav";

test("Render header when user logs in", () => {
  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  // we fire the action
  store.dispatch({
    type: "LOGIN",
    payload: {
      user: "Yadira",
      login: "ok",
    },
  });

  component.getByText("topic music");
});

test("Modal rendering", () => {
  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  // we fire the action

  store.dispatch({
    type: "LOGIN",
    payload: {
      user: "Yadira",
      login: "ok",
    },
  });

  const link = component.getByText("Sign off");

  expect(fireEvent.click(link)).toBeFalsy();
});

test("Closing modal", () => {
  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  // we fire the action

  store.dispatch({
    type: "LOGIN",
    payload: {
      user: "Yadira",
      login: "ok",
    },
  });

  const link = component.getByText("Sign off");
  fireEvent.click(link);

  const cancelButton = component.queryAllByRole("button")[0];
  expect(fireEvent.click(cancelButton)).toBeTruthy();
});

test("Logout user", () => {
  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  // we fire the action
  store.dispatch({
    type: "LOGIN",
    payload: {
      user: "Yadira",
      login: "ok",
    },
  });

  const link = component.getByText("Sign off");
  fireEvent.click(link);

  const logoutButton = component.queryAllByRole("button")[1];
  expect(fireEvent.click(logoutButton)).toBeTruthy();
});
