<template>
	<div class="wh">
		<div class="sideBar h fleft">
			<side-bar></side-bar>
		</div>
		<div class="mainContent h fright">
			<div class="mainContentNav w">
				<nav-bar></nav-bar>
			</div>
			<div class="mainContentMidden">
				<keep-alive>
					<transition name="fade-transform" mode="out-in">
						<router-view ref="mychild" />
					</transition>
				</keep-alive>
			</div>
		</div>
		<div class="screenbg" v-if="IsScreen == 'No'">
			<common-screen :pageName="pageName" :tabnum="tabnum"></common-screen>
		</div>
		<div class="screenbg" v-if="IsScreenShow == 'No'">
			<common-screen-show :pageName="pageName"></common-screen-show>
		</div>
		<div class="masku screenContent" style="background: rgba(0,0,0,0.4);" v-if="pressage">
			
			<el-progress type="circle" :percentage="percentage" class="prossage"></el-progress>
		</div>
	</div>
</template>

<script>
	import sideBar from '@/components/Sidebar.vue'
	import navBar from '@/components/NavBar.vue'
	export default {
		components: {
			sideBar,
			navBar
		},
		props: {},
		data() {
			return {
				IsScreen: "Off", //筛选显隐控制
				IsScreenShow: "off", //展示字段筛选显隐控制
				pageName: "",
				menulist: "",
				parentnum:"",
				tabnum:"",
				pressage:false,
				percentage:50,
				
			}
		},
		watch: {},
		computed: {},
		methods: {
			screenmask(data, n) {
				this.pageName = "";
				switch (n) {
					case "left1":
						this.IsScreen = data;
						break;
					case "right2":
						this.IsScreenShow = data;
						break;
					default:
						break;
				}

			},
			eventbus() {
				eventBus.$on("screenshow", (data) => {
					this.pageName = data.pageName;
					switch (data.num) {
						case "left1":
							this.IsScreen = data.showmask;
							break;
						case "right2":
							this.IsScreenShow = data.showmask;
							break;
						default:
							break;
					};
				})
			},
			tabchange(val){
				this.tabnum = val;
			},
			getaccess() {
				this.api.access({
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					if(da.result == 0){
						//alert(11)
						console.log(da)
						localStorage.setItem("access",JSON.stringify(da.data));
						//this.router.push({path:"/userManager/userBaseInfo"});
					}
				}).catch(da => {
					
				})
			},
			categoryList() {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 10000,
					status:1
				}
			
				this.api.categoryList(data).then((da) => {
					var child=[
						
					];
					//console.log(da.data);
					da.data.forEach(item =>{
						child.push({
							name:item.category_name,
							id:item.id
						})
					})
					
					localStorage.setItem("child",JSON.stringify(child))
					//console.log(localStorage.getItem("child"))
				}).catch(() => {
			
				});
			},
			setpercentage(status,url,id,coverurl){
				var time = "";
				if(status == "end"){
					this.percentage = 100;
					if(id == "con"){
						this.$refs.mychild.setcontent(url,coverurl);
					}else {
						this.$refs.mychild.setimgurl(url);
					}
					
					this.pressage=false;
					this.percentage = 50;
				}
				if(status == "start"){
					this.pressage=true;
					clearInterval(time);
					time = setInterval(()=>{
						if(this.percentage > 95){
							clearInterval(time);
						}
						this.percentage++;
					},0)
				}
			},
			getadminuseraccess(){
				this.api.adminuseraccess({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					console.log(da);
					localStorage.setItem("adminuseraccess",JSON.stringify(da));
				})
			}
		},
		created() {
			this.getaccess();
			this.categoryList();
			this.getadminuseraccess();
		},
		mounted() {
			this.eventbus();
		}
	}
</script>
<style>
	.el-picker-panel{
		z-index:2013 !important;
	}
</style>
<style lang="scss" scoped>
	$sideBarWidt: 280px;

	.sideBar {
		width: $sideBarWidt;
	}

	.mainContent {
		width: calc(100% - 280px);
	}

	.mainContentNav {
		height: 60px;
	}

	.mainContentMidden {
		width: calc(100% - 40px);
		height: calc(100% - 100px);
		background: #f0f2f5;
		padding: 20px;
		overflow: hidden;
	}
	
	

	.screenbg {
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		z-index: 2013;
	}
</style>
