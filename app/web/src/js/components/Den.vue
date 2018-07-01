<template>
  <div class='gameContainer'>
    <div class='ads'>
      ads
    </div>
    <div class='game'>
      <div class='hands'>
        <div v-for='player, id in players' class='PlayerCardArea' :class='["PlayerCardArea__ID" + id]'>
          <div
            v-for='card, handIdx in player.hand.Cards'
            @click='put(id, handIdx)'
            :class='{"Sleeve--disabled":dealerPlayerIsTurnPlayer(id) && dealerTurnPlayer().isHuman() && !dealerCanPut(card)}'
            class='Sleeve'>
            <div v-if='player.isHuman()' class='Card' :class='["Card__ID" + card.id()]'></div>
            <div v-else='player.isHuman()' class='Card Card--reversed' :class='["Card__ID" + card.id()]'></div>
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
            :class='{open:dealerIsChangeMarkPhase() && dealerPlayerIsTurnPlayer(id) && dealerTurnPlayer().isHuman()}'>
            <div class='modal__inner'>
              <div class='modal__body'>変更するマークを選んでください</div>
              <div class='modal__marks'>
                <div @click='reply(id, constants.PlayerReplyChangeMarkClub)' class='markItem Card__ID28'></div>
                <div @click='reply(id, constants.PlayerReplyChangeMarkDiamond)' class='markItem Card__ID29'></div>
                <div @click='reply(id, constants.PlayerReplyChangeMarkHeart)' class='markItem Card__ID30'></div>
                <div @click='reply(id, constants.PlayerReplyChangeMarkSpade)' class='markItem Card__ID31'></div>
                <div @click='reply(id, constants.PlayerReplyChangeMarkJoker)' class='markItem Card__ID52'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='field'>
        <div class='Sleeve'>
          <div
            v-if='dealer.fieldCard() !== null'
            class='Card'
            :class='["Card__ID" + dealer.fieldCard().id()]'>
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
import Rule from '@/models/Rule'

export default {
  name: 'Den',
  mixins: [Dealer, Computer],
  data() {
    return {
      players: null,
      constants: null,
      rule: null,
    }
  },
  beforeMount () {
    this.constants = Constants
    this.rule = Rule
    this.setup()
    this.computerStandby(this.autoPutAction, this.autoDenAction)
  },
  methods: {
    setup () {
      this.players = this.god.createPlayers()

      this.dealerShuffleDeck()

      this.dealerDealCardToPlayersAtFirst()

      this.dealerPutCard()
    },
    put (id, handIdx) {
      if (! this.dealerPlayerIsTurnPlayer(id)) {
        return
      }

      if (this.dealerCanReceiveCard(this.players[id].show(handIdx))) {
        this.dealerReceiveCard(this.players[id].pick(handIdx))

        this.dealerCheckDone(this.players[id])

        this.dealerTriggerCardSkill()
      } else {
        console.log(this.players[id].show(handIdx))
        this.dealerRejectReceivingCard()
      }
    },
    draw () {
      this.dealerDeal(this.dealerTurnPlayer())
      this.dealerGoNextTurn()
    },
    reply (id, type, param) {
      this.dealerListenReply(this.players[id], type, param)
    },
    den (id) {
      this.dealerJudgeDen(this.players[id])
    },
    autoPutAction() {
      if (! this.dealerTurnPlayer().isComputer()) {
        return
      }

      if (this.dealerTurnPlayer().wantPut(this.dealer.fieldCard())) {
        this.put(
          this.dealerTurnPlayer().data.ID,
          this.dealerTurnPlayer().think(this.dealer.fieldCard())
        )
      } else {
        this.draw()
      }
    },
    autoDenAction() {
      if (! this.dealerTurnPlayer().isComputer()) {
        return
      }

      this.dealerJudgeDen(this.dealerTurnPlayer())
    },
  }
}
</script>
