import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <h3>Counter avec Signals</h3>

      <!-- Signal de base -->
      <div class="display">
        <span class="value">{{ count() }}</span>
      </div>

      <!-- Computed signal -->
      <p class="info">
        Le nombre est
        <strong [class.even]="isEven()" [class.odd]="!isEven()">
          {{ isEven() ? 'pair' : 'impair' }}
        </strong>
      </p>

      <!-- Computed pour le double -->
      <p class="info">
        Double: <strong>{{ double() }}</strong>
      </p>

      <!-- Actions -->
      <div class="actions">
        <button (click)="decrement()" [disabled]="count() <= 0">-</button>
        <button (click)="increment()">+</button>
        <button (click)="reset()" class="reset">Reset</button>
      </div>

      <!-- Historique des changements -->
      <div class="history">
        <p>Changements: {{ changeCount() }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .counter {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        max-width: 300px;
      }

      h3 {
        color: #8b5cf6;
        margin-bottom: 1rem;
      }

      .display {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
      }

      .value {
        font-size: 3rem;
        font-weight: bold;
        color: #e63384;
      }

      .info {
        margin-bottom: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
      }

      .info strong.even {
        color: #22c55e;
      }
      .info strong.odd {
        color: #f97316;
      }

      .actions {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      .actions button {
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #e63384;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        transition: transform 0.2s;
      }

      .actions button:hover:not(:disabled) {
        transform: scale(1.1);
      }

      .actions button:disabled {
        background: #666;
        cursor: not-allowed;
      }

      .actions button.reset {
        width: auto;
        border-radius: 8px;
        padding: 0 1rem;
        font-size: 1rem;
        background: #6b7280;
      }

      .history {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    `,
  ],
})
export class CounterComponent {
  // Signal de base - état primitif
  count = signal(0);

  // Signal pour compter les changements
  private _changeCount = signal(0);
  changeCount = this._changeCount.asReadonly();

  // Computed signals - valeurs dérivées
  isEven = computed(() => this.count() % 2 === 0);
  double = computed(() => this.count() * 2);

  // Effect - réaction aux changements
  constructor() {
    effect(() => {
      console.log(`🔢 CompteurPair: ${this.isEven()}`);
    });
  }

  increment(): void {
    this.count.update((c) => c + 1);
    this._changeCount.update((c) => c + 1);
  }

  decrement(): void {
    this.count.update((c) => Math.max(0, c - 1));
    this._changeCount.update((c) => c + 1);
  }

  reset(): void {
    this.count.set(0);
    this._changeCount.update((c) => c + 1);
  }
}
