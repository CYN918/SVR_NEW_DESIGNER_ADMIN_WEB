<template>
	<div class="wh">
		<div class="w hnav username ofh">
			<!-- <span class="fleft userlog"></span>
			<span class="fleft fontsize24">狮大大</span> -->
			<img src="../assets/img/icon_left tab_logo.svg" alt="" style="display: block;margin: 23px 20px;">
		</div>
		<el-menu style="overflow-y: auto;" unique-opened default-active="1" class="w sel-menu" @open="handleOpen" @close="handleClose"
		 active-text-color="#33B3FF" :collapse="isCollapse">
			<el-submenu :index="item.id" v-for="item in menuAccess" :key="item.id">
				<template slot="title">
					<i class="iconfont" v-html="iconfont[item.id]"></i>
					<span slot="title">{{ item.title }}</span>
				</template>
				<router-link v-if="item.child && item.child.length != 0 && url[citem.id]"  v-for="citem in item.child" :key="citem.id" :to="url[citem.id] ? url[citem.id] : ''">
					<el-menu-item :index="url[citem.id]" >{{ citem.title }}</el-menu-item>
				</router-link>
			</el-submenu>			
		</el-menu>
	</div>
</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				menuAccess:[],
				url:{
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
					"200605":"/projectManagement/projectLongList",
					"200496":"/projectManagement/projectclass",
					"200497":"/projectManagement/settlement",
					"200498":"/projectManagement/Profit",
					"51":"/contentManager/projectrecommende",
					"200478":"/contentManager/workconfig",
					"200473":"/userManager/userInfo"
					
				},
				iconfont:{
					"1": "&#xe730;",
					"18": "&#xe627;",
					"19": "&#xe601;",
					"17": "&#xe781;",
					"5": "&#xe609;",
					"20": "&#xe6e5;",
					"21": "&#xe655;",
					"8": "&#xe62b;",
					"200494":"&#xe600;"
				},
				defaultopeneds:[],
				fid:"",
				defaultactive:"",
				isCollapse: true,
			}
		},
		watch: {},
		computed: {},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			setfid(id){
				this.fid = id
				return id
			},
		},
		created() {
			
			//this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			this.defaultactive=this.$route.matched[this.$route.matched.length-1].path;
			//console.log(this.$route.matched[this.$route.matched.length-1].path)
		},
		mounted() {
			if(localStorage.getItem("access")){
				this.menuAccess = JSON.parse(localStorage.getItem("access")).menu_banner;
			}
		}
	}
</script>
<style lang="scss">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	#app .sel-menu {
		width: 60px;
		border: 0;
		height: calc(100% - 60px);
		overflow: hidden !important;
	}
	#app .sel-menu > li{
		width: 60px;
		height: 56px;
		line-height: 56px;
	}
	#app .sel-menu > li:nth-child(2),#app .sel-menu > li:nth-child(3),#app .sel-menu > li:nth-child(4),#app .sel-menu > li:nth-child(5),#app .sel-menu > li:nth-child(6),#app .sel-menu > li:nth-child(7),#app .sel-menu > li:nth-child(8),#app .sel-menu > li:nth-child(9){
		margin-top: 15px;
	}

	.username {
		color: white;
		// background: #545c64;
	}

	#app .el-icon-location {
		padding-left: 20px;
	}

	// #app .el-submenu__title i {
	// 	right: 40px;
	// }

	#app .el-menu-item {
		text-indent: 48px;
	}
	
	#app .is-active .el-submenu__title {
		font-weight: 800;
	}
	
	// #app .iconfont{
	// 	padding-left: 24px;
	// }

	.userlog {
		width: 25px;
		height: 25px;
		margin: 17.5px 40px;
		margin-right: 0;
		background: url(../assets/img/houtai_logo.svg) center center no-repeat;
		background-size: 100% 100%;
	}

	#app .el-submenu__title:hover i,
	#app .el-submenu__title:hover span,
	#app .el-menu-item:focus i,
	#app .el-menu-item:hover i {
		color: #33B3FF;
	}
	.el-menu-item:hover{
		// background: rgba(51,179,255,1);
		// opacity:0.5;
	    color: #33B3FF;
	}
	// .el-menu-item:hover span{
	// 	color: #33B3FF;
	// 	opacity: 1;
	// }
	.el-submenu__title span{
		right: 45px;
        position: absolute;
		overflow: visible !important;
		visibility: visible !important;
		top: 20px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(187,187,187,1);
	}
	.el-submenu__title{
		height: 65px !important;
		line-height: 60px !important;
	}
	.is-active .el-submenu__title span{
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,179,255,1);
	}
	.is-active .el-submenu__title .iconfont{
		color: #33B3FF;
	}
	.el-submenu:hover,
	.is-opened:hover{
		background: #ffffff !important;
	}
	// .el-menu .is-active{
	// 	border-left: 2px solid #33B3FF;
	// }
	.el-menu--vertical .is-active{
		border-left: none;
	}
	
	
</style>
