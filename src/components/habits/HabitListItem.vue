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

.wrapper {
   background: linear-gradient(to right, rgb(223, 23, 16), rgb(102, 179, 8));
   display: flex;
   position: absolute;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   height: 4em;
   width: 100%;
}
</style>

<template lang="pug">

.wrapper 
   .column( ref="trash" )
      IonIcon.ion-margin-start( color="light" :icon="trashBinOutline" )
   .column.ion-text-right( ref="archive" )
      IonIcon.ion-margin-end( color="light" :icon="archiveOutline" )



#habitRef( ref="habitRef" )
   IonItem
      IonThumbnail( slot="start" :router-link="`/habits/${habit.id}`" )
         IonIcon.icon( :icon="habit.icon" :style="{color: habit.color}" )
      
      IonLabel( :router-link="`/habits/${habit.id}`" )
         h1 {{ habit.title }}
         h3 {{ dayjs(habit.date).from() }}
      

</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { trashBinOutline, archiveOutline } from 'ionicons/icons';
import { IonItem, IonThumbnail, IonLabel, IonIcon, IonButton, createGesture, createAnimation } from '@ionic/vue';
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


const habitRef = ref();
const trash = ref();
const archive = ref();
let animating = false
let animated = false
onMounted(() => {
   const gesture = createGesture({
      el: habitRef.value,
      threshold: 20,
     onStart: (e) => { habitRef.value.style.transform = ""},
      onMove: (detail) => { onMove(detail); },
     onEnd: (e) => { habitRef.value.style.transform = "" },
   })
   gesture.enable();



   const onMove = async (e) => {
      if (e.deltaX < -340 || e.deltaX < -65 || e.deltaX > 65) return

      habitRef.value.style.transform = `translateX(${e.deltaX}px)`

      //=>> trash animation
      if (e.deltaX >= 0 && e.deltaX > 50 && !animating && !animated) {
         await animateIcon(trash.value, false)
      }
      if (e.deltaX >= 0 && e.deltaX < 50 && !animating && animated) {
         await animateIcon(trash.value, true)
      }

      //=>> archive animation
      if (e.deltaX <= 0 && e.deltaX < -50 && !animating && !animated) {
         await animateIcon(archive.value, false)
      }
      if (e.deltaX <= 0 && e.deltaX > -50 && !animating && animated) {
         await animateIcon(archive.value, true)
      }
  }

})

const animateIcon = async (yourIcon, reversing) => {
   animating = true
   createAnimation()
      .addElement(yourIcon)
      .duration(100)
      .easing('ease-in')
      .fromTo('transform', 'scale(1)', 'scale(1.5)')
      .direction(reversing ? 'reverse' : 'normal')
      .play()
   animating = false
   animated = reversing ? false : true
}
</script>
