<template>
  <!-- single product -->
  <div class="single-product mt-150 mb-150">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="single-product-img">
            <img :src="this.product.file.url" alt="">
          </div>
        </div>
        <div class="col-md-7">
          <div class="single-product-content">
            <h3>{{ this.product.name }}</h3>
            <p class="single-product-pricing"><strong>Price:</strong> ${{ this.product.price }}
            <p/>
            <p class="single-product-pricing"><strong>Count:</strong> {{ this.product.count }}
            <p/>
            <p>{{ this.product.description }}</p>
            <div class="single-product-form">
              <form action="index.html">
                <input type="number" placeholder="0">
              </form>
              <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>

            </div>
            <h4>Share:</h4>
            <ul class="product-share">
              <li><a href=""><i class="fab fa-facebook-f"></i></a></li>
              <li><a href=""><i class="fab fa-twitter"></i></a></li>
              <li><a href=""><i class="fab fa-google-plus-g"></i></a></li>
              <li><a href=""><i class="fab fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end single product -->
</template>

<script>
import {Comunication} from '@/red/comunicationMethods'
import endpoints from "@/red/endpoints";

const comunication = new Comunication(endpoints.base_url)
export default {
  name: "productsDetails",
  data() {
    return {
      errors: [],
      product: {
        name: '',
        count: 0,
        price: 0,
        description: '',
        file: {}
      }
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
    }
  },
  created() {
    this.getProduct()
  }
}
</script>

<style scoped>

</style>
