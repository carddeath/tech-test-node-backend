import * as request from "supertest";
import { app } from "../server";

describe("Tests for card specifics", () => {
  test("Returns matching card title", async () => {
    const response = await request(app).get("/cards/card001/gt");

    expect(response.status).toBe(200);
    expect(response.body.pricedCard).toEqual(
      expect.objectContaining({
        title: "card 1 title",
      })
    );
  });

  test("Returns a price of £2.80 for a large card", async () => {
    const response = await request(app).get("/cards/card001/lg");

    expect(response.status).toBe(200);
    expect(response.body.pricedCard).toEqual(
      expect.objectContaining({
        price: "£2.80",
      })
    );
  });
});

describe("Tests for getting a list of cards", () => {
  test("returns 3 condensed cards in an array", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    expect(response.body.cards).toHaveLength(3);
  });

  test("A card with a front cover of template001 should have front-cover-portrait-1", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    expect(response.body.cards[0].imageUrl).toBe("/front-cover-portrait-1.jpg");
  });
});
