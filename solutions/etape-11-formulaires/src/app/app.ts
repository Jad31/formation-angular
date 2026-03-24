import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FavoritesPanelComponent } from './favorites-panel/favorites-panel.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, PokemonListComponent, FavoritesPanelComponent],
  template: `
    <app-header />
    <main class="layout">
      <app-pokemon-list />
      <app-favorites-panel />
    </main>
  `,
  styles: [`
    .layout {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 1.5rem;
      padding: 1.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class App {}
