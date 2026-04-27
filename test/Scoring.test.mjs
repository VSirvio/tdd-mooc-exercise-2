import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

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
});
