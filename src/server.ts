import * as express from "express";
import axios from "axios";
import { Card, FullCard, ImageTemplates } from "./models/cardTypes";

export const app = express();

app.set("json spaces", 2);

app.get("/cards", async (req, res) => {
  try {
    const fullCardResponse = await axios.get(
      "https://moonpig.github.io/tech-test-node-backend/cards.json"
    );

    const templateResponse = await axios.get(
      "https://moonpig.github.io/tech-test-node-backend/templates.json"
    );

    if (fullCardResponse.status !== 200 || templateResponse.status !== 200) {
      res.sendStatus(500);
    }
    const fullCards: FullCard[] = fullCardResponse.data;
    const templates: ImageTemplates[] = templateResponse.data;

    const condensedCards: Card[] = fullCards.map((card) => {
      const imageUrl: string = templates.find(
        (template) => template.id === card.pages[0].templateId
      ).imageUrl;
      return {
        title: card.title,
        imageUrl: imageUrl,
        url: `/cards/${card.id}`,
      };
    });

    return res.status(200).json({ cards: condensedCards });
  } catch (error) {
    res.sendStatus(error?.status || 500);
  }
});

app.get("/cards/:cardId/:sizeId?", () => {
  // respond with card by id
});
