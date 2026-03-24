// Interface pour notre application
export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  hp: number;
  attack: number;
  defense: number;
}

// Interfaces pour l'API PokeAPI
export interface PokeApiListResponse {
  count: number;
  results: { name: string; url: string }[];
}

export interface PokeApiPokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: { name: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
}
