<script>
import Env from '../env'
import RequestStatus from '../model/RequestStatus'
import { RequestStatusType } from '../type/Type'

export default {
  data() {
    return {
      _responseStatuses: [],
      _signupKey: 'user.signup',
    }
  },

  methods: {
    apiClientRequestStatus(key) {
      if (this._responseStatuses && this._responseStatuses[key]) {
        return this._responseStatuses[key]
      }
      return new RequestStatus
    },

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
      })
    },

    apiClientPostLogin(req, user) {
      return this.apiClientRequest('POST', 'user/login', req, (res) => {
        console.log(res.data)
        this.SessionID = res.data.session_id
        user.Code = parseInt(res.data.user.id) + 10000000 // 仮
        user.Name = res.data.user.name
        user.Token = res.data.user.token
        user.Money = res.data.user.money
        user.Stamina = res.data.user.stamina
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

    apiClientPostGameFinish(req, user) {
      return this.apiClientRequest('POST', 'game/finish', req, (res) => {
        user.Stamina--
      })
    },

    apiClientRequest(method, path, req, callable) {
      const url = `${Env.API_SERVER_HOST}:${Env.API_SERVER_PORT}/${path}`
      let status = this.apiClientRequestStatus(this._signupKey)
      status.change(RequestStatusType.Waiting)

      fetch(url, {
        header: {
          'Content-Type': 'application/json'
        },
        method: method,
        body: JSON.stringify(req)

      }).then((res) => {
        if (!res.ok) {
          console.error(res)
          status.change(RequestStatusType.Fail)
          return
        }
        res.json().then((json) => {
          status.change(RequestStatusType.Success)
          callable(json)
        })

      }).catch((err) => {
        console.error(err)
        status.change(RequestStatusType.Fail)
      })
      return status
    },
  },
}
</script>
