import * as express from "express";
import axios from "axios";
import {
  Card,
  FullCard,
  ImageTemplates,
  PricedCard,
  PricedCardPage,
} from "./models/cardTypes";

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
      const imageUrl: string = findImageTemplate(
        templates,
        card.pages[0].templateId
      ).imageUrl;
      return {
        title: card.title,
        imageUrl: imageUrl,
        url: `/cards/${card.id}`,
      };
    });

    return res.status(200).send({ cards: condensedCards });
  } catch (error) {
    res.sendStatus(error?.status || 500);
  }
});

app.get("/cards/:cardId/:sizeId?", async (req, res) => {
  try {
    const { cardId, sizeId } = req.params;

    const prices = await axios.get(
      "https://moonpig.github.io/tech-test-node-backend/sizes.json"
    );
    const fullCardResponse = await axios.get(
      "https://moonpig.github.io/tech-test-node-backend/cards.json"
    );
    const templateResponse = await axios.get(
      "https://moonpig.github.io/tech-test-node-backend/templates.json"
    );

    const selectedCard = fullCardResponse.data.find(
      (card) => card.id === cardId
    );

    const newPages: PricedCardPage[] = selectedCard.pages.map((page) => {
      const pageImage = findImageTemplate(
        templateResponse.data,
        page.templateId
      );
      return {
        title: page.title,
        width: pageImage.width,
        height: pageImage.height,
        imageUrl: pageImage.imageUrl,
      };
    });

    const availableSizes = prices.data.filter((price) => {
      return selectedCard.sizes.includes(price.id);
    });

    let pricedCard: PricedCard = {
      title: selectedCard.title,
      size: sizeId,
      availableSizes: availableSizes.map(({ priceMultiplier, ...sizes }) => {
        return sizes;
      }),
      imageUrl: newPages[0].imageUrl,
      price: `£${calculateCardPrice(prices.data, sizeId)}`,
      pages: newPages,
    };

    return res.status(200).json({ pricedCard: pricedCard });
  } catch (error) {
    console.log("Error: ", error);
    res.sendStatus(500);
  }
});

const findImageTemplate = (templates, queryTemplateId) => {
  return templates.find((template) => template.id === queryTemplateId);
};

const calculateCardPrice = (prices, sizeId): string => {
  if (!sizeId) return "2.00";

  const correctSize = prices?.find((price) => price.id === sizeId) ?? 1;
  return (2 * correctSize.priceMultiplier).toFixed(2);
};
