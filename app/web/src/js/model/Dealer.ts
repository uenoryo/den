import Deck from './Deck'
import CardData from '../data/CardData'
import FieldData from '../data/FieldData'
import { Config } from '../config/Config'
import { Constants } from '../constant/Basic'
import { PlayerID, Phase, GameSetType } from '../type/Type'

export default class Dealer {
  public Phase: Phase
  public FieldCardOwnerID: PlayerID | null
  public Field: FieldData
  public TurnTable: PlayerID[]
  public ForceDrawAmount: number
  public TurnPlayerID: PlayerID

  constructor (deck: Deck) {
    this.Phase = Phase.Normal
    this.FieldCardOwnerID = null
    this.Field = new FieldData([])
    this.TurnTable = Config.TurnTable
    this.ForceDrawAmount = 0

    // [ハードコード] 順番を決められるようにする #3
    this.TurnPlayerID = 1
  }

  draw(): CardData {
    if (this.deck.CardAmount === 0) {
      return
    }
    return this.deck.turn()
  }

  shuffle(): void {
    for (let i = this.Deck.CardAmount - 1; i > 0; i--) {
      let r:number = Math.floor(Math.random() * (i + 1))
      let tmp:CardData = this.Deck.Data.Cards[i]
      this.Deck.Data.Cards[i] = this.Deck.Data.Cards[r]
      this.Deck.Data.Cards[r] = tmp;
    }
  }

  deal(player): CardData {
    let card = this.draw()
    if (card === null) {
      return
    }
    player.receive(card)
    // this.field.denable = false
    return card
  }

  forceDeal(player): CardData {
    if (this.forceDrawAmount !== 0) {
      this.forceDrawAmount--
    }
    return this.deal(player)
  }

  receive(card: CardData, id: PlayerID): void {
    // this.field.denable = true
    this.Field.Cards.push(card)
    this.Field.PutPlayerID = id
  }

  put(): void {
    this.field.Cards.push(this.draw())
    // this.field.denable = true
  }

  fieldCard(): CardData | null {
    // TODO: Amountを生やしてinterface化する
    if (this.field.Cards.length === 0) {
      return null
    }
    // TODO: わかりにくい
    return this.field.Cards[this.field.Cards.length - 1]
  }

  maintenance(): void {
    // TODO: 変えたマークを元に戻す
    // カードのIDの仕組みから変えないとだめそう

    // 1枚だけフィールドに残し、その他をデッキに加える
    while (this.field.Cards.length > 1) {
      this.deck.data.Cards.push(this.field.Cards.shift())
    }
  }

  judgeDen(player): GameSetType | null {
    if (
      player.handPairCount() >= 3 &&
      this.fieldCard().Num === player.lonelyHandNumForChitoi()
    ) {
      return GameSetType.Chitoi
    }
    if (parseInt(this.fieldCard().Num) === player.handCardNumTotal()) {
      return GameSetType.Den
    }
    if (player.handNumAmount(this.fieldCard().Num) === 3) {
      return GameSetType.Anko
    }
    return null
  }

  shouldMaintenance(): bool {
    return this.deck.cardNum() <= Constants.DeckMaintenanceRemainingAmount
  }

  goNextTurn(): void {
    let turnIdx = this.TurnTable.indexOf(this.TurnPlayerID)
    if (turnIdx >= this.TurnTable.length-1) {
      turnIdx = 0
    } else {
      turnIdx++
    }
    this.TurnPlayerID = this.TurnTable[turnIdx]
  }

  playerIsTurnPlayer(id: PlayerID): bool {
    return id === this.TurnPlayerID
  }

  reverseTurnTable(): void {
    this.TurnTable.reverse()
  }

  increaseForceDrawAmount(amount: number): void {
     this.ForceDrawAmount += amount
  }
}
