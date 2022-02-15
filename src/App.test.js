import { Provider } from "react-redux";
import { act, create } from "react-test-renderer";
import { store } from "./store";
import { getPlayList } from "./api";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("Render App component", async () => {
  await act(async () =>
    create(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
  );

  await act(() => {
    return getPlayList().then((data) =>
      expect(typeof data.playlists).toBe("object")
    );
  });
});
