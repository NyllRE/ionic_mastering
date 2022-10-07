<style lang="scss" scoped>

.icon-holder {
   font-size: 6em;
   margin: .5em 0;
}
.comment {
   color: grey;
}
.normal {
   font-size: 16px;
   margin: 0;
}
.text {
   white-space: initial;
}

.days {
   display: flex;
   width: 100%;
   justify-content: space-evenly;
   .day {
      display: flex;
      flex-direction: column;
      align-items: center;
      ion-checkbox {
         --size: 30px;
         --background-checked: #6815ec;
         
         &::part(container) {
            border-radius: 10px;
            border: 2px solid #6815ec;
         }
      }
      .b {
         font-family: 'Quicksand', sans-serif;
      }
   }
}


</style>


<template lang="pug">

BaseLayout(
   :title="habit ? habit.title : 'No habit found :/'"
   page-default-back-link="/habits"
)
   .ion-text-center( v-if="habit" )

      .icon-holder
         IonIcon(
            :icon="habit.icon"  @click="notify"
            :style="{color: habit.color}" )
         p.normal {{ dayjs(habit.date).from() }}

      IonList.days
         IonItem( v-for="idx in [4,3,2,1,0]" lines="none" )
            .day
               IonCheckbox
               IonLabel.b {{ dayjs(new Date()).subtract(idx, 'day').format('DD/MM') }}



      IonList
         form( @submit.prevent="postComment" ) 
            IonItem
               IonLabel.comment( position="floating" ) add a comment
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
import { localNotifications } from '@capacitor/local-notifications'

dayjs.extend(relativeTime)

const store = piniaStore()
const id = ref(window.location.pathname.split('/')[2])

const habit = computed(() => {
   return store.habit(id.value)
})

const comment = ref('')
const postComment = () => {
   console.log(comment.value);
   if (comment.value != '') {
      store.addComment(id.value, comment.value);
      comment.value = ''
   } else {

   }
}

const removeComment = (commentId) => {
   store.removeComment(id.value, commentId);
}

const notify = () => {
   localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' }
    });
}
</script>