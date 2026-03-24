import { Injectable, signal, computed } from '@angular/core';
import { Pokemon, PokemonType } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // Données mock
  private mockPokemons: Pokemon[] = [
    { id: 1, name: 'Bulbasaur', type: 'grass', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', hp: 45, attack: 49, defense: 49 },
    { id: 4, name: 'Charmander', type: 'fire', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', hp: 39, attack: 52, defense: 43 },
    { id: 7, name: 'Squirtle', type: 'water', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', hp: 44, attack: 48, defense: 65 },
    { id: 25, name: 'Pikachu', type: 'electric', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', hp: 35, attack: 55, defense: 40 },
    { id: 39, name: 'Jigglypuff', type: 'normal', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png', hp: 115, attack: 45, defense: 20 },
    { id: 63, name: 'Abra', type: 'psychic', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png', hp: 25, attack: 20, defense: 15 },
    { id: 6, name: 'Charizard', type: 'fire', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', hp: 78, attack: 84, defense: 78 },
    { id: 9, name: 'Blastoise', type: 'water', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png', hp: 79, attack: 83, defense: 100 },
    { id: 3, name: 'Venusaur', type: 'grass', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', hp: 80, attack: 82, defense: 83 },
    { id: 150, name: 'Mewtwo', type: 'psychic', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png', hp: 106, attack: 110, defense: 90 },
  ];

  // Signal privé pour les Pokémon
  private _pokemons = signal<Pokemon[]>(this.mockPokemons);

  // Signal privé pour les IDs favoris
  private _favorites = signal<number[]>([]);

  // Signal privé pour le filtre de type
  private _typeFilter = signal<PokemonType | 'all'>('all');

  // Exposer en lecture seule
  readonly pokemons = this._pokemons.asReadonly();
  readonly favorites = this._favorites.asReadonly();
  readonly typeFilter = this._typeFilter.asReadonly();

  // Computed : nombre de favoris
  readonly favoriteCount = computed(() => this._favorites().length);

  // Computed : Pokémon favoris (objets complets)
  readonly favoritePokemons = computed(() => {
    const favIds = this._favorites();
    return this._pokemons().filter(p => favIds.includes(p.id));
  });

  // Computed : Pokémon filtrés par type
  readonly filteredPokemons = computed(() => {
    const type = this._typeFilter();
    const pokemons = this._pokemons();

    if (type === 'all') {
      return pokemons;
    }
    return pokemons.filter(p => p.type === type);
  });

  // Computed : types disponibles (extraits des données)
  readonly availableTypes = computed(() => {
    const types = new Set(this._pokemons().map(p => p.type));
    return ['all', ...Array.from(types)] as const;
  });

  // Vérifie si un Pokémon est favori
  isFavorite(id: number): boolean {
    return this._favorites().includes(id);
  }

  // Ajoute ou retire des favoris
  toggleFavorite(id: number): void {
    this._favorites.update(favs => {
      if (favs.includes(id)) {
        return favs.filter(f => f !== id);
      }
      return [...favs, id];
    });
  }

  // Récupère un Pokémon par son ID
  getPokemonById(id: number): Pokemon | undefined {
    return this._pokemons().find(p => p.id === id);
  }

  // Définit le filtre de type
  setTypeFilter(type: PokemonType | 'all'): void {
    this._typeFilter.set(type);
  }

  // Récupère les favoris (liste d'IDs)
  getFavorites(): number[] {
    return this._favorites();
  }

  // Vide tous les favoris
  clearFavorites(): void {
    this._favorites.set([]);
  }
}
