<script>
import Env from '../env'

export default {
  data() {
    return {}
  },

  methods: {
    apiClientPostSignup(data) {
      this.apiClientRequest('POST', 'user/signup', data)
    },

    apiClientRequest(method, path, data) {
      const url = `${Env.API_SERVER_HOST}:${Env.API_SERVER_PORT}/${path}`
      fetch(url, {
        header: {
          'Content-Type': 'application/json'
        },
        method: method,
        body: JSON.stringify(data)

      }).then((res) => {
        if (!res.ok) {
          console.error(res)
          return
        }
        res.json().then((json) => {
          console.log(json)
        })

      }).catch((err) => {
        console.log("ERR")
        console.error(err)
      })
    },
  },
}
</script>
