import { PlayerID, GameSetType } from '../type/Type'
import Player from './Player'
import FieldData from '../data/FieldData'
import CardData from '../data/CardData'
import Rule from './Rule'

export default class Referee {
  public ActionIsPlanDone: boolean = false
  public ActionLaunchPlayerID: PlayerID | null = null

  judgePlainDone(player: Player): boolean {
    return player.hasNoCard()
  }

  judgePank(player: Player): boolean {
    return Rule.isPank(player.Hand)
  }

  judgeDen(player: Player, field: FieldData): GameSetType | null {
    let top = field.top()
    if (top === null || field.PutPlayerID === player.Data.ID) {
      return null
    }

    if (this.isChitoi(player, top)) {
      return GameSetType.Chitoi
    }

    if (this.isAnko(player, top)) {
      return GameSetType.Anko
    }

    if (this.isNormalDen(player, top)) {
      return GameSetType.Den
    }
    return null
  }

  judgeCounterDen(player: Player, field: FieldData): GameSetType | null {
    let top = field.top()
    if (top === null) {
      return null
    }

    if (this.ActionLaunchPlayerID === null) {
      return null
    }

    // PlainDoneへの返しではない限り、自身が出したカード以外には返せない
    if (this.ActionIsPlanDone === false && field.PutPlayerID !== player.Data.ID) {
      return null
    }

    if (this.isChitoi(player, top)) {
      return GameSetType.CounterChitoi
    }

    if (this.isAnko(player, top)) {
      return GameSetType.CounterAnko
    }

    if (this.isNormalDen(player, top)) {
      return GameSetType.CounterDen
    }
    return null
  }

  isNormalDen(player: Player, card: CardData): boolean {
    return card.Num === player.Hand.numTotal()
  }

  isAnko(player: Player, card: CardData): boolean {
    return player.Hand.numAmount(card.Num) === 3
  }

  isChitoi(player: Player, card: CardData): boolean {
    return player.Hand.pairCount() >= 3 && card.Num === player.Hand.lonelyNumForChitoi()
  }
}
