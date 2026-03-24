# Exercice 09 - Directives

## Objectif

Créer des directives d'attribut pour ajouter des comportements réutilisables aux éléments du DOM. Vous allez implémenter des directives pour la surbrillance et les info-bulles.

## Résultat attendu

- `HighlightDirective` : surbrillance au survol des cartes Pokemon
- `TooltipDirective` : info-bulle sur les badges de type
- Utilisation de `[class]` et `[style]` bindings dans les directives

## Fichiers à créer/modifier

- `src/app/directives/highlight.directive.ts` (via `ng g d directives/highlight`)
- `src/app/directives/tooltip.directive.ts` (via `ng g d directives/tooltip`)
- `src/app/pokemon-card/pokemon-card.component.ts`

## Concepts clés

- `@Directive({ selector: '[appHighlight]' })` : sélecteur d'attribut
- `ElementRef` + `inject()` : accéder à l'élément DOM hôte
- `input()` signals dans les directives : configurer le comportement
- `@HostListener` ou `host: {}` : écouter les événements de l'hôte
- `effect()` : réagir aux changements de signals
- `Renderer2` : manipulation DOM sécurisée (SSR-compatible)

## Syntaxe moderne

```typescript
@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
  private el = inject(ElementRef);

  highlightColor = input<string>('yellow');

  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor();
  }

  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
```

## Checkpoint

- [ ] `HighlightDirective` change la couleur de fond au survol
- [ ] `TooltipDirective` affiche une info-bulle au survol
- [ ] Les directives acceptent des inputs pour la configuration
- [ ] Les directives sont importées dans le composant qui les utilise
- [ ] `[class]` et `[style]` bindings sont utilisés correctement

## Indices

<details>
<summary>Erreur "directive not found" ?</summary>

Importez la directive dans `imports: []` du composant qui l'utilise.
</details>

<details>
<summary>Comment accéder à l'élément hôte ?</summary>

Utilisez `inject(ElementRef)` pour obtenir une référence à l'élément DOM.
</details>

<details>
<summary>Comment écouter des événements ?</summary>

Utilisez `host: { '(event)': 'handler()' }` dans le décorateur ou `@HostListener('event')` sur la méthode.
</details>

<details>
<summary>Comment créer une info-bulle ?</summary>

Créez un élément `<span>` dynamiquement avec `Renderer2.createElement()` et positionnez-le en absolu.
</details>

## Prochaine étape

[Exercice 10 - HttpClient](./exercice-10-httpclient.md)
