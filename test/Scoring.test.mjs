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
});
