import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { TestingTetromino } from "../src/TestingTetromino.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("A falling tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be rotated right", () => {
    board.drop(TestingTetromino.T_SHAPE);
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
    board.drop(TestingTetromino.T_SHAPE);
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
    board.drop(TestingTetromino.T_SHAPE);
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
    board.drop(TestingTetromino.T_SHAPE);
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

  test("is tried to be moved 1 unit to the right when rotating and there is no room to rotate (wall kick)", () => {
    board.drop(TestingTetromino.T_SHAPE);
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....T....
       ....TT....
       ....TT....
       ...TTT....`
    );
  });

  test("is tried to be moved 1 unit to the left when rotating and there is no room to rotate (wall kick)", () => {
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...T......
       ..TT......
       ...TOO....
       ....OO....`
    );
  });
});
