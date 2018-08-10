// PlayerID
export type PlayerID = 1 | 2 | 3 | 4

// カードのマーク
export enum CardMark {
  Club,
  Diamond,
  Heart,
  Spade,
  JokerA,
  JokerB,
}

// カードの数字 (0 は Joker)
export type CardNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

// [手札操作のアクションID: 優先順位] のタプル
export type HandPriority = [number, number]

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

// Attacheアクションの返答タイプ
export enum ReplyActionAttach {
  AttachPass,
  ForceDrawDraw,
}

// ChangeMarkアクションの返答タイプ
export enum ReplyActionChangeMark {
  ChangeMarkClub,
  ChangeMarkDiamond,
  ChangeMarkHeart,
  ChangeMarkSpade,
  ChangeMarkJoker,
}

// ForceDrawアクションの返答タイプ
export enum ReplyActionForceDraw {
  Draw,
}

// Brain の入力内容タイプ
export enum BrainInputType {
  FieldCard,
  SelfHand,
  PutCard,
}

// Brain の出力内容タイプ
export enum BrainOutputType {
  PutOrDraw,
  PutOrForceDraw,
  ChangeMark,
  Den,
}

// ゲーム終了タイプ
export enum GameSetType {
  PlainDone,
  Pank,
  Den,
  Anko,
  Chitoi,
}

export type Style = {
  display: string,
}
