<template>
  <div class='gameContainer' id='View'>
    <div class='ads'>
      ads
    </div>
    <div class='game'>
      <div class='denActionArea' @click='den(Config.MainPlayerID())'></div>
      <div class='hands'>
        <div
          v-for='player of Players.all()'
          class='PlayerCardArea'
          :id='["PlayerHand__" + player.Data.ID]'
          :class='["PlayerCardArea__ID" + player.Data.ID]'>
          <div
            v-for='card, handIdx in player.Hand.Cards'
            @click='put(player.Data.ID, handIdx)'
            :class='{"Sleeve--disabled":dealerPlayerIsTurnPlayer(player.Data.ID) && dealerTurnPlayer().isHuman() && !dealerCanPut(card)}'
            class='Sleeve'>
            <div
              v-if='player.isHuman() || player.handIsReversed()'
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
            :class='{open:dealerIsAttachPhase() && dealerPlayerIsTurnPlayer(player.Data.ID) && dealerTurnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>追加でカードを出すことができます</div>
              <div class='modal__foot btn' @click='reply(player.Data.ID, Constants.PlayerReplyAttachPass)'>パス</div>
            </div>
          </div>
          <div
            class='modal'
            :class='{open:dealerIsForceDrawPhase() && dealerPlayerIsTurnPlayer(player.Data.ID) && dealerTurnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>2を出すか{{ Dealer.forceDrawAmount }}枚引いてください</div>
              <div class='modal__foot btn' @click='reply(player.Data.ID, Constants.PlayerReplyForceDrawDraw)'>ドロー</div>
            </div>
          </div>
          <div
            class='modal modal--hard'
            :class='{open:dealerIsChangeMarkPhase() && dealerPlayerIsTurnPlayer(player.Data.ID) && dealerTurnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>変更するマークを選んでください</div>
              <div class='modal__marks'>
                <div @click='reply(player.Data.ID, Constants.PlayerReplyChangeMarkClub)' class='markItem CardDisplay__ID28'></div>
                <div @click='reply(player.Data.ID, Constants.PlayerReplyChangeMarkDiamond)' class='markItem CardDisplay__ID29'></div>
                <div @click='reply(player.Data.ID, Constants.PlayerReplyChangeMarkHeart)' class='markItem CardDisplay__ID30'></div>
                <div @click='reply(player.Data.ID, Constants.PlayerReplyChangeMarkSpade)' class='markItem CardDisplay__ID31'></div>
                <div @click='reply(player.Data.ID, Constants.PlayerReplyChangeMarkJoker)' class='markItem CardDisplay__ID52'></div>
              </div>
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
            v-if='dealerTurnPlayer().isHuman()'
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
    <div class='gameBottomSpace'></div>
  </div>
</template>

<script>
import GodService from './GodService'
import DealerService from './DealerService'
import ComputerService from './ComputerService'
import AnimationService from './AnimationService'
import { Constants } from '../constant/Basic'
import Config from '../config/Config'

export default {
  name: 'Den',
  mixins: [
    GodService,
    DealerService,
    ComputerService,
    AnimationService,
  ],
  data() {
    return {
      Constants: null,
      God: null,
      Players: null,
      Dealer: null,
      Config: null,
      IsGameSet: false,
    }
  },

  beforeMount() {
    this.create()

    this.setup()
  },

  methods: {
    create() {
      this.Constants = Constants

      this.Config = Config.app()

      this.God = this.godBirth()

      this.Players = this.godCreatePlayers()

      this.Dealer = this.godCreateDealer()
    },

    setup() {
      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()

      this.dealerTriggerCardSkillAtFirst()
    },

    put(id, handIdx) {
      if (this.isGameSet()) {
        return
      }

      if (!this.dealerPlayerIsTurnPlayer(id)) {
        return
      }

      this.computerResetPutTimer(this.autoPutAction)

      if (this.dealerCanReceiveCard(this.Players.get(id).show(handIdx))) {
        this.dealerReceiveCard(this.Players.get(id).pick(handIdx), id)

        // this.computerLookField(this.dealer.fieldCard())

        this.dealerCheckDone(this.Players.get(id))

        this.dealerTriggerCardSkill()

        return
      }

      this.dealerRejectReceivingCard()

    },

    draw() {
      if (this.isGameSet()) {
        return
      }

      this.dealerDeal(this.dealerTurnPlayer())

      this.dealerGoNextTurn()
    },

    reply(id, type, param) {
      this.dealerListenReply(this.Players.get(id), type, param)

      this.computerResetPutTimer(this.autoPutAction)
    },

    den(id) {
      this.dealerJudgeDen(this.Players.get(id))
    },

    gameSet() {
      this.IsGameSet = true

      this.computerStopPutTimer()

      this.computerStopDenTimer()
    },

    isGameSet() {
      return this.IsGameSet
    },
  }
}
</script>
