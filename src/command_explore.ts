import { State } from "./state.js";

export async function commandExplore(
  state: State,
  locationName: string | undefined,
): Promise<void> {
  if (locationName === undefined) {
    console.log("Usage: explore <location>");
    return;
  }
  console.log(`Exploring ${locationName}...`);
  console.log(`Found Pokemon:`);
  const location = await state.pokeAPI.fetchLocation(locationName);
  for (const loc of location.pokemon_encounters) {
    console.log(`- ${loc.pokemon.name}`);
  }
}
