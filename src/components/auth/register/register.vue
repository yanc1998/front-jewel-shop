<template>
  <!-- Start Contact -->
  <div class="container py-5">
    <div class="row py-5">
      <div class="col-md-9 m-auto" method="post" role="form">
        <div class="row">
          <div class="form-group col-md-6 mb-3">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control mt-1" id="email" name="email"
                   placeholder="Email">
          </div>
          <div class="form-group col-md-6 mb-3">
            <label>Password</label>
            <input v-model="password" type="text" class="form-control mt-1" id="password" name="password"
                   placeholder="Password">
          </div>
        </div>
        <div class="mb-3">
          <label>Username</label>
          <input v-model="username" type="text" class="form-control mt-1" id="subject" name="subject"
                 placeholder="Username">
        </div>
        <div class="row">
          <div class="col text-end mt-2">
            <button class="btn btn-success btn-lg px-3" @click="this.register">Register</button>
          </div>
        </div>


      </div>
    </div>
  </div>
  <!-- End Contact -->
</template>

<script>
import {Comunication} from "@/red/comunicationMethods";

const comunication = new Comunication('http://localhost:3001/')

export default {
  name: "register",
  data() {
    return {
      email: '',
      password: '',
      username: '',
      errors: []
    }
  }, methods: {
    async register() {
      if (this.email == '' || this.password == '' || this.username == '') {
        this.errors.push({
          message: 'register error',
          code: 400
        })
      }

      const body = {
        email: this.email,
        password: this.password,
        username: this.username
      }
      console.log(body)
      let result = await comunication.post('auth/register', body)

      if (result.status != 200) {
        const error = result.data
        this.errors.push(error)
        console.log(this.errors)
        return
      }
      result = result.data
      console.log(result)
      await this.$router.push(`/confirm-register/${result._id.value}`)
    }
  }

}
</script>

<style scoped>

</style>
