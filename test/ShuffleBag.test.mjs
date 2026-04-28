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
});
