<template>
  <!-- Start Contact -->
  <div class="container py-5">
    <div class="row py-5">
      <div class="col-md-9 m-auto" method="post" role="form">
        <div class="row">
          <div class="form-group col-md-6 mb-3">
            <label>Name</label>
            <input v-model="name" type="email" class="form-control mt-1" id="name" name="name" placeholder="Name">
          </div>
          <div class="form-group col-md-6 mb-3">
            <label>Description</label>
            <input v-model="description" type="text" class="form-control mt-1" id="description" name="description"
                   placeholder="Description">
          </div>
        </div>

        <div class="row">
          <div class="col text-end mt-2">
            <button class="btn btn-success btn-lg px-3" @click="this.createSubCategory">Create</button>
          </div>
        </div>


      </div>
    </div>
  </div>
  <!-- End Contact -->
</template>

<script>
import {Comunication} from '@/red/comunicationMethods'

const comunication = new Comunication('http://localhost:3001/')
export default {
  name: "addSubcategories",
  data() {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    async createSubCategory() {
      if (!this.name || !this.description) {
        this.errors.push({
          message: 'create category error',
          code: 400
        })
        return
      }
      const body = {
        name: this.name,
        description: this.description,
        categoryId: this.$route.params['id']//poner lo que se pasa en la ruta
      }
      let result = await comunication.post('subcategory/create', body)

      if (result.status != 200) {
        this.errors.push(result.data)
        return
      }
      await this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
