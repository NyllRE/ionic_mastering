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
</style>

<template lang="pug">

HabitSlider

IonItem( ref="habitRef" )
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

const deleter = (id) => {
   console.log(id);
   store.removeHabit(id);
}



const habitRef = ref()
onMounted(() => {
   console.log(habitRef.value);
   const gesture = createGesture({
      el: habitRef.value,
      threshold: 0,
      direction: 'x',
      onMove: (e) => {
         console.log(e);
         if (e.deltaX < -340) return;
         if (e.deltaX > 20) {
            habitRef.value.style.transform = "";
            habitRef.value.dataset.open = "false";
            return
         }
         habitRef.value.style.transform = `translateX(${e.deltaX}px)`
      }
   })
   gesture.enable()
})
</script>
