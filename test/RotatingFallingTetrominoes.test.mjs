import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("A falling tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be rotated right when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; ++i) {
        board.tick();
    }
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be rotated left when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; ++i) {
        board.tick();
    }
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });
});
