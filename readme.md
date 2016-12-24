## Getting Started

```js
npm install get-vue-story -g
```
```js
git clone
cd vue-story & npm install
cd story
vstory run
```

## Story.js

```js
import Story from '../vue-story'

Story('Vue')
	.add({
		name:'Web',
		link: 'web.vue'
	})
	.add({
		name:'Story',
		link: 'story.vue'
	})  

Story('Story')
	.add({
		name:'Wont',
		link: 'nope.vue'
	})
	.add({
		name:'Die',
		link: 'die.vue'
	})  
```
