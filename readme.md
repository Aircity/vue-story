## Getting Started

```js
npm install get-vue-story -g
```
```js
git clone https://github.com/Aircity/vue-story.git
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

## Options
 1. startup
 ```bash
 vstory run [filename] 
 ```
 2. equal to 'vstory run story.js'
 ```bash
 vstory start
 ```
 3. port
 ```bash 
 vstory start -p 9000
 ``` 
 4. lib -- at global imports  
 ```bash
  vstory start  -l [filename]
 ```
 -- lib.js
 ```js
 import 'jquery'
 import 'bootstrap'
 ```
 ```bash
  vstory start -l lib.js
 ``` 
