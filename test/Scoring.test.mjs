import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ScoringSystem } from "../src/ScoringSystem.mjs";
import { TestingTetromino } from "../src/TestingTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("The scoring system", () => {
  let scoring;
  beforeEach(() => {
    scoring = new ScoringSystem();
  });

  test("starts with score 0", () => {
    expect(scoring.score).to.equal(0);
  });

  test("starts with level 1", () => {
    expect(scoring.level).to.equal(1);
  });

  test("awards 40 pts for the 1st line cleared", () => {
    scoring.linesCleared(1);
    expect(scoring.score).to.equal(40);
  });

  test("awards 100 pts when 2 lines are cleared in the beginning", () => {
    scoring.linesCleared(2);
    expect(scoring.score).to.equal(100);
  });

  test("awards 300 pts when 3 lines are cleared in the beginning", () => {
    scoring.linesCleared(3);
    expect(scoring.score).to.equal(300);
  });

  test("awards 1200 pts when 4 lines are cleared in the beginning", () => {
    scoring.linesCleared(4);
    expect(scoring.score).to.equal(1200);
  });

  test("advances to level 2 after 10 cleared lines", () => {
    for (let i = 0; i < 10; ++i) {
      scoring.linesCleared(1);
    }
    expect(scoring.level).to.equal(2);
  });

  test("advances to level 3 after 20 cleared lines", () => {
    for (let i = 0; i < 20; ++i) {
      scoring.linesCleared(1);
    }
    expect(scoring.level).to.equal(3);
  });

  test("awards 80 pts for 1 line cleared on level 2", () => {
    for (let i = 0; i < 10; ++i) {
      scoring.linesCleared(1);
    }
    const scoreBefore = scoring.score;
    scoring.linesCleared(1);
    expect(scoring.score - scoreBefore).to.equal(80);
  });

  test("awards 200 pts for 2 lines cleared on level 2", () => {
    for (let i = 0; i < 10; ++i) {
      scoring.linesCleared(1);
    }
    const scoreBefore = scoring.score;
    scoring.linesCleared(2);
    expect(scoring.score - scoreBefore).to.equal(200);
  });

  test("awards 600 pts for 3 lines cleared on level 2", () => {
    for (let i = 0; i < 10; ++i) {
      scoring.linesCleared(1);
    }
    const scoreBefore = scoring.score;
    scoring.linesCleared(3);
    expect(scoring.score - scoreBefore).to.equal(600);
  });

  test("awards 2400 pts for 4 lines cleared on level 2", () => {
    for (let i = 0; i < 10; ++i) {
      scoring.linesCleared(1);
    }
    const scoreBefore = scoring.score;
    scoring.linesCleared(4);
    expect(scoring.score - scoreBefore).to.equal(2400);
  });
});

describe("The board", () => {
  test("sends out a notification when a line is cleared", () => {
    const board = new Board(3, 6);

    let calls = 0;
    board.onClearLine = () => ++calls;

    board.drop(TestingTetromino.T_SHAPE);
    fallToBottom(board);

    expect(calls).to.equal(1);
  });

  test("sends out a notification containing the cleared line count when lines are cleared", () => {
    const board = new Board(2, 6);

    let calledWithArg = null;
    board.onClearLine = (lineCount) => calledWithArg = lineCount;

    board.drop(TestingTetromino.O_SHAPE);
    fallToBottom(board);

    expect(calledWithArg).to.equal(2);
  });

  test("does not send out a notification when no lines are cleared", () => {
    const board = new Board(10, 6);

    let calls = 0;
    board.onClearLine = () => ++calls;

    board.drop(TestingTetromino.T_SHAPE);
    fallToBottom(board);

    expect(calls).to.equal(0);
  })
});
