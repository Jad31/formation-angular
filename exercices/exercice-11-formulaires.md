# Exercice 11 - Formulaires Réactifs

## Objectif

Créer un formulaire de filtre pour rechercher des Pokemon avec validation. Vous allez utiliser les Reactive Forms d'Angular pour une gestion programmatique du formulaire.

## Résultat attendu

- Formulaire avec champs : nom, type (select), stats minimales
- Validation avec messages d'erreur visuels
- Filtrage de la liste en temps réel
- Bouton de réinitialisation

## Fichiers à créer/modifier

- `src/app/pokemon-filter/pokemon-filter.component.ts` (via `ng g c pokemon-filter`)
- `src/app/pokemon-list/pokemon-list.component.ts`
- `src/app/services/pokemon.service.ts`

## Concepts clés

- `ReactiveFormsModule` : à importer dans le composant
- `FormBuilder` avec `inject()` : créer des formulaires facilement
- `FormGroup` et `FormControl` : structure du formulaire
- `Validators` : `required`, `minLength`, `min`, `max`, `pattern`
- `formControlName` : lier un input à un control
- `valueChanges` : Observable des changements
- Validation et messages d'erreur conditionnels

## Syntaxe moderne

```typescript
@Component({
  selector: 'app-pokemon-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="filterForm">
      <input formControlName="name" placeholder="Nom du Pokemon">
      @if (filterForm.controls.name.errors?.['minlength']) {
        <span class="error">Minimum 2 caractères</span>
      }

      <select formControlName="type">
        <option value="">Tous les types</option>
        @for (type of types; track type) {
          <option [value]="type">{{ type }}</option>
        }
      </select>

      <button type="button" (click)="reset()">Réinitialiser</button>
    </form>
  `
})
export class PokemonFilterComponent {
  private fb = inject(FormBuilder);

  filterForm = this.fb.group({
    name: ['', [Validators.minLength(2)]],
    type: [''],
    minHp: [0, [Validators.min(0), Validators.max(255)]]
  });

  types = ['fire', 'water', 'grass', 'electric', ...];

  constructor() {
    this.filterForm.valueChanges.subscribe(values => {
      // Émettre les filtres vers le parent
    });
  }

  reset() {
    this.filterForm.reset();
  }
}
```

## Checkpoint

- [ ] Le formulaire est créé avec `FormBuilder`
- [ ] Le formulaire filtre les Pokemon par nom
- [ ] Le select filtre par type
- [ ] Les erreurs de validation s'affichent correctement
- [ ] Le bouton reset réinitialise le formulaire
- [ ] Le filtrage se fait en temps réel avec `valueChanges`

## Indices

<details>
<summary>Erreur "formGroup not found" ?</summary>

Importez `ReactiveFormsModule` dans `imports: []` du composant.
</details>

<details>
<summary>Comment accéder aux erreurs d'un control ?</summary>

Utilisez `filterForm.controls.name.errors` ou `filterForm.get('name')?.errors`.
</details>

<details>
<summary>Comment filtrer en temps réel ?</summary>

Abonnez-vous à `filterForm.valueChanges` et émettez les valeurs via un `output()`.
</details>

<details>
<summary>Comment valider un nombre entre min et max ?</summary>

`Validators.min(0)` et `Validators.max(255)` combinés : `[Validators.min(0), Validators.max(255)]`
</details>

## Fin des exercices

Félicitations ! Vous maîtrisez maintenant :

- Composants et templates
- Data binding et Signals
- Control flow moderne (`@if`, `@for`, `@switch`)
- Services et injection de dépendances
- Communication parent-enfant (`input()`, `output()`)
- Pipes personnalisés
- Directives d'attribut
- HttpClient et API REST
- Formulaires réactifs

Votre Pokedex est complet !
