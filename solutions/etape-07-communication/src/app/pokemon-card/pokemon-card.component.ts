import { Component, input, output } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { TypeColorPipe } from '../pipes/type-color.pipe';
import { PokemonIdPipe } from '../pipes/pokemon-id.pipe';

@Component({
  selector: 'app-pokemon-card',
  imports: [CapitalizePipe, TypeColorPipe, PokemonIdPipe],
  template: `
    <article class="card" [class.favorite]="isFavorite()">
      <button
        class="fav-btn"
        [class.active]="isFavorite()"
        (click)="onFavoriteClick()">
        {{ isFavorite() ? '★' : '☆' }}
      </button>

      <span class="id">{{ pokemon().id | pokemonId }}</span>
      <img [src]="pokemon().sprite" [alt]="pokemon().name" />
      <h3>{{ pokemon().name | capitalize }}</h3>

      <div class="types">
        @for (type of pokemon().types; track type) {
          <span class="badge" [style.background]="type | typeColor">
            {{ type | capitalize }}
          </span>
        }
      </div>

      <div class="stats">
        <span>❤️ {{ pokemon().hp }}</span>
        <span>⚔️ {{ pokemon().attack }}</span>
        <span>🛡️ {{ pokemon().defense }}</span>
      </div>
    </article>
  `,
  styles: [`
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
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .card.favorite {
      border: 2px solid #f59e0b;
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
      transition: transform 0.2s;
    }

    .fav-btn:hover {
      transform: scale(1.2);
    }

    .fav-btn.active {
      color: #f59e0b;
    }

    .id {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.8rem;
      align-self: flex-start;
    }

    img {
      width: 80px;
      height: 80px;
      image-rendering: pixelated;
    }

    h3 {
      color: white;
      font-size: 0.95rem;
    }

    .types {
      display: flex;
      gap: 0.25rem;
    }

    .badge {
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.7rem;
      color: white;
    }

    .stats {
      display: flex;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
    }
  `]
})
export class PokemonCardComponent {
  // Input signal - données du Pokemon
  pokemon = input.required<Pokemon>();

  // Input signal - état favori
  isFavorite = input<boolean>(false);

  // Output - événement pour toggle favori
  favoriteToggle = output<number>();

  onFavoriteClick(): void {
    this.favoriteToggle.emit(this.pokemon().id);
  }
}
