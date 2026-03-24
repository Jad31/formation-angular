import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonId',
  standalone: true
})
export class PokemonIdPipe implements PipeTransform {
  /**
   * Formate un ID de Pokémon avec un préfixe et un padding
   * @param id - L'ID du Pokémon
   * @param prefix - Le préfixe (par défaut '#')
   * @param padding - Le nombre de chiffres (par défaut 3)
   * @returns L'ID formaté, ex: '#001', '#025'
   */
  transform(id: number, prefix = '#', padding = 3): string {
    return `${prefix}${id.toString().padStart(padding, '0')}`;
  }
}
