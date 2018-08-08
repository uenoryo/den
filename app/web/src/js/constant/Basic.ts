export namespace Constants {
  // デッキの枚数
  export const DeckLength = 54

  // ゲーム開始時の手札の枚数
  export const PlayerHandInitAmount = 7

  // 手札の最大枚数, これを超えた場合はPank
  export const PlayerHandMaxAmount = 13

  // デッキのメンテナンスが行われる残り枚数
  export const DeckMaintenanceRemainingAmount = 0

  // コンピュータがカードを出そうとする間隔 (ミリ秒)
  export const ComputerPutActionIntervalMs = 1000

  // コンピュータがDENをしようとする間隔 (ミリ秒)
  export const ComputerDenActionIntervalMs = 1000
}
