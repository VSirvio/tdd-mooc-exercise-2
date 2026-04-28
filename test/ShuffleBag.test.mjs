import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs"

describe("Shuffle bag", () => {
  test("pulls out the one value when the bag has only one value", () => {
    const shuffleBag = new ShuffleBag([473]);
    expect(shuffleBag.next()).to.equal(473);
  });

  test("pulls out the values that it has been initialized with", () => {
    const values = [15, 993, 6];
    const shuffleBag = new ShuffleBag(values);
    const pulledOut = [];
    for (let i = 0; i < values.length; ++i) {
      pulledOut.push(shuffleBag.next());
    }
    expect(pulledOut).to.have.members(values);
  });

  test("pulls out its values again when already pulled out once", () => {
    const values = [1221, 72, 0];
    const shuffleBag = new ShuffleBag(values);
    for (let j = 0; j < 2; ++j) {
      const pulledOut = [];
      for (let i = 0; i < values.length; ++i) {
        pulledOut.push(shuffleBag.next());
      }
      expect(pulledOut).to.have.members(values);
    }
  });

  test("pulls out its values in random order", () => {
    const values = [1, 5432, 88];
    const shuffleBag = new ShuffleBag(values);
    shuffleBag.getRandomNumber = () => 0.19;
    const pulledOut = [];
    for (let i = 0; i < values.length; ++i) {
      pulledOut.push(shuffleBag.next());
    }
    expect(pulledOut).to.not.have.ordered.members(values);
  });
});
