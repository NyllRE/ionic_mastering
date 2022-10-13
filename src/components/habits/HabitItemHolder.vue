<!-- @format -->

<style lang="scss" scoped>

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
	.ios .wrapper {
		height: 4.23em
	}

	#habit {
		height: 4.5em;
	}

</style>

<template lang="pug">

.wrapper 
	.column( ref="trash" )
		IonIcon.ion-margin-start( color="light" :icon="trashBinOutline" )
	.column.ion-text-right( ref="archive" )
		IonIcon.ion-margin-end( color="light" :icon="archiveOutline" )


#habit( ref="habitRef" )
	HabitItem( :habit="habit" )


//- for debugging purposes
//- p {{ Math.round( slideDistance ) }} 

</template>

<script setup>
	import { defineProps, onMounted, ref } from 'vue';
	import {
		IonIcon,
		createGesture,
      createAnimation,
      alertController
	} from '@ionic/vue';
	import HabitItem from './HabitItem.vue'
	import { trashBinOutline, archiveOutline } from 'ionicons/icons'
	import { Haptics, ImpactStyle } from '@capacitor/haptics'
	import { piniaStore } from '@/store';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';

	dayjs.extend(relativeTime);

	const props = defineProps(['habit']);
	const store = piniaStore();

	const deleter = () => {
		store.removeHabit(props.habit.id);
	};

	const habitRef = ref();
	const trash = ref();
	const archive = ref();
	let animating = false;
	let animated = false;
   let triggerAction = undefined;
   let slideDistance = ref(0);
	onMounted(() => {
		const gesture = createGesture({
			el: habitRef.value,
         threshold: 30,
         onStart: () => habitRef.value.style.transform = '',
			onMove: (e) => onMove(e),
         onEnd: async (e) => onEnd(e),
		});
		gesture.enable(true);
         
		const onMove = async (e) => {
         /* check direction
         & check the trigger limit
         & check if it's already animating
         & check if it's already animated    */

			//=>> icon animations
			
			
			//=>> Trigger sides
			if (e.deltaX > 0 && e.deltaX > 50 && !animated) {
				await Haptics.impact({ style: ImpactStyle.Light })
				triggerAction = 'trash';
				animated = true;
			}
			if (e.deltaX >= 0 && e.deltaX < 50 && animated) {
				triggerAction = undefined;
				animated = false;
			}
			
			if (e.deltaX < 0 && e.deltaX < -50 && !animated) {
				await Haptics.impact({ style: ImpactStyle.Light })
				triggerAction = 'archive';
				animated = true
			}
			if (e.deltaX <= 0 && e.deltaX > -50 && animated) {
				triggerAction = undefined;
				animated = false
			}

			//=>> if value is more than 60 or less than -60 don't move it
			if (e.deltaX < -60 || e.deltaX > 60) {
				habitRef.value.style.transform =
					`translateX(${e.deltaX < 0 ? '-60' : '60'}px)`
				console.log(e.deltaX);
				trash.value.style.transform = archive.value.style.transform = 'scale(1.5)'
				return;
			};
			
			slideDistance.value = e.deltaX

			trash.value.style.transform =
				`scale(${Math.abs(e.deltaX) / 40})`

			archive.value.style.transform =
				`scale(${Math.abs(e.deltaX) / 40})`
				
			habitRef.value.style.filter = `brightness(${1 - Math.abs(e.deltaX) / 300})`
			habitRef.value.style.transform = `translateX(${e.deltaX}px)`;
      };
      
      const onEnd = async (e) => {
			gesture.enable(false)
			if (triggerAction == 'trash') {
				const alert = await alertController.create({
					header: `Are you sure you want to delete ${props.habit.title}?`,
					buttons: [
						{
							text: 'No',
							role: 'cancel',
						},
						{
							text: 'Yes',
							role: 'confirm',
							handler: () => {
								deleter();
							},
						},
					],
				});
				alert.present();

			} else if (triggerAction == 'archive') {

				const alert = await alertController.create({
					header: 'Archive Feature is not ready yet',
					buttons: [
						{
							text: 'I understand',
							role: 'confirm',
						}
					],
				});
				alert.present()

			}

         const returnAnimation = createAnimation()
            .addElement(habitRef.value)
            .duration(100)
            .fromTo('transform',
               `translateX(${slideDistance.value}px)`,
               'translateX(0px)'
            )
         await returnAnimation.play()
         returnAnimation.destroy(true)
         gesture.enable(true)
         triggerAction = undefined
			habitRef.value.style.transform = ''
			habitRef.value.style.filter = ''
         
      }

	});

	const animateIcon = async (yourIcon, reversing) => {
		animating = true;
		createAnimation()
		.addElement(yourIcon)
		.duration(100)
		.easing('ease-out')
		.fromTo('transform', 'scale(1)', 'scale(1.5)')
		.direction(reversing ? 'reverse' : 'normal')
		.play();
		animating = false;
		animated = reversing ? false : true;
	};
</script>
