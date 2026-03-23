import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CounterComponent } from './counter/counter.component';
import { FavoritesCounterComponent } from './favorites-counter/favorites-counter.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CounterComponent, FavoritesCounterComponent],
  template: `
    <app-header />

    <main class="content">
      <h2>Démonstration des Signals Angular</h2>

      <p class="intro">
        Les <strong>Signals</strong> sont la nouvelle primitive de réactivité d'Angular.
        Ils permettent de gérer l'état de manière plus fine et performante.
      </p>

      <div class="signals-grid">
        <!-- Counter - Signals basiques -->
        <section>
          <app-counter />

          <div class="explanation">
            <h4>Concepts utilisés:</h4>
            <ul>
              <li><code>signal()</code> - État primitif réactif</li>
              <li><code>computed()</code> - Valeur dérivée</li>
              <li><code>effect()</code> - Effet de bord</li>
              <li><code>.set()</code> - Remplace la valeur</li>
              <li><code>.update()</code> - Met à jour via fonction</li>
            </ul>
          </div>
        </section>

        <!-- FavoritesCounter - Signals avec objets -->
        <section>
          <app-favorites-counter />

          <div class="explanation">
            <h4>Cas d'usage Pokédex:</h4>
            <ul>
              <li>Signal d'array <code>favorites</code></li>
              <li>Computed <code>count</code> et <code>hasMany</code></li>
              <li>Méthodes <code>add/remove/clear</code></li>
              <li>Logging avec <code>effect()</code></li>
            </ul>
          </div>
        </section>
      </div>

      <div class="info-box">
        <h3>💡 Pourquoi les Signals ?</h3>
        <ul>
          <li>✅ Plus performant que Zone.js (change detection ciblée)</li>
          <li>✅ API simple et intuitive</li>
          <li>✅ Intégration native avec Angular</li>
          <li>✅ Computed values automatiquement mises à jour</li>
        </ul>
      </div>
    </main>
  `,
  styles: [`
    .content {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      color: #e63384;
      margin-bottom: 1rem;
    }

    h4 {
      color: #8b5cf6;
      margin-bottom: 0.5rem;
    }

    .intro {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }

    .intro strong {
      color: #f59e0b;
    }

    .signals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .signals-grid section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .explanation {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 1rem;
    }

    .explanation ul {
      margin: 0;
      padding-left: 1.5rem;
    }

    .explanation li {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 0.25rem;
    }

    .explanation code {
      background: rgba(0, 0, 0, 0.3);
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      color: #22c55e;
      font-size: 0.85rem;
    }

    .info-box {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(230, 51, 132, 0.2));
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .info-box h3 {
      color: #f59e0b;
      margin-bottom: 1rem;
    }

    .info-box ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .info-box li {
      margin-bottom: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
    }
  `]
})
export class App {}
