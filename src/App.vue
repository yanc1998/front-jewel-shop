<template>
  <div id="app">
    <layout></layout>
    <router-view/>
    <Footer></Footer>

  </div>
</template>

<style>

</style>
<script>
import layout from '@/components/layout'
import Footer from "@/components/footer";

export default {
  name: "App",
  components: {
    layout,
    Footer
  }
}
</script>
