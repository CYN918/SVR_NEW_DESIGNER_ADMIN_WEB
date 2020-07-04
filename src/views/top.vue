<template>
	<div class="topBox">
		<div class="topBox_1">
			<img class="topBox_1_1" src="img/tabbar_icon_file_24_pressed.svg"/>
			<span class="topBox_1_2" v-for="(item,index) in names">
				{{item.meta.title}} <i v-if="names[index+1]">/</i>
			</span>
		</div>
		<div class="topBox_2"></div>
		<div class="topBox_3"  @click="goFn()" v-if="adminuseraccess.indexOf('11') > -1 && firstId.length>0">
			审核台<span class="numberbtn">{{reviewnum}}</span>
		</div>
		<div class="topBox_1">
			<div class="topBox_3_0">
				{{user.name}}
				<input @blur="signOut" @focus="signOut" class="topBox_gb_1" type="text">
			</div>
			<div v-if="IsSign" class="topBox_3_1">
				<div @click="getuser()"><i class="el-icon-setting topBox_3_2"></i>账号信息</div>
				<div @click="out()"><i class="iconfont topBox_3_3">&#xe67f;</i>退出登录</div>				
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ["commonTopData","tableDatas"],
		data() {
			return {
				names: [],
				isSh:false,				
				inputVisible: false,
				inputValue: '',
				Istooltip: false,
				centerDialogVisible: false,
				radio2: 3,	
				activeName: 'second',
				currentpageName:'',
				doCount:{},
				operations:[],
				adminuseraccess: [],
				user: "",
				allId: '',
				
				IsSign: false,
				reviewnum:0,
				user:"",
				userimg:'../assets/img/MRTX.svg',
				auditTitle: '',
				firstId:[],
				shMap:{
					'12':'/review/publishWork',
					'13':'/review/finalistsWork',
					'14':'/review/employWork',
					'15':'/review/applyPerson',
					'16':'/review/projectreview/projectrepending',
				},
				shPath:'',
			};
		},
		methods: {
			goFn(){
				this.router.push({
					path:this.shPath
				})
			},
			settrue(id1,id2){
				if((this.adminuseraccess.indexOf(id1) == -1) && (this.adminuseraccess.indexOf(id2) == -1)) {
					return false;
				} else {
					return true;
				}
			},
			handleClose(tag,index) {
				this.$parent.resetSave(tag)
				this.commonTopData.commonbottombtn.splice(index,1)
			},
			getparent(id,name) {
				var idIndex = id;
				switch (name)
				{
					case "userBaseInfo":
						if (idIndex == "right1") {
							this.operations = [
								{
									name:"设为平台推荐创作者",
								},
								{
									name:"添加至黑名单"
								}
							];
							this.Istooltip = !this.Istooltip;
							return;
						}
						if(idIndex == "right3"){
							this.$parent.export()
						}
					break;
				    case "settlement":
						if(idIndex == "right1"){
							this.$parent.export()
						}
					break;
					case "roleManager":
						if(idIndex == "right1"){
							this.router.push({
								path:"/power/roleManager/createRoles"
							})
						};
					break;
					case "employmentorder":
						if(idIndex == "right3"){
							this.$parent.export()
						};
					break;
					case "holdAlltab":
						if(idIndex == "right3"){
							this.$parent.export()
						};
					break;
					case "embodyRecord":
						if(idIndex == "right3"){
							this.$parent.export()
						};
					break;
					case "workInfo":
						if(idIndex == "right1"){
							this.operations = [
								{
									name:"修改平台推荐等级"
								}
							];
							this.Istooltip = !this.Istooltip;
							return;
						};
						
						if(idIndex == "right3"){
							this.$parent.export()
						};
					break;
					case "activityClass":
						if(idIndex == "right1"){
							this.router.push({
								path:"/activityManager/activityClass/addActivity"
							})
						};
					break;
					case "activityEmploy":
						if(idIndex == "right1"){
							this.router.push({
								path:"/activityManager/activityEmploy/newActivity"
							})
						};
					break;
					case "solicitationTemplate":
						if(idIndex == "right1"){
						    this.$parent.showmask = true;
						};
					break;
					case "homeBanner":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/contentManager/homeBanner/addHomeBanner"
						    })
						};
						if(idIndex == "right0"){
						    this.router.push({
						    	path:"/contentManager/homeBanner/addbannerScheme"
						    })
						};
					break;
					case "serviceCenter":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/contentManager/serviceCenter/newserviceCenter"
						    })
						};
					break;
					case "recommendedActivities":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/contentManager/recommendedActivities/newrecommendedActivities"
						    })
						};
					break;
					case "listAd":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/contentManager/newlistAd"
						    })
						};
					break;
					case "presetReason":
						if(idIndex == "right3"){
						    this.router.push({
						    	path:"/otherInformation/presetReason/revisePresetReason"
						    })
						};
					break;
					case "hotWordSearch":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/contentManager/hotWordSearch/newhotword"
						    })
						};
					break;
					case "feedback":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/otherInformation/feedback/newfeedback"
						    })
						};
					break;
					case "reportInfo":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/otherInformation/reportInfo/newreportInfo"
						    })
						};
					break;
					case "newsRelease":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/noticeManager/newsRelease/addrelease"
						    })
						};
					break;
					case "blackList":
						if(idIndex == "right1"){
						    this.router.push({
						    	path:"/userManager/blackList/addblack"
						    })
						};
					break;
					
				}
				
				const shownum = {
					num: idIndex,
					showmask: "No",
					pageName: this.commonTopData.pageName,
				}
				eventBus.$emit("screenshow", shownum);
			},

			initbtn() {
				//根据页面的名字进行展示字段-筛选按钮的初始化

			},
			IsShow(index) {
				this.Istooltip = false;
				if(index == 0) {
					if (this.$parent.selectData.length != 0 || this.$parent.seltotal) {
						this.$parent.centerDialogVisible = true;
					} else {
						this.$message({
							message: '请勾选用户',
							type: 'warning'
						});
					}
					
				}
				
				if(index == 1) {
					if (this.$parent.selectData.length != 0 || this.$parent.seltotal) {
						// this.$parent.centerDialogVisible = true;
						this.router.push({path:"/userManager/blackList/addblack",query:{rows:JSON.stringify(this.$parent.selectData)}});
					} else {
						this.$message({
							message: '请勾选用户',
							type: 'warning'
						});
					}
					
				}
				
			},
			handleClick(tab, event) {
				//console.log(tab, event);
			},
			switchTabs(num){
				this.commonTopData.tabnums = num;
				this.$parent.tabsChange(num);
			},
			tabsChange(num){
				switch (num){
					case 0:
						this.router.push({path:"/review/publishWork"});
						break;
					case 1:
						this.router.push({path:"/review/finalistsWork"});
						break;
					case 2:
						this.router.push({path:"/review/employWork"})
						break;
					case 3:
						this.router.push({path:"/review/projectreview/projectrepending"})
						break;
					case 4:
						this.router.push({path:"/review/applyPerson"})
						break;
					default:
				}
				
			},
			tabsChanges(num){
				switch (num){
					case 0:
						this.router.push({path:"/review/projectreview/projectrepending",query:{user:this.user.name}});
						break;
					case 1:
						this.router.push({path:"/review/projectreview/projectrethrough",query:{user:this.user.name}});
						break;
					case 2:
						this.router.push({path:"/review/projectreview/projectrerejected",query:{user:this.user.name}})
						break;
					case 3:
						this.router.push({path:"/review/projectreview/projectreallrecords",query:{user:this.user.name}})
						break;
					default:
				}
				
			},
			
			getuserinfo(){
				this.api.selfInfo({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.user = da.name;
				})
			},
			gettodoCount(str){
				this.api.todoCount({
					access_token:localStorage.getItem("access_token"),
	
				}).then(da =>{
					this.doCount = da;
					this.reviewnum = da.total;				
				})
			},
			getBreadcrumb() {
				this.names = this.$route.matched
			},
			signOut() {
				setTimeout(()=>{
					this.IsSign = !this.IsSign;
				},200)
				
			},
			getuserinfo(){
				this.api.selfInfo({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.user = da;
					this.userimg = da.avatar? da.avatar : require('../assets/img/MRTX.svg');
				})
			},
			getuser(){
				this.router.push({
					path:"/userinfo/user",
					query:{
						info:JSON.stringify(this.user)
					}
				});
			},
			out(){
				this.$confirm('确认退出？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					this.api.logout({
						access_token:localStorage.getItem("access_token")
					}).then(da=>{
						if(da.result == 0){
							window.location.href = da.data;
						}
					})
					
				})
				
				
			},
			getaccess() {
				this.api.adminuseraccess({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.adminuseraccess = JSON.stringify(da);
				})
			},
			getaccess_list() {
				this.api.access({
					access_token:localStorage.getItem("access_token")
				}).then((da) => {
					let accessArry = da.data.top_banner;
					for(var i = 0;i < accessArry.length;i++){
						let el = accessArry[i];
						if(el.id == '11'){
							let arr = [];
							el.child.map((el2)=>{
								if(!this.shPath && this.shMap[el2.id]){
									this.shPath = this.shMap[el2.id];
								}
								arr.push(el2.id);
							})
							this.firstId = arr;
							this.gettodoCount();
							break
						}
					}						
				})
			},
			init(){
				this.getaccess_list();
				this.getuserinfo();
				this.gettodoCount();
				this.getaccess();
			}
		},
		created() {
			this.init();
			
			
			this.getBreadcrumb();
			
			// this.getaccess_list();
			// this.getbus();
			if(this.$route.query.tabsnum){
				this.commonTopData.tabnums = this.$route.query.tabsnum;
				this.$parent.tabsChange(this.commonTopData.tabnums);
			}
			
		},
		mounted() {
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			localStorage.setItem("screenShowDataChange","");
			
			var access = [];
			if(localStorage.getItem("access")){
				access = JSON.parse(localStorage.getItem("access"));
				if(access.top_banner != 'undefined'){
					access.top_banner.forEach(element => {
						element.child.forEach(item => {
							if(item.id == '16'){
								item.child.forEach(val => {	
									if(val.id != '52'){
										this.allId = val.id;
									}								
								})
							}
						})		
					});
				}else{
			        
				}			
			}			
			
			
		},
		watch:{
			$route() {
				this.getBreadcrumb();	
				this.gettodoCount();
			}
		}
	}
