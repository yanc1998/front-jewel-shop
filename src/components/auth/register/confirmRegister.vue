<template>
  <!-- Start Contact -->
  <div class="container py-5">
    <div class="row py-5">
      <div class="col-md-9 m-auto" method="post" role="form">
        <h1>
          Se le ha enviado un correo con el codigo de confirmacion
        </h1>
        <div class="row">
          <div class="form-group col-md-6 mb-3">
            <label>Validation Code</label>
            <input v-model="code" type="text" class="form-control mt-1" id="code" name="code"
                   placeholder="Validation Code">
          </div>
        </div>
        <div class="row">
          <div class="col text-end mt-2">
            <button class="btn btn-success btn-lg px-3" @click="this.confirm_register">Confirm Register</button>
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
  name: "confirmRegister",
  data() {
    return {
      code: '',
      errors: []
    }
  },
  methods: {
    async confirm_register() {
      if (this.code == '') {
        this.errors.push({
          message: 'code error',
          code: 400
        })
      }

      const body = {
        token: this.code,
        userId: this.$route.params['id']
      }
      console.log(body)
      const result = await comunication.post('auth/confirm-register', body)

      if (result.status != 200) {
        this.errors.push(result.data)
        return
      }

      await this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
