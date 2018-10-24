<script>
import Moment from 'moment'
import Env from '../env'
import RequestStatus from '../model/RequestStatus'
import { RequestStatusType } from '../type/Type'
import UserData from '../data/UserData'
import TodaysBusinessData from '../data/TodaysBusinessData'
import UserBusinessData from '../data/UserBusinessData'

export default {
  data() {
    return {
      ApiClientRequestStatus: null,
      ApiClientRetryFunction: () => {
        console.log("nothing retry function.")
      },
    }
  },

  beforeMount() {
    this.ApiClientRequestStatus = new RequestStatus
  },

  methods: {
    apiClientPostSignup(vu, req) {
      return this.apiClientRequest('POST', 'user/signup', req, (res) => {
        console.log(res)
        this.Token = res.data.user.token
        this.SessionID = res.data.session_id
        vu.Businesses = res.data.businesses

        this.masterdataClean()

        this.apiClientSetUserData(vu, res.data.user)
        this.Storage.saveToken(this.Token)
        this.Storage.saveSessionID(this.SessionID)
      })
    },

    apiClientPostLogin(vu, req) {
      return this.apiClientRequest('POST', 'user/login', req, (res) => {
        console.log(res.data)
        vu.SessionID = res.data.session_id
        this.Storage.saveSessionID(vu.SessionID)

        vu.Businesses = res.data.businesses
        this.masterdataClean()

        this.apiClientSetUserData(vu, res.data.user)
        this.apiClientSetUserBusinessData(vu, res.data.user_businesses)
      })
    },

    apiClientPostUserInfo(vu, req) {
      return this.apiClientRequest('POST', 'user/info', req, (res) => {
        console.log(res.data)
        this.apiClientSetUserData(vu, res.data.user)
      })
    },

    apiClientPostBusinessBuy(vu, req) {
      return this.apiClientRequest('POST', 'business/buy', req, (res) => {
        console.log(res.data)
        this.apiClientSetUserBusinessData(vu, res.data.user_businesses)
      })
    },

    apiClientPostGameFinish(req, user) {
      return this.apiClientRequest('POST', 'game/finish', req, (res) => {
        user.Stamina--
      })
    },

    apiClientGetBusinessList(vu) {
      return this.apiClientRequest('GET', 'business/list', {}, (res) => {
        console.log(res)
        this.apiClientSetTodaysBusinessData(vu, res.data.businesses)
      })
    },

    apiClientRequest(method, path, req, callable) {
      let requestFunc = () => {
        const url = `${Env.API_SERVER_HOST}:${Env.API_SERVER_PORT}/${path}`
        this.ApiClientRequestStatus.change(RequestStatusType.Waiting)
        fetch(url, {
          header: {
            'Content-Type': 'application/json'
          },
          method: method,
          body: method === 'GET' ? null : JSON.stringify(req)

        }).then((res) => {
          if (!res.ok) {
            console.error(res)
            this.ApiClientRequestStatus.change(RequestStatusType.Fail)
            return
          }
          res.json().then((json) => {
            this.ApiClientRequestStatus.change(RequestStatusType.Success)
            callable(json)
          })

        }).catch((err) => {
          console.error(err)
          this.ApiClientRequestStatus.change(RequestStatusType.Fail)
        })
      }

      // リクエストする前にリトライ用に関数をセットしておく
      this.ApiClientRetryFunction = () => {
        this.ApiClientRequestStatus.change(RequestStatusType.Waiting)
        setTimeout(() => {
          requestFunc()
        }, 1000)
      }

      // リクエスト
      requestFunc()
    },

    apiClientSetUserData(vu, user) {
      let row = new UserData
      row.Code = parseInt(user.id) + 10000000 // 仮
      row.Name = user.name
      row.Rank = user.rank
      row.Token = user.token
      row.Money = user.money
      row.Stamina = user.stamina
      vu.User = row
    },

    apiClientSetUserBusinessData(vu, userBusinesses) {
      let rows = []
      for (let ub of userBusinesses) {
        let business = this.MSBusinessByID[ub.business_id]
        let row = new UserBusinessData
        row.BusinessID = business.id
        row.BusinessName = business.name
        row.Level = ub.level
        row.LastBuyDate = ub.last_buy_at.split('T')[0] // 日付のみ取得

        if (row.Level === 2) {
          row.CurrentPrice = business.price_level2
        } else if (row.Level === 3) {
          row.CurrentPrice = business.price_level3
        } else {
          row.CurrentPrice = business.price_base
        }

        rows.push(row)
      }
      vu.UserBusinesses = rows
    },

    apiClientSetTodaysBusinessData(vu, businesses) {
      let userBusinessByID = (id) => {
        for (let ub of vu.UserBusinesses) {
          if (ub.BusinessID === id) {
            return ub
          }
        }
        return null
      }

      let rows = []
      for (let b of businesses) {
        let row = new TodaysBusinessData
        row.ID = b.id
        row.Name = b.name

        let ub = userBusinessByID(b.id)
        if (ub === null) {
          row.Price = b.price_base
          row.Level = 1
        } else {
          // LastBuyDateが今日の日付と同じだったら売り切れ
          if (ub.LastBuyDate === Moment().format('Y-M-D')) {
            row.IsSoldOut = true
          }

          if (ub.Level === 1) {
            row.Price = b.price_level2
            row.Level = 2
          } else if (ub.Level === 2) {
            row.Price = b.price_level3
            row.Level = 3
          } else if (ub.Level === 3) {
            row.Price = b.price_level3
            row.Level = 3
            row.IsMaxLevel = true
          }
          console.log(row)
        }


        rows.push(row)
      }

      vu.TodaysBusinesses = rows
    }
  },
}
</script>
