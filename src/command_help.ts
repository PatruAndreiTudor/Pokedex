import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log(" ");
  for (const i in state.commands) {
    console.log(`${state.commands[i].name}: ${state.commands[i].description}`);
  }
}
