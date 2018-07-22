<template>
  <div class='gameContainer' id='View'>
    <div class='ads'>
      ads
    </div>
    <div class='game'>
      <div class='denActionArea' @click='den(config.MainPlayerID)'></div>
      <div class='hands'>
        <div
          v-for='player, id in players'
          class='PlayerCardArea'
          :id='["PlayerHand__" + id]'
          :class='["PlayerCardArea__ID" + id]'
          :style='player.hand.CSS'>
          <div
            v-for='card, handIdx in player.hand.Cards'
            @click='put(id, handIdx)'
            :class='{"Sleeve--disabled":dealerPlayerIsTurnPlayer(id) && dealerTurnPlayer().isHuman() && !dealerCanPut(card)}'
            class='Sleeve'>
            <div
              v-if='env.DEBUG || player.isHuman() || player.handIsReversed()'
              class='Card'
              :id='["Card__ID" + card.id()]'
              :class='["CardDisplay__ID" + card.displayID(), "Card__ID" + card.id()]'></div>
            <div
              v-else
              class='Card Card--reversed'
              :id='["Card__ID" + card.id()]'
              :class='["CardDisplay__ID" + card.displayID(), "Card__ID" + card.id()]'></div>
          </div>
          <div
            class='modal'
            :class='{open:dealerIsAttachPhase() && dealerPlayerIsTurnPlayer(id) && dealerTurnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>追加でカードを出すことができます</div>
              <div class='modal__foot btn' @click='reply(id, constants.PlayerReplyAttachPass)'>パス</div>
            </div>
          </div>
          <div
            class='modal'
            :class='{open:dealerIsForceDrawPhase() && dealerPlayerIsTurnPlayer(id) && dealerTurnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>2を出すか{{ dealer.forceDrawAmount }}枚引いてください</div>
              <div class='modal__foot btn' @click='reply(id, constants.PlayerReplyForceDrawDraw)'>ドロー</div>
            </div>
          </div>
          <div
            class='modal modal--hard'
            :class='{open:dealerIsChangeMarkPhase() && dealerPlayerIsTurnPlayer(id) && dealerTurnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>変更するマークを選んでください</div>
              <div class='modal__marks'>
                <div @click='reply(id, constants.PlayerReplyChangeMarkClub)' class='markItem CardDisplay__ID28'></div>
                <div @click='reply(id, constants.PlayerReplyChangeMarkDiamond)' class='markItem CardDisplay__ID29'></div>
                <div @click='reply(id, constants.PlayerReplyChangeMarkHeart)' class='markItem CardDisplay__ID30'></div>
                <div @click='reply(id, constants.PlayerReplyChangeMarkSpade)' class='markItem CardDisplay__ID31'></div>
                <div @click='reply(id, constants.PlayerReplyChangeMarkJoker)' class='markItem CardDisplay__ID52'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='field' @click='den(config.MainPlayerID)'>
        <div class='Sleeve'>
          <div v-if='dealer.fieldCard() !== null'>
            <div v-for='card in dealer.field.Cards'
              class='Card'
              :style='card.CSS'
              :class='["CardDisplay__ID" + card.displayID(), "Card__ID" + card.id()]'
              :id='["Card__ID" + card.id()]'>
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
import Config from '@/config'
import Constants from '@/constants'
import Dealer from '@/components/Dealer'
import Computer from '@/components/Computer'
import Animator from '@/components/Animator'
import Debug from '@/components/Debug'
import Rule from '@/models/Rule'
import Env from '@/env'

export default {
  name: 'Den',
  mixins: [Dealer, Computer, Animator, Debug],
  data() {
    return {
      env: null,
      confing: null,
      constants: null,
      rule: null,
      players: null,
      isGameSet: false,
    }
  },

  beforeMount () {
    this.env = Env
    this.config = Config
    this.constants = Constants
    this.rule = Rule
    if (Env.DEBUG === true) {
      this.debugSetup()
    } else {
      this.setup()
    }
    this.computerStandby(this.autoPutAction, this.autoDenAction)
  },

  methods: {
    setup () {
      this.players = this.god.createPlayers()

      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.computerLookSelfHand()

      this.dealerPutCard()

      this.computerLookField(this.dealer.fieldCard())
    },

    put (id, handIdx) {
      if (! this.dealerPlayerIsTurnPlayer(id) || this.isGameSet) {
        return
      }

      if (this.dealerCanReceiveCard(this.players[id].show(handIdx))) {
        this.dealerReceiveCard(this.players[id].pick(handIdx), id)

        this.computerLookField(this.dealer.fieldCard())

        this.dealerCheckDone(this.players[id])

        this.dealerTriggerCardSkill()
      } else {
        this.dealerRejectReceivingCard()
      }

      this.computerResetPutTimer(this.autoPutAction)
    },

    draw () {
      if (this.isGameSet) {
        return
      }
      this.dealerDeal(this.dealerTurnPlayer())
      this.dealerGoNextTurn()
      this.computerResetPutTimer(this.autoPutAction)
    },

    reply (id, type, param) {
      this.dealerListenReply(this.players[id], type, param)
      this.computerResetPutTimer(this.autoPutAction)
    },

    den (id) {
      this.dealerJudgeDen(this.players[id])
    },

    autoPutAction () {
      if (! this.dealerTurnPlayer().isComputer()) {
        return
      }

      this.computerLookSelfHand()

      // ForceDraw
      if (this.dealerIsForceDrawPhase()) {
        if (this.dealerTurnPlayer().wantPut(this.dealer.fieldCard(), this.dealerIsForceDrawPhase())) {
          this.put(
            this.dealerTurnPlayer().data.ID,
            this.dealerTurnPlayer().think(this.dealer.fieldCard(), this.dealerIsForceDrawPhase())
          )
        } else {
          this.reply(this.dealerTurnPlayer().data.ID, Constants.PlayerReplyForceDrawDraw)
        }
        return
      }

      // Attach
      if (this.dealerIsAttachPhase()) {
        if (this.dealerTurnPlayer().wantPut(this.dealer.fieldCard(), this.dealerIsForceDrawPhase())) {
          this.put(
            this.dealerTurnPlayer().data.ID,
            this.dealerTurnPlayer().think(this.dealer.fieldCard(), this.dealerIsForceDrawPhase())
          )
        } else {
          this.reply(this.dealerTurnPlayer().data.ID, Constants.PlayerReplyAttachPass)
        }
        return
      }

      // WildCard
      if (this.dealerIsChangeMarkPhase()) {
        this.reply(this.dealerTurnPlayer().data.ID, this.dealerTurnPlayer().thinkChangeMark())
        return
      }

      // 通常
      if (this.dealerTurnPlayer().wantPut(this.dealer.fieldCard(), this.dealerIsForceDrawPhase())) {
        this.put(
          this.dealerTurnPlayer().data.ID,
          this.dealerTurnPlayer().think(this.dealer.fieldCard(), this.dealerIsForceDrawPhase())
        )
      } else {
        this.draw()
      }
    },

    autoDenAction () {
      for (let idx in this.players) {
        if (this.players[idx].isHuman()) {
          continue
        }
        this.dealerJudgeDen(this.players[idx])
      }
    },

    gameSet () {
      this.isGameSet = true
      this.computerStopPutTimer()
      this.computerStopDenTimer()
    },
  }
}
</script>
