<template>
  <div class='gameContainer' id='View'>
    <div class='game'>
      <!-- image preloading space -->
      <div id='ImagePreload'>
        <div v-for="n in 54" :class='["CardDisplay__ID" + (n-1)]' />
      </div>

      <!-- Background Image -->
      <div class='ingame__BackgroundFront ingame__BackgroundFront--large' id='spotlight'></div>
      <div class='ingame__BackgroundFront'></div>
      <div class='ingame__BackgroundBack'></div>

      <div class='denActionArea' @click='den(Config.MainPlayerID())'></div>

      <div id="GameMainView">

        <!-- Prepare -->
        <div v-if='Phase === GamePhase.Prepare' class='window window--fixed'>
          <h3 class='window__Title'>Round {{ ScoreKeeper.NextRound }}</h3>
          <div class='window__Body p-StartView'>
            <div class='p-StartView__Head'>
              <div class='p-StartView__Head__Item'>
                <h4>YOU</h4>
                <p :class='{"red": ScoreKeeper.aggregate(1) < 0 }'>{{ ScoreKeeper.aggregate(1) }}</p>
              </div>
              <div class='p-StartView__Head__Item' v-for='n in 3'>
                <h4>COM{{ n }}</h4>
                <p :class='{"red": ScoreKeeper.aggregate(n+1) < 0 }'>{{ ScoreKeeper.aggregate(n+1) }}</p>
              </div>
            </div>
            <div class='p-StartView__Body'>
              <div v-for='(s, idx) in ScoreKeeper.DataReversed' class='p-StartView__Body__Item'>
                <h4>Round {{ ScoreKeeper.Data.length - idx }}</h4>
                <div class='p-StartView__Body__Row blue'>
                  <div class='p-StartView__Body__Cell' :class='{"red": s.p1ScoreCache < 0 }'>{{ s.p1ScoreCache }}</div>
                  <div class='p-StartView__Body__Cell' :class='{"red": s.p2ScoreCache < 0 }'>{{ s.p2ScoreCache }}</div>
                  <div class='p-StartView__Body__Cell' :class='{"red": s.p3ScoreCache < 0 }'>{{ s.p3ScoreCache }}</div>
                  <div class='p-StartView__Body__Cell' :class='{"red": s.p4ScoreCache < 0 }'>{{ s.p4ScoreCache }}</div>
                </div>
              </div>
            </div>
            <div @click='gameStart()' class='btn btn--strong'>スタート</div>
          </div>
        </div>

        <!-- Result -->
        <div v-else-if='Phase === GamePhase.Result' class='window window--fixed'>
          <h3 class='window__Title'>
            You {{ ScoreKeeper.LatestWinnerID === Config.MainPlayerID() ? 'WIN' : 'LOSE' }}
          </h3>
          <div class='window__Body p-ResultView'>
            <div class='p-ResultView__Head'>
              {{ ScoreKeeper.LatestScoreData.JokerBuffString }} {{ ScoreKeeper.LatestScoreData.GameSetTypeString }}
              <span class='p-ResultView__Head__Leve'>Lv{{ ScoreKeeper.LatestScoreData.Level }}</span>
            </div>
            <div class='p-ResultView__Body'>
              <!-- 勝利時のスコア -->
              <div v-if='ScoreKeeper.LatestWinnerID === Config.MainPlayerID()'>
                <div class='p-ResultView__Item'>
                  <div class='p-ResultView__Left'>{{ ScoreKeeper.LatestScoreData.GameSetTypeString }}</div>
                  <div class='p-ResultView__Right blue'>{{ ScoreKeeper.LatestScoreData.RoleScore }}</div>
                </div>
                <div class='p-ResultView__Item'>
                  <div class='p-ResultView__Left'>あなたの手札コスト</div>
                  <div class='p-ResultView__Right blue'>{{ ScoreKeeper.LatestScoreData.getHandCost(1) }}</div>
                </div>
                <div class='p-ResultView__Item' v-for='n in 3'>
                  <div class='p-ResultView__Left'>COM{{ n+1 }}の手札コスト</div>
                  <div class='p-ResultView__Right blue'>{{ ScoreKeeper.LatestScoreData.getHandCost(n+1) }}</div>
                </div>
                <div class='p-ResultView__Item' v-if='ScoreKeeper.LatestScoreData.IsJokerBuffGood'>
                  <div class='p-ResultView__Left'>成金</div>
                  <div class='p-ResultView__Right blue'>{{ ScoreKeeper.LatestScoreData.TotalJokerBuffBonus }}</div>
                </div>
                <div class='p-ResultView__Item' v-if='ScoreKeeper.LatestScoreData.IsJokerBuffAwesome'>
                  <div class='p-ResultView__Left'>一攫千金</div>
                  <div class='p-ResultView__Right blue'>{{ ScoreKeeper.LatestScoreData.TotalJokerBuffBonus }}</div>
                </div>
              </div>

              <!-- 敗北時のスコア -->
              <div v-else>
                <div class='p-ResultView__Item'>
                  <div class='p-ResultView__Left'>{{ ScoreKeeper.LatestScoreData.GameSetTypeString }}</div>
                  <div class='p-ResultView__Right red'>-{{ ScoreKeeper.LatestScoreData.RoleScore }}</div>
                </div>
                <div class='p-ResultView__Item'>
                  <div class='p-ResultView__Left'>手札コスト</div>
                  <div class='p-ResultView__Right red'>
                    -{{ ScoreKeeper.LatestScoreData.getMergedHandCost(Config.MainPlayerID()) }}
                  </div>
                </div>
                <div class='p-ResultView__Item' v-if='ScoreKeeper.LatestScoreData.IsJokerBuffGood'>
                  <div class='p-ResultView__Left'>成金</div>
                  <div class='p-ResultView__Right red'>-{{ ScoreKeeper.LatestScoreData.TotalJokerBuffBonus }}</div>
                </div>
                <div class='p-ResultView__Item' v-if='ScoreKeeper.LatestScoreData.IsJokerBuffAwesome'>
                  <div class='p-ResultView__Left'>一攫千金</div>
                  <div class='p-ResultView__Right red'>-{{ ScoreKeeper.LatestScoreData.TotalJokerBuffBonus }}</div>
                </div>
              </div>

            </div>
            <div class='p-ResultView__Item p-ResultView__Item--large'>
              <div>合計</div>
              <div class='blue' :class='{"red": ScoreKeeper.LatestScoreData.getScore(Config.MainPlayerID()) < 0 }'>
                {{ ScoreKeeper.LatestScoreData.getScore(Config.MainPlayerID()) }}
              </div>
            </div>
            <div class='btnList'>
              <div @click='gameReload()' class='btn'>次へ</div>
              <div @click='gameClose()' class='btn'>ホーム</div>
            </div>
          </div>
        </div>

        <!-- End -->
        <div v-else-if='Phase === GamePhase.End' class='window window--fixed'>
          <h3 class='window__Title'>結果</h3>
          <div class='window__Body p-EndView'>
            <div class='p-EndView__List'>
              <div class='p-EndView__Row' v-for='(s, idx) in ScoreKeeper.getScore(Constants.RoundNumPerGame)'>
                <div class='p-EndView__Cell'>Round {{ idx + 1 }}</div>
                <div class='p-EndView__Cell--flex'>{{ s.JokerBuffStringCache }} {{ s.GameSetTypeStringCache }}</div>
                <div class='p-EndView__Cell blue' :class='{"red": s.p1ScoreCache < 0 }'>{{ s.p1ScoreCache }}</div>
              </div>
            </div>
            <div class='p-EndView__Row p-EndView__Row--large'>
              <div>合計</div>
              <div class='blue' :class='{"red": ScoreKeeper.sumScore(ScoreKeeper.getScore(Constants.RoundNumPerGame), 1) < 0 }'>
                {{ ScoreKeeper.sumScore(ScoreKeeper.getScore(Constants.RoundNumPerGame), 1) }}
              </div>
            </div>
            <div class='p-EndView__Row p-EndView__Row--large'>
              <div>所持金</div>
              <div class='blue' :class='{"red": User.Money < 0 }'>{{ User.MoneyString }}</div>
            </div>
          </div>
          <div @click='gameClose()' class='btn'>ホーム</div>
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
              :class='["CardDisplay__ID" + card.DisplayID, "Card__ID" + card.ID, {"Card--reversed--hard": IsHard }]'></div>
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
        <div
          class='modal modal--hard'
          :class='{open:Dealer.Phase.IsMaintenance}'>
          <div class='modal__inner'>
            <div class='modal__body'>デッキのカードがなくなったので<br>シャッフルします</div>
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
              :class='{"Card--reversed--hard": IsHard }'
            ></div>
            <div
              v-else
              class='Card Card--reversed'
              :class='{"Card--reversed--hard": IsHard }'
            ></div>
          </div>
          <div id='AnimationCardReversed' class='Sleeve'>
            <div class='Card Card--reversed' :class='{"Card--reversed--hard": IsHard }'></div>
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
import MasterdataService from '../out_service/MasterdataService'
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
    MasterdataService,
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
      Level: null,

      // 以下マスターデータ
      Businesses: null,
      UserRanks: null,
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

      this.SessionID = this.Storage.getSessionID()

      this.Level = this.$route.params.level

      this.IsHard = this.$route.params.is_hard

      this.apiClientPostUserInfo(this, {'session_id': this.SessionID})
    },

    setup() {
      this.ScoreKeeper.fetch()

      this.dealerSetup()

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

      if (this.Dealer.Phase.IsMaintenance) {
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

      if (this.Dealer.Phase.IsMaintenance) {
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

      this.userSendScore()

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
      this.setup()

      if (this.ScoreKeeper.ScoreNum >= Constants.RoundNumPerGame) {
        this.Phase = GamePhase.End
        let money = this.ScoreKeeper.sumScore(this.ScoreKeeper.getScore(Constants.RoundNumPerGame), 1)
        this.User.Money += money
        this.apiClientPostGameFinish({'session_id': this.SessionID, 'money': String(money)}, this.User)
        if (money > 0 && money > this.User.BestTotalScore) {
          console.log(this.SessionID)
          // 少し遅延させる (同時にリクエストするとエラーになる...)
          setTimeout(() => {
            this.apiClientPostRecord(this, {
              'session_id': this.SessionID,
              'best_score': '0',
              'best_total_score': String(money)
            })
          }, 1000)
          this.User.BestTotalScore = money
        }
      } else {
        this.Phase = GamePhase.Prepare
      }
    },

    gameClose() {
      if (this.ScoreKeeper.ScoreNum >= Constants.RoundNumPerGame) {
        this.ScoreKeeper.clear()
      }
      this.$router.push({ name: 'home' })
    },

    // userServiceに移す
    userSendScore() {
      if (this.ScoreKeeper.LatestScoreData.WinnerID === 1) {
        if (this.ScoreKeeper.LatestScoreData.p1ScoreCache > this.User.BestScore) {
          this.apiClientPostRecord(this, {
            'session_id': this.SessionID,
            'best_score': String(this.ScoreKeeper.LatestScoreData.p1ScoreCache),
            'best_total_score': '0'
          })
          this.User.BestScore = this.ScoreKeeper.LatestScoreData.p1ScoreCache
        }
      }
    },
  }
}
</script>
