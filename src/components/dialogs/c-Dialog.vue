<template>
    <div class="dialog-wrapper" v-if="isOpen">
        <div class="dialog-overlay" @click="closeDialog"></div>
        <div class="dialog-content">
            <slot></slot>
				<div class="dialog-buttons">
						<div class="dialog-button">
                <c-button title="Submit" @click="submitDialog" />
						</div>
						<div class="dialog-button">
                <c-button title="Close" @click="closeDialog" />
						</div>
				</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'c-Dialog',
  components: {
    CButton: () => import('@/components/ui/c-Button.vue')
  },
  props: {
    isOpen: Boolean
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    submitDialog() {
      this.$emit('submit');
    }
  }
};
</script>

<style scoped>
.dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
		min-width: 300px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
}

.dialog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.dialog-content {
    background-color: #d3cfcf;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		z-index: 10;
}
.dialog-buttons {
		display: flex;
		justify-content: space-between;
}
.dialog-button {
		margin: 5px;
}
</style>
