# Exercice 13 - Formulaires Dynamiques

## Objectif

Générer un **formulaire de recherche avancée** entièrement à partir d'une
**configuration JSON**, sans coder chaque champ à la main (Module 13).

## Résultat attendu

- Une interface `FieldConfig` décrivant un champ (type, label, validateurs…)
- Un service qui génère un `FormGroup` depuis un tableau de `FieldConfig`
- Un composant `DynamicField` qui rend un champ selon son type (`@switch`)
- Un composant `DynamicForm` qui assemble le tout
- Le formulaire affiche les erreurs de validation issues de la configuration

## Fichiers à créer/modifier

- `src/app/models/field-config.model.ts` — interfaces de configuration
- `src/app/services/dynamic-form.service.ts` — `createFormGroup()`
- `src/app/services/form-config.service.ts` — fournit la configuration
- `src/app/dynamic-field/dynamic-field.component.ts` (via `ng g c dynamic-field`)
- `src/app/dynamic-form/dynamic-form.component.ts` (via `ng g c dynamic-form`)
- `src/app/advanced-search/advanced-search.component.ts` — page hôte

## Concepts clés

- Interface `FieldConfig` : `key`, `type`, `label`, `validators`, `options`
- Générer un `FormGroup` par programmation (boucle sur la config)
- Traduire une `ValidatorConfig` déclarative en `Validators` Angular
- `@switch` sur `field.type` pour le rendu dynamique
- `input.required<FieldConfig>()` et `input.required<FormControl>()`
- Séparation des responsabilités : service (génération) / composant (rendu)

## Syntaxe moderne

```typescript
export interface FieldConfig {
  key: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'range';
  label: string;
  validators?: { required?: boolean; min?: number; max?: number };
  options?: { value: string | number; label: string }[];
}

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  private fb = inject(FormBuilder);

  createFormGroup(fields: FieldConfig[]): FormGroup {
    const controls: Record<string, FormControl> = {};
    for (const field of fields) {
      controls[field.key] = this.fb.control(
        field.defaultValue ?? '',
        this.buildValidators(field.validators),
      );
    }
    return this.fb.group(controls);
  }
}
```

## Checkpoint

- [ ] L'interface `FieldConfig` est définie et typée
- [ ] `DynamicFormService.createFormGroup()` génère le `FormGroup`
- [ ] `DynamicFieldComponent` utilise `@switch` sur le type de champ
- [ ] La validation déclarative (`required`, `min`, `max`…) fonctionne
- [ ] Le formulaire complet se génère depuis la configuration JSON
- [ ] La soumission émet les valeurs saisies

## Indices

<details>
<summary>Comment passer un FormControl à un sous-composant ?</summary>

Le parent expose `form.get(key)` ; l'enfant le reçoit via
`input.required<FormControl>()` et l'utilise avec `[formControl]`.
</details>

<details>
<summary>Comment construire les validateurs depuis la config ?</summary>

Parcourez la `ValidatorConfig` et empilez les `Validators` correspondants dans
un tableau `ValidatorFn[]`.
</details>

<details>
<summary>Le FormGroup ne se met pas à jour quand la config change ?</summary>

Recréez-le : un `computed()` basé sur l'`input()` `fields` régénère le
`FormGroup` à chaque changement de configuration.
</details>

## Prochaine étape

[Exercice 14 - Routage Avancé](./exercice-14-routage-avance.md)
