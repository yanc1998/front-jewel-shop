<template>
  <div>
    <!-- Modal -->
    <div class="modal fade bg-white" id="templatemo_search" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="w-100 pt-1 mb-5 text-right">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="" method="get" class="modal-content modal-body border-0 p-0">
          <div class="input-group mb-2">
            <input type="text" class="form-control" id="inputModalSearch" name="q" placeholder="Search ...">
            <button type="submit" class="input-group-text bg-success text-light">
              <i class="fa fa-fw fa-search text-white"></i>
            </button>
          </div>
        </form>
      </div>
    </div>


    <!-- Start Content -->
    <div class="container py-5">
      <div class="row">

        <div class="col-lg-3">

          <a v-if="isAdmin" class="collapsed d-flex justify-content-between h3 text-decoration-none">
            <router-link to="/add-category"><i class="fa fa-fw fa-plus-circle mt-1"></i></router-link>
          </a>
          <h1 class="h2 pb-4">Categories</h1>

          <ul class="list-unstyled templatemo-accordion">

            <li class="pb-3" v-for="item in this.categories" v-bind:key="item.id">
              <a class="collapsed d-flex justify-content-between h3 text-decoration-none" @click="setCategory(item.id)">
                {{ item.name }}
                <i class="fa fa-fw fa-chevron-circle-down mt-1" @click="setCategory(item.id)"></i>
              </a>
            </li>
          </ul>


          <a v-if="this.categoryId && this.isAdmin"
             class="collapsed d-flex justify-content-between h3 text-decoration-none" href="#">
            <router-link :to="'/add-subcategory/'+categoryId"><i class="fa fa-fw fa-plus-circle mt-1"></i>
            </router-link>
          </a>
          <h1 class="h2 pb-4">Subcategories</h1>
          <ul class="list-unstyled templatemo-accordion">
            <li class="pb-3" v-for="item in this.subcategories" v-bind:key="item.id">
              <a class="collapsed d-flex justify-content-between h3 text-decoration-none"
                 @click="setSubCategory(item.id)">
                {{ item.name }}
                <i class="fa fa-fw fa-chevron-circle-down mt-1" @click="setSubCategory(item.id)"></i>
              </a>
            </li>
          </ul>

        </div>

        <div class="col-lg-9">
          <div class="row">
            <div class="col-md-6">
              <ul class="list-inline shop-top-menu pb-3 pt-1">
                <li class="list-inline-item">
                  <a class="h3 text-dark text-decoration-none mr-3" href="#">All</a>
                </li>
                <li class="list-inline-item">
                  <a class="h3 text-dark text-decoration-none mr-3" href="#">Men's</a>
                </li>
                <li class="list-inline-item">
                  <a class="h3 text-dark text-decoration-none" href="#">Women's</a>
                </li>
              </ul>
            </div>
            <div class="col-md-6 pb-4">
              <div class="d-flex">
                <select class="form-control">
                  <option>Featured</option>
                  <option>A to Z</option>
                  <option>Item</option>
                </select>
                <a v-if="this.subcategoryId && this.isAdmin"
                   class="collapsed d-flex justify-content-between h3 text-decoration-none"
                   href="#">
                  <router-link :to="'/add-product/'+subcategoryId"><i class="fa fa-fw fa-plus-circle mt-1"></i>
                  </router-link>
                </a>
              </div>
            </div>

          </div>
          <div class="row">
            <div class="col-md-4" v-for="item in this.products" v-bind:key="item.id">
              <div class="card mb-4 product-wap rounded-0">

                <div class="card rounded-0">
                  <img class="card-img rounded-0 img-fluid" :src="getImage(item)">
                  <div
                      class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul class="list-unstyled">
                      <li>
                        <router-link :to="/product-details/+item.id" class="btn btn-success text-white"><i
                            class="far fa-heart"></i></router-link>
                      </li>
                      <li>
                        <router-link :to="/product-details/+item.id" class="btn btn-success text-white mt-2"><i
                            class="far fa-eye"></i>
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="/product-details/+item.id" class="btn btn-success text-white mt-2"><i
                            class="fas fa-cart-plus"></i>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card-body">
                  <router-link :to="/product-details/+item.id" class="h3 text-decoration-none">{{
                      item.name
                    }}
                  </router-link>
                  <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                    <li>M/L/X/XL</li>
                    <li class="pt-2">
                      <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                      <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                      <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                      <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                      <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                    </li>
                  </ul>
                  <router-link :to="/product-update/+item.id" class="h3 text-decoration-none">Update
                  </router-link>
                  <ul class="list-unstyled d-flex justify-content-center mb-1">
                    <li>
                      <i class="text-warning fa fa-star"></i>
                      <i class="text-warning fa fa-star"></i>
                      <i class="text-warning fa fa-star"></i>
                      <i class="text-muted fa fa-star"></i>
                      <i class="text-muted fa fa-star"></i>
                    </li>
                  </ul>
                  <p class="text-center mb-0">${{ item.price }}</p>
                </div>
              </div>
            </div>

          </div>
          <div div="row">
            <ul class="pagination pagination-lg justify-content-end">
              <li class="page-item">
                <a class="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" @click="prev"
                   tabindex="-1">Prev</a>
              </li>
              <li class="page-item">
                <a class="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0"
                   href="#">{{ this.pageNum }}/{{ this.totalPages }}</a>
              </li>
              <li class="page-item">
                <a class="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" @click="next">Next</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <!-- End Content -->

    <!-- Start Brands -->
    <section class="bg-light py-5">
      <div class="container my-4">
        <div class="row text-center py-3">
          <div class="col-lg-6 m-auto">
            <h1 class="h1">Our Brands</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <div class="col-lg-9 m-auto tempaltemo-carousel">
            <div class="row d-flex flex-row">
              <!--Controls-->
              <div class="col-1 align-self-center">
                <a class="h1" href="#multi-item-example" role="button" data-bs-slide="prev">
                  <i class="text-light fas fa-chevron-left"></i>
                </a>
              </div>
              <!--End Controls-->

              <!--Carousel Wrapper-->
              <div class="col">
                <div class="carousel slide carousel-multi-item pt-2 pt-md-0" id="multi-item-example"
                     data-bs-ride="carousel">
                  <!--Slides-->
                  <div class="carousel-inner product-links-wap" role="listbox">

                    <!--First slide-->
                    <div class="carousel-item active">
                      <div class="row">
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_01.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_02.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_03.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_04.png"
                                           alt="Brand Logo"></a>
                        </div>
                      </div>
                    </div>
                    <!--End First slide-->

                    <!--Second slide-->
                    <div class="carousel-item">
                      <div class="row">
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_01.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_02.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_03.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_04.png"
                                           alt="Brand Logo"></a>
                        </div>
                      </div>
                    </div>
                    <!--End Second slide-->

                    <!--Third slide-->
                    <div class="carousel-item">
                      <div class="row">
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_01.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_02.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_03.png"
                                           alt="Brand Logo"></a>
                        </div>
                        <div class="col-3 p-md-5">
                          <a href="#"><img class="img-fluid brand-img" src="assets/img/brand_04.png"
                                           alt="Brand Logo"></a>
                        </div>
                      </div>
                    </div>
                    <!--End Third slide-->

                  </div>
                  <!--End Slides-->
                </div>
              </div>
              <!--End Carousel Wrapper-->

              <!--Controls-->
              <div class="col-1 align-self-center">
                <a class="h1" href="#multi-item-example" role="button" data-bs-slide="next">
                  <i class="text-light fas fa-chevron-right"></i>
                </a>
              </div>
              <!--End Controls-->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--End Brands-->

  </div>
