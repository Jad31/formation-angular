import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokeApiListResponse, PokeApiPokemon } from '../models/pokemon.model';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2';

  // États
  private _pokemons = signal<Pokemon[]>([]);
  private _favorites = signal<number[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private _typeFilter = signal<string>('all');
  private _searchFilter = signal<string>('');

  // Exposer en lecture seule
  readonly pokemons = this._pokemons.asReadonly();
  readonly favorites = this._favorites.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly typeFilter = this._typeFilter.asReadonly();
  readonly searchFilter = this._searchFilter.asReadonly();

  // Computed
  readonly favoriteCount = computed(() => this._favorites().length);

  readonly favoritePokemons = computed(() => {
    const favIds = this._favorites();
    return this._pokemons().filter(p => favIds.includes(p.id));
  });

  readonly filteredPokemons = computed(() => {
    const type = this._typeFilter();
    const search = this._searchFilter();
    let pokemons = this._pokemons();

    // Filtre par type
    if (type !== 'all') {
      pokemons = pokemons.filter(p => p.types.includes(type));
    }

    // Filtre par nom (recherche)
    if (search) {
      pokemons = pokemons.filter(p =>
        p.name.toLowerCase().includes(search)
      );
    }

    return pokemons;
  });

  readonly availableTypes = computed(() => {
    const types = new Set<string>();
    this._pokemons().forEach(p => p.types.forEach(t => types.add(t)));
    return ['all', ...Array.from(types).sort()];
  });

  constructor() {
    this.loadPokemons();
  }

  loadPokemons(limit = 20): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<PokeApiListResponse>(`${this.apiUrl}/pokemon?limit=${limit}`)
      .subscribe({
        next: (response) => {
          const requests = response.results.map(p =>
            this.http.get<PokeApiPokemon>(p.url)
          );

          forkJoin(requests).subscribe({
            next: (pokemons) => {
              const mapped = pokemons.map(this.mapToPokemon);
              this._pokemons.set(mapped);
              this._loading.set(false);
            },
            error: (err) => {
              this._error.set('Erreur lors du chargement des détails');
              this._loading.set(false);
              console.error(err);
            }
          });
        },
        error: (err) => {
          this._error.set('Erreur lors du chargement de la liste');
          this._loading.set(false);
          console.error(err);
        }
      });
  }

  private mapToPokemon(apiPokemon: PokeApiPokemon): Pokemon {
    const getStat = (name: string) =>
      apiPokemon.stats.find(s => s.stat.name === name)?.base_stat || 0;

    return {
      id: apiPokemon.id,
      name: apiPokemon.name,
      types: apiPokemon.types.map(t => t.type.name),
      sprite: apiPokemon.sprites.front_default,
      hp: getStat('hp'),
      attack: getStat('attack'),
      defense: getStat('defense')
    };
  }

  searchPokemon(name: string): void {
    if (!name.trim()) return;

    this._loading.set(true);
    this._error.set(null);

    this.http.get<PokeApiPokemon>(`${this.apiUrl}/pokemon/${name.toLowerCase()}`)
      .subscribe({
        next: (pokemon) => {
          const mapped = this.mapToPokemon(pokemon);
          this._pokemons.update(list => {
            if (list.some(p => p.id === mapped.id)) return list;
            return [...list, mapped].sort((a, b) => a.id - b.id);
          });
          this._loading.set(false);
        },
        error: () => {
          this._error.set(`Pokémon "${name}" non trouvé`);
          this._loading.set(false);
        }
      });
  }

  isFavorite(id: number): boolean {
    return this._favorites().includes(id);
  }

  toggleFavorite(id: number): void {
    this._favorites.update(favs =>
      favs.includes(id)
        ? favs.filter(f => f !== id)
        : [...favs, id]
    );
  }

  setTypeFilter(type: string): void {
    this._typeFilter.set(type);
  }

  setSearchFilter(term: string): void {
    this._searchFilter.set(term.toLowerCase().trim());
  }

  clearSearchFilter(): void {
    this._searchFilter.set('');
  }

  clearFavorites(): void {
    this._favorites.set([]);
  }

  retry(): void {
    this.loadPokemons();
  }
}
