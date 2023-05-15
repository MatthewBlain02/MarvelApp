import { Component } from '@angular/core';
import { MarvelService } from '../marvel.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {
  character: any = {};
  name!: string;
  selectedComic:any = {};
  constructor(private marvelService: MarvelService) { }

  search(name: string): void {
    this.marvelService.getCharacter(name).subscribe(characters => {
      this.character = characters[0];
    });

    // Create the card element
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.style.maxWidth = "540px";

    // Create the row div for horizontal layout
    const cardRow = document.createElement("div");
    cardRow.className = "row g-0";

    // Create the column for the image
    const imageColumn = document.createElement("div");
    imageColumn.className = "col-md-4";

    // Create the card image
    const cardImage = document.createElement("img");
    cardImage.className = "img-fluid";
    cardImage.src = this.character.thumbnail.path + "." + this.character.thumbnail.extension;
    cardImage.alt = this.character.name;

    // Append the image to the column
    imageColumn.appendChild(cardImage);

    // Create the column for the card body
    const cardBodyColumn = document.createElement("div");
    cardBodyColumn.className = "col-md-8";

    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Create the card title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = this.character.name;

    // Create the card text (description)
    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = this.character.description || "No description available.";

    // Append the title and text to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    // Append the card body to the card body column
    cardBodyColumn.appendChild(cardBody);

    // Append the columns to the row
    cardRow.appendChild(imageColumn);
    cardRow.appendChild(cardBodyColumn);

    // Append the row to the card
    card.appendChild(cardRow);

    // Find the characters div by ID
    const charactersDiv = document.getElementById("characters");
      // Find the characters div by ID
      const comicsDiv = document.getElementById("comics");
    // Append the card to the characters div
    if (charactersDiv && comicsDiv) {
      charactersDiv.innerHTML = "";
      comicsDiv.innerHTML = "";
      charactersDiv.appendChild(card);
    } else {
      console.error("Div with ID 'characters' not found.");
    }
    this.addComics()
  }

addComics() {
  const comics: { name: string, resourceURI: string }[] = this.character.comics.items;
  const comicObservables = comics.map(comic => this.marvelService.getComic(comic.resourceURI));

  forkJoin(comicObservables).subscribe(comicResponses => {
    comicResponses.forEach((comicResponse, index) => {
      const selectComic = comicResponse[0];

      // Create the card element
      const card = document.createElement("div");
      card.className = "card mb-3";
      card.style.maxWidth = "540px";

      // Create the row div for horizontal layout
      const cardRow = document.createElement("div");
      cardRow.className = "row g-0";

      // Create the column for the image
      const imageColumn = document.createElement("div");
      imageColumn.className = "col-md-4";

      // Create the card image
      const cardImage = document.createElement("img");
      cardImage.className = "img-fluid";
      cardImage.src = selectComic.thumbnail.path + "." + selectComic.thumbnail.extension;
      cardImage.alt = comics[index].name;

      // Append the image to the column
      imageColumn.appendChild(cardImage);

      // Create the column for the card body
      const cardBodyColumn = document.createElement("div");
      cardBodyColumn.className = "col-md-8";

      // Create the card body
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      // Create the card title
      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = comics[index].name;

      // Create the card text (description)
      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = selectComic.description || "No description available.";

      // Append the title and text to the card body
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);

      // Append the card body to the card body column
      cardBodyColumn.appendChild(cardBody);

      // Append the columns to the row
      cardRow.appendChild(imageColumn);
      cardRow.appendChild(cardBodyColumn);

      // Append the row to the card
      card.appendChild(cardRow);

      // Find the characters div by ID
      const comicsDiv = document.getElementById("comics");

      // Append the card to the characters div
      if (comicsDiv) {
        comicsDiv.appendChild(card);
      } else {
        console.error("Div with ID 'comics' not found.");
      }
    });
  });
}

}
