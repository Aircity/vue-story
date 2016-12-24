<template>
	<div id="content">
		<p id="status" ><span @click="story">Story</span></p>
		<p>Yeah you know it gets better</p>
		<p>And your <strong @click="start">{{content}}</strong> is yet to be told</p>
	</div>
</template>

<style src="./story.css"></style>

<script>
  export default {
    data: () => ({
      content: 'Story'
    }),
    methods: {
      story() {
        this.$console("Yeah you know it gets better");
      },
      start() {
        this.$console("Yeah the coals are beginning to glow");
      }
    }
  }
</script>

<style>
  * {
    user-select:none;    
  }
  #status span,#content strong {
    cursor: pointer;
  }
</style>