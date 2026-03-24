import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

@Component({
  selector: 'app-pokemon-list',
  imports: [FormsModule, PokemonCardComponent, CapitalizePipe],
  template: `
    <div class="pokemon-list">
      <h2>Pokédex</h2>

      <!-- Barre de recherche -->
      <div class="search-bar">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          placeholder="Rechercher un Pokémon..."
          (keydown.enter)="search()"
        />
        <button (click)="search()" [disabled]="pokemonService.loading()">
          Rechercher
        </button>
        @if (pokemonService.searchFilter()) {
          <button class="clear-btn" (click)="clearSearch()">
            Effacer
          </button>
        }
      </div>

      <!-- Filtres -->
      <div class="filters">
        @for (type of pokemonService.availableTypes(); track type) {
          <button
            [class.active]="pokemonService.typeFilter() === type"
            (click)="pokemonService.setTypeFilter(type)">
            {{ type === 'all' ? 'Tous' : (type | capitalize) }}
          </button>
        }
      </div>

      <!-- État de chargement -->
      @if (pokemonService.loading()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Chargement des Pokémon...</p>
        </div>
      }

      <!-- État d'erreur -->
      @if (pokemonService.error(); as error) {
        <div class="error">
          <p>{{ error }}</p>
          <button (click)="pokemonService.retry()">Réessayer</button>
        </div>
      }

      <!-- Grille avec PokemonCardComponent -->
      @if (!pokemonService.loading() && !pokemonService.error()) {
        <p class="count">
          {{ pokemonService.filteredPokemons().length }} Pokémon
          @if (pokemonService.favoriteCount() > 0) {
            • {{ pokemonService.favoriteCount() }} favoris
          }
        </p>

        <div class="grid">
          @for (pokemon of pokemonService.filteredPokemons(); track pokemon.id) {
            <!--
              Communication parent → enfant : [pokemon] et [isFavorite]
              Communication enfant → parent : (favoriteToggle)
            -->
            <app-pokemon-card
              [pokemon]="pokemon"
              [isFavorite]="pokemonService.isFavorite(pokemon.id)"
              (favoriteToggle)="onFavoriteToggle($event)"
            />
          } @empty {
            <div class="empty-state">
              <p>Aucun Pokémon trouvé</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .pokemon-list { padding: 1rem; }
    h2 { color: #e63384; margin-bottom: 1rem; }

    .search-bar {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .search-bar input {
      flex: 1;
      max-width: 300px;
      padding: 0.75rem;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .search-bar input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .search-bar button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      background: #e63384;
      color: white;
      cursor: pointer;
    }

    .search-bar button:disabled {
      opacity: 0.5;
    }

    .search-bar .clear-btn {
      background: #6b7280;
    }

    .search-bar .clear-btn:hover {
      background: #4b5563;
    }

    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .filters button {
      padding: 0.5rem 1rem;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      background: transparent;
      color: white;
      cursor: pointer;
    }

    .filters button.active {
      background: #e63384;
      border-color: #e63384;
    }

    .loading {
      text-align: center;
      padding: 3rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.2);
      border-top-color: #e63384;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error {
      text-align: center;
      padding: 2rem;
      background: rgba(239, 68, 68, 0.2);
      border-radius: 12px;
      margin-bottom: 1rem;
    }

    .error button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      background: #ef4444;
      color: white;
      cursor: pointer;
    }

    .count {
      color: #8b5cf6;
      margin-bottom: 1rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1rem;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 2rem;
    }
  `]
})
export class PokemonListComponent {
  pokemonService = inject(PokemonService);
  searchTerm = '';

  search(): void {
    const term = this.searchTerm.trim();
    if (term) {
      this.pokemonService.setSearchFilter(term);
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.pokemonService.clearSearchFilter();
  }

  // Handler pour l'événement output du composant enfant
  onFavoriteToggle(pokemonId: number): void {
    this.pokemonService.toggleFavorite(pokemonId);
  }
}
