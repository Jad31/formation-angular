# Exercice 08 - Pipes

## Objectif

Créer des Pipes personnalisés pour transformer l'affichage des données. Vous allez créer des pipes pour capitaliser les noms, formater les IDs et colorer les badges de type.

## Résultat attendu

- Les noms de Pokemon sont capitalisés (pikachu -> Pikachu)
- Les IDs sont formatés avec le préfixe # et padding (25 -> #025)
- Les badges de type ont une couleur dynamique (feu = rouge, etc.)

## Fichiers à créer/modifier

- `src/app/pipes/capitalize.pipe.ts` (via `ng g p pipes/capitalize`)
- `src/app/pipes/pokemon-id.pipe.ts` (via `ng g p pipes/pokemon-id`)
- `src/app/pipes/type-color.pipe.ts` (via `ng g p pipes/type-color`)
- `src/app/pokemon-list/pokemon-list.component.ts` (utilisation des pipes)

## Concepts clés

- `@Pipe({ name: 'myPipe' })` : décorateur pour créer un pipe
- `implements PipeTransform` : interface à implémenter
- `transform(value, ...args)` : méthode de transformation
- `{{ value | pipe }}` : syntaxe d'utilisation dans le template
- `{{ value | pipe:arg1:arg2 }}` : passage d'arguments
- Import du pipe dans `imports: []` du composant

## Pipes built-in utiles

- `uppercase` / `lowercase` / `titlecase`
- `number` (formatage)
- `date` (dates)
- `json` (debug)
- `async` (Observables/Promises)

## Checkpoint

- [ ] Les noms sont capitalisés avec le pipe
- [ ] Les IDs sont formatés #001, #002...
- [ ] Les badges ont une couleur dynamique selon le type
- [ ] Les pipes sont importés dans le composant

## Indices

<details>
<summary>Pipe non reconnu dans le template ?</summary>

Importez le pipe dans `imports: []` du composant qui l'utilise.
</details>

<details>
<summary>Comment utiliser le pipe pour un style ?</summary>

`[style.background]="type | typeColor"` - le pipe retourne une couleur CSS.
</details>

<details>
<summary>Le pipe ne se met pas à jour ?</summary>

Les pipes sont "purs" par défaut. Pour les mutations d'objets, utilisez `pure: false` (à éviter si possible).
</details>

## Prochaine étape

[Exercice 09 - Directives](./exercice-09-directives.md)
