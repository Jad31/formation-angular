export interface Pokemon {
  id: number;
  name: string;
  type: PokemonType;
  sprite: string;
  hp: number;
  attack: number;
  defense: number;
}

export type PokemonType =
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'normal'
  | 'psychic'
  | 'fighting'
  | 'poison';
