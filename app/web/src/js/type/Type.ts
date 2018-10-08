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

// アクションの返答タイプ
export namespace ReplyAction {
  export enum Attach {
    Pass,
  }

  export enum ChangeMark {
    Club,
    Diamond,
    Heart,
    Spade,
    Joker,
  }

  export enum ForceDraw {
    Draw,
  }
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
  CounterDen,
  CounterAnko,
  CounterChitoi,
}

export enum JokerBuff {
  None,
  Good,
  Awesome,
}

// スタイルオブジェクト
export type Style = {
  display: string,
}

// ゲームフェイズ
export enum GamePhase {
  Start,
  Prepare,
  Main,
  Result,
}

// 言語
export enum Lang {
  JA,
  EN,
}

// 設定のキー
export enum PreferenceKey {
  LangIsEnglish,
}

// リクエストのステータス
export enum RequestStatusType {
  Initial,
  Waiting,
  Success,
  Fail,
  Timeout,
}
