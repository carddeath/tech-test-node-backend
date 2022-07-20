import * as request from "supertest";
import { app } from "../server";

// test("returns matching card title", async () => {
//   const response = await request(app).get("/cards/card001");

//   expect(response.status).toBe(200);
//   expect(response.body).toEqual(
//     expect.objectContaining({
//       title: "card 1 title",
//     })
//   );
// });

describe("Tests for getting a list of cards", () => {
  test("returns 3 condensed cards in an array", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).cards).toHaveLength(3);
  });

  test("A card with a front cover of template001 should have front-cover-portrait-1", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).cards[0].imageUrl).toBe(
      "/front-cover-portrait-1.jpg"
    );
  });
});
