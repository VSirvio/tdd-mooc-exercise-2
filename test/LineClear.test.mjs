import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { TestingTetromino } from "../src/TestingTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; ++i) {
    board.tick();
  }
}

describe("The board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("clears the bottom row when it becomes full", () => {
    board.drop(TestingTetromino.T_SHAPE);
    fallToBottom(board);

    board.drop(TestingTetromino.T_SHAPE);
    for (let i = 0; i < 3; ++i) {
      board.moveLeft();
    }
    fallToBottom(board);

    board.drop(TestingTetromino.I_SHAPE);
    for (let i = 0; i < 4; ++i) {
      board.moveRight();
    }
    for (let i = 0; i < 4; ++i) {
      board.tick();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       .T..T.....`
    );
  });

  test("clears any row when it becomes full", () => {
    board.drop(TestingTetromino.I_SHAPE);
    board.moveRight();
    fallToBottom(board);

    board.drop(TestingTetromino.I_SHAPE);
    fallToBottom(board);

    board.drop(TestingTetromino.I_SHAPE);
    for (let i = 0; i < 4; ++i) {
      board.moveRight();
    }
    fallToBottom(board);

    board.drop(TestingTetromino.O_SHAPE);
    for (let i = 0; i < 4; ++i) {
      board.moveLeft();
    }
    for (let i = 0; i < 5; ++i) {
      board.tick();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       OO.IIII...`
    );
  });
});
