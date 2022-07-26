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
          <div class="form-group col-md-6 mb-3">
            <label>Count</label>
            <input v-model="count" type="text" class="form-control mt-1" id="count" name="count"
                   placeholder="Count">
          </div>
          <div class="form-group col-md-6 mb-3">
            <label>Price</label>
            <input v-model="price" type="text" class="form-control mt-1" id="price" name="price"
                   placeholder="Price">
          </div>
          <div class="form-group col-md-6 mb-3">
            <label>Image</label>
            <input v-on:change="this.getImage" type="file" class="form-control mt-1" id="image" name="image"
                   placeholder="Image" accept="image/*">
          </div>
        </div>

        <div class="row">
          <div class="col text-end mt-2">
            <button class="btn btn-success btn-lg px-3" @click="this.createProduct">Create</button>
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
  name: "addProducts",
  data() {
    return {
      name: '',
      description: '',
      price: 0,
      count: 0,
      image: null,
      file: null,
      errors: []
    }
  },
  methods: {
    async createProduct() {
      if (!this.name || !this.description || !this.file) {
        this.errors.push({
          message: 'create category error',
          code: 400
        })
        return
      }
      let data = comunication.addFormData({
        file: this.file,
        name: this.name,
        description: this.description,
        price: this.price,
        count: this.count,
        subcategoryId: this.$route.params['id']
      })
      comunication.setHeaders({'content-type': 'multipart/form-data; '})

      try {

        let result = await comunication.post('product/create', data)

        if (result.status != 200) {
          this.errors.push(result.data)
          return
        }
        await this.$router.back()
      } catch (error) {
        this.errors.push({
          name: error.name,
          description: error.description
        })
      }
    },
    getImage(event) {
      //Asignamos la imagen a  nuestra data
      this.file = event.target.files[0];
    }
  }
}
</script>

<style scoped>

</style>
