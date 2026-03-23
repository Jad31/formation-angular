# Exercice 03 - Data Binding

## Objectif

Maîtriser les 4 types de binding Angular : interpolation `{{ }}`, property binding `[ ]`, event binding `( )`, et two-way binding `[( )]`. Vous allez enrichir la PokemonCard avec des données dynamiques.

## Résultat attendu

- Les cartes affichent des données dynamiques (nom, ID, image)
- Un bouton favori change d'état au clic (étoile vide/pleine)
- Une barre de recherche met à jour un compteur de caractères en temps réel

## Fichiers à modifier

- `src/app/pokemon-card/pokemon-card.component.ts`
- `src/app/app.component.ts` (ou `app.ts`)

## Concepts clés

- **Interpolation** `{{ }}` : afficher des valeurs dans le template
- **Property binding** `[property]="value"` : lier des propriétés DOM/composant
- **Event binding** `(event)="handler()"` : réagir aux événements
- **Two-way binding** `[(ngModel)]="value"` : liaison bidirectionnelle (nécessite `FormsModule`)
- **Class binding** `[class.active]="condition"` : classes conditionnelles

## Checkpoint

- [ ] Le nom et l'ID du Pokemon s'affichent dynamiquement
- [ ] L'image est liée avec `[src]`
- [ ] Le bouton favori change d'apparence au clic
- [ ] La barre de recherche met à jour le compteur en temps réel

## Indices

<details>
<summary>Erreur "ngModel is not a known property" ?</summary>

Importez `FormsModule` dans le composant qui utilise `ngModel`.
</details>

<details>
<summary>Le clic ne fonctionne pas ?</summary>

Vérifiez la syntaxe : `(click)="toggleFavorite()"` - parenthèses autour de l'événement, pas de guillemets autour de la méthode.
</details>

<details>
<summary>Les styles conditionnels ne marchent pas ?</summary>

Utilisez `[class.nomClasse]="condition"` pour ajouter une classe conditionnellement.
</details>

## Récapitulatif

| Type | Syntaxe | Direction |
|------|---------|-----------|
| Interpolation | `{{ value }}` | Composant -> DOM |
| Property | `[property]="value"` | Composant -> DOM |
| Event | `(event)="handler()"` | DOM -> Composant |
| Two-way | `[(ngModel)]="value"` | Bidirectionnel |

## Prochaine étape

[Exercice 04 - Signals](./exercice-04-signals.md)
