import { CacheEntry, Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(100000);

  constructor() {}

  async fetchLocations(
    pageURL?: string | undefined | null,
  ): Promise<ShallowLocations> {
    if (pageURL === undefined || pageURL === null) {
      pageURL = PokeAPI.baseURL + "/location-area/";
    }
    const cached = this.cache.get<ShallowLocations>(pageURL);
    if (cached !== undefined) {
      console.log("Cache used!");
      return cached;
    }
    const response = await fetch(pageURL!, {
      method: "GET",
      mode: "cors",
    });
    const responseMessage = await response.json();
    this.cache.add<ShallowLocations>(pageURL, responseMessage);
    console.log("Cache created!");
    return await responseMessage;
  }
  async fetchLocation(locationName: string): Promise<Location> {
    const cached = this.cache.get<Location>(locationName);
    if (cached !== undefined) {
      console.log("Cache used!");
      return cached;
    }
    const response = await fetch(
      `https://pokeapi.co/api/v2/location-area/${locationName}/`,
      { method: "GET", mode: "cors" },
    );
    const responseMessage = await response.json();
    this.cache.add<Location>(
      `https://pokeapi.co/api/v2/location-area/${locationName}/`,
      responseMessage,
    );
    console.log("Cache created!");
    return await responseMessage;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const cached = this.cache.get<Pokemon>(pokemonName);
    if (cached !== undefined) {
      console.log("Cache used!");
      return cached;
    }
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`,
      { method: "GET", mode: "cors" },
    );
    const responseMessage = await response.json();
    this.cache.add<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`,
      responseMessage,
    );
    console.log("Cache created!");
    return await responseMessage;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  pokemon_encounters: { pokemon: { name: string } }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
};
