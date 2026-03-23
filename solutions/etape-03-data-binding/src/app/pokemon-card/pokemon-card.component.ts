import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  template: `
    <article class="card" [class.favorite]="isFavorite">
      <!-- Interpolation: affichage de données -->
      <span class="id">#{{ id.toString().padStart(3, '0') }}</span>

      <!-- Property binding: liaison de propriétés -->
      <img [src]="sprite" [alt]="name" />

      <h3>{{ name }}</h3>

      <div class="types">
        <span class="badge" [style.background]="typeColor">
          {{ type }}
        </span>
      </div>

      <!-- Event binding: gestion des événements -->
      <button
        class="fav-btn"
        [class.active]="isFavorite"
        (click)="toggleFavorite()">
        {{ isFavorite ? '★' : '☆' }}
      </button>
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
      font-size: 1rem;
      text-transform: capitalize;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      color: white;
      text-transform: capitalize;
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
  `]
})
export class PokemonCardComponent {
  // Propriétés du composant (données statiques pour cet exercice)
  id = 25;
  name = 'pikachu';
  sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
  type = 'electric';
  typeColor = '#eab308';
  isFavorite = false;

  // Méthode appelée lors du clic
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    console.log(`${this.name} est ${this.isFavorite ? 'ajouté aux' : 'retiré des'} favoris`);
  }
}
