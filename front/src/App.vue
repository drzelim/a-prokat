<template>
  <RecordForm @fetchRecord="createRecord"/>
  <RecordList :records="records"/>
</template>

<script>
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import axios from "axios";

export default {
  name: 'App',
  components: {
    RecordForm, RecordList
  },

  data() {
    return {
      records: [],
      loading: false
    }
  },

  methods: {
    async getRecords() {
      try {
        const response = await axios.get('http://localhost:5555/orders');
        this.records = [];
        this.records.push(...response.data.reverse());
      } catch (err) {
        console.error(err);
      }
    },

    async createRecord(record) {
      console.log(record);
      try {
        await axios.put('http://localhost:5555/orders', {record});
        await this.getRecords();
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.getRecords();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.loading {
  opacity: 0.3;
  pointer-events: none;
}

</style>
