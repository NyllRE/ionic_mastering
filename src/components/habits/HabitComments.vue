<style scoped>
.text-extend {
   white-space: initial;
}
.comment {
   color: grey !important;
}
</style>

<template lang="pug">
IonList   
   IonItem
      form( @submit.prevent="postComment" ) 
         IonLabel.comment( position="floating" ) add a comment
         IonInput( v-model="comment" )

   IonItem(
      v-for="comment in comments"
      :key="comment.id"
   )
      IonLabel
         h3.text-extend {{ comment.text }}
         p {{ dayjs(comment.date).from() }}
      IonButton( slot="end" @click="removeComment(comment.id)" fill="clear" )
         IonIcon( :icon="trashBinOutline" slot="icon-only" )
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { piniaStore } from '@/store'
import { IonIcon,IonItem,IonLabel,IonInput,IonButton,IonList } from '@ionic/vue'
import { trashBinOutline } from 'ionicons/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const store = piniaStore()
const props = defineProps(['comments', 'habitId'])

const comment = ref('')
const postComment = () => {
   console.log(comment.value);
   if (comment.value != '') {
      store.addComment(props.habitId, comment.value);
      comment.value = ''
   }
}

const removeComment = (commentId) => {
   store.removeComment(props.habitId, commentId);
}

</script>