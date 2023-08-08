<template>
    <div class="custom-selector">
        <div class="selected-option" @click="toggleDropdown">{{ selectedOption.name || 'Select' }}</div>
        <ul v-if="isDropdownOpen" class="options-list">
            <li v-for="(option, index) in options" :key="index" @click="selectOption(option)"
                :class="{ active: option === selectedOption}">
                {{ option.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: {}
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
      this.$emit('selected', option);
    },
    closeDropdown(event) {
      if (this.isDropdownOpen && !this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    }
  },
  mounted() {
    if (this.options.length > 0) {
      this.selectedOption = this.options[0];
    }
    window.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<style scoped>
.custom-selector {
    position: relative;
    display: inline-block;
    width: 150px;
}

.selected-option {
    border-radius: 5px;
    cursor: pointer;
    padding: 8px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333; /* Темний колір тексту */
}

.selected-option:empty::before {
    content: 'Select an option';
    color: #888; /* Колір для показу, коли нічого не обрано */
}

.options-list {
    position: absolute;
    top: 100%;
    left: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    background-color: #fff;
    z-index: 1;
    width: 99%;
}

.options-list li {
    padding: 9px;
    cursor: pointer;
    color: #545454;
}

.options-list li:hover {
    background-color: #f0f0f0;
}

.active {
    background-color: #b7b4b4; /* Підсвічування обраного варіанта */
}
</style>
