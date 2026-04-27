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

  test("can be moved left", () => {
    board.drop(TestingTetromino.T_SHAPE);
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
    board.drop(TestingTetromino.T_SHAPE);
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
    board.drop(TestingTetromino.O_SHAPE);
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
    board.drop(TestingTetromino.T_SHAPE);
    for (let i = 0; i < 3; ++i) {
      board.moveLeft();
    }
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(TestingTetromino.T_SHAPE);
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
    board.drop(TestingTetromino.T_SHAPE);
    board.moveLeft();
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(TestingTetromino.O_SHAPE);
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

  test("cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 5; ++i) {
      board.moveRight();
    }

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 3; ++i) {
      board.tick();
    }
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....OO....
       ....OOT...
       .....TTT..`
    );
  });

  test("can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved down beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 5; ++i) {
      board.moveDown();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("cannot be moved down through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; ++i) {
      board.moveDown();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ..TTTT....
       .TTT......`
    );
  });
});
