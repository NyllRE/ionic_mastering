import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core'
import { codeSlash } from 'ionicons/icons';


// console.log(dayjs("2022-10-03T19:06:38.147Z").from());

export const piniaStore = defineStore('main', {
	state: () => ({
		habits: useLocalStorage('vueUseMain', [
			{
				id: String(Math.floor(Math.random() * (10 ** 10))),
				date: new Date(),
				title: 'Github Commit',
				dailyComment: [
					{
						text: 'You can Add Comments here Each day',
						date: new Date(),
					},
					{
						text: 'just like a diary, this way you can track your moods :)',
						date: new Date(),
					}
				],
				color: '#339',
				icon: codeSlash,
			},
		])
	}),
	getters: {
		habit(state) {
			return (id) =>
				state.habits.find((memory) => memory.id === id)
		},
	},
	actions: {
		addHabit(habit) {
			this.habits.unshift({
				id: String(Math.floor(Math.random() * (10 ** 10))),
				date: new Date(),
				title: habit.title,
				dailyComment: [],
				color: habit.color,
				icon: habit.icon,
			});
		},
		removeHabit(habitId) {
			const item = this.habits.find(() => this.habits.id === habitId)

			this.habits.splice(item, 1);
		},
		addComment(comment, habitId) {
			this.habits
				.find(this.habits.id === habitId)
				.dailyComment.unshift(comment)
		}
	}
})