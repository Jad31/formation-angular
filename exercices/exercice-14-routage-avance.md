# Exercice 14 - Routage Avancé

## Objectif

Transformer le Pokédex en **application multi-pages** : configuration des routes,
paramètres, **guards** et **lazy loading** (Module 14).

## Résultat attendu

- Routes : Accueil, Pokédex, détail d'un Pokémon, équipe, recherche, favoris, 404
- Navigation avec `routerLink` et lien actif (`routerLinkActive`)
- Page de détail recevant l'`id` du Pokémon depuis l'URL
- `authGuard` (`CanActivate`) protégeant la page Favoris
- `unsavedChangesGuard` (`CanDeactivate`) sur le constructeur d'équipe
- Lazy loading des pages avec `loadComponent`

## Fichiers à créer/modifier

- `src/app/app.routes.ts` — configuration des routes
- `src/app/app.config.ts` — `provideRouter(routes, withComponentInputBinding())`
- `src/app/app.ts` — barre de navigation et `<router-outlet />`
- `src/app/pages/` — `home`, `not-found`, `login`, `pokemon-detail`, `favorites`
- `src/app/guards/auth.guard.ts` et `src/app/guards/unsaved-changes.guard.ts`
- `src/app/services/auth.service.ts` — authentification simulée par signal
- `src/app/resolvers/pokemon-title.resolver.ts` — titre de page dynamique

## Concepts clés

- `provideRouter(routes)` et `withComponentInputBinding()`
- `RouterOutlet`, `RouterLink`, `RouterLinkActive`
- Paramètres de route : `:id` reçu comme `input.required<string>()`
- Query params via `ActivatedRoute.queryParamMap`
- `CanActivateFn` / `CanDeactivateFn` avec `inject()`
- `ResolveFn` : résoudre des données (ou un titre) avant activation
- Lazy loading : `loadComponent` et `loadChildren`

## Syntaxe moderne

```typescript
// app.config.ts
provideRouter(routes, withComponentInputBinding())

// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'pokemons/:id',
    title: pokemonTitleResolver,
    loadComponent: () =>
      import('./pages/pokemon-detail.component').then(m => m.PokemonDetailComponent),
  },
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/favorites.component').then(m => m.FavoritesComponent),
  },
  { path: '**', component: NotFoundComponent },
];

// guards/auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
```

## Checkpoint

- [ ] Le routeur est configuré avec `provideRouter()`
- [ ] La navigation fonctionne avec `routerLink` / `routerLinkActive`
- [ ] La page de détail lit le paramètre `:id`
- [ ] `authGuard` redirige vers `/login` si non authentifié
- [ ] `unsavedChangesGuard` demande confirmation si le formulaire est `dirty`
- [ ] Les pages sont chargées en lazy (`loadComponent`)

## Indices

<details>
<summary>Comment recevoir `:id` comme un input ?</summary>

Activez `withComponentInputBinding()` dans `provideRouter()` : le paramètre de
route devient automatiquement un `input()` du composant.
</details>

<details>
<summary>Le composant ne recharge pas quand l'id change ?</summary>

Utilisez un `effect()` qui lit le signal `id()` : il se réexécute à chaque
changement de paramètre.
</details>

<details>
<summary>Comment implémenter `CanDeactivate` ?</summary>

Définissez une interface `CanComponentDeactivate { hasUnsavedChanges(): boolean }`,
faites-la implémenter par le composant, et typez le guard
`CanDeactivateFn<CanComponentDeactivate>`.
</details>

<details>
<summary>Comment vérifier le lazy loading ?</summary>

Lancez `ng build` : chaque page lazy apparaît comme un chunk séparé. Dans
l'onglet Network, le chunk n'est téléchargé qu'à la première navigation.
</details>

## Prochaine étape

[Exercice 15 - Bonnes Pratiques](./exercice-15-bonnes-pratiques.md)
