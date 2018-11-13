<template>
  <div class='gameContainer' id='View'>
    <div class='outgameBackgroundFront'></div>
    <div class='outgameBackgroundBack'></div>
    <div class='outgame'>

      <div class='outgameHeader' v-if='User'>
        <div class='outgameHeader__Left'>
          <div class='outgameHeader__Left__Budge'>
            {{ User.Rank }}
          </div>
        </div>
        <div class='outgameHeader__Right'>
          <img src='/svg/money.svg'>
          {{ User.MoneyString }}
        </div>
      </div>

      <!-- Success -->
      <div class='outgame__Inner' v-if='ApiClientRequestStatus.IsSuccess'>
        <!-- Home -->
        <div v-if='Phase === GamePhase.Home' class='outgame__Body' @click='toInGame()'>
          <div class='p-Home__title'>
            DEN
          </div>
          <div class='p-Home__pointer' @onclick='toInGame()'>
            <img src='/svg/pointer.svg'>
          </div>
          <div class='p-Home__startText'>
            Tap to Start
          </div>
        </div>

        <!-- Profile -->
        <div v-else-if='Phase === GamePhase.Profile' class='window'>
          <h1 class='window__Title'>資産</h1>
          <div class='window__Body p-Profile'>
            <div class='p-Profile__head'>
              <div class='p-Profile__item flex-space-between'>
                <div>所持金</div><div>{{ User.MoneyString }}</div>
              </div>
              <div class='p-Profile__item flex-space-between'>
                <div>総資産</div><div>{{ userTotalAssetAmountString() }}</div>
              </div>
              <div class='p-Profile__item flex-space-between'>
                <div>ランクアップに必要な資産額</div><div>{{ userNeedAssetToNextRankString() }}</div>
              </div>
            </div>
            <h2>購入したビジネス</h2>
            <div class='p-Profile__list'>
              <div class='p-Profile__item flex-space-between' v-for='b in UserBusinesses'>
                <div>{{ b.Prefecture }} {{ b.BusinessName }} Lv{{ b.Level }}</div>
                <div>{{ b.CurrentPriceString }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Business -->
        <div v-else-if='Phase === GamePhase.Business' class='window'>
          <h1 class='window__Title'>本日のビジネス</h1>
          <div class='window__Body p-Business'>
            <div class='p-Business__List'>
              <div class='p-Business__Item' v-for='b in TodaysBusinesses'>
                <div class='p-Business__Item__Head'>
                  <img src='svg/business/category1.svg'>
                </div>
                <div class='p-Business__Item__Body'>
                  <div class='p-Business__Item__Body__head'>{{ b.Prefecture }}</div>
                  <div class='p-Business__Item__Body__body'>{{ b.Name }}</div>
                  <div class='p-Business__Item__Body__foot'>{{ b.PriceString }}</div>
                </div>
                <div class='p-Business__Item__Foot'>
                  <div v-if='b.IsMaxLevel'>レベル最大</div>
                  <div v-else-if='b.IsSoldOut'>購入済</div>
                  <div v-else @click='buyBusiness(b.ID)'>購入</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bonus -->
        <div v-else-if='Phase === GamePhase.Bonus'>
          <div class='modal open'>
            <div class='modal__inner modal__inner--full'>
              <div class='modal__body'>
                <div class='BusinessView'>
                  <h3>本日の収益</h3>
                  <div class='BusinessView__Body'>
                    <div class='BusinessView__BodyInner'>
                      <table>
                        <tr v-for='b in UserBusinesses'>
                          <td>{{ b.BusinessName }} Lv{{ b.Level }}:</td>
                          <td>{{ b.BonusMoneyString }}</td>
                        </tr>
                      </table>
                    </div>
                    <div>
                      合計: {{ userTotalBonusMoneyString() }}
                    </div>
                    <div>
                      所持金: {{ User.MoneyString }}
                    </div>
                  </div>
                  <div>
                    <div @click='toHome()' class='btn'>ホーム</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Waiting Userがすでにいる場合 -->
      <div class='outgame__Inner window' v-else-if='User && ApiClientRequestStatus.IsWaiting'>
        <div class='p-Loading'>
          <div class='p-Loading__icon'>
            <img src='img/icon/loading-s.gif'>
          </div>
        </div>
      </div>

      <!-- Waiting Userがいない場合 -->
      <div class='outgame__Inner' v-else-if='User && ApiClientRequestStatus.IsWaiting'>
        <div class='p-Loading'>
          <div class='p-Loading__icon'>
            <img src='img/icon/loading-s.gif'>
          </div>
        </div>
      </div>

      <!-- Fail -->
      <div class='outgame__Inner' v-else-if='ApiClientRequestStatus.IsFail'>
        <div class='modal open'>
          <div class='modal__inner modal__inner--full'>
            <div class='modal__body'>
              <div class='StartView'>
                <h3>通信エラー</h3>
                <div>
                  通信エラーが発生しました<br>
                  電波の良いところで再度リトライしてください
                </div>
                <div class='StartView__BtnList'>
                  <div @click='retry()' class='StartView__Btn btn'>リトライ</div>
                  <div @click='reset()' class='StartView__Btn btn'>ホーム</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='outgameFooter' v-if='User'>
        <div @click='toHome()' class='outgameFooter__Btn outgameFooter__Btn--home'
          :class='{"outgameFooter__Btn--home--selected": Phase === GamePhase.Home }'></div>

        <div @click='toProfile()' class='outgameFooter__Btn outgameFooter__Btn--user'
          :class='{"outgameFooter__Btn--user--selected": Phase === GamePhase.Profile }'></div>

        <div @click='toBusiness()' class='outgameFooter__Btn outgameFooter__Btn--business'
          :class='{"outgameFooter__Btn--business--selected": Phase === GamePhase.Business }'></div>

        <div @click='howTo()' class='outgameFooter__Btn outgameFooter__Btn--setting'
          :class='{"outgameFooter__Btn--setting--selected": Phase === GamePhase.Setting }'></div>
      </div>
    </div>
  </div>
</template>

<script>
import APIClientService from '../service/APIClientService'
import MasterdataService from '../out_service/MasterdataService'
import LocalStorage from '../storage/LocalStorage'
import { toMoneyString } from '../lib/Lib'
import { OutGamePhase } from '../type/Type'

export default {
  name: 'Home',
  mixins: [
    APIClientService,
    MasterdataService,
  ],

  data () {
    return {
      Storage: null,
      Token: null,
      SessionID: null,
      User: null,
      Phase: null,
      TodaysBusinesses :null,
      UserBusinesses: null,

      // 以下マスターデータ
      Businesses: null,
    }
  },

  beforeMount() {
    this.Storage = new LocalStorage

    this.UserBusinesses = []

    this.GamePhase = OutGamePhase

    this.Phase = OutGamePhase.Home

    this.loginOrSignup()
  },

  methods: {
    loginOrSignup() {
      this.Token = this.Storage.getToken()
      if (this.Token) {
        this.apiClientPostLogin(this, {'token': this.Token})
      } else {
        this.apiClientPostSignup(this, {'platform': 1})
      }
    },

    toHome() {
      this.Phase = this.GamePhase.Home
    },

    toBusiness() {
      this.Phase = this.GamePhase.Business
      if (this.TodaysBusinesses == null) {
        this.apiClientGetBusinessList(this)
      }
    },

    toProfile() {
      this.Phase = this.GamePhase.Profile
    },

    toBonus() {
      this.Phase = this.GamePhase.Bonus
    },

    buyBusiness(id) {
      for (let b of this.TodaysBusinesses) {
        if (b.ID === id) {
          if (this.User.Money < b.Price) {
            alert("所持金不足のため購入できません")
            return
          }
          b.IsSoldOut = true
          this.User.Money -= b.Price
        }
      }
      this.apiClientPostBusinessBuy(this, {'session_id': this.SessionID, 'business_id': id})
    },

    howTo() {
      alert('手札がなくなるかDENしたら勝ち')
    },

    retry() {
      this.ApiClientRetryFunction()
    },

    reset() {
      location.reload()
    },

    toInGame() {
      this.$router.push({ name: 'den', params: { level: this.User.Rank } })
    },

    // TODO: UserServiceに移植する
    userTotalAssetAmount() {
      let total = 0
      for (let ub of this.UserBusinesses) {
        total += ub.CurrentPrice
      }
      return total
    },

    userTotalBonusMoney() {
      let total = 0
      for (let ub of this.UserBusinesses) {
        total += ub.BonusMoney
      }
      return total
    },

    userTotalBonusMoneyString() {
      return toMoneyString(this.userTotalBonusMoney())
    },

    userTotalAssetAmountString() {
      return toMoneyString(this.userTotalAssetAmount())
    },

    // TODO: UserServiceに移植する
    userNeedAssetToNextRankString() {
      let nextRank = this.User.Rank + 1
      let need = (nextRank * nextRank * 100) - this.userTotalAssetAmount()
      return toMoneyString(need < 0 ? 0 : need)
    },
  },
}
</script>
