import { Tetromino } from "./Tetromino.mjs";

export default {
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
};
