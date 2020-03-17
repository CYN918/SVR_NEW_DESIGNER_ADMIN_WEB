<template>
	<div class="w ctcontent">
		<div v-if="!commonTopData.IsShow" style="background: white;">
			<div class="margin40 cttitle" v-if="!commonTopData.tabData" style="height: 60px;line-height: 60px;margin-bottom: 15px;">
				<div class="fleft hnav marginleft60 fontcolorg" style="width: 17%;float:left;">
					<el-breadcrumb separator="/" class="fontcolorg">
						<el-breadcrumb-item v-for="(item,index) in names" :key="item.index">{{ item.meta.title}}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="fright hnav marginright60" style="position: relative;float:right;width:13%;">
					<router-link to="/review/publishWork" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '12'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>
					<router-link to="/review/finalistsWork" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '13'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>
					<router-link to="/review/employWork" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '14'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>
					<router-link to="/review/applyPerson" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '15'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>	
					<router-link to="/review/projectreview/projectrepending" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '16'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>
					<div class="fright marginleft60 pointer" @click="signOut">{{ this.user.name }}</div>
					<!-- <span  :style="{'background':'url('+userimg+')'}" @click="signOut"></span> -->
					<div class="userinfobtn" v-if="IsSign" style="z-index: 2004;">
						
						<div @click="getuser()"><i class="el-icon-setting" style="margin-right: 8.2px;"></i>账号信息</div>
						<div @click="out()"><i class="iconfont" style="margin-right: 8.2px;padding-left: 0;">&#xe67f;</i>退出登录</div>
					</div>
					<div class="masku" v-if="IsSign" @click="signOut"></div>
				
				</div>
			</div>
			<div class="paddinglr40 relative" style="height: 60px;line-height: 60px;margin-bottom: 15px;" v-else-if="commonTopData.tabData">
				<div class="fleft hnav marginleft60 fontcolorg" style="width: 17%;float:left;">
					<el-breadcrumb separator="/" class="fontcolorg">
						<el-breadcrumb-item v-for="(item,index) in names" :key="item.index">{{ item.meta.title}}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="textcenter" style="width: 70%;float:left;">
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

				<div class="fright hnav marginright60" style="position: relative;float:right;width:13%;">
					<router-link to="/review/publishWork" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '12'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>
					<router-link to="/review/finalistsWork" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '13'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>
					<router-link to="/review/employWork" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '14'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>
					<router-link to="/review/applyPerson" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '15'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>	
					<router-link to="/review/projectreview/projectrepending" tag="div" class="fleft pointer" v-if="(adminuseraccess.indexOf('11') > -1) && newArr[0].id == '16'">
						<span class="dp fontsize18">审核台</span>
						<span class="dp sel-badge" v-html="reviewnum">99+</span>
					</router-link>
					<div class="fright marginleft60 pointer" @click="signOut">{{ this.user.name }}</div>
					<!-- <span  :style="{'background':'url('+userimg+')'}" @click="signOut"></span> -->
					<div class="userinfobtn" v-if="IsSign" style="z-index: 2004;">
						
						<div @click="getuser()"><i class="el-icon-setting" style="margin-right: 8.2px;"></i>账号信息</div>
						<div @click="out()"><i class="iconfont" style="margin-right: 8.2px;padding-left: 0;">&#xe67f;</i>退出登录</div>
					</div>
					<div class="masku" v-if="IsSign" @click="signOut"></div>
				
				</div>
				
			</div>
		</div>
		<div>
			<div class="paddinglr40 relative" style="height: 58px;border-bottom: 2px solid #f0f2f5;line-height: 58px;margin-bottom: 15px;" v-if="commonTopData.option">
				<div class="textcenter" style="float: left;">
					<span style="height: 58px;" v-for="(item,index) in commonTopData.option" v-if="index < 3 && (adminuseraccess.indexOf(allId) > -1)" :key="item.linkTo" :class="index == commonTopData.mintabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChanges(index)">
						<el-badge class="badge">{{ item.name }}</el-badge>
					</span>
					<span style="height: 58px;" v-for="(item,index) in commonTopData.option" v-if="index == 3 && (adminuseraccess.indexOf('52') > -1)" :key="item.linkTo" :class="index == commonTopData.mintabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChanges(index)">
						<el-badge class="badge">{{ item.name }}</el-badge>
					</span>
				</div>
			</div>
		</div>
		
		<div :class="['borderb','margin40',{marginl0:commonTopData.IsShow}]" style="position: relative;">
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
				names: [],
				IsSign: false,
				reviewnum:0,
				user:"",
				userimg:'../assets/img/MRTX.svg',
				adminuseraccess: [],
				auditTitle: '',
				newArr:[],
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
				console.log(id,name)
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
				console.log(this.user)
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
			gettodoCount(str){
				this.api.todoCount({
					access_token:localStorage.getItem("access_token"),
					permissions:str,
				}).then(da =>{
					//alert(1);
					//console.log(da);
					this.doCount = da;
					this.reviewnum = da.total;
					// eventBus.$emit("reviewnum",da.total);
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
			gettodoCount(str){
				this.api.todoCount({
					access_token:localStorage.getItem("access_token"),
					permissions:str,
				}).then(da =>{
					//alert(1);
					//console.log(da);
					let doCount = da;
					this.reviewnum = da.total;
					// eventBus.$emit("reviewnum",da.total);
					//console.log(this.doCount)
					
				}).catch(da=>{
					
				})
			},
			getBreadcrumb() {
				this.names = this.$route.matched
				//console.log(this.$route.matched)
			},
			signOut() {
				this.IsSign = !this.IsSign
			},
			// getbus(){
			// 	eventBus.$on("reviewnum",(data) =>{
			// 		this.reviewnum  = data;
			// 	})
			// },
			getuserinfo(){
				this.api.selfInfo({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					//console.log(da)
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
				this.signOut();
			},
			out(){
				this.signOut();
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
						//console.log(da)
						if(da.result == 0){
							window.location.href = da.data;
						}
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
				
				
			},
		},
		created() {
			this.getuserinfo();
			this.getBreadcrumb();
			// this.getbus();
		},
		mounted() {
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			localStorage.setItem("screenShowDataChange","");
			
			var access = [];
			if(localStorage.getItem("access")){
				access = JSON.parse(localStorage.getItem("access"));
				// console.log(access.top_banner)
				if(access.top_banner != 'undefined'){
					let accessArry = JSON.parse(localStorage.getItem("access")).top_banner;
					for(var i = 0;i < accessArry.length;i++){
						if(accessArry[i].id == '11'){
							let newArr = accessArry[i].child;
							let arr = [];
							newArr.forEach(element => {		
								if(element.id == '12'){
									arr.push(1)
								}
								if(element.id == '13'){
									arr.push(2)
								}	
								if(element.id == '14'){
									arr.push(3)
								}
								if(element.id == '15'){
									arr.push(4)
								}
								if(element.id == '16'){
									arr.push(5)
								}	
							});
							let str = arr.toString();
							this.gettodoCount(str);				
						}
					}
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
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))		
			}
			if(localStorage.getItem("access")){
				if(JSON.parse(localStorage.getItem("access")).top_banner != 'undefined'){
					this.auditTitle = JSON.parse(localStorage.getItem("access")).top_banner[0].child[0].title;
					let accessArry = JSON.parse(localStorage.getItem("access")).top_banner;
					for(var i = 0;i < accessArry.length;i++){
						if(accessArry[i].id == '11'){
							this.newArr = accessArry[i].child;
							// console.log(this.newArr)
							let arr = [];
							this.newArr.forEach(element => {		
								if(element.id == '12'){
									arr.push(1)
								}
								if(element.id == '13'){
									arr.push(2)
								}	
								if(element.id == '14'){
									arr.push(3)
								}
								if(element.id == '15'){
									arr.push(4)
								}
								if(element.id == '16'){
									arr.push(5)
								}	
							});
							let str = arr.toString();
							this.gettodoCount(str);				
						}
					}
				}else{
					console.log(2)
				}
			}
			
		},
		watch:{
			$route(val){
				
			},
			$route() {
				this.getBreadcrumb();
				// this.gettodoCount();
			}
		}
	}
</script>

<style>
	.ctcontent {
		/* background: white; */
		/* margin-bottom: 20px; */
	}

	.paddingb10 {
		padding-bottom: 10px;
	}

	.padding10 {
		padding: 10px 0;
	}

	/* .cttitle {
		line-height: 60px;
		padding-bottom: 20px;
	} */
	
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
		height: 20px;
	}
	#app .el-breadcrumb {
		line-height: 60px;
	}

	#app .el-breadcrumb__inner {
		color: #999999 !important;
	}

	.sel-badge {
		width: 38px;
		height: 24px;
		line-height: 24px;
		margin: 0 5px;
		text-align: center;
		border-radius: 24px;
		background: #33B3FF;
		color: white;
	}

	.usertou {
		width: 32px;
		height: 32px;
		margin: 14px 0;
		margin-left: 58px;
		border-radius: 50%;
	}

	.userinfobtn {
		width: 170px;
		border: 1px solid #E6E6E6;
		position: absolute;
		background: white;
		right: 0px;
		top: 50px;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.10);
		border-radius: 2px 2px 2px 2px;
		z-index: 888;
	}

	.userinfobtn div {
		height: 40px;
		padding: 0 19px;
		line-height: 40px;
		cursor: pointer;
	}

	.userinfobtn div:hover {
		background: #ffede8;
		color: #FF5121;
	}
	
	
</style>
