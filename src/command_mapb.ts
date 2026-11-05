import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
  if (state.prevLocationsURL === null) {
    console.log("You are on the first page.");
    return;
  }
  const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
  for (const location of locations.results) {
    console.log(location.name);
  }
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}
