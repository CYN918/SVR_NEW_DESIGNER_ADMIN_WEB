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
				//let access_token = "c4169ddaeb51e0517ac06fedd51ba10c"
				//console.log(access_token)
				
				localStorage.setItem("access_token",access_token);
				this.api.access({
					access_token:access_token
				}).then((da) => {
					if(da.result == 0){
						//alert(11)
						localStorage.setItem("access",JSON.stringify(da.data));
						this.router.push({path:"/userManager/userBaseInfo"});
					} else {
					}
				}).catch((da) => {
					console.log(da);
					//alert(4)
					
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
