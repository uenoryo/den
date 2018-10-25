import Player from './Player'
import Players from './Players'
import DeckData from '../data/DeckData'
import CardData from '../data/CardData'
import FieldData from '../data/FieldData'
import PhaseData from '../data/PhaseData'
import Config from '../config/Config'
import { Constants } from '../constant/Basic'
import { PlayerID, GameSetType, Phase } from '../type/Type'

export default class Dealer {
  public FieldCardOwnerID: PlayerID | null
  public Field: FieldData

  private forceDrawAmount: number
  private turnPlayerID: PlayerID
  private turnTable: PlayerID[]
  private phase: PhaseData

  constructor (public Deck: DeckData) {
    this.phase = new PhaseData
    this.FieldCardOwnerID = null
    this.Field = new FieldData([])
    this.turnTable = Config.app().TurnTable()
    this.forceDrawAmount = 0
    this.turnPlayerID = Constants.InitialStartTurnPlayerID
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

  get Phase(): PhaseData {
    return this.phase
  }

  setup(): void {
    //
  }

  draw(): CardData | null {
    if (this.Deck.CardAmount === 0) {
      return null
    }
    return this.Deck.turn()
  }

  changeTurnPlayer(playerID: PlayerID): void {
    this.turnPlayerID = playerID
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
    // 1枚だけフィールドに残し、その他をデッキに加える
    // WildCardによって変更されたマークを元に戻す
    while (this.Field.Cards.length > 1) {
      let card = this.Field.Cards.shift()
      if (card === undefined) {
        throw new Error('Empty card will push to deck.')
      }
      card.changeMark(card.InitailMark)
      this.Deck.Cards.push(card)
    }
  }

  restore(players: Players): void {
    while (this.Field.Cards.length > 0) {
      let card = this.Field.Cards.shift()
      if (card === undefined) {
        throw new Error('Empty card will push to deck.')
      }
      this.Deck.Cards.push(card)
    }
    for (let player of players.all()) {
      while (player.Hand.Cards.length > 0) {
        let card = player.Hand.Cards.shift()
        if (card === undefined) {
          throw new Error('Empty card will push to deck.')
        }
        this.Deck.Cards.push(card)
      }
    }
    for (let card of this.Deck.Cards) {
      card.changeMark(card.InitailMark)
    }
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
    this.turnPlayerID = this.TurnTable[turnIdx]
  }

  playerIsTurnPlayer(id: PlayerID): boolean {
    return id === this.TurnPlayerID
  }

  initTurnTable(): void {
    this.turnTable = Config.app().TurnTable()
  }

  reverseTurnTable(): void {
    this.turnTable.reverse()
  }

  increaseForceDrawAmount(amount: number): void {
     this.forceDrawAmount += amount
  }

  resetForceDrawAmount(): void {
    this.forceDrawAmount = 0
  }

  changePhase(phase: Phase): void {
    this.phase.Value = phase
  }

  initPhase(): void {
    this.phase.Value = Phase.Normal
  }
}
