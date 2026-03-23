import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, PokemonListComponent],
  template: `
    <app-header />

    <main class="content">
      <h2>Control Flow - Nouvelle Syntaxe Angular</h2>

      <div class="info-banner">
        <p>
          Angular 17+ introduit une nouvelle syntaxe de control flow:
          <code>&#64;if</code>, <code>&#64;for</code>, <code>&#64;switch</code>
        </p>
      </div>

      <!-- Démo du PokemonList avec @for/@if/@switch -->
      <app-pokemon-list />

      <div class="syntax-reference">
        <h3>Référence Syntaxe</h3>

        <div class="syntax-grid">
          <div class="syntax-item">
            <h4>&#64;if / &#64;else</h4>
            <pre><code>&#64;if (condition) {{ '{' }}
  &lt;div&gt;Vrai&lt;/div&gt;
{{ '}' }} &#64;else {{ '{' }}
  &lt;div&gt;Faux&lt;/div&gt;
{{ '}' }}</code></pre>
          </div>

          <div class="syntax-item">
            <h4>&#64;for avec track</h4>
            <pre><code>&#64;for (item of items; track item.id) {{ '{' }}
  &lt;div&gt;{{ '{{ item.name }}' }}&lt;/div&gt;
{{ '}' }} &#64;empty {{ '{' }}
  &lt;p&gt;Aucun élément&lt;/p&gt;
{{ '}' }}</code></pre>
          </div>

          <div class="syntax-item">
            <h4>&#64;switch</h4>
            <pre><code>&#64;switch (value) {{ '{' }}
  &#64;case ('a') {{ '{' }} &lt;p&gt;A&lt;/p&gt; {{ '}' }}
  &#64;case ('b') {{ '{' }} &lt;p&gt;B&lt;/p&gt; {{ '}' }}
  &#64;default {{ '{' }} &lt;p&gt;Autre&lt;/p&gt; {{ '}' }}
{{ '}' }}</code></pre>
          </div>

          <div class="syntax-item">
            <h4>Variables contextuelles &#64;for</h4>
            <pre><code>&#64;for (item of items; track item.id;
     let i = $index,
     first = $first,
     last = $last,
     even = $even,
     odd = $odd) {{ '{' }}
  ...
{{ '}' }}</code></pre>
          </div>
        </div>
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

    h3 {
      color: #8b5cf6;
      margin-bottom: 1rem;
    }

    h4 {
      color: #f59e0b;
      margin-bottom: 0.5rem;
    }

    .info-banner {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(230, 51, 132, 0.2));
      padding: 1rem 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .info-banner code {
      background: rgba(0, 0, 0, 0.3);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      color: #22c55e;
    }

    .syntax-reference {
      margin-top: 2rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 1.5rem;
    }

    .syntax-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .syntax-item {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 1rem;
    }

    .syntax-item pre {
      margin: 0;
      overflow-x: auto;
    }

    .syntax-item code {
      color: #22c55e;
      font-size: 0.85rem;
      line-height: 1.5;
    }
  `]
})
export class App {}
