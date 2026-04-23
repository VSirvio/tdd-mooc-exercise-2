import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("A falling tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; ++i) {
      board.moveLeft();
    }

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("that is O shaped cannot be moved left beyond the board", () => {
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 5; ++i) {
      board.moveLeft();
    }

    expect(board.toString()).to.equalShape(
      `OO........
       OO........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can reach the bottom when there is already a block", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 3; ++i) {
      board.moveLeft();
    }
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; ++i) {
      board.tick();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T..T.....
       TTTTTT....`
    );
  });

  test("with O shape can fall on top of T shape diagonally", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 3; ++i) {
      board.tick();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....OO....
       ...TOO....
       ..TTT.....`
    );
  });

  test("cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 3; ++i) {
      board.tick();
    }
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....OO....
       ...TOO....
       ..TTT.....`
    );
  });

  test("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
