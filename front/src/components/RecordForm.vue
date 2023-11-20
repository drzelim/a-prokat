<template>
  <div>
    <form @submit.prevent>
      <label>
        <textarea class="input-field"
                  v-model="record.comment"
                  id="comment"
                  placeholder="Комментарий"
        />
      </label>
      <label>
        <span>Статус заказа</span>
        <select class="input-field" name="status" v-model="record.status">
          <option value="1">Новый</option>
          <option value="2">Выполнен</option>
        </select>
      </label>
      <button class="button" @click="createRecord" type="submit">Создать запись</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: {
        comment: '',
        status: 1
      }

    };
  },
  methods: {
    createRecord() {
      this.record.id = new Date();
      this.$emit('fetchRecord', this.record);

      this.record = {
        comment: '',
        status: 1
      }
    },


  },
};
</script>

<style>
form {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  max-width: 600px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}



.input-field {
  width: 100%;
  padding: 10px 0;
  margin: 0;

  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.button {
  outline: 0;
  background-color: #2c3e50;

  border: 1px solid;
  padding: 8px;
  color: white;

  border-radius: 8px;
  max-width: 300px;
}

label {
  width: 100%;
}
</style>
