<template>
  <div class='gameContainer' id='View'>
    <div class='game'>
      <!-- image preloading space -->
      <div id='ImagePreload'>
        <div v-for="n in 54" :class='["CardDisplay__ID" + (n-1)]' />
      </div>

      <div class='denActionArea' @click='den(Config.MainPlayerID())'></div>
      <div id="GameMainView">
        <div v-if='Phase === GamePhase.Prepare' id="GameStartView">
          <div class='modal modal--hard open'>
            <div class='modal__inner modal__inner--full'>
              <div class='modal__body'>
                <div class='StartView'>
                  <h3>Round {{ ScoreKeeper.NextRound }}</h3>
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
                        <div class='ScoreList__item' :class='{"red": s.p1ScoreCache < 0 }'>{{ s.p1ScoreCache }}</div>
                        <div class='ScoreList__item' :class='{"red": s.p2ScoreCache < 0 }'>{{ s.p2ScoreCache }}</div>
                        <div class='ScoreList__item' :class='{"red": s.p3ScoreCache < 0 }'>{{ s.p3ScoreCache }}</div>
                        <div class='ScoreList__item' :class='{"red": s.p4ScoreCache < 0 }'>{{ s.p4ScoreCache }}</div>
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
          <div class='modal modal--hard open'>
            <div class='modal__inner modal__inner--full'>
              <div class='modal__body'>
                <div class='FinishView'>
                  <h3>You {{ ScoreKeeper.LatestWinnerID === Config.MainPlayerID() ? 'WIN' : 'LOSE' }}</h3>
                  <div class='FinishView__Body'>
                    <div class='FinishView__Result__Head'>
                      <h4>
                        {{ ScoreKeeper.LatestScoreData.JokerBuffString }} {{ ScoreKeeper.LatestScoreData.GameSetTypeString }}
                        <span class='FinishView__Result__LevelText'>Lv{{ ScoreKeeper.LatestScoreData.Level }}</span>
                      </h4>
                    </div>
                    <div class='FinishView__Result__Body'>
                      <div class='FinishView__Result__Main'>
                        <table>
                          <tr>
                            <th>{{ ScoreKeeper.LatestScoreData.GameSetTypeString }}</th>
                            <td>{{ ScoreKeeper.LatestScoreData.RoleScore }}</td>
                          </tr>
                          <tr></tr>
                        </table>
                        <table v-if='ScoreKeeper.LatestWinnerID === Config.MainPlayerID()'>
                          <tr>
                            <th>あなたの手札コスト</th>
                            <td>{{ ScoreKeeper.LatestScoreData.getHandCost(1) }}</td>
                          </tr>
                          <tr>
                            <th>COM1の手札コスト</th>
                            <td>{{ ScoreKeeper.LatestScoreData.getHandCost(2) }}</td>
                          </tr>
                          <tr>
                            <th>COM2の手札コスト</th>
                            <td>{{ ScoreKeeper.LatestScoreData.getHandCost(3) }}</td>
                          </tr>
                          <tr>
                            <th>COM3の手札コスト</th>
                            <td>{{ ScoreKeeper.LatestScoreData.getHandCost(4) }}</td>
                          </tr>
                          <tr v-if='ScoreKeeper.LatestScoreData.IsJokerBuffGood'>
                            <th>成金</th>
                            <td>{{ ScoreKeeper.LatestScoreData.TotalJokerBuffBonus }}</td>
                          </tr>
                          <tr v-if='ScoreKeeper.LatestScoreData.IsJokerBuffAwesome'>
                            <th>一攫千金</th>
                            <td>{{ ScoreKeeper.LatestScoreData.TotalJokerBuffBonus }}</td>
                          </tr>
                        </table>
                        <table v-else>
                          <tr>
                            <th>手札コスト</th>
                            <td>{{ ScoreKeeper.LatestScoreData.getMergedHandCost(Config.MainPlayerID()) }}</td>
                          </tr>
                          <tr v-if='ScoreKeeper.LatestScoreData.IsJokerBuffGood'>
                            <th>成金</th>
                            <td>{{ ScoreKeeper.LatestScoreData.TotalJokerBuffBonus }}</td>
                          </tr>
                          <tr v-if='ScoreKeeper.LatestScoreData.IsJokerBuffAwesome'>
                            <th>一攫千金</th>
                            <td>{{ ScoreKeeper.LatestScoreData.TotalJokerBuffBonus }}</td>
                          </tr>
                        </table>
                      </div>
                      <div class='FinishView__Result__Sub'>
                        <table>
                          <tr>
                            <th>合計</th>
                            <td>{{ ScoreKeeper.LatestScoreData.getScore(Config.MainPlayerID()) }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class='FinishView__BtnList'>
                    <div @click='gameReload()' class='StartView__Btn btn'>次へ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if='Phase === GamePhase.End' id="GameEndView">
          <div class='modal modal--hard open'>
            <div class='modal__inner modal__inner--full'>
              <div class='modal__body'>
                <div class='EndView'>
                  <h3>結果</h3>
                  <div class='EndView__Body'>
                    <table>
                      <tr v-for='(s, idx) in ScoreKeeper.getScore(Constants.RoundNumPerGame)'>
                        <td class='ScoreRecord__item'>Round {{ idx + 1 }}</td>
                        <td class='ScoreRecord__item'>{{ s.JokerBuffStringCache }} {{ s.GameSetTypeStringCache }}</td>
                        <td class='ScoreRecord__item'>{{ s.p1ScoreCache }}</td>
                      </tr>
                    </table>
                    <div class='EndView__Sum'>
                      <div>合計</div>
                      <div>{{ ScoreKeeper.sumScore(ScoreKeeper.getScore(Constants.RoundNumPerGame), 1) }}</div>
                    </div>
                    <div class='EndView__Score'>
                      <div>所持金</div>
                      <div>{{ User.MoneyString }}</div>
                    </div>
                  </div>
                  <div class='EndView__BtnList'>
                    <div @click='gamePrepare(true)' class='EndView__Btn btn'>次へ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              :class='[
                "CardDisplay__ID" + card.DisplayID,
                "Card__ID" + card.ID,
                {"Card--horizontal":player.Data.ID % 2 === 0}
              ]'></div>
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
import GodService from '../in_service/GodService'
import DealerService from '../in_service/DealerService'
import RefereeService from '../in_service/RefereeService'
import ComputerService from '../in_service/ComputerService'
import AnimationService from '../in_service/AnimationService'
import DebugService from '../in_service/DebugService'
import APIClientService from '../service/APIClientService'
import { Constants } from '../constant/Basic'
import { ReplyAction, GamePhase } from '../type/Type'
import Config from '../config/Config'
import Storage from '../storage/LocalStorage'
import User from '../data/UserData'

