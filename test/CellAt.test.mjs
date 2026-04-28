import { describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { TestingTetromino } from "../src/TestingTetromino.mjs";

describe("The board", () => {
  test("returns correct contents for each cell", () => {
    const board = new Board(10, 6);
    board.drop(TestingTetromino.T_SHAPE);
    let cells = "";
    for (let y = 0; y < 6; ++y) {
        for (let x = 0; x < 10; ++x) {
            cells += board.cellAt(y, x);
        }
        cells += "\n";
    }
    expect(cells).to.equal(
        `....T.....
         ...TTT....
         ..........
         ..........
         ..........
         ..........
        `.replaceAll(" ", "")
    );
  });
});
