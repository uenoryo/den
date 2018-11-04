<template>
  <div class='gameContainer' id='View'>
    <div class='game'>

      <!-- Success -->
      <div class='outgame' v-if='ApiClientRequestStatus.IsSuccess'>

        <!-- Home -->
        <div v-if='Phase === GamePhase.Home' id="OutGameHomeView">

        </div>

        <!-- Business -->
        <div v-else-if='Phase === GamePhase.Business' id="OutGameBusinessView">
          <div class='modal open'>
            <div class='modal__inner modal__inner--full'>
              <div class='modal__body'>
                <div class='BusinessView'>
                  <h3>本日のビジネス</h3>
                  <div class='BusinessView__Body'>
                    <div>
                      所持金: {{ User.MoneyString }}
                    </div>
                    <table>
                      <tr v-for='b in TodaysBusinesses'>
                        <td>{{ b.Prefecture }}</td>
                        <td>{{ b.Name }}</td>
                        <td>{{ b.PriceString }}</td>
                        <td v-if='b.IsMaxLevel'>レベル最大</td>
                        <td v-else-if='b.IsSoldOut'>購入済</td>
                        <td v-else><div @click='buyBusiness(b.ID)'>購入</div></td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <div @click='toHome()' class='btn'>ホーム</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if='Phase === GamePhase.Profile' id="OutGameBusinessView">
          <div class='modal open'>
            <div class='modal__inner modal__inner--full'>
              <div class='modal__body'>
                <div class='BusinessView'>
                  <h3>資産</h3>
                  <div class='BusinessView__Body'>
                    <div>
                      所持金: {{ User.MoneyString }}
                    </div>
                    <div>
                      総資産: {{ userTotalAssetAmountString() }}
                    </div>
                    <div>
                      次のランクまであと: {{ userNeedAssetToNextRankString() }}
                    </div>
                    <div class='BusinessView__BodyInner'>
                      <table>
                        <tr v-for='b in UserBusinesses'>
                          <td>{{ b.Prefecture }}</td>
                          <td>{{ b.BusinessName }} Lv{{ b.Level }}・・・</td>
                          <td>{{ b.CurrentPriceString }}</td>
                        </tr>
                      </table>
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

        <div v-else-if='Phase === GamePhase.Bonus' id="OutGameBusinessView">
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

        <div class='outgameFooter'>
          <div @click='toHome()' class='outgameFooter__Btn outgameFooter__Btn--home'></div>
          <div @click='toProfile()' class='outgameFooter__Btn outgameFooter__Btn--user'></div>
          <div @click='toBusiness()' class='outgameFooter__Btn outgameFooter__Btn--business'></div>
          <div @click='howTo()' class='outgameFooter__Btn outgameFooter__Btn--setting'></div>
        </div>

      </div>

      <!-- Waiting -->
      <div v-else-if='ApiClientRequestStatus.IsWaiting'>
        <div class='p-Loading'>
          <div class='p-Loading__icon'>
            <img src='img/icon/loading-s.gif'>
          </div>
        </div>
      </div>

      <!-- Fail -->
      <div v-else-if='ApiClientRequestStatus.IsFail'>
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
