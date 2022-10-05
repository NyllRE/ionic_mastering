<style lang="scss" scoped>

.icon {
   font-size: 6em;
   margin: .5em 0;
}

.label {
   color: grey;
}

.normal {
   font-size: 16px;
   margin: 0
}

.text {
   white-space: initial;
}

.days {
   display: flex;
   width: 100%;
   justify-content: space-evenly;
}
ion-item.day {
    .input-wrapper{
        flex: none;
        margin-left: auto;
      }
      ion-checkbox.checkbox{
         display: block;
    }
}input, label {
   display: block;
}
</style>


<template lang="pug">

BaseLayout(
   :title="habit ? habit.title : 'No habit found :/'"
   page-default-back-link="/habits"
)
   .ion-text-center( v-if="habit" )

      .icon
         IonIcon( :icon="habit.icon" :style="{color: habit.color}" )
         p.normal {{ dayjs(habit.date).from() }}

      IonList.days
         IonItem.day( v-for="_ in [0,0,0,0]" lines="full" )
            IonCheckbox
            IonLabel {{ dayjs(new Date()).format('DD/MM') }}



      IonList
         form( @submit.prevent="postComment" ) 
            IonItem
               IonLabel.label( position="floating" ) add a comment
               IonInput( v-model="comment" )
         br
         IonItem(
            v-for="comment in habit.comments"
            :key="comment.text"
         )
            IonLabel.text
               h3 {{ comment.text }}
               p {{ dayjs(comment.date).from() }}
            IonButton( slot="end" @click="removeComment(comment.id)" fill="clear" )
               IonIcon( :icon="trashBinOutline" slot="icon-only" )

   h1( v-else ) memory not found


</template>

<script setup>
import { ref, computed } from 'vue';
import { IonIcon, IonItem, IonLabel, IonInput, IonButton, IonList, IonCheckbox } from '@ionic/vue'
import { trashBinOutline } from 'ionicons/icons';
import { piniaStore } from '@/store'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

const store = piniaStore()
const id = ref(window.location.pathname.split('/')[2])

const habit = computed(() => {
   return store.habit(id.value)
})

const comment = ref('')
const postComment = () => {
   console.log(comment.value);
   store.addComment(id.value, comment.value);
   comment.value = ''
}
const removeComment = (commentId) => {
   store.removeComment(id.value, commentId);
}
</script>