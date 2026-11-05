import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string) {
  if (state.Pokedex[pokemonName]) {
    console.log(`Name: ${state.Pokedex[pokemonName].name}`);
    console.log(`Height: ${state.Pokedex[pokemonName].height}`);
    console.log(`Weight: ${state.Pokedex[pokemonName].weight}`);
    console.log(`Stats:`);
    for (const stat in state.Pokedex[pokemonName].stats) {
      console.log(
        `  -${state.Pokedex[pokemonName].stats[stat].stat.name}: ${state.Pokedex[pokemonName].stats[stat].base_stat}`,
      );
    }
    console.log("Types:");
    for (const type in state.Pokedex[pokemonName].types) {
      console.log(`  -${state.Pokedex[pokemonName].types[type].type.name}`);
    }
  } else {
    console.log("You do not have this Pokemon in your Pokedex");
  }
}
