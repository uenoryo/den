<script>
import Env from '../env'
import RequestStatus from '../model/RequestStatus'
import { RequestStatusType } from '../type/Type'

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
    apiClientPostSignup(req, user) {
      return this.apiClientRequest('POST', 'user/signup', req, (res) => {
        console.log(res)
        this.Token = res.data.user.token
        this.SessionID = res.data.session_id
        user.Code = parseInt(res.data.user.id) + 10000000 // 仮
        user.Name = res.data.user.name
        user.Token = res.data.user.token
        user.Money = res.data.user.money
        user.Stamina = res.data.user.stamina
        this.Storage.saveToken(this.Token)
        this.masterdataClean()
      })
    },

    apiClientPostLogin(vu, req, user) {
      return this.apiClientRequest('POST', 'user/login', req, (res) => {
        console.log(res.data)
        vu.SessionID = res.data.session_id
        vu.Businesses = res.data.businesses
        vu.UserBusinesses = res.data.user_businesses
        user.Code = parseInt(res.data.user.id) + 10000000 // 仮
        user.Name = res.data.user.name
        user.Rank = res.data.user.rank
        user.Token = res.data.user.token
        user.Money = res.data.user.money
        user.Stamina = res.data.user.stamina
        this.masterdataClean()

        // とりあえずここでマスターデータの付与を行う
        // 増えてきたら構成を考える
        for (let b of vu.UserBusinesses) {
          b.MSname = this.MSBusinessByID[b.business_id].name
          b.MSprice_base = this.MSBusinessByID[b.business_id].price_base
        }
      })
    },

    apiClientPostInfo(req, user) {
      return this.apiClientRequest('POST', 'user/info', req, (res) => {
        console.log(res.data)
        user.Code = parseInt(res.data.user.id) + 10000000 // 仮
        user.Name = res.data.user.name
        user.Token = res.data.user.token
        user.Money = res.data.user.money
        user.Stamina = res.data.user.stamina
      })
    },

    apiClientPostBusinessBuy(vu, req) {
      return this.apiClientRequest('POST', 'business/buy', req, (res) => {
        console.log(res.data)
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
        vu.TodaysBusinesses = res.data.businesses
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
  },
}
</script>
