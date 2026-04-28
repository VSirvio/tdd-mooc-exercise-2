import { describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs"

describe("Shuffle bag", () => {
  test("pulls out the one value when the bag has only one value", () => {
    const shuffleBag = new ShuffleBag([473]);
    expect(shuffleBag.next()).to.equal(473);
  });
});
