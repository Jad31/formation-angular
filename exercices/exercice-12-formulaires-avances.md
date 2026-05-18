# Exercice 12 - Formulaires Avancés

## Objectif

Créer un **constructeur d'équipe Pokémon** avec un `FormArray` dynamique, une
validation **asynchrone** via la PokeAPI et une sauvegarde automatique. C'est le
premier exercice du Jour 3 (Module 12).

## Résultat attendu

- Formulaire d'équipe : nom (requis, min. 3 caractères), description (max. 200)
- `FormArray` de Pokémon : entre 1 et 6 entrées, ajout/suppression dynamique
- Chaque Pokémon : nom validé en asynchrone (existe sur la PokeAPI ?)
- Indicateur « Vérification en cours… » pendant la validation async
- Auto-save du brouillon après une période d'inactivité (`valueChanges`)

## Fichiers à créer/modifier

- `src/app/validators/pokemon-exists.validator.ts` — validateur asynchrone
- `src/app/team-builder/team-builder.component.ts` (via `ng g c team-builder`)
- `src/app/services/pokemon.service.ts` — méthode `checkPokemonExists()`
- `src/app/app.ts` — intégrer `<app-team-builder />`

## Concepts clés

- `FormArray` : `fb.array([])`, `push()`, `removeAt()`, `clear()`
- `formArrayName` et `[formGroupName]="$index"` dans le template
- `AsyncValidatorFn` : retourne `Observable<ValidationErrors | null>`
- `debounceTime`, `switchMap`, `first()` dans un validateur asynchrone
- `valueChanges` / `statusChanges` : réagir aux modifications
- `takeUntilDestroyed()` : nettoyage automatique des abonnements
- `emitEvent: false` : éviter les boucles infinies pendant l'auto-save

## Syntaxe moderne

```typescript
export class TeamBuilderComponent {
  private fb = inject(FormBuilder);

  teamForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    pokemons: this.fb.array<FormGroup>(
      [],
      [Validators.minLength(1), Validators.maxLength(6)]
    ),
  });

  get pokemons(): FormArray<FormGroup> {
    return this.teamForm.controls.pokemons;
  }

  addPokemon() {
    this.pokemons.push(this.fb.group({
      name: ['', [Validators.required], [this.pokemonNameValidator]],
      level: [50, [Validators.min(1), Validators.max(100)]],
    }));
  }
}
```

## Checkpoint

- [ ] Le `FormArray` ajoute et retire des Pokémon (max. 6)
- [ ] Le validateur asynchrone interroge la PokeAPI
- [ ] L'état `pending` affiche un indicateur de chargement
- [ ] Un nom inexistant affiche une erreur `pokemonNotFound`
- [ ] L'auto-save se déclenche après inactivité via `valueChanges`
- [ ] Les abonnements utilisent `takeUntilDestroyed()`

## Indices

<details>
<summary>Erreur « inject() must be called from an injection context » ?</summary>

Le validateur asynchrone utilise `inject()`. Créez-le une seule fois dans un
initialiseur de champ du composant, puis réutilisez la même fonction pour
chaque Pokémon ajouté.
</details>

<details>
<summary>Comment passer des validateurs asynchrones à un control ?</summary>

`fb.control(valeur, validatorsSync, validatorsAsync)` — les async en 3ᵉ argument.
</details>

<details>
<summary>L'auto-save boucle à l'infini ?</summary>

Après la sauvegarde, appelez `markAsPristine()` et/ou utilisez `emitEvent: false`
pour ne pas redéclencher `valueChanges`.
</details>

<details>
<summary>Le validateur asynchrone ne se termine jamais ?</summary>

Ajoutez `first()` à la fin du pipe : un async validator doit **compléter**.
</details>

## Prochaine étape

[Exercice 13 - Formulaires Dynamiques](./exercice-13-formulaires-dynamiques.md)
