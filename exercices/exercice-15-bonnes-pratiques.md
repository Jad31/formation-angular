# Exercice 15 - Bonnes Pratiques

## Objectif

**Refactoring** : réorganiser le Pokédex selon les bonnes pratiques Angular.
Aucune nouvelle fonctionnalité — on améliore la **structure** et la
**performance** (Module 15).

## Résultat attendu

- Le projet est réorganisé en **feature folders** (`core`, `shared`, `features`)
- Des **path aliases** (`@core`, `@shared`, `@features`) remplacent les
  imports relatifs profonds
- Tous les composants utilisent `ChangeDetectionStrategy.OnPush`
- Chaque feature expose ses routes (`*.routes.ts`) chargées via `loadChildren`
- Le code passe la checklist de code review du module

## Fichiers à créer/modifier

- Déplacer les fichiers vers `core/`, `shared/`, `features/<feature>/`
- `tsconfig.json` — section `paths` pour les alias
- `src/app/app.routes.ts` — `loadChildren` vers les routes de feature
- `src/app/features/*/*.routes.ts` — routes par feature
- Tous les `*.component.ts` — ajouter `changeDetection: OnPush`

## Concepts clés

- Organisation : `core` (singletons), `shared` (réutilisable), `features` (métier)
- Path aliases dans `tsconfig.json` (`baseUrl` + `paths`)
- `ChangeDetectionStrategy.OnPush` — détection de changement optimisée
- `loadChildren` — lazy loading au niveau d'une feature
- Patterns RxJS : `switchMap`, `debounceTime`, `catchError`, `takeUntilDestroyed`
- `markForCheck()` quand un état non-signal change sous `OnPush`

## Syntaxe moderne

```jsonc
// tsconfig.json
"paths": {
  "@core/*": ["src/app/core/*"],
  "@shared/*": ["src/app/shared/*"],
  "@features/*": ["src/app/features/*"]
}
```

```typescript
// app.routes.ts
{
  path: 'pokemons',
  loadChildren: () =>
    import('@features/pokemons/pokemons.routes').then(m => m.POKEMONS_ROUTES),
}

// composant optimisé
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class PokemonListComponent {}
```

## Checkpoint

- [ ] Le projet est réorganisé en `core` / `shared` / `features`
- [ ] Les path aliases fonctionnent (`@core`, `@shared`, `@features`)
- [ ] Tous les composants sont en `OnPush`
- [ ] Chaque feature a son `*.routes.ts` chargé via `loadChildren`
- [ ] `ng build` réussit et montre un chunk par feature
- [ ] Le code respecte la checklist de code review

## Indices

<details>
<summary>Les imports cassent après le déplacement des fichiers ?</summary>

Utilisez les path aliases pour les imports inter-dossiers : ils restent
valables quelle que soit la profondeur du fichier.
</details>

<details>
<summary>La validation asynchrone ne rafraîchit plus la vue avec OnPush ?</summary>

La résolution d'un async validator ne génère pas d'événement DOM. Abonnez-vous
à `statusChanges` et appelez `ChangeDetectorRef.markForCheck()`.
</details>

<details>
<summary>Différence entre `loadComponent` et `loadChildren` ?</summary>

`loadComponent` charge **un** composant ; `loadChildren` charge **un ensemble
de routes** (un fichier `*.routes.ts`) — idéal pour une feature complète.
</details>

## Fin de la formation

Félicitations ! Vous avez terminé les 3 jours de formation Angular 21 :

- **Jour 1** — Fondamentaux : composants, binding, Signals, services
- **Jour 2** — Communication et données : `input`/`output`, pipes, directives,
  HttpClient, formulaires réactifs
- **Jour 3** — Avancé : `FormArray`, validation async, formulaires dynamiques,
  routage, guards, lazy loading, bonnes pratiques

Votre Pokédex est désormais une application complète, structurée et performante !