</script>

<style scoped="scoped">
.topBox{
	display: flex;
	background: #fff;
	height: 60px;
	line-height: 60px;
	padding: 0px 10px;
	margin-bottom: 15px;
}
.topBox_1{
	display: inline-block;
	vertical-align: top;
}
.topBox_2{
	flex: 1;
}
.topBox_3{
	display: inline-block;
	vertical-align: top;
	font-size: 18px;
	cursor: pointer;
}
.topBox_3>span.numberbtn{
	display: inline-block;
	font-size: 14px;
	min-width: 28px;
    height: 24px;
    line-height: 24px;
    margin: 0 5px;
    text-align: center;
    border-radius: 24px;
    background: #33B3FF;
	padding: 0 5px;
    color: white;
}
.topBox_1_1{
	width: 12px;
    display: inline-block;
    vertical-align: top;
    margin: 22px 3px 0 0;
}
.topBox_1_2>i{
	display: inline-block;
	vertical-align: top;
	margin: 0 9px;
    font-weight: 700;
    color: #C0C4CC;
}
.topBox_3_1{
	position: relative;
	width: 170px;
	border: 1px solid #E6E6E6;
	position: absolute;
	background: white;
	right: 0px;
	top: 50px;
	-webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.10);
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.10);
	border-radius: 2px 2px 2px 2px;
}
.topBox_3_1>div{
    height: 40px;
    padding: 0 19px;
    line-height: 40px;
    cursor: pointer;
	font-size: 14px;
}
.topBox_3_2{
	margin-right: 8.2px;
}
.topBox_3_3{
	margin-right: 8.2px;
}
.topBox_3_1>div:hover {
    background: #ffede8;
    color: #FF5121;
}
.topBox_gb_1{
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: none;
	background: none;
	opacity: 0;
}
.topBox_3_0{
	position: relative;
}
</style>
