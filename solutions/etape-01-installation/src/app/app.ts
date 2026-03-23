import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <h1>Pokédex Angular 21</h1>
    <p>Bienvenue dans votre Pokédex !</p>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 2rem;
        text-align: center;
      }

      h1 {
        font-family: sans-serif;
        font-size: 2.5rem;
        background: linear-gradient(90deg, #f97316, #e63384, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      p {
        color: rgba(255, 255, 255, 0.8);
        margin-top: 1rem;
      }
    `,
  ],
})
export class App {}
