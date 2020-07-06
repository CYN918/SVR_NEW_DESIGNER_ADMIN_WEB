<template>
	<div class="wh">
		<div class="wh" v-loading="true"></div>
	</div>
</template>

<script>
	import configData from "@/assets/configData.js"
	export default{
		methods:{
			getaccess() {
				let access_token = this.$route.query.access_token;
				// access_token = "6aa17f1f24236eaa0353a1b1eec6a75a";
				localStorage.setItem("access_token",access_token);
				this.api.access({
					access_token:access_token
				}).then((da) => {
					if(da.result == 0){
						localStorage.setItem("access",JSON.stringify(da.data));
						let url = (configData.url?configData.url:{});
						for(var i = 0; i<da.data.menu_banner.length;i++){
							if(da.data.menu_banner[i].child.length != 0){								
								this.router.push({path: url[da.data.menu_banner[i].child[0].id]});
								break;
							}
						}
						
						
											
					}
				}).catch((da) => {
			
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
