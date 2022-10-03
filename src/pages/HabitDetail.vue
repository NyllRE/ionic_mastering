<style lang="scss" scoped>

.icon {
   font-size: 5em;
   margin-bottom: 1em;
}

.label {
   color: grey
}
</style>


<template lang="pug">

BaseLayout(
   :title="habit ? habit.title : 'No habit found :/'"
   page-default-back-link="/habits"
)
   .ion-text-center( v-if="habit" )

      IonIcon.icon( :icon="habit.icon" )

      form( @submit.prevent="" )
         IonItem
            IonLabel.label( position="floating" ) add a comment
            IonInput

      IonItem(
         v-for="comment in habit.dailyComment"
         :key="comment.text"
      )
         IonLabel
            h3 {{ comment.text }}
            p {{ dayjs(comment.date).from() }}

   h1( v-else ) memory not found


</template>

<script setup>
import { ref, computed } from 'vue';
import { IonIcon, IonItem, IonLabel, IonInput } from '@ionic/vue'
import { piniaStore } from '@/store'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const store = piniaStore()
const id = ref(window.location.pathname.split('/')[2])

const habit = computed(() => {
   return store.habit(id.value)
})

// console.log(store.habit(id.value));

</script>