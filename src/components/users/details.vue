<template>
  <!-- Start Contact -->
  <div class="container py-5">
    <div class="row py-5">
      <div class="col-md-9 m-auto" method="post" role="form">
        <div class="row">
          <div class="form-group col-md-6 mb-3">
            <label>Email</label>
            <h1>{{ this.user.email }}</h1>
          </div>
        </div>
        <div class="mb-3">
          <label>Username</label>
          <input v-model="user.username" type="text" class="form-control mt-1" id="username" name="username"
                 placeholder="Username">
        </div>

        <div class="mb-3">
          <label>Roles</label>
          <input v-model="user.roles" type="text" class="form-control mt-1" id="roles" name="username"
                 placeholder="Username">
        </div>


        <div class="mb-3">
          <label>Status</label>
          <input v-model="user.status" type="text" class="form-control mt-1" id="status" name="subject"
                 placeholder="Status">
        </div>

        <div class="row">
          <div class="col text-end mt-2">
            <button class="btn btn-success btn-lg px-3" @click="this.update">Update</button>
          </div>
        </div>


      </div>
    </div>
  </div>
  <!-- End Contact -->
</template>

<script>

import {Comunication} from "@/red/comunicationMethods";
import endpoints from "@/red/endpoints";
import {loadToken} from "@/red/authMethods";

const comunication = new Comunication(endpoints.base_url)
export default {
  name: "details",
  data() {
    return {
      user: {
        roles: [],
        status: '',
        email: '',
        username: '',
      },
      errors: []
    }
  },
  methods: {
    async update() {
      if (this.user.username == '' || this.user.status == '') {
        this.errors.push({
          message: 'register error',
          code: 400
        })
      }

      const body = {
        id: this.$route.params['id'],
        data: {
          username: this.user.username,
          status: this.user.status,
          roles: this.user.roles
        }
      }
      console.log(body)
      let result = await comunication.post('user/update', body)

      if (result.status != 200) {
        const error = result.data
        this.errors.push(error)
        console.log(this.errors)
        return
      }
      await this.$router.back()
    },
    async getUser() {
      const id = this.$route.params['id']
      comunication.setToken(loadToken())
      const response = await comunication.get('user', id)
      const data = response.data
      if (response.status != 200) {
        this.errors.push({
          name: data.name,
          description: data.description
        })
      }
      this.user = data
      console.log(this.user)
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style scoped>

</style>
