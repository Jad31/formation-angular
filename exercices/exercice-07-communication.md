# Exercice 07 - Communication entre Composants

## Objectif

Maîtriser la communication parent-enfant avec les nouveaux signaux `input()` et `output()`. Vous allez refactoriser `PokemonCard` pour recevoir des données du parent et émettre des événements.

## Résultat attendu

- `PokemonCard` reçoit un Pokemon en input et affiche ses données
- Le clic sur le bouton favori émet un événement vers le parent
- Le parent affiche le nom du Pokemon qui a été cliqué

## Fichiers à modifier

- `src/app/pokemon-card/pokemon-card.component.ts`
- `src/app/pokemon-list/pokemon-list.component.ts`

## Concepts clés

- `input<T>()` : recevoir une donnée du parent (c'est un Signal !)
- `input.required<T>()` : input obligatoire
- `input<T>(defaultValue)` : input avec valeur par défaut
- `output<T>()` : émettre un événement vers le parent
- `output.emit(value)` : déclencher l'événement
- Les inputs sont des signals : utiliser `pokemon()` pour lire la valeur

## Syntaxe moderne vs ancienne

| Ancienne                                  | Nouvelle                  |
| ----------------------------------------- | ------------------------- |
| `@Input() value: string`                  | `value = input<string>()` |
| `@Input({ required: true })`              | `input.required<T>()`     |
| `@Output() event = new EventEmitter<T>()` | `event = output<T>()`     |

## Checkpoint

- [ ] `PokemonCard` reçoit les données via `input()`
- [ ] Le favori se toggle via `output()`
- [ ] Le clic sur la carte émet un événement
- [ ] Le parent affiche le nom du Pokemon qui a été cliqué

## Indices

<details>
<summary>Erreur "input is not a function" ?</summary>

Importez depuis `@angular/core` : `import { input, output } from '@angular/core';`

</details>

<details>
<summary>L'input n'est pas mis à jour ?</summary>

Avec `input()`, la valeur est un signal. Appelez-la avec `()` : `{{ pokemon().name }}`

</details>

<details>
<summary>Comment passer l'input depuis le parent ?</summary>

`<app-pokemon-card [pokemon]="myPokemon" (favoriteToggled)="onToggle($event)" />`

</details>

## Prochaine étape

[Exercice 08 - Pipes](./exercice-08-pipes.md)
