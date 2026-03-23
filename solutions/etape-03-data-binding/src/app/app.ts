import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, HeaderComponent, PokemonCardComponent],
  template: `
    <app-header />

    <main class="content">
      <h2>Démonstration Data Binding</h2>

      <!-- Two-way binding avec ngModel -->
      <div class="search-section">
        <h3>Two-way binding (ngModel)</h3>
        <input
          type="text"
          [(ngModel)]="searchTerm"
          placeholder="Tapez quelque chose..."
        />
        <p>Vous avez tapé: <strong>{{ searchTerm }}</strong></p>
        <p>Longueur: {{ searchTerm.length }} caractères</p>
      </div>

      <!-- Démonstration des 4 types de binding -->
      <section class="binding-demo">
        <h3>Les 4 types de binding</h3>

        <div class="demo-grid">
          <!-- 1. Interpolation {{ }} -->
          <div class="demo-item">
            <h4>1. Interpolation</h4>
            <code>{{ "{{ expression }}" }}</code>
            <p>Titre: {{ title }}</p>
          </div>

          <!-- 2. Property binding [ ] -->
          <div class="demo-item">
            <h4>2. Property Binding</h4>
            <code>[propriété]="valeur"</code>
            <button [disabled]="isDisabled">
              {{ isDisabled ? 'Désactivé' : 'Actif' }}
            </button>
            <button (click)="isDisabled = !isDisabled">Toggle</button>
          </div>

          <!-- 3. Event binding ( ) -->
          <div class="demo-item">
            <h4>3. Event Binding</h4>
            <code>(événement)="handler()"</code>
            <button (click)="incrementCounter()">
              Clics: {{ counter }}
            </button>
          </div>

          <!-- 4. Two-way binding [( )] -->
          <div class="demo-item">
            <h4>4. Two-way Binding</h4>
            <code>[(ngModel)]="variable"</code>
            <input [(ngModel)]="userName" placeholder="Votre nom" />
            <p>Bonjour, {{ userName || 'inconnu' }} !</p>
          </div>
        </div>
      </section>

      <!-- Carte Pokémon avec tous les bindings -->
      <section class="pokemon-section">
        <h3>Pokémon Card avec Data Binding</h3>
        <p class="hint">Cliquez sur l'étoile pour ajouter aux favoris</p>
        <div class="cards">
          <app-pokemon-card />
        </div>
      </section>
    </main>
  `,
  styles: [`
    .content {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    h2 {
      color: #e63384;
      margin-bottom: 1.5rem;
    }

    h3 {
      color: #8b5cf6;
      margin: 1.5rem 0 1rem;
    }

    h4 {
      color: #f97316;
      margin-bottom: 0.5rem;
    }

    .search-section {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .search-section input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .search-section input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .binding-demo {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .demo-item {
      background: rgba(255, 255, 255, 0.05);
      padding: 1rem;
      border-radius: 8px;
    }

    .demo-item code {
      display: block;
      background: rgba(0, 0, 0, 0.3);
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      color: #22c55e;
      margin-bottom: 0.75rem;
    }

    .demo-item button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: #e63384;
      color: white;
      cursor: pointer;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .demo-item button:disabled {
      background: #666;
      cursor: not-allowed;
    }

    .demo-item input {
      padding: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .pokemon-section {
      margin-top: 2rem;
    }

    .hint {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .cards {
      display: flex;
      gap: 1rem;
    }
  `]
})
export class App {
  // Propriétés pour les démonstrations
  title = 'Pokédex Angular 21';
  searchTerm = '';
  userName = '';
  counter = 0;
  isDisabled = false;

  incrementCounter(): void {
    this.counter++;
  }
}
