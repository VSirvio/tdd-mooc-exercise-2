import { describe, test } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag.mjs"

describe("Shuffle bag", () => {
  test("pulls out the one value when the bag has only one value", () => {
    const shuffleBag = new ShuffleBag();
    shuffleBag.next();
  });
});
