<template>
  <!-- Start Contact -->
  <div class="container py-5">
    <div class="row py-5">
      <div class="col-md-9 m-auto" method="post" role="form">
        <div class="row">
          <div class="form-group col-md-6 mb-3">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control mt-1" id="email" name="email" placeholder="Email">
          </div>
          <div class="form-group col-md-6 mb-3">
            <label>Password</label>
            <input v-model="password" type="text" class="form-control mt-1" id="password" name="password"
                   placeholder="Password">
          </div>
        </div>

        <div class="row">
          <div class="col text-end mt-2">
            <button class="btn btn-success btn-lg px-3" @click="this.login">Login</button>
            <div>
              <h1></h1>
              <router-link to="/register" class="btn btn-success btn-lg px-3">Register</router-link>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
  <!-- End Contact -->
</template>

<script>
import {Comunication} from "@/red/comunicationMethods";
import {saveToken} from "@/red/authMethods";
import {mapActions} from 'vuex'
import endpoints from "@/red/endpoints";

const comunication = new Comunication(endpoints.base_url)
export default {
  name: "login",
  data() {
    return {
      email: '',
      password: '',
      errors: []
    }
  }, methods: {
    ...mapActions([
      "setToken"
    ]),
    async login() {
      if (!this.email || !this.password) {
        this.errors.push({
          message: 'login error',
          code: 400
        })
      }
      const body = {
        email: this.email,
        password: this.password
      }
      let result = await comunication.post('auth/login', body)

      if (result.status != 200) {
        this.errors.push(result.data)
        return
      }
      result = result.data
      console.log(result)
      //saveToken(result.token)
      this.setToken(result.token)
      return await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
