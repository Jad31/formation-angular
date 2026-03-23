import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, PokemonCardComponent],
  template: `
    <app-header />

    <main class="content">
      <h2>Liste des Pokémon</h2>

      <!-- Démonstration de ng-content -->
      <div class="cards">
        <app-pokemon-card>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
          />
          <h3>Pikachu</h3>
          <span class="type electric">Électrique</span>
        </app-pokemon-card>

        <app-pokemon-card>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            alt="Bulbasaur"
          />
          <h3>Bulbizarre</h3>
          <span class="type grass">Plante</span>
        </app-pokemon-card>

        <app-pokemon-card>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
            alt="Charmander"
          />
          <h3>Salamèche</h3>
          <span class="type fire">Feu</span>
        </app-pokemon-card>
      </div>
    </main>
  `,
  styles: [
    `
      .content {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      h2 {
        color: #e63384;
        margin-bottom: 1.5rem;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 1rem;
      }

      img {
        width: 80px;
        height: 80px;
        image-rendering: pixelated;
      }

      h3 {
        color: white;
        font-size: 1rem;
      }

      .type {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        color: white;
      }

      .type.electric {
        background: #eab308;
      }
      .type.grass {
        background: #22c55e;
      }
      .type.fire {
        background: #ef4444;
      }
    `,
  ],
})
export class App {}
