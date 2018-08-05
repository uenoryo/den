import Player from './Player'
import DeckData from '../data/DeckData'
import CardData from '../data/CardData'
import FieldData from '../data/FieldData'
import Config from '../config/Config'
import { Constants } from '../constant/Basic'
import { PlayerID, Phase, GameSetType } from '../type/Type'

export default class Dealer {
  public Phase: Phase
  public FieldCardOwnerID: PlayerID | null
  public Field: FieldData

  private forceDrawAmount: number
  private turnPlayerID: PlayerID
  private turnTable: PlayerID[]

  constructor (public Deck: DeckData) {
    this.Phase = Phase.Normal
    this.FieldCardOwnerID = null
    this.Field = new FieldData([])
    this.turnTable = Config.app().TurnTable()
    this.forceDrawAmount = 0

    // [ハードコード] 順番を決められるようにする #3
    this.turnPlayerID = 1
  }

  get ForceDrawAmount(): number {
    return this.forceDrawAmount
  }

  get TurnPlayerID(): PlayerID {
    return this.turnPlayerID
  }

  get TurnTable(): PlayerID[] {
    return this.turnTable
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
    let card = this.draw()
    if (card === null) {
      throw new Error('Dealer tried draw card to put from empty deck.')
    }
    this.Field.Cards.push(card)
    // this.field.denable = true
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

  shouldMaintenance(): boolean {
    return this.Deck.CardAmount <= Constants.DeckMaintenanceRemainingAmount
  }

  judgeDen(player: Player): GameSetType | null {
    let field = this.Field.top()
    if (field === null) {
      return null
    }
    if (
      player.Hand.pairCount() >= 3 &&
      field.Num === player.Hand.lonelyNumForChitoi()
    ) {
      return GameSetType.Chitoi
    }
    if (field.Num === player.Hand.numTotal()) {
      return GameSetType.Den
    }
    if (player.Hand.numAmount(field.Num) === 3) {
      return GameSetType.Anko
    }
    return null
  }

  goNextTurn(): void {
    let turnIdx = this.TurnTable.indexOf(this.TurnPlayerID)
    if (turnIdx >= this.TurnTable.length-1) {
      turnIdx = 0
    } else {
      turnIdx++
    }
    this.turnPlayerID = this.TurnTable[turnIdx]
  }

  playerIsTurnPlayer(id: PlayerID): boolean {
    return id === this.TurnPlayerID
  }

  reverseTurnTable(): void {
    this.turnTable.reverse()
  }

  increaseForceDrawAmount(amount: number): void {
     this.forceDrawAmount += amount
  }
}
