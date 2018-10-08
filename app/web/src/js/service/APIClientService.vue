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

    apiClientPostSignup(data) {
      return this.apiClientRequest('POST', 'user/signup', data)
    },

    apiClientRequest(method, path, data) {
      const url = `${Env.API_SERVER_HOST}:${Env.API_SERVER_PORT}/${path}`
      let status = this.apiClientRequestStatus(this._signupKey)
      status.change(RequestStatusType.Waiting)

      fetch(url, {
        header: {
          'Content-Type': 'application/json'
        },
        method: method,
        body: JSON.stringify(data)

      }).then((res) => {
        if (!res.ok) {
          console.error(res)
          status.change(RequestStatusType.Fail)
          return
        }
        res.json().then((json) => {
          status.change(RequestStatusType.Success)
          console.log(json)
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
