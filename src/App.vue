<template>
  <div id="app">
    <v-form ref="form" class="ml-5">
          <v-text-field label="amount spent"></v-text-field>
         
          <v-btn @click="submit">submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    };
  },
  methods: {
    submit() {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.v-form {
  width: 300px;
}
</style>
