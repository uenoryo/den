import Player from './Player'
import DeckData from '../data/DeckData'
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

  constructor (public Deck: DeckData) {
    this.Phase = Phase.Normal
    this.FieldCardOwnerID = null
    this.Field = new FieldData([])
    this.TurnTable = Config.TurnTable
    this.ForceDrawAmount = 0

    // [ハードコード] 順番を決められるようにする #3
    this.TurnPlayerID = 1
  }

  draw(): CardData | null {
    if (this.Deck.CardAmount === 0) {
      return null
    }
    return this.Deck.turn()
  }

  shuffle(): void {
    for (let i = this.Deck.CardAmount - 1; i > 0; i--) {
      let r:number = Math.floor(Math.random() * (i + 1))
      let tmp:CardData = this.Deck.Cards[i]
      this.Deck.Cards[i] = this.Deck.Cards[r]
      this.Deck.Cards[r] = tmp;
    }
  }

  deal(player: Player): CardData {
    let card = this.draw()
    if (card === null) {
      throw new Error('Dealer tried draw card to deal from empty deck.')
    }
    player.receive(card)
    // this.field.denable = false
    return card
  }

  forceDeal(player: Player): CardData {
    if (this.ForceDrawAmount !== 0) {
      this.ForceDrawAmount--
    }
    return this.deal(player)
  }

  receive(card: CardData, id: PlayerID): void {
    // this.field.denable = true
    this.Field.Cards.push(card)
    this.Field.PutPlayerID = id
  }

  put(): void {
    let card = this.draw()
    if (card === null) {
      throw new Error('Dealer tried draw card to put from empty deck.')
    }
    this.Field.Cards.push()
    // this.field.denable = true
  }

  fieldCard(): CardData | null {
    // TODO: Amountを生やしてinterface化する
    if (this.Field.Cards.length === 0) {
      return null
    }
    // TODO: わかりにくい
    return this.Field.Cards[this.Field.Cards.length - 1]
  }

  maintenance(): void {
    // TODO: 変えたマークを元に戻す
    // カードのIDの仕組みから変えないとだめそう

    // 1枚だけフィールドに残し、その他をデッキに加える
    while (this.Field.Cards.length > 1) {
      let card = this.Field.Cards.shift()
      if (card === undefined) {
        throw new Error('Empty card will push to deck.')
      }
      this.Deck.Cards.push(card)
    }
  }

  judgeDen(player: Player): GameSetType | null {
    let field = this.fieldCard()
    if (field === null) {
      return null
    }
    if (
      player.handPairCount() >= 3 &&
      field.Num === player.lonelyHandNumForChitoi()
    ) {
      return GameSetType.Chitoi
    }
    if (field.Num === player.handCardNumTotal()) {
      return GameSetType.Den
    }
    if (player.handNumAmount(field.Num) === 3) {
      return GameSetType.Anko
    }
    return null
  }

  shouldMaintenance(): boolean {
    return this.Deck.CardAmount <= Constants.DeckMaintenanceRemainingAmount
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

  playerIsTurnPlayer(id: PlayerID): boolean {
    return id === this.TurnPlayerID
  }

  reverseTurnTable(): void {
    this.TurnTable.reverse()
  }

  increaseForceDrawAmount(amount: number): void {
     this.ForceDrawAmount += amount
  }
}
