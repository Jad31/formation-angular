# Exercice 04 - Signals

## Objectif

Comprendre et utiliser les Signals Angular pour la réactivité. Vous allez créer un compteur simple puis un gestionnaire de favoris avec des valeurs dérivées.

## Résultat attendu

- Un `CounterComponent` avec boutons +/- qui affiche la valeur, pair/impair et le double
- Un `FavoritesCounterComponent` qui permet de sélectionner des Pokemon favoris
- Un badge "Collectionneur" apparaît quand on a plus de 3 favoris
- Les changements sont logués dans la console

## Fichiers à créer/modifier

- `src/app/counter/counter.component.ts` (via `ng g c counter`)
- `src/app/favorites-counter/favorites-counter.component.ts` (via `ng g c favorites-counter`)
- `src/app/app.component.ts`

## Concepts clés

- `signal(initialValue)` : créer une valeur réactive
- `signal()` : lire la valeur (appeler comme une fonction)
- `signal.set(newValue)` : remplacer la valeur
- `signal.update(fn)` : modifier via une fonction
- `computed(() => ...)` : valeur dérivée (lecture seule, recalculée automatiquement)
- `effect(() => ...)` : effet de bord quand un signal change

## Checkpoint

- [ ] Le compteur +/- fonctionne et affiche pair/impair
- [ ] L'effet log dans la console à chaque changement
- [ ] On peut ajouter/retirer des Pokemon favoris
- [ ] Le badge "Collectionneur" apparaît après 3 favoris
- [ ] La liste des favoris se met à jour en temps réel

## Indices

<details>
<summary>Erreur "signal is not defined" ?</summary>

Importez depuis `@angular/core` : `import { signal, computed, effect } from '@angular/core';`
</details>

<details>
<summary>computed() ne se met pas à jour ?</summary>

Appelez le signal avec `()` dans computed : `computed(() => this.count() * 2)` et non `this.count * 2`.
</details>

<details>
<summary>Modification d'array non détectée ?</summary>

Créez toujours un nouveau tableau : `this.items.update(arr => [...arr, newItem])` et non `this.items().push(newItem)`.
</details>

## Récapitulatif

| API | Usage |
|-----|-------|
| `signal(0)` | Créer un signal |
| `count()` | Lire la valeur |
| `count.set(10)` | Remplacer |
| `count.update(n => n + 1)` | Modifier |
| `computed(() => ...)` | Valeur dérivée |
| `effect(() => ...)` | Effet de bord |

## Prochaine étape

[Exercice 05 - Control Flow](./exercice-05-control-flow.md)