</template>

<script>
import {Comunication} from '@/red/comunicationMethods'
import {isAdmin} from "@/red/authMethods";
import endpoints from "@/red/endpoints";

const comunication = new Comunication(endpoints.base_url)
export default {
  name: "Shop",
  data() {
    return {
      categories: [],
      subcategories: [],
      categoryId: "",
      subcategoryId: "",
      products: [],
      errors: [],
      pageNum: 1,
      pageLimit: 6,
      totalPages: 1,
      isAdmin: false
    }
  },
  methods: {
    async findCategories() {
      const body = {
        pageParams: {
          pageNum: this.pageNum,
          pageLimit: this.pageLimit
        },
        filter: {}

      }
      const response = await comunication.post('category', body)
      if (response.status != 200) {
        this.errors.push(await response.data)
        return
      }
      const data = response.data
      this.categories = data.items
    },
    async findSubCategories() {
      const body = {
        pageParams: {
          pageNum: this.pageNum,
          pageLimit: this.pageLimit
        },
        filter: {categoryId: this.categoryId}

      }
      const response = await comunication.post('subcategory', body)
      if (response.status != 200) {
        this.errors.push(response.data)
        return
      }
      const data = response.data
      this.subcategories = data.items
    },
    async findProducts() {
      const body = {
        pageParams: {
          pageNum: this.pageNum,
          pageLimit: this.pageLimit
        },
        filter: {
          filter: {
            $and: {
              subcategoryId: this.subcategoryId
            }
          },
          relations: {
            file: {}
          }
        }

      }
      const response = await comunication.post('product', body)
      if (response.status != 200) {
        this.errors.push(response.data)
        return
      }
      const data = response.data
      this.products = data.items
      this.totalPages = data.totalPages
      this.pageNum = data.currentPage > 0 ? data.currentPage : this.pageNum
    },
    async setCategory(categoryId) {
      this.categoryId = categoryId
      await this.findSubCategories()
    },
    async setSubCategory(subcategoryId) {
      this.subcategoryId = subcategoryId
      await this.findProducts()
    },
    async next() {
      if (this.pageNum < this.totalPages) {
        this.pageNum += 1
        await this.findProducts()
      }
    },
    async prev() {
      if (this.pageNum > 1) {
        this.pageNum -= 1
        await this.findProducts()
      }
    },
    getImage(item) {
      console.log(item.file.url)
      return "http://localhost:3001" + item.file.url
    }
  },
  async created() {
    await this.findCategories()
    this.isAdmin = await isAdmin()
    console.log(this.isAdmin)
  }

}
</script>

<style scoped>

</style>
