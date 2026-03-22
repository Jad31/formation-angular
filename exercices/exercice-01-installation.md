# Exercice 01 - Installation & Premier Projet

## Objectif

Installer Angular CLI et créer votre premier projet Angular. Vous découvrirez la structure d'un projet et personnalisérez l'application de base.

## Résultat attendu

- Le projet `pokedex` se lance sans erreur avec `ng serve`
- L'application affiche "Pokedex Angular 21" avec un style personnalisé
- Le fond est un dégradé sombre

## Fichiers à créer/modifier

- Nouveau projet via `ng new pokedex`
- `src/app/app.component.ts` (ou `app.ts`)
- `src/styles.scss`

## Concepts clés

- Installation d'Angular CLI (`npm install -g @angular/cli`)
- Création de projet (`ng new`)
- Structure d'un projet Angular (`src/`, `angular.json`, `package.json`)
- Décorateur `@Component` (selector, template, styles)
- Styles globaux vs styles de composant

## Checkpoint

- [ ] `ng serve` démarre sans erreur
- [ ] http://localhost:4200 affiche votre titre personnalisé
- [ ] Les styles globaux sont appliqués (fond sombre)

## Indices

<details>
<summary>L'installation échoue ?</summary>

Essayez `npm cache clean --force` puis réinstallez.
</details>

<details>
<summary>Erreur "ng not found" ?</summary>

Utilisez `npx @angular/cli new pokedex` à la place.
</details>

<details>
<summary>Port 4200 déjà utilisé ?</summary>

Utilisez `ng serve --port 4300`.
</details>

## Prochaine étape

[Exercice 02 - Composants](./exercice-02-composants.md)
