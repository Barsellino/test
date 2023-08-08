<template>
    <div class="registration">
        <div class="registration__header">
            <h3 class="registration__title"> description </h3>
        </div>
        <form class="registration__form" @submit.prevent="submitForm">
            <h3 class="registration__title"> description </h3>
            <c-input v-model="form.username" placeholder="Username" :error="usernameError"/>
            <c-input v-model="form.phone" placeholder="Phone Number" :error="phoneError"/>
            <c-button title="Login"/>
        </form>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators';
import alphaValidator from '@/validators/alphaValidator';
import phoneValidator from '@/validators/phoneValidator';
import {mapActions} from 'vuex';

export default {
  name: 'RegistrationForm',
  components: {
    CButton: () => import('@/components/ui/c-Button.vue'),
    CInput: () => import('@/components/ui/c-Input.vue'),
  },
  data() {
    return {
      form: {
        username: null,
        phone: null
      }
    }
  },
  validations: {
    form: {
      username: {alphaValidator, required},
      phone: {phoneValidator, required},
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'checkUser']),
    async submitForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        try {
          await this.fetchUsers()
          await this.checkUser(this.form)
          this.$toast.success('Success')
          await this.$router.push('/todos')
        } catch (e) {
          this.$toast.error(e.message)
        }
      } else {
        console.log('invalid validation')
      }
    }
  },
  computed: {
    usernameError() {
      if (this.$v.form.username.$dirty && !this.$v.form.username.required) return 'Username is required'
      if (this.$v.form.username.$dirty && !this.$v.form.username.alphaValidator) return 'Username can only contain English letters'
      return ''
    },
    phoneError() {
      if (this.$v.form.username.$dirty && !this.$v.form.phone.required) return 'Phone is required'
      if (this.$v.form.username.$dirty && !this.$v.form.phone.phoneValidator) return 'Only numbers, dots, parentheses, spaces, and dashes allowed'
      return ''
    }
  }
}
</script>

<style scoped>
.registration {
    color: #5F5F5F;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.375px;
    width: 447px;
    padding-bottom: 0;
    align-items: center;
    border-radius: 5px;
    background: #C3C3C3;
    margin: 0 15px;
}

.registration__header {
    background: #A5A5A5;
    padding: 15px 0;
    display: flex;
    justify-content: center;
}

.registration__form {
    padding: 50px 25px 30px 25px;
    border-radius: 5px;
    background: #C3C3C3;
    height: 299px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.registration__title {
    color: #5F5F5F;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 123.529% */
    letter-spacing: -0.425px;
    padding: 0;
    margin: 0;
}

@media (max-width: 450px) {
    .registration__form {
        padding: 0 15px;
    }
}
</style>