<template>
  <!-- latest news -->
  <div class="latest-news mt-150 mb-150">
    <div class="container">
      <div class="row">

        <div class="col-lg-4 col-md-6" v-for="item in users" v-bind:key="item.id">
          <div class="single-latest-news">
            <router-link :to="'/user/details/' + item.id">
              <a>
                <div class="latest-news-bg news-bg-1">
                </div>
              </a>
            </router-link>

            <div class="news-text-box">
              <h3>
                <router-link :to="'/user/details/' + item.id">{{ item.email }}</router-link>
              </h3>
              <p class="blog-meta">
                <span class="author"><i class="fas fa-user"></i> {{ getRoles(item) }}</span>
                <span class="date"><i class="fas fa-calendar"></i> {{ getCreateDate(item) }}</span>
                <span class="date"><i class="fas fa-calendar"></i> {{ item.status }}</span>
              </p>
              <p class="excerpt">{{ item.username }}</p>
              <router-link :to="'/user/details/' + item.id"><a class="read-more-btn">see more <i
                  class="fas fa-angle-right"></i></a></router-link>

            </div>
          </div>
        </div>


      </div>

      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="pagination-wrap">
                <ul>
                  <li><a @click="prev">Prev</a></li>
                  <li><a>{{ pageNum }}</a></li>
                  <li><a class="active">/</a></li>
                  <li><a>{{ totalPages }}</a></li>
                  <li><a @click="next">Next</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end latest news -->
</template>

<script>
import {Comunication} from "@/red/comunicationMethods";
import endpoints from "@/red/endpoints";
import {loadToken} from "@/red/authMethods";

const comunication = new Comunication(endpoints.base_url)
export default {
  name: "list",
  data() {
    return {
      users: [],
      errors: [],
      pageNum: 1,
      pageLimit: 6,
      totalPages: 1,
    }
  },
  methods: {
    async findUsers() {
      const body = {
        pageParams: {
          pageNum: this.pageNum,
          pageLimit: this.pageLimit
        },
        filter: {}

      }
      comunication.setToken(loadToken())
      const response = await comunication.post('user', body)
      if (response.status != 200) {
        this.errors.push(response.data)
        return
      }
      const data = response.data
      this.users = data.items
      this.totalPages = data.totalPages
      this.pageNum = data.currentPage
    },
    getRoles(user) {
      let stringRole = ''
      for (const role of user.roles) {
        stringRole += role
      }
      return stringRole
    },
    getCreateDate(user) {
      const date = new Date(user.createdAt).toDateString().split(' ')
      date.shift()
      return date[1] + ' ' + date[0] + ' ' + date[2]
    },
    async next() {
      if (this.pageNum < this.totalPages) {
        this.pageNum += 1
        await this.findUsers()
      }
    },
    async prev() {
      if (this.pageNum > 1) {
        this.pageNum -= 1
        await this.findUsers()
      }
    }
  },
  created() {
    this.findUsers()
  }
}
</script>

<style scoped>

</style>
