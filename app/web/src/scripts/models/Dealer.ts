declare function require(x: string): any;
const Constants = require('../constants')
const Config = require('../config')
const FieldData = require('../data/FieldData')

export default class Dealer {
  public deck: any
  public phase: number
  public fieldCardOwnerID: number
  public field: any
  public turnTable: number[]
  public forceDrawAmount: number
  public turn: number

  constructor (deck: any) {
    if (deck.constructor.name !== 'Deck') {
      throw new Error(`Invalid deck [${deck.constructor.name}]`)
    }
    this.deck = deck
    this.phase = Constants.DealerPhaseNormal
    this.fieldCardOwnerID = 0
    this.field = new FieldData([])
    this.turnTable = Config.Turn
    this.forceDrawAmount = 0

    // [ハードコード] 順番を決められるようにする #3
    this.turn = Constants.Player1ID
  }

  draw () {
    if (this.deck.cardNum() === 0) {
      return
    }
    return this.deck.turn()
  }

  shuffle () {
    for (let i = this.deck.data.Cards.length - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1))
      let tmp = this.deck.data.Cards[i];
      this.deck.data.Cards[i] = this.deck.data.Cards[r];
      this.deck.data.Cards[r] = tmp;
    }
  }

  deal (player: any) {
    let card = this.draw()
    if (card === null) {
      return
    }
    player.receive(card)
    this.field.denable = false
    return card
  }

  forceDeal (player: any) {
    this.deal(player)
    if (this.forceDrawAmount !== 0) {
      this.forceDrawAmount--
    }
  }

  receive (card: any, playerID: number) {
    if (playerID === undefined) {
      playerID = 0
    }

    this.field.denable = true
    this.field.Cards.push(card)
    this.field.putPlayerID(playerID)
  }

  put () {
    this.field.Cards.push(this.draw())
    this.field.denable = true
  }

  fieldCard () {
    if (this.field.Cards.length === 0) {
      return null
    }
    return this.field.Cards[this.field.Cards.length-1]
  }

  maintenance () {
    // TODO 変えたマークを元に戻す
    // カードのIDの仕組みから変えないとだめそう

    // 1枚だけフィールドに残し、その他をデッキに加える
    while (this.field.Cards.length > 1) {
      this.deck.data.Cards.push(this.field.Cards.shift())
    }
  }

  judgeDen (player: any) {
    if (
      player.handPairCount() >= 3 &&
      parseInt(this.fieldCard().Num) === parseInt(player.lonelyHandNumForChitoi())
    ) {
      return Constants.GameSetTypeChitoi
    }
    if (parseInt(this.fieldCard().Num) === player.handCardNumTotal()) {
      return Constants.GameSetTypeDen
    }
    if (player.handNumAmount(this.fieldCard().Num) === 3) {
      return Constants.GameSetTypeAnko
    }
    return null
  }

  shouldMaintenance () {
    return this.deck.cardNum() <= Constants.DeckShuffleRemainingAmount
  }

  goNextTurn () {
    let turnIdx = this.turnTable.indexOf(this.turn)
    if (turnIdx >= this.turnTable.length-1) {
      turnIdx = 0
    } else {
      turnIdx++
    }
    this.turn = this.turnTable[turnIdx]
  }

  playerIsTurnPlayer (id: number) {
    return id === this.turn
  }

  reverseTurnTable () {
    this.turnTable.reverse()
  }

  increaseForceDrawAmount (amount: number) {
     this.forceDrawAmount += amount
  }

  changePhase (phase: number) {
    this.phase = Constants.DealerPhaseNormal;
    if (
      phase === Constants.DealerPhaseForceDraw ||
      phase === Constants.DealerPhaseAttach ||
      phase === Constants.DealerPhaseChangeMark
    ) {
      this.phase = phase;
    }
  }
}
