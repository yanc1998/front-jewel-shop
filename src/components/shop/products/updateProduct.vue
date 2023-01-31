<template>
  <!-- Start Contact -->
  <div class="container py-5">
    <div class="row py-5">
      <div class="col-md-9 m-auto" method="post" role="form">
        <div class="row">
          <div class="form-group col-md-6 mb-3">
            <label>Name</label>
            <input v-model="product.name" type="email" class="form-control mt-1" id="name" name="name"
                   placeholder="Name">
          </div>
          <div class="form-group col-md-6 mb-3">
            <label>Description</label>
            <input v-model="product.description" type="text" class="form-control mt-1" id="description"
                   name="description"
                   placeholder="Description">
          </div>
          <div class="form-group col-md-6 mb-3">
            <label>Count</label>
            <input v-model="product.count" type="text" class="form-control mt-1" id="count" name="count"
                   placeholder="Count">
          </div>
          <div class="form-group col-md-6 mb-3">
            <label>Price</label>
            <input v-model="product.price" type="text" class="form-control mt-1" id="price" name="price"
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
            <button class="btn btn-success btn-lg px-3" @click="this.updateProduct">Update</button>
          </div>
        </div>


      </div>
    </div>
  </div>
  <!-- End Contact -->
</template>

<script>
import {Comunication} from '@/red/comunicationMethods'
import endpoints from "@/red/endpoints";
import {loadToken} from "@/red/authMethods";

const comunication = new Comunication(endpoints.base_url)

export default {
  name: "updateProduct",
  data() {
    return {
      product: {
        id: '',
        name: '',
        description: '',
        price: 0,
        count: 0,
        file: null,
      },
      image: null,
      errors: []
    }
  },
  methods: {
    async getProduct() {
      const id = this.$route.params['id']
      const response = await comunication.get('product', id)
      const data = response.data
      if (response.status != 200) {
        this.errors.push({
          name: data.name,
          description: data.description
        })
      }
      this.product = data
    },
    async updateProduct() {
      if (!this.product.name || !this.product.description || !this.product.file) {
        this.errors.push({
          message: 'update product error',
          code: 400
        })
        console.log(this.errors)
        return
      }

      let data = comunication.addFormData({
        file: this.product.file,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        count: this.product.count,
        productId: this.product.id
      })
      comunication.setHeaders({'content-type': 'multipart/form-data; ', 'Access-Control-Allow-Origin': '*'})
      comunication.setToken(loadToken())
      try {

        let result = await comunication.put('product', data)

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
      const file = event.target.files[0];
      //Asignamos la imagen a  nuestra data
      this.product.file = file
    }
  },
  created() {
    this.getProduct()
  }
}
</script>

<style scoped>

</style>
