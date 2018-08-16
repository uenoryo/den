<template>
  <div class='gameContainer' id='View'>
    <div class='ads'>
      ads
    </div>
    <div class='game'>
      <div class='denActionArea' @click='den(Config.MainPlayerID())'></div>

      <div v-if='Phase === GamePhase.Start' id="GameStartView">
        <div class='modal open'>
          <div class='modal__inner modal__inner--full'>
            <div class='modal__body'>
              <div class='StartView'>
                <h3>DEN</h3>
                <div class='StartView__BtnList'>
                  <div @click='gamePrepare(true)' class='StartView__Btn btn'>はじめから</div>
                  <div @click='gamePrepare(false)' class='StartView__Btn btn'>つづきから</div>
                  <div @click='howTo()' class='StartView__Btn btn'>あそびかた</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if='Phase === GamePhase.Prepare' id="GameStartView">
        <div class='modal open'>
          <div class='modal__inner modal__inner--full'>
            <div class='modal__body'>
              <div class='StartView'>
                <h3>Round {{ ScoreKeeper.Data.length + 1 }}</h3>
                <div class='StartView__Body'>
                  <table>
                    <tr>
                      <td>YOU</td>
                      <td>COM1</td>
                      <td>COM2</td>
                      <td>COM3</td>
                    </tr>
                    <tr class='blue'>
                      <td :class='{"red": ScoreKeeper.aggregate(1) < 0 }'>{{ ScoreKeeper.aggregate(1) }}</td>
                      <td :class='{"red": ScoreKeeper.aggregate(2) < 0 }'>{{ ScoreKeeper.aggregate(2) }}</td>
                      <td :class='{"red": ScoreKeeper.aggregate(3) < 0 }'>{{ ScoreKeeper.aggregate(3) }}</td>
                      <td :class='{"red": ScoreKeeper.aggregate(4) < 0 }'>{{ ScoreKeeper.aggregate(4) }}</td>
                    </tr>
                  </table>
                </div>
                <hr>
                <div class='ScoreList'>
                  <div v-for='(s, idx) in ScoreKeeper.DataReversed'>
                    <h4>Round {{ ScoreKeeper.Data.length - idx }}</h4>
                    <div class='ScoreList__list blue'>
                      <div class='ScoreList__item' :class='{"red": s.p1Score < 0 }'>{{ s.p1Score }}</div>
                      <div class='ScoreList__item' :class='{"red": s.p2Score < 0 }'>{{ s.p2Score }}</div>
                      <div class='ScoreList__item' :class='{"red": s.p3Score < 0 }'>{{ s.p3Score }}</div>
                      <div class='ScoreList__item' :class='{"red": s.p4Score < 0 }'>{{ s.p4Score }}</div>
                    </div>
                  </div>
                </div>
                <div class='StartView__BtnList'>
                  <div @click='gameStart()' class='StartView__Btn btn'>スタート</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if='Phase === GamePhase.Result' id="GameStartView">
        <div class='modal open'>
          <div class='modal__inner modal__inner--full'>
            <div class='modal__body'>
              <div class='StartView'>
                <h3>Round</h3>
                <div class='StartView__BtnList'>
                  <div @click='gameReload()' class='StartView__Btn btn'>次へ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else id="GameMainView">
        <div
          v-for='player of Players.all()'
          class='PlayerCardArea'
          :id='["PlayerHand__" + player.Data.ID]'
          :class='["PlayerCardArea__ID" + player.Data.ID]'>
          <div
            v-for='card, handIdx in player.Hand.Cards'
            @click='put(player.Data.ID, handIdx)'
            :class='{"Sleeve--disabled":isTurnPlayer(player.Data.ID) && turnPlayer().isHuman() && !dealerCanPut(card)}'
            class='Sleeve'>
            <div
              v-if='Config.IsDebug() || player.isHuman() || player.handIsReversed()'
              class='Card'
              :id='["Card__ID" + card.ID]'
              :class='["CardDisplay__ID" + card.DisplayID, "Card__ID" + card.ID]'></div>
            <div
              v-else
              class='Card Card--reversed'
              :id='["Card__ID" + card.ID]'
              :class='["CardDisplay__ID" + card.DisplayID, "Card__ID" + card.ID]'></div>
          </div>
          <div
            class='modal'
            :class='{open:Dealer.Phase.IsAttach && isTurnPlayer(player.Data.ID) && turnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>追加でカードを出すことができます</div>
              <div class='modal__foot btn' @click='reply(player.Data.ID, ReplyAction.Attach.Pass)'>パス</div>
            </div>
          </div>
          <div
            class='modal'
            :class='{open:Dealer.Phase.IsForceDraw && isTurnPlayer(player.Data.ID) && turnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>2を出すか{{ Dealer.forceDrawAmount }}枚引いてください</div>
              <div class='modal__foot btn' @click='reply(player.Data.ID, ReplyAction.ForceDraw.Draw)'>ドロー</div>
            </div>
          </div>
          <div
            class='modal modal--hard'
            :class='{open:Dealer.Phase.IsChangeMark && isTurnPlayer(player.Data.ID) && turnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>変更するマークを選んでください</div>
              <div class='modal__marks'>
                <div @click='reply(player.Data.ID, ReplyAction.ChangeMark.Club)' class='markItem CardDisplay__ID28'></div>
                <div @click='reply(player.Data.ID, ReplyAction.ChangeMark.Diamond)' class='markItem CardDisplay__ID29'></div>
                <div @click='reply(player.Data.ID, ReplyAction.ChangeMark.Heart)' class='markItem CardDisplay__ID30'></div>
                <div @click='reply(player.Data.ID, ReplyAction.ChangeMark.Spade)' class='markItem CardDisplay__ID31'></div>
                <div @click='reply(player.Data.ID, ReplyAction.ChangeMark.Joker)' class='markItem CardDisplay__ID52'></div>
              </div>
            </div>
          </div>
        </div>
        <div class='field' @click='den(config.MainPlayerID)'>
          <div class='Sleeve'>
            <div v-if='Dealer.Field.top() !== null'>
              <div v-for='card in Dealer.Field.Cards'
                class='Card'
                :style='card.CSS'
                :class='["CardDisplay__ID" + card.DisplayID, "Card__ID" + card.ID]'
                :id='["Card__ID" + card.ID]'>
              </div>
            </div>
          </div>
        </div>
        <div class='deck'>
          <div class='Sleeve'>
            <div
              v-if='turnPlayer().isHuman()'
              @click='draw()'
              class='Card Card--reversed'
            ></div>
            <div
              v-else
              class='Card Card--reversed'
            ></div>
          </div>
          <div id='AnimationCardReversed' class='Sleeve'>
            <div class='Card Card--reversed'></div>
          </div>
        </div>
      </div>
    </div>
    <div class='gameBottomSpace'></div>
  </div>
