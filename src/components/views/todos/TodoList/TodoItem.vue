<template>
    <tr>
        <td class="column-data column-5">{{ item.userId }}</td>
        <td class="column-data column-75">{{ item.title }}</td>
        <td class="column-data last-column"
            :class="{ completed: item.completed, uncompleted: !item.completed}"
        >
            {{ completedStatus }}
        </td>
        <td class="column-data last-column favorite"
            @click="addFavorites(item.id)"
            :class="{ 'cursor-pointer': favoriteStatus === '+' }"
        >
            {{ favoriteStatus }}
        </td>
    </tr>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      allFavoritesItems: JSON.parse(localStorage.getItem('favorites'))
    }
  },
  computed: {
    completedStatus() {
      if (this.item.completed) {
        return 'Completed'
      } else {
        return 'Uncompleted'
      }
    },
    favoriteStatus() {
      if (this.allFavoritesItems?.includes(this.item.id)) {
        return 'is favorite'
      } else {
        return '+'
      }
    }
  },
  methods: {
    addFavorites(id) {
      this.allFavoritesItems = JSON.parse(localStorage.getItem('favorites'))
      if (!this.allFavoritesItems) {
        localStorage.setItem('favorites', `[${id}]`)
      } else {
        const favorites = this.allFavoritesItems
        favorites.push(id)
        localStorage.setItem('favorites', JSON.stringify([...new Set(favorites)]))
      }
    }
  },
	mounted() {
    if(!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', `[]`)
    }
  }
}
</script>

<style scoped>
.column-data {
    overflow: hidden;
}

.last-column {
    width: 10%;
		@media (max-width: 541px) {
				width: 7%;
    }
}

.column-75 {
    width: 75%;
}
.column-5 {
    width: 5%;
}

.column-75 {
    min-width: 100px; /* Мінімальна ширина стовпців */
}

.column-data {
    color: #f3f2f2;
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
}

.completed {
    color: #5e9851;
}

.uncompleted {
    color: #d55d5d;
}

.favorite {
    color: #bbac60;
}

.cursor-pointer {
    cursor: pointer;
    font-size: 30px;
    color: #ffffff;
}
</style>