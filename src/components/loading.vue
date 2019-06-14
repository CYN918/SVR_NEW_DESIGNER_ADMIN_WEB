<template>
	<div class="wh">
		<div class="wh" v-loading="true"></div>
		
	</div>
</template>

<script>
	export default{
		methods:{
			getaccess() {
				let access_token = this.$route.query.access_token;
				console.log(access_token)
				localStorage.setItem("access_token",access_token);
				this.api.access({
					access_token:access_token
				}).then(da => {
					
				}).catch(da => {
					
				})
			},
			getQueryString(name) { 
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg); 
				if (r != null) return unescape(r[2]); 
				return null; 
			},
		},
		mounted(){
			this.getaccess();
		}
	}
</script>

<style>
	
</style>
