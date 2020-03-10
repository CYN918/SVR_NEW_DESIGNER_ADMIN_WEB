<template>
	<div class="w ctcontent">
		<div v-if="!commonTopData.IsShow">
			<div class="margin40 cttitle" v-if="!commonTopData.tabData">{{ currentpageName }}</div>
			<div class="paddinglr40 relative" style="height: 58px;border-bottom: 2px solid #f0f2f5;line-height: 58px;margin-bottom: 10px;" v-else-if="commonTopData.tabData">
				<span class="fleft" style="width: 125px;">
					{{ currentpageName }}
				</span>
				<div class="textcenter">
					<span style="height: 58px;" v-for="(item,index) in commonTopData.tabData" v-if="index < 3 && (adminuseraccess.indexOf(item.accessid) > -1)" :key="item.linkTo" :class="index == commonTopData.tabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChange(index)">
						<el-badge :value="doCount[(index+1)] == 0 ? '' : doCount[(index+1)]" :max="99" class="badge">{{ item.name }}</el-badge>
					</span>
					<span style="height: 58px;" v-for="(item,index) in commonTopData.tabData"  v-if="index == 3 && (adminuseraccess.indexOf(item.accessid) > -1)" :key="item.linkTo" :class="index == commonTopData.tabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChange(index)">
						<el-badge :value="doCount[(index+2)] == 0 ? '' : doCount[(index+2)]" :max="99" class="badge">{{ item.name }}</el-badge>
					</span>
					<span style="height: 58px;" v-for="(item,index) in commonTopData.tabData"  v-if="index == 4 && (adminuseraccess.indexOf(item.accessid) > -1)" :key="item.linkTo" :class="index == commonTopData.tabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChange(index)">
						<el-badge :value="doCount[(index)] == 0 ? '' : doCount[(index)]" :max="99" class="badge">{{ item.name }}</el-badge>
					</span>
				</div>
			</div>
		</div>
		<div>
			<div class="paddinglr40 relative" style="height: 20px;border-bottom: 2px solid #f0f2f5;line-height: 20px;margin-bottom: 5px;" v-if="commonTopData.option">
				<div class="textcenter" style="float: left;">
					<span style="height: 20px;" v-for="(item,index) in commonTopData.option" v-if="index < 3 && (adminuseraccess.indexOf(allId) > -1)" :key="item.linkTo" :class="index == commonTopData.mintabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChanges(index)">
						<el-badge class="badge">{{ item.name }}</el-badge>
					</span>
					<span style="height: 20px;" v-for="(item,index) in commonTopData.option" v-if="index == 3 && (adminuseraccess.indexOf('52') > -1)" :key="item.linkTo" :class="index == commonTopData.mintabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChanges(index)">
						<el-badge class="badge">{{ item.name }}</el-badge>
					</span>
				</div>
			</div>
		</div>
		
		<div :class="['borderb','margin40',{marginl0:commonTopData.IsShow}]" style="position: relative;padding-bottom: 22px;">
			<div class="ofh">
				<div class="fleft">
					<el-button class="btnorgle" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</el-button>
				</div>
				<div class="fright">
					<div class="fleft" v-for="(item,index) in commonTopData.commonrightbtn" :key="item.id">
						<div v-if="item.accessid && (adminuseraccess.indexOf(item.accessid) > -1)">
							<button v-if="!commonTopData.upload" class="defaultbtn" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
							<div class="sel-tooltip" v-if="item.id == 'right1' && Istooltip" style="z-index: 2004;">
								<div v-for="(item,index) in operations" :key="item.name" class="comonbtn" @click="IsShow(index)">{{ item.name }}</div>
							</div>
							<div class="masku" v-if="item.id == 'right1' && Istooltip" @click="Istooltip = false"></div>
							<button v-if="commonTopData.upload" class="defaultbtn defaultbtnactive" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
						</div>
						<div v-if="!item.accessid">
							<button v-if="!commonTopData.upload" class="defaultbtn" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
							<div class="sel-tooltip" v-if="item.id == 'right1' && Istooltip" style="z-index: 2004;">
								<div v-for="(item,index) in operations" :key="item.name" class="comonbtn" @click="IsShow(index)">{{ item.name }}</div>
							</div>
							<div class="masku" v-if="item.id == 'right1' && Istooltip" @click="Istooltip = false"></div>
							<button v-if="commonTopData.upload && !item.two" class="defaultbtn defaultbtnactive" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
							<button v-if="commonTopData.upload && item.two && settrue(item.two.id1,item.two.id2)" class="defaultbtn defaultbtnactive" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="margin40 ta">
			<div class="tagbts">
				<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
				 :disable-transitions="false" @close="handleClose(item.id,index)">
					{{item.btnName + "：" + item.val}}
				</el-tag>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ["commonTopData","tableDatas"],
		data() {
			return {
				inputVisible: false,
				inputValue: '',
				Istooltip: false,
				centerDialogVisible: false,
				radio2: 3,
				c:this.commonTopData.commonbottombtn,
				activeName: 'second',
				currentpageName:'',
				doCount:{},
				operations:[],
				adminuseraccess: [],
				user: "",
				allId: '',
			};
		},
		methods: {
			settrue(id1,id2){
				//console.log(id1,id2)
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
				// console.log(name)
				var idIndex = id;
				// console.log(idIndex)
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
								path:"/activityManager/activityEmploy/newActivity",query:{id:this.tableDatas[0].id}
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
					//console.log(this.$parent.selectData);
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
					//console.log(this.$parent.selectData);
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
						this.router.push({path:"/review/projectreview/projectrepending",query:{user:this.user}});
						break;
					case 1:
						this.router.push({path:"/review/projectreview/projectrethrough",query:{user:this.user}});
						break;
					case 2:
						this.router.push({path:"/review/projectreview/projectrerejected",query:{user:this.user}})
						break;
					case 3:
						this.router.push({path:"/review/projectreview/projectreallrecords",query:{user:this.user}})
						break;
					default:
				}
				
			},
			gettodoCount(){
				this.api.todoCount({
					access_token:localStorage.getItem("access_token"),
				}).then(da =>{
					//alert(1);
					//console.log(da);
					this.doCount = da;
					eventBus.$emit("reviewnum",da.total);
					//console.log(this.doCount)
				}).catch(da=>{
					
				})
			},
			getuserinfo(){
				this.api.selfInfo({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					//console.log(da)
					this.user = da.name;
				})
			},
		},
		created() {
			this.gettodoCount();
			this.getuserinfo();
		},
		mounted() {
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			localStorage.setItem("screenShowDataChange","");
			
			var access = [];
			if(localStorage.getItem("access")){
				access = JSON.parse(localStorage.getItem("access"));
				// console.log(access.top_banner)
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
					console.log(2)
				}			
			}			
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
			
		},
		watch:{
			$route(val){
				
			}
		}
	}
</script>

<style>
	.ctcontent {
		background: white;
		margin-bottom: 20px;
	}

	.paddingb10 {
		padding-bottom: 10px;
	}

	.padding10 {
		padding: 10px 0;
	}

	.cttitle {
		line-height: 60px;
		padding-bottom: 20px;
	}
	
	.tagbts {
		display: flex;
		align-items:center;
		height: 100%;
		overflow-x: auto;
	}
	
	.lefttit{
		position: absolute;
		height: 60px;
		line-height: 60px;
		left: 40px;
	}
	
	.badge .el-badge__content.is-fixed{
		top:13px
	}
	
	.marginl0{
		margin-left: 0;
	}
	
	.ta {
		height: 60px;
	}
	
	
</style>
