import { Component, signal } from '@angular/core';

interface Pokemon {
  id: number;
  name: string;
  type: string;
  sprite: string;
}

@Component({
  selector: 'app-pokemon-list',
  template: `
    <div class="pokemon-list">
      <h2>Liste des Pokémon</h2>

      <!-- Contrôles -->
      <div class="controls">
        <button (click)="toggleShowList()">
          {{ showList() ? 'Masquer' : 'Afficher' }} la liste
        </button>
        <button (click)="clearList()" [disabled]="pokemons().length === 0">
          Vider la liste
        </button>
        <button (click)="resetList()">
          Réinitialiser
        </button>
      </div>

      <!-- @if - Affichage conditionnel -->
      @if (showList()) {
        <p class="count">{{ pokemons().length }} Pokémon</p>

        <!-- @for - Boucle avec track -->
        <div class="grid">
          @for (pokemon of pokemons(); track pokemon.id; let i = $index, first = $first, last = $last) {
            <article
              class="card"
              [class.first]="first"
              [class.last]="last">

              <!-- Index et indicateurs -->
              <span class="index">#{{ i + 1 }}</span>
              @if (first) {
                <span class="badge first-badge">Premier</span>
              }
              @if (last) {
                <span class="badge last-badge">Dernier</span>
              }

              <img [src]="pokemon.sprite" [alt]="pokemon.name" />
              <h3>{{ pokemon.name }}</h3>

              <!-- @switch - Pour le type -->
              <div class="type-badge">
                @switch (pokemon.type) {
                  @case ('electric') {
                    <span class="type electric">⚡ Électrique</span>
                  }
                  @case ('fire') {
                    <span class="type fire">🔥 Feu</span>
                  }
                  @case ('water') {
                    <span class="type water">💧 Eau</span>
                  }
                  @case ('grass') {
                    <span class="type grass">🌿 Plante</span>
                  }
                  @case ('psychic') {
                    <span class="type psychic">🔮 Psy</span>
                  }
                  @default {
                    <span class="type normal">● {{ pokemon.type }}</span>
                  }
                }
              </div>

              <button class="remove-btn" (click)="removePokemon(pokemon.id)">
                ×
              </button>
            </article>
          } @empty {
            <div class="empty-state">
              <p>🔍 Aucun Pokémon dans la liste</p>
              <button (click)="resetList()">Charger les Pokémon</button>
            </div>
          }
        </div>
      } @else {
        <div class="hidden-message">
          <p>👀 La liste est masquée</p>
          <p class="hint">Cliquez sur "Afficher" pour voir les Pokémon</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .pokemon-list {
      padding: 1rem;
    }

    h2 {
      color: #e63384;
      margin-bottom: 1rem;
    }

    .controls {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .controls button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      background: #8b5cf6;
      color: white;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .controls button:hover:not(:disabled) {
      opacity: 0.9;
    }

    .controls button:disabled {
      background: #666;
      cursor: not-allowed;
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
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .card.first {
      border: 2px solid #22c55e;
    }

    .card.last {
      border: 2px solid #ef4444;
    }

    .index {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.8rem;
    }

    .badge {
      position: absolute;
      top: -8px;
      font-size: 0.65rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .first-badge {
      left: 50%;
      transform: translateX(-50%);
      background: #22c55e;
    }

    .last-badge {
      left: 50%;
      transform: translateX(-50%);
      background: #ef4444;
    }

    .remove-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: rgba(239, 68, 68, 0.8);
      border: none;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .card:hover .remove-btn {
      opacity: 1;
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

    .type {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      color: white;
    }

    .type.electric { background: #eab308; }
    .type.fire { background: #ef4444; }
    .type.water { background: #3b82f6; }
    .type.grass { background: #22c55e; }
    .type.psychic { background: #a855f7; }
    .type.normal { background: #6b7280; }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
    }

    .empty-state p {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .empty-state button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      background: #e63384;
      color: white;
      cursor: pointer;
    }

    .hidden-message {
      text-align: center;
      padding: 3rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
    }

    .hidden-message p {
      font-size: 1.5rem;
    }

    .hidden-message .hint {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 0.5rem;
    }
  `]
})
export class PokemonListComponent {
  // Signal pour l'état d'affichage
  showList = signal(true);

  // Données initiales
  private initialPokemons: Pokemon[] = [
    { id: 25, name: 'pikachu', type: 'electric', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { id: 1, name: 'bulbizarre', type: 'grass', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: 4, name: 'salamèche', type: 'fire', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { id: 7, name: 'carapuce', type: 'water', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { id: 150, name: 'mewtwo', type: 'psychic', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' },
    { id: 6, name: 'dracaufeu', type: 'fire', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' }
  ];

  // Signal pour la liste
  pokemons = signal<Pokemon[]>([...this.initialPokemons]);

  toggleShowList(): void {
    this.showList.update(v => !v);
  }

  removePokemon(id: number): void {
    this.pokemons.update(list => list.filter(p => p.id !== id));
  }

  clearList(): void {
    this.pokemons.set([]);
  }

  resetList(): void {
    this.pokemons.set([...this.initialPokemons]);
  }
}
