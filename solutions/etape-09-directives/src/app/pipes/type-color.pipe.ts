import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeColor',
  standalone: true
})
export class TypeColorPipe implements PipeTransform {
  private colors: Record<string, string> = {
    fire: '#ef4444',
    water: '#3b82f6',
    grass: '#22c55e',
    electric: '#eab308',
    psychic: '#a855f7',
    normal: '#6b7280',
    fighting: '#b91c1c',
    poison: '#7c3aed',
    ground: '#d97706',
    flying: '#60a5fa',
    bug: '#84cc16',
    rock: '#78716c',
    ghost: '#6366f1',
    dragon: '#7c3aed',
    ice: '#22d3ee',
    fairy: '#ec4899',
    steel: '#71717a',
    dark: '#1f2937'
  };

  transform(type: string): string {
    return this.colors[type.toLowerCase()] || '#6b7280';
  }
}
