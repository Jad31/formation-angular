# Exercice 05 - Control Flow

## Objectif

Maîtriser la nouvelle syntaxe de control flow Angular (`@if`, `@for`, `@switch`, `@empty`). Vous allez créer un `PokemonListComponent` avec une grille filtrable.

## Résultat attendu

- Une grille de Pokemon avec des filtres par type
- Des badges de couleur différente selon le type (feu = rouge, eau = bleu, etc.)
- Un message "Aucun Pokemon" quand la liste filtrée est vide
- Le premier et dernier Pokemon de la liste sont mis en évidence

## Fichiers à créer/modifier

- `src/app/pokemon-list/pokemon-list.component.ts` (via `ng g c pokemon-list`)
- `src/app/app.component.ts`

## Concepts clés

- `@if (condition) { }` / `@else if` / `@else` : conditions
- `@for (item of items; track item.id) { }` : boucles (track obligatoire !)
- `@empty { }` : contenu quand la liste est vide
- `@switch (expression) { @case (value) { } @default { } }` : cas multiples
- Variables contextuelles : `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`

## Checkpoint

- [ ] La grille affiche les Pokemon
- [ ] Les filtres par type fonctionnent
- [ ] Les badges ont la bonne couleur selon le type (`@switch`)
- [ ] "Aucun Pokemon" s'affiche si la liste est vide (`@empty`)
- [ ] Le premier et dernier sont visuellement différents (`$first`, `$last`)

## Indices

<details>
<summary>Erreur "track is required" ?</summary>

`track` est obligatoire avec `@for`. Utilisez une propriété unique : `@for (item of items; track item.id)`
</details>

<details>
<summary>Variables contextuelles non reconnues ?</summary>

Déclarez-les avec `let` : `@for (item of items; track item.id; let i = $index, first = $first)`
</details>

<details>
<summary>@switch ne compile pas ?</summary>

Les valeurs de `@case` doivent être entre parenthèses : `@case ('fire')` et non `@case fire`.
</details>

## Récapitulatif

| Syntaxe | Usage |
|---------|-------|
| `@if (cond) { }` | Condition |
| `@else { }` | Alternative |
| `@for (x of list; track x.id) { }` | Boucle |
| `@empty { }` | Liste vide |
| `@switch (expr) { @case (val) { } }` | Cas multiples |

## Prochaine étape

[Exercice 06 - Services](./exercice-06-services.md)
