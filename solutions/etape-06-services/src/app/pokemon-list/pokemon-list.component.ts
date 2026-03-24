import { Component, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  template: `
    <div class="pokemon-list">
      <h2>Pokédex</h2>

      <!-- Filtres -->
      <div class="filters">
        @for (type of pokemonService.availableTypes(); track type) {
          <button
            [class.active]="pokemonService.typeFilter() === type"
            (click)="pokemonService.setTypeFilter(type)">
            {{ type === 'all' ? 'Tous' : type }}
          </button>
        }
      </div>

      <p class="count">
        {{ pokemonService.filteredPokemons().length }} Pokémon
        @if (pokemonService.favoriteCount() > 0) {
          • {{ pokemonService.favoriteCount() }} favoris
        }
      </p>

      <!-- Grille -->
      <div class="grid">
        @for (pokemon of pokemonService.filteredPokemons(); track pokemon.id; let i = $index, first = $first, last = $last) {
          <article class="card" [class.first]="first" [class.last]="last">
            <button
              class="fav-btn"
              [class.active]="pokemonService.isFavorite(pokemon.id)"
              (click)="pokemonService.toggleFavorite(pokemon.id)">
              {{ pokemonService.isFavorite(pokemon.id) ? '★' : '☆' }}
            </button>

            <span class="order">#{{ i + 1 }}</span>
            <img [src]="pokemon.sprite" [alt]="pokemon.name" />
            <h3>{{ pokemon.name }}</h3>

            @switch (pokemon.type) {
              @case ('fire') {
                <span class="badge fire">Feu</span>
              }
              @case ('water') {
                <span class="badge water">Eau</span>
              }
              @case ('grass') {
                <span class="badge grass">Plante</span>
              }
              @case ('electric') {
                <span class="badge electric">Électrik</span>
              }
              @case ('psychic') {
                <span class="badge psychic">Psy</span>
              }
              @default {
                <span class="badge normal">Normal</span>
              }
            }

            <div class="stats">
              <span>❤️ {{ pokemon.hp }}</span>
              <span>⚔️ {{ pokemon.attack }}</span>
              <span>🛡️ {{ pokemon.defense }}</span>
            </div>
          </article>
        } @empty {
          <div class="empty-state">
            <p>Aucun Pokémon trouvé</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .pokemon-list { padding: 1rem; }
    h2 { color: #e63384; margin-bottom: 1rem; }

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
      text-transform: capitalize;
    }

    .filters button.active {
      background: #e63384;
      border-color: #e63384;
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

    .card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      transition: all 0.3s;
    }

    .card:hover {
      transform: translateY(-4px);
    }

    .card.first {
      border: 2px solid #f59e0b;
    }

    .card.last {
      border: 2px solid #8b5cf6;
    }

    .fav-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }

    .fav-btn.active { color: #f59e0b; }

    .order {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.8rem;
    }

    img {
      width: 80px;
      height: 80px;
      image-rendering: pixelated;
    }

    h3 {
      color: white;
      font-size: 0.95rem;
      text-transform: capitalize;
    }

    .badge {
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.7rem;
      text-transform: capitalize;
      color: white;
    }

    .badge.fire { background: #ef4444; }
    .badge.water { background: #3b82f6; }
    .badge.grass { background: #22c55e; }
    .badge.electric { background: #eab308; color: #1a1a2e; }
    .badge.psychic { background: #a855f7; }
    .badge.normal { background: #6b7280; }

    .stats {
      display: flex;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
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
}