export default {
  name: 'Den',
  mixins: [
    GodService,
    DealerService,
    RefereeService,
    ComputerService,
    AnimationService,
    DebugService,
    APIClientService,
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
      SessionID: null,
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

      this.Storage = new Storage

      this.ReplyAction = ReplyAction

      this.GamePhase = GamePhase

      this.Phase = GamePhase.Prepare

      this.God = this.godBirth()

      this.Players = this.godCreatePlayers()

      this.Dealer = this.godCreateDealer()

      this.Referee = this.godCreateReferee()

      this.ScoreKeeper = this.godCreateScoreKeeper()

      this.User = new User

      this.Token = this.Storage.getToken()

      this.apiClientPostLogin({'token': this.Token}, this.User)
    },

    setup() {
      this.ScoreKeeper.fetch()

      this.dealerChangeTurnPlayer()

      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()

      this.dealerTriggerCardSkillAtFirst()

      this.computerStandby()
    },

    put(id, handIdx) {
      if (!this.isGameMain()) {
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
      if (!this.isGameMain()) {
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
      if (!this.isGameMain()) {
        return
      }

      this.refereeJudgeDen(this.Players.get(id))
    },

    gameSet() {
      this.IsGameSet = true

      this.computerStopPutTimer()

      this.computerStopDenTimer()

      this.Phase = GamePhase.Result
    },

    isGameMain() {
      return !this.isGameSet() && this.Phase === GamePhase.Main
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
      this.IsGameSet = false
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

      if (this.ScoreKeeper.ScoreNum >= Constants.RoundNumPerGame) {
        this.Phase = GamePhase.End
        let money = this.ScoreKeeper.sumScore(this.ScoreKeeper.getScore(Constants.RoundNumPerGame), 1)
        this.User.Money += money
        this.apiClientPostGameFinish({'session_id': this.SessionID, 'money': String(money)}, this.User)
      } else {
        this.Phase = GamePhase.Prepare
      }
    },
  }
}
</script>
