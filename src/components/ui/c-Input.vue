<template>
    <div>
        <input
                class="main-input"
                :class="{ 'error-input': error }"
                :placeholder="placeholder"
                :value="value"
                @input="updateValue($event.target.value)"
        />
        <div v-if="error" class="error-message">{{ error }}</div>
    </div>
</template>

<script>
export default {
  name: "c-Input",
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    }
  }
}
</script>

<style scoped>
.main-input {
    display: flex;
    padding: 10px;
    align-items: center;
    border-radius: 5px;
    background: #FFF;
    color: #353535;
    font-family: Roboto, sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.425px;
    width: 100%;
    border: none;
}

.error-input {
    border: 1px solid #ff0000;
}

.error-message {
    color: #ff0000;
    font-size: 14px;
    margin-top: 5px;
}
</style>
