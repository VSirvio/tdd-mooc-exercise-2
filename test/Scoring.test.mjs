import { describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("The scoring system", () => {
  test("starts with score 0", () => {
    const scoring = new ScoringSystem();
    expect(scoring.score).to.equal(0);
  });
});
