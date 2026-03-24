# Exercice 10 - HttpClient & API REST

## Objectif

Remplacer les données mock par de vrais appels à l'API PokeAPI. Vous allez apprendre à utiliser `HttpClient`, gérer les états de chargement et les erreurs.

## Résultat attendu

- Les Pokemon sont chargés depuis https://pokeapi.co/api/v2/pokemon
- Un spinner s'affiche pendant le chargement
- Un message d'erreur s'affiche en cas d'échec avec bouton "Réessayer"
- Une barre de recherche permet de chercher un Pokemon par nom

## Fichiers à modifier

- `src/app/app.config.ts` (ajouter `provideHttpClient()`)
- `src/app/models/pokemon.model.ts` (interfaces pour l'API)
- `src/app/services/pokemon.service.ts` (appels HTTP)
- `src/app/pokemon-list/pokemon-list.component.ts` (gestion loading/error)

## Concepts clés

- `provideHttpClient()` : configure HttpClient dans l'app
- `inject(HttpClient)` : injecte le client HTTP
- `http.get<T>(url)` : requête GET typée
- `subscribe({ next, error })` : s'abonne à la réponse
- `forkJoin()` : attend plusieurs requêtes en parallèle
- Gestion des états : `loading`, `error`, `data`

## API PokeAPI

- Liste : `https://pokeapi.co/api/v2/pokemon?limit=20`
- Detail : `https://pokeapi.co/api/v2/pokemon/{id ou nom}`

## Checkpoint

- [ ] Les Pokemon se chargent depuis l'API
- [ ] Un spinner s'affiche pendant le chargement
- [ ] Un message d'erreur s'affiche si l'API échoue
- [ ] La recherche par nom fonctionne
- [ ] Les types multiples s'affichent

## Indices

<details>
<summary>Erreur "HttpClient not found" ?</summary>

Vérifiez que `provideHttpClient()` est dans `app.config.ts`.
</details>

<details>
<summary>Les données de l'API ont une structure différente ?</summary>

Créez une fonction de mapping pour transformer `PokeApiPokemon` vers votre interface `Pokemon`.
</details>

<details>
<summary>Comment attendre plusieurs requêtes ?</summary>

Utilisez `forkJoin([req1, req2, ...])` de RxJS.
</details>

## Prochaine étape

[Exercice 11 - Formulaires](./exercice-11-formulaires.md)
