import { GameSetType } from '../type/Type'
import Player from './Player'
import FieldData from '../data/FieldData'
import CardData from '../data/CardData'

export default class Referee {
  judgePlainDone(player: Player): boolean {
    return player.hasNoCard()
  }

  judgeDen(player: Player, field: FieldData): GameSetType | null {
    let top = field.top()
    if (top === null) {
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
