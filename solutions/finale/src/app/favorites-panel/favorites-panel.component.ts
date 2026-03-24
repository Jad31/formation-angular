import { Component, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-favorites-panel',
  template: `
    <aside class="panel">
      <h3>★ Favoris ({{ pokemonService.favoriteCount() }})</h3>

      @if (pokemonService.favoriteCount() === 0) {
        <p class="empty">Aucun favori</p>
        <p class="hint">Cliquez sur ★ pour ajouter</p>
      } @else {
        <ul class="favorites-list">
          @for (pokemon of pokemonService.favoritePokemons(); track pokemon.id) {
            <li>
              <img [src]="pokemon.sprite" [alt]="pokemon.name" />
              <span>{{ pokemon.name }}</span>
              <button (click)="pokemonService.toggleFavorite(pokemon.id)">×</button>
            </li>
          }
        </ul>

        <button class="clear-btn" (click)="pokemonService.clearFavorites()">
          Vider les favoris
        </button>
      }
    </aside>
  `,
  styles: [`
    .panel {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1rem;
      min-width: 250px;
    }

    h3 {
      color: #f59e0b;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .empty {
      color: rgba(255, 255, 255, 0.5);
    }

    .hint {
      color: rgba(255, 255, 255, 0.3);
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }

    .favorites-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .favorites-list li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }

    .favorites-list img {
      width: 40px;
      height: 40px;
      image-rendering: pixelated;
    }

    .favorites-list span {
      flex: 1;
      text-transform: capitalize;
    }

    .favorites-list button {
      background: #ef4444;
      border: none;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
    }

    .clear-btn {
      width: 100%;
      padding: 0.5rem;
      margin-top: 1rem;
      border: 1px solid #ef4444;
      border-radius: 8px;
      background: transparent;
      color: #ef4444;
      cursor: pointer;
      transition: all 0.2s;
    }

    .clear-btn:hover {
      background: #ef4444;
      color: white;
    }
  `]
})
export class FavoritesPanelComponent {
  pokemonService = inject(PokemonService);
}
