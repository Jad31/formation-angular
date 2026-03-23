import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="logo">
        <span class="pokeball">◓</span>
        <h1>Pokédex</h1>
      </div>
      <nav>
        <span class="version">Angular 21</span>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .pokeball {
      font-size: 2rem;
      color: #e63384;
    }

    h1 {
      font-size: 1.5rem;
      background: linear-gradient(90deg, #f97316, #e63384);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .version {
      color: #8b5cf6;
      font-size: 0.9rem;
    }
  `]
})
export class HeaderComponent {}
