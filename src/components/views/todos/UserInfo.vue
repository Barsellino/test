<template>
    <div>
        <div v-if="isAuth" class="user-info">
            <div class="user-info__name">
                {{ userInfo.name }}
            </div>
            <div class="user-info__main">
                <div class="user-info__block">
                    <div class="user-info__item">
                        email: {{ userInfo.email }}
                    </div>
                    <div class="user-info__item">
                        phone: {{ userInfo.phone }}
                    </div>
                    <div class="user-info__item">
                        company: {{ userInfo.company.name }}
                    </div>
                </div>
                <div class="user-info__block">
                    <div class="user-info__item">city: {{ userInfo.address.city }}</div>
                    <div class="user-info__item">street: {{ userInfo.address.street }}</div>
                    <div class="user-info__item">suite: {{ userInfo.address.suite }}</div>
                </div>
            </div>
        </div>
        <div v-else class="user-info__no-login">
            <div class="user-info__need-login">
               Please log in.
            </div>
            <div>
              <c-button title="Login" @click="$router.push('/')"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'UserInfo',
  components: {
    CButton: () => import('@/components/ui/c-Button.vue')
  },
  computed: {
    ...mapGetters({
			userInfo: 'getUserInfo',
			isAuth: 'getIsAuth'
    })
  }
}
</script>

<style scoped>
.user-info {
    padding: 20px 0;
}

.user-info__name {
    font-size: 32px;
    margin-bottom: 20px;
}

.user-info__main {
    display: flex;
}

.user-info__block {
    margin: 0 30px 0 0;
}

.user-info__item {
    margin: 0 0 5px 0;
}

.user-info__no-login {
    padding: 20px 0;
    display: flex;
		justify-content: center;
}
.user-info__need-login {
		font-size: 26px;
		display: flex;
		align-items: center;
		margin-right: 15px;
}
</style>