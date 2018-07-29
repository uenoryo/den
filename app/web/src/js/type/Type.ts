// PlayerID
export type PlayerID = 1 | 2 | 3 | 4

// カードのマーク {0: Clover, 1: Diamond, 2: Heart, 3: Spade, 4: Joker1, 5: Joker2}
export type CardMark = 0 | 1 | 2| 3 | 4 | 5

// カードの数字 (0 は Joker)
export type CardNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

// PlayerType
export enum PlayerType {
  Computer,
  Human,
}

// Dealer のアクションフェーズ
export enum Phase {
  Normal,
  ForceDraw,
  Attach,
  ChangeMark,
}

// Player の行動タイプ
export enum ActionType {
  Draw,
  Put,
  ForceDraw,
}

// ゲーム終了タイプ
export enum GameSetType {
  PlainDone,
  Pank,
  Den,
  Anko,
  Chitoi,
}
