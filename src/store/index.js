import { createStore } from "vuex";

export const store = createStore({
	state() {
		return {
			memories: [
				{
					id: 'm1',
					title: 'A trip to the mountains',
					description: 'none of us would be here without cum\n - Kanye Hussein',
					image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Fzmjnj377ts511.png&f=1&nofb=1&ipt=d717df99387e75e03cbf136c17e46d4d7452f1c4997a26398a219e60b2624def&ipo=images'
				},
				{
					id: 'm2',
					title: 'A trip to the nuts',
					description: 'woah, impressive nuts',
					image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.NYW7S_h_Nfg5K9CNjsJEzAHaE8%26pid%3DApi&f=1&ipt=c751b03e4a2dbc471e11559c3e6dfdeb4ca97bc037144901bb464eee07f29307&ipo=images'
				},
				{
					id: 'm3',
					title: 'holy fucking shit',
					description: 'was that joji from FilthyFrankTV??!',
					image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fvignette4.wikia.nocookie.net%2Fwalkingdead%2Fimages%2F2%2F2b%2FPink_Guy_Lick.gif%2Frevision%2Flatest%3Fcb%3D20140823022506&f=1&nofb=1&ipt=d5d03ba0e38b4d119bd49e16773ace91b63bf84abca5853e47d113ebba5074dd&ipo=images'
				},
				{
					id: 'm4',
					title: 'nvm',
					description: 'it wasn\'t him ,_,',
					image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2Fc8596daa18937d56f8e5fb5c137399b7%2Ftenor.gif%3Fitemid%3D5628912&f=1&nofb=1&ipt=46c9561a72f5d7a174d5ea92a1cd9925679b0056a4c1eef8c2eb313db366c050&ipo=images'
				},
			]
		}
	},
	getters: {
		memories(state) {
			return state.memories;
		},
		memory(state) {
			return (id) => { //=>> filter memory with id
				return state.memories.find((memory) => memory.id === id)
			}
		}
	},
	mutations: {
		addMemory(state, memory) {
			const newMemory = {
				id: String(Math.floor(Math.random() * (10 ** 5))),
				title: memory.title,
				image: memory.image,
				description: memory.description || 'br',
			}

			state.memories.unshift(newMemory)
		}
	},
	actions: {
		addMemory(context, memoryData) {
			//=>> you could use this place to push data to backend
			context.commit('addMemory', memoryData)
		}
	}
});