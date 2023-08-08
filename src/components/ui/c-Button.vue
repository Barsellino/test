<template>
    <button class="main-button" @click="handleClick">
        {{ title }}
    </button>
</template>

<script>
export default {
  name: 'c-Button',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.main-button {
    display: flex;
    padding: 10px 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 5px;
    background: #519945;
    color: #FFF;
    font-family: Roboto, sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.425px;
    width: 100%;
    border: none;
    cursor: pointer;
}

.main-button:active {
    background: #62ab52;
}
</style>