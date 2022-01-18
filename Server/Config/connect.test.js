import dotenv from "dotenv";
dotenv.config();

import mongoConnect from "./connect";

describe("given a connection with MongoDB", () => {
  const initialDBName = process.env.DB_NAME;

  test("then should exist our DB", async () => {
    const dbBeers = await mongoConnect();
    expect(dbBeers).toBeTruthy();
    expect(dbBeers.connections[0].name).toBe(initialDBName);
  });
});

describe("given a failed connection with MongoDB", () => {
  test("then should exit ", async () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const connect = await mongoConnect('dasodh');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
