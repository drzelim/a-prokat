<template>
  <div class="records" v-if="records.length > 0">
    <div  class="record" v-for="record in records" v-bind:key=record.id>
      <div>Id: {{ record.id }}</div>
      <div>Комментарий: <strong>{{ record.title }}</strong></div>
      <div>Статус заказа: <strong>{{ record.values['2'][0] === '2' ? "Выполнен" : 'Новый' }}</strong></div>
    </div>

  </div>
  <h2 v-else>Заказы не найдены</h2>

</template>

<script>

export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  }
};

</script>

<style>
.records {
  display: flex;
  flex-direction: column;
  gap: 16px;

  max-width: 600px;

  margin: 24px auto 0;

  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.record {
  border: 1px solid #2c3e50;
  padding: 8px;
  text-align: start;


}
</style>
