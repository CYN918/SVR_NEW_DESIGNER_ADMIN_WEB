<template>
	<div class="wh">
		<div class="wh" v-loading="true"></div>
		
	</div>
</template>

<script>
	export default{
		methods:{
			getaccess() {
				//console.log(access_token,this.getQueryString("access_token"));
				if(this.getQueryString("access_token")){
					let access_token = this.getQueryString("access_token")
					this.api.access({
						user_id: "7",
						access_token:access_token
					}).then(da => {
						
					}).catch(da => {
						
					})
				} else {
					this.$message({
						message:"access_token请求失败，请重新登录"
					});
					window.history.go(-1)
				}
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
