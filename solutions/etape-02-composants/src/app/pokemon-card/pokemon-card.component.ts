import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  template: `
    <article class="card">
      <!-- ng-content permet de projeter du contenu depuis le parent -->
      <ng-content></ng-content>
    </article>
  `,
  styles: [
    `
      .card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class PokemonCardComponent {}
