<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
	export default {
		name:'app',
		provide () {
			return {
				reload:this.reload
			}
		},
		data () {
			return {
				isRouterAlive:true
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		}
	}
</script>
<style>
    /*@import "../static/css/main.css";*/
    * {
	    margin: 0;
	    padding: 0;
    }
    html,
	body,
	#app,
	.wrapper {
	    max-width: 100%;
        min-width: 320px;
	    /*height: 100%;*/
	    font-size: 14px;
	    overflow-x: hidden !important;
	    /*overflow-y: visible !important;*/
	}
	body {
        font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
	}

	a {
	    text-decoration: none
	}
    .content {
	    width: auto;
	    padding: 40px;
	}
</style>