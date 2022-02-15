import { act, render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { fakeSongs } from "../data/fakeData";
import PlaySongs from "../PlaySongs";

test("Rendering and consuming song list api", async () => {
  // Simulación de peticón con datos salsos

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeSongs),
    })
  );

  await act(async () =>
    render(
      <MemoryRouter initialEntries={["/songs/pp.179829496"]}>
        <Route path="/songs/:id">
          <PlaySongs />
        </Route>
      </MemoryRouter>
    )
  );

  // elimina la simulación para asegurar que las pruebas estén completamente aisladas
  global.fetch.mockRestore();
});
