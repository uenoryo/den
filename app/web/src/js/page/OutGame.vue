<template>
  <div class='gameContainer' id='View'>
    <div class='outgameBackgroundFront' v-if='User'></div>
    <div class='outgameBackgroundBack' v-if='User'></div>
    <!-- Waiting Userがいない場合 -->
    <div class='outgame__Inner' v-else>
      <div class='p-Loading--Large'>
        <div class='p-Loading--Large__icon'>
          <img src='img/icon/loading-s.gif'>
          <h3 class='p-Loading--Large__loadingText'>Now Loading...</h3>
        </div>
      </div>
    </div>

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
          <div class='p-Home__difficultyBtn'>
            <div v-if='IsHard' class='p-Home__difficultyBtn__Wrapper'>
              <div class='p-Home__difficultyBtn__Icon'><img src='/svg/difficulty-btn-normal.svg'></div>
              <div class='p-Home__difficultyBtn__Text'>NORMAL</div>
            </div>
            <div v-else class='p-Home__difficultyBtn__Wrapper'>
              <div class='p-Home__difficultyBtn__Icon'><img src='/svg/difficulty-btn-hard.svg'></div>
              <div class='p-Home__difficultyBtn__Text'>HARD</div>
            </div>
          </div>
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
                  <div v-if='b.IsMaxLevel' class='color-main'>レベル<br>最大</div>
                  <div v-else-if='b.IsSoldOut' class='color-main'>購入済</div>
                  <div v-else @click='buyBusiness(b.ID)' class='p-Business__Item__BuyBtn'>購入</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bonus -->
        <div v-else-if='Phase === GamePhase.Bonus' class='window'>
          <h1 class='window__Title'>本日の収益</h1>
          <div class='window__Body p-Bonus'>
            <div class='p-Bonus__Body'>
              <div class='p-Bonus__Sub flex-space-between'>
                <div>合計</div><div>{{ userTotalBonusMoneyString() }}</div>
              </div>
              <div class='p-Bonus__Sub flex-space-between'>
                <div>所持金</div><div>{{ User.MoneyString }}</div>
              </div>
            </div>
            <div class='p-Bonus__List'>
              <div class='p-Bonus__Item flex-space-between' v-for='b in UserBusinesses'>
                <div>{{ b.BusinessName }} Lv{{ b.Level }}</div>
                <div>{{ b.BonusMoneyString }}</div>
              </div>
            </div>
            <div class='ButtonList'>
              <div @click='toHome()' class='btn'>閉じる</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Waiting Userがすでにいる場合 -->
      <div class='outgame__Inner window' v-else-if='ApiClientRequestStatus.IsWaiting'>
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
      IsHard: false,

      // 以下マスターデータ
      Businesses: null,
      UserRanks: null,
    }
  },

  beforeMount() {
    this.Storage = new LocalStorage

    this.UserBusinesses = []

    this.GamePhase = OutGamePhase

    this.Phase = this.GamePhase.Home

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
      this.$router.push({ name: 'den', params: { level: this.User.NormalLevel } })
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
