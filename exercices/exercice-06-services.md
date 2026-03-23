# Exercice 06 - Services & Injection de Dépendances

## Objectif

Créer un service Angular pour centraliser la logique métier et l'état de l'application. Vous allez créer un `PokemonService` avec des Signals pour gérer les Pokemon et les favoris.

## Résultat attendu

- Un service qui gère la liste des Pokemon et les favoris
- Les favoris sont partagés entre tous les composants
- Un panel latéral affiche les favoris en temps réel
- Les filtres par type fonctionnent via le service

## Fichiers à créer/modifier

- `src/app/models/pokemon.model.ts` (interface Pokemon)
- `src/app/services/pokemon.service.ts` (via `ng g s services/pokemon`)
- `src/app/favorites-panel/favorites-panel.component.ts` (via `ng g c favorites-panel`)
- `src/app/pokemon-list/pokemon-list.component.ts`
- `src/app/app.component.ts`

## Concepts clés

- `@Injectable({ providedIn: 'root' })` : service singleton disponible partout
- `inject(Service)` : injection moderne (recommandée)
- Signals dans les services : état centralisé et réactif
- `asReadonly()` : exposer un signal en lecture seule
- `computed()` dans un service : valeurs dérivées partagées

## Checkpoint

- [ ] Le service gère la liste des Pokemon
- [ ] Les favoris sont partagés entre les composants
- [ ] Le panel affiche les favoris en temps réel
- [ ] Le compteur de favoris se met à jour instantanément
- [ ] Le filtre par type fonctionne

## Indices

<details>
<summary>Service non trouvé ?</summary>

Vérifiez que `providedIn: 'root'` est présent dans `@Injectable()`.
</details>

<details>
<summary>Injection ne fonctionne pas ?</summary>

Utilisez `inject()` dans le corps de la classe : `pokemonService = inject(PokemonService);`
</details>

<details>
<summary>Le signal n'est pas mis à jour dans l'autre composant ?</summary>

Exposez avec `asReadonly()` et appelez le signal avec `()` dans le template.
</details>

## Récapitulatif

| Concept | Description |
|---------|-------------|
| `@Injectable()` | Classe injectable |
| `providedIn: 'root'` | Singleton global |
| `inject(Service)` | Injection moderne |
| `asReadonly()` | Expose en lecture seule |

## Fin du Jour 1

Vous maîtrisez maintenant les bases d'Angular : composants, binding, signals, control flow et services.

## Prochaine étape

[Exercice 07 - HttpClient](./exercice-07-httpclient.md) (Jour 2)
