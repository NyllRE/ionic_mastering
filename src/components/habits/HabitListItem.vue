<style lang="scss" scoped>
.icon {
   font-size: 3em;
}
.remover {
   font-size: 2em;
}
ion-thumbnail { // centers the icon placement
   display: flex;
   justify-content: center;
   align-items: center;
}
ion-item {
   height: 4em

}

.rect {
   width: 100%;
   height: 6em;
   background: #404;
}
</style>

<template lang="pug">

HabitSlider

#habitRef( ref="habitRef" )
   IonItem
      IonThumbnail( slot="start" :router-link="`/habits/${habit.id}`" )
         IonIcon.icon( :icon="habit.icon" :style="{color: habit.color}" )
      
      IonLabel( :router-link="`/habits/${habit.id}`" )
         h1 {{ habit.title }}
         h3 {{ dayjs(habit.date).from() }}
      
      IonButton( slot="end" @click="deleter(habit.id)" fill="clear" )
         IonIcon.remover( :icon="trashBinOutline" )

</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { trashBinOutline } from 'ionicons/icons';
import { IonItem, IonThumbnail, IonLabel, IonIcon, IonButton, createGesture } from '@ionic/vue';
import HabitSlider from './HabitSlider.vue';
import { piniaStore } from '@/store';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const props = defineProps(["habit"])
const store = piniaStore()

const deleter = () => {
   console.log(props.habit.id);
   store.removeHabit(props.habit.id);
}


let pRef = ref();
const habitRef = ref();
onMounted(() => {
   const gesture = createGesture({
     el: habitRef.value,
     onMove: (detail) => { onMove(detail); }
   })
   
   gesture.enable();
   
   const onMove = (e) => {
      if (e.deltaX < -340) return;
      if (e.deltaX < -100) {
         habitRef.value.style.transform = ""
         return
      }
      if (e.deltaX > 100) {
         habitRef.value.style.transform = "";
         // deleter()
         return
      }
      habitRef.value.style.transform = `translateX(${e.deltaX}px)`
   }
})
</script>
