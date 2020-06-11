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
				// access_token = "e533e757e0424a34291a5fdf7a652893";
				//console.log(access_token)
				
				localStorage.setItem("access_token",access_token);
				this.api.access({
					access_token:access_token
				}).then((da) => {
					if(da.result == 0){
						//alert(11)
						
						localStorage.setItem("access",JSON.stringify(da.data));
						let url = {
							"2":"/userManager/userBaseInfo",
							"3":"/userManager/userPersonalInfo",
							"4":"/userManager/userCompanyInfo",
							"6":"/power/roleManager",
							"7":"/power/accountManager",
							"30":"/contentManager/recommendedActivities",
							"31":"/contentManager/serviceCenter",
							"9":"/contentManager/homeBanner",
							"10":"/contentManager/hotWordSearch",
							"22":"/workManager/workInfo",
							"23":"/workManager/materialBank",
							"24":"/workManager/labels",
							"25":"/workManager/commentManager",
							"26":"/activityManager/activityEmploy",
							"27":"/activityManager/activityClass",
							"28":"/activityManager/activityworks",
							"29":"/otherInformation/solicitationTemplate",
							"32":"/employmentManager/employmentorder",
							"34":"/otherInformation/embodyRecord",
							"35":"/otherInformation/presetReason",
							"36":"/otherInformation/feedback",
							"37":"/otherInformation/reportInfo",
							"38":"/noticeManager/newsRelease",
							"39":"/noticeManager/noticetemplate",
							"40":"/contentManager/listAd",
							"41":"/contentManager/holdAll",
							"50":"/userManager/blackList",
							"200495":"/projectManagement/projectList",
							"200496":"/projectManagement/projectclass",
							"200498":"/projectManagement/Profit",
							"200605":"/projectManagement/projectLongList",
							"200478":"/contentManager/workconfig",
							"200473":"/userManager/userInfo",
							
						}
						for(var i = 0; i<da.data.menu_banner.length;i++){
								if(da.data.menu_banner[i].child.length != 0){
									console.log(url[da.data.menu_banner[i].child[0].id])
									this.router.push({path: url[da.data.menu_banner[i].child[0].id]});
									break;
								}
							}
						
						
							// for(var i = 0; i<da.data.top_banner.length;i++){
							// 	if(da.data.top_banner[i].child.length != 0){
							// 		console.log(url[da.data.top_banner[i].child[0].id])
							// 		this.router.push({path: url[da.data.top_banner[i].child[0].id]});
							// 		break;
							// 	}
							// }
											
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
