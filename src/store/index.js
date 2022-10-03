import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core'
import { codeSlash } from 'ionicons/icons';


const randomId = () => {
	return String(Math.floor(Math.random() * (10 ** 10)))
}

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
						id: randomId()
					},
					{
						text: 'just like a diary, this way you can track your moods :)',
						date: new Date(),
						id: randomId(),
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

			this.habits.splice(this.habit(habitId), 1);
		},
		addComment(habitId, comment) {
			const habit = this.habit(habitId)
			console.log(habitId, habit);
			habit.dailyComment.unshift({
				text: comment,
				id: randomId(),
				date: new Date(),
			})
		},
		removeComment(habitId, commentId) {
			const habit = this.habit(habitId)
		}
	}
})