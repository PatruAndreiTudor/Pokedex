import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type State = {
  interf: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  Pokedex: Record<string, Pokemon>;
};
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState() {
  let nextLocationsURL = null;
  let prevLocationsURL = null;
  const interf = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  const Pokedex = {};
  const commands = {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 locations",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description:
        "Choose a location to explore. Returns all the Pokemon found in the area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch target pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Print the stats of a Pokemon you caught",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Print the Pokemon you caught",
      callback: commandPokedex,
    },
  };
  return {
    interf,
    commands,
    pokeAPI: new PokeAPI(),
    nextLocationsURL,
    prevLocationsURL,
    Pokedex,
  };
}
