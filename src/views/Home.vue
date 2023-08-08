<template>
    <div class="home-page">
        <registration-form/>
    </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    RegistrationForm: () => import('@/components/views/home/RegistrationForm.vue'),
  }
}
</script>

<style scoped>
.home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #545454;
    height: 100vh;
}
</style>