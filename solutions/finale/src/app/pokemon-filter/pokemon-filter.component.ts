import { TitleCasePipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-filter',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  template: `
    <form [formGroup]="filterForm" class="filter-form">
      <div class="form-group">
        <input formControlName="name" placeholder="Rechercher un Pokémon..." class="form-input" />
        @if (filterForm.controls.name.errors?.['minlength'] && filterForm.controls.name.touched) {
          <span class="error">Minimum 2 caractères</span>
        }
      </div>

      <select formControlName="type" class="form-select">
        <option value="">Tous les types</option>
        @for (type of types; track type) {
          <option [value]="type">{{ type | titlecase }}</option>
        }
      </select>

      <button type="button" class="reset-btn" (click)="reset()">Réinitialiser</button>
    </form>
  `,
  styles: [
    `
      .filter-form {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: flex-start;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
        min-width: 200px;
      }

      .form-input {
        padding: 0.75rem;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1rem;
      }

      .form-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      .form-input:focus {
        outline: none;
        border-color: #e63384;
      }

      .form-input.ng-invalid.ng-touched {
        border-color: #ef4444;
      }

      .form-select {
        padding: 0.75rem;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1rem;
        min-width: 150px;
      }

      .form-select:focus {
        outline: none;
        border-color: #e63384;
      }

      .form-select option {
        background: #1f2937;
        color: white;
      }

      .error {
        color: #ef4444;
        font-size: 0.75rem;
      }

      .reset-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        background: #6b7280;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.2s;
      }

      .reset-btn:hover {
        background: #4b5563;
      }
    `,
  ],
})
export class PokemonFilterComponent {
  private fb = inject(FormBuilder);

  filterChange = output<{ name: string; type: string }>();

  types = [
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'normal',
    'bug',
    'poison',
    'ground',
    'flying',
    'fighting',
    'rock',
    'ghost',
    'dragon',
    'ice',
    'fairy',
  ];

  filterForm = this.fb.group({
    name: ['', [Validators.minLength(2)]],
    type: [''],
  });

  constructor() {
    this.filterForm.valueChanges.subscribe((values) => {
      if (this.filterForm.valid) {
        this.filterChange.emit({
          name: values.name || '',
          type: values.type || '',
        });
      }
    });
  }

  reset() {
    this.filterForm.reset();
    this.filterChange.emit({ name: '', type: '' });
  }
}
