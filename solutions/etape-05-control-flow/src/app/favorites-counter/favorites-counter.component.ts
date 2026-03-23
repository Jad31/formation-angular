import { Component, signal, computed, effect } from '@angular/core';

interface FavoritePokemon {
  id: number;
  name: string;
}

@Component({
  selector: 'app-favorites-counter',
  template: `
    <div class="favorites-panel">
      <h3>★ Favoris avec Signals</h3>

      <!-- Computed: nombre de favoris -->
      <div class="count-display">
        <span class="count">{{ count() }}</span>
        <span class="label">favoris</span>
      </div>

      <!-- Computed: indicateur "beaucoup de favoris" -->
      @if (hasMany()) {
        <p class="badge-many">🎉 Vous êtes un collectionneur !</p>
      }

      <!-- Liste des favoris -->
      <div class="favorites-list">
        @for (pokemon of favorites(); track pokemon.id) {
          <div class="favorite-item">
            <span>{{ pokemon.name }}</span>
            <button (click)="remove(pokemon.id)">×</button>
          </div>
        } @empty {
          <p class="empty">Aucun favori</p>
        }
      </div>

      <!-- Actions pour la démo -->
      <div class="demo-actions">
        <h4>Ajouter un Pokémon:</h4>
        <div class="pokemon-buttons">
          @for (pokemon of availablePokemons; track pokemon.id) {
            <button
              (click)="add(pokemon)"
              [disabled]="isInFavorites(pokemon.id)">
              {{ pokemon.name }}
            </button>
          }
        </div>

        <button
          class="clear-btn"
          (click)="clear()"
          [disabled]="count() === 0">
          Vider les favoris
        </button>
      </div>
    </div>
  `,
  styles: [`
    .favorites-panel {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1.5rem;
      max-width: 350px;
    }

    h3 {
      color: #f59e0b;
      margin-bottom: 1rem;
    }

    h4 {
      color: #8b5cf6;
      margin: 1rem 0 0.5rem;
      font-size: 0.9rem;
    }

    .count-display {
      text-align: center;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .count {
      font-size: 2.5rem;
      font-weight: bold;
      color: #f59e0b;
    }

    .label {
      display: block;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
    }

    .badge-many {
      text-align: center;
      background: linear-gradient(90deg, #f59e0b, #e63384);
      padding: 0.5rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-weight: bold;
    }

    .favorites-list {
      margin-bottom: 1rem;
    }

    .favorite-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      text-transform: capitalize;
    }

    .favorite-item button {
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

    .empty {
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
      padding: 1rem;
    }

    .demo-actions {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1rem;
    }

    .pokemon-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .pokemon-buttons button {
      padding: 0.5rem 0.75rem;
      border: none;
      border-radius: 6px;
      background: #e63384;
      color: white;
      cursor: pointer;
      text-transform: capitalize;
      font-size: 0.85rem;
    }

    .pokemon-buttons button:disabled {
      background: #666;
      cursor: not-allowed;
    }

    .clear-btn {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ef4444;
      border-radius: 8px;
      background: transparent;
      color: #ef4444;
      cursor: pointer;
      transition: all 0.2s;
    }

    .clear-btn:hover:not(:disabled) {
      background: #ef4444;
      color: white;
    }

    .clear-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class FavoritesCounterComponent {
  // Liste de Pokémon disponibles pour la démo
  availablePokemons: FavoritePokemon[] = [
    { id: 25, name: 'pikachu' },
    { id: 1, name: 'bulbizarre' },
    { id: 4, name: 'salamèche' },
    { id: 7, name: 'carapuce' },
    { id: 6, name: 'dracaufeu' }
  ];

  // Signal principal: liste des favoris
  favorites = signal<FavoritePokemon[]>([]);

  // Computed: nombre de favoris
  count = computed(() => this.favorites().length);

  // Computed: a beaucoup de favoris (> 3)
  hasMany = computed(() => this.count() > 3);

  // Effect pour logger les changements
  constructor() {
    effect(() => {
      const favs = this.favorites();
      if (favs.length > 0) {
        console.log(`⭐ Favoris (${favs.length}):`, favs.map(p => p.name).join(', '));
      }
    });
  }

  // Vérifie si un Pokémon est dans les favoris
  isInFavorites(id: number): boolean {
    return this.favorites().some(p => p.id === id);
  }

  // Ajoute un Pokémon aux favoris
  add(pokemon: FavoritePokemon): void {
    if (!this.isInFavorites(pokemon.id)) {
      this.favorites.update(favs => [...favs, pokemon]);
    }
  }

  // Retire un Pokémon des favoris
  remove(id: number): void {
    this.favorites.update(favs => favs.filter(p => p.id !== id));
  }

  // Vide la liste des favoris
  clear(): void {
    this.favorites.set([]);
  }
}
