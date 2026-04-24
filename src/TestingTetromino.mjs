import { Tetromino } from "./Tetromino.mjs";

export const TestingTetromino = {
  T_SHAPE: Tetromino.fromString(
    `.T. .T. ... .T.
     TTT .TT TTT TT.
     ... .T. .T. .T.`,
  ),
  I_SHAPE: Tetromino.fromString(
    `..... ..I..
     ..... ..I..
     IIII. ..I..
     ..... ..I..
     ..... .....`,
  ),
  O_SHAPE: Tetromino.fromString(
    `.OO
     .OO
     ...`,
  ),
};