</template>

<script>
import GodService from './GodService'
import DealerService from './DealerService'
import RefereeService from './RefereeService'
import ComputerService from './ComputerService'
import AnimationService from './AnimationService'
import DebugService from './DebugService'
import { Constants } from '../constant/Basic'
import { ReplyAction, GamePhase } from '../type/Type'
import Config from '../config/Config'
import LocalStorage from '../storage/LocalStorage'

export default {
  name: 'Den',
  mixins: [
    GodService,
    DealerService,
    RefereeService,
    ComputerService,
    AnimationService,
    DebugService,
  ],
  data() {
    return {
      Constants: null,
      God: null,
      Players: null,
      Dealer: null,
      Referee: null,
      ScoreKeeper: null,
      Config: null,
      ReplyAction: null,
      IsGameSet: false,
      Phase: null,
    }
  },

  beforeMount() {
    this.create()

    if (this.Config.IsDebug()) {
      this.debugSetup()
    } else {
      this.setup()
    }
  },

  methods: {
    create() {
      this.Constants = Constants

      this.Config = Config.app()

      this.ReplyAction = ReplyAction

      this.GamePhase = GamePhase

      this.Phase = GamePhase.Start

      this.God = this.godBirth()

      this.Players = this.godCreatePlayers()

      this.Dealer = this.godCreateDealer()

      this.Referee = this.godCreateReferee()

      this.ScoreKeeper = this.godCreateScoreKeeper()
    },

    setup() {
      this.ScoreKeeper.fetch()

      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()

      this.dealerTriggerCardSkillAtFirst()

      this.computerStandby()
    },

    put(id, handIdx) {
      if (this.isGameSet()) {
        return
      }

      if (!this.isTurnPlayer(id)) {
        return
      }

      if (!this.dealerCanReceiveCard(this.Players.get(id).show(handIdx))) {
        this.dealerRejectReceivingCard()
        return
      }

      this.computerResetPutTimer(this.autoPutAction)

      this.dealerReceiveCard(this.Players.get(id).pick(handIdx), id)

      this.computerLookField()

      this.computerLookSelfHand()

      this.refereeJudgePlainDone(this.Players.get(id))

      this.dealerTriggerCardSkill()
    },

    draw() {
      if (this.isGameSet()) {
        return
      }

      this.dealerDeal(this.turnPlayer())

      this.dealerGoNextTurn()

      this.computerResetPutTimer(this.autoPutAction)
    },

    reply(id, type, param) {
      this.dealerListenReply(this.Players.get(id), type, param)

      this.computerResetPutTimer(this.autoPutAction)
    },

    den(id) {
      this.refereeJudgeDen(this.Players.get(id))
    },

    gameSet() {
      this.IsGameSet = true

      this.computerStopPutTimer()

      this.computerStopDenTimer()
    },

    isGameSet() {
      return this.IsGameSet
    },

    turnPlayerID() {
      return this.Dealer.TurnPlayerID
    },

    turnPlayer() {
      return this.Players.get(this.turnPlayerID())
    },

    isTurnPlayer(playerID) {
      return this.Dealer.playerIsTurnPlayer(playerID)
    },

    gameStart() {
      this.Phase = GamePhase.Main
    },

    gamePrepare(reset) {
      if (reset) {
        this.ScoreKeeper.clear()
      }
      this.Phase = GamePhase.Prepare
    },

    gameReload() {
      this.dealerResotre()
      this.setup()
      this.Phase = GamePhase.Prepare
    },

    howTo() {
      alert('手札がなくなるかDENしたら勝ち')
    },
  }
}
</script>
