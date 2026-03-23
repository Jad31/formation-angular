# Exercice 02 - Composants & Templates

## Objectif

Créer vos premiers composants Angular et comprendre comment les imbriquer. Vous allez créer un `HeaderComponent` et un `PokemonCardComponent` pour structurer votre Pokedex.

## Résultat attendu

- Un header avec le titre "Pokedex" et un logo/icone
- Des cartes Pokemon affichant une image, un nom et un numéro
- Les cartes ont un effet au survol (hover)

## Fichiers à créer/modifier

- `src/app/header/header.component.ts` (via `ng g c header`)
- `src/app/pokemon-card/pokemon-card.component.ts` (via `ng g c pokemon-card`)
- `src/app/app.component.ts` (ou `app.ts`)

## Concepts clés

- Génération de composant avec le CLI (`ng generate component` ou `ng g c`)
- Décorateur `@Component` (selector, template, styles)
- Import de composants enfants dans `imports: []`
- Projection de contenu avec `<ng-content>`
- Encapsulation des styles par composant

## Checkpoint

- [ ] Le header s'affiche avec titre et logo
- [ ] Au moins 3 cartes Pokemon sont visibles
- [ ] Les cartes ont un effet visuel au survol
- [ ] Le contenu est projeté via `ng-content`

## Indices

<details>
<summary>Erreur "app-header is not a known element" ?</summary>

Vérifiez que le composant est importé dans `imports: []` du composant parent.
</details>

<details>
<summary>Les styles ne s'appliquent pas ?</summary>

Les styles sont encapsulés par composant. Mettez les styles dans le bon composant.
</details>

<details>
<summary>Les images ne s'affichent pas ?</summary>

Utilisez les sprites Pokemon de : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
</details>

## Prochaine étape

[Exercice 03 - Data Binding](./exercice-03-data-binding.md)
