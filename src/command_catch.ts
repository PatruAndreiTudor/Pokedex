import { State } from "./state.js";

export async function commandCatch(
  state: State,
  pokemonName: string | undefined,
): Promise<void> {
  if (pokemonName === undefined) {
    console.log("Usage: catch <pokemon>");
    return;
  }
  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
  const roll = Math.random();
  if (pokemon.base_experience <= 50) {
    if (roll >= 0.2) {
      console.log("caught");
      console.log(`${pokemonName} was caught!`);
      state.Pokedex[pokemonName] = pokemon;
      return;
    }
  } else if (pokemon.base_experience <= 150) {
    if (roll >= 0.4) {
      console.log("caught");
      console.log(`${pokemonName} was caught!`);
      state.Pokedex[pokemonName] = pokemon;
      return;
    }
  }
  if (roll >= 0.6) {
    console.log("caught");
    console.log(`${pokemonName} was caught!`);
    state.Pokedex[pokemonName] = pokemon;
    return;
  }
  console.log(`${pokemonName} escaped!`);
  return;
}
