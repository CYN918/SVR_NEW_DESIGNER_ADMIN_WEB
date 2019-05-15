<template>
	<div class="w ctcontent">
		<div class="margin40 cttitle" v-if="!commonTopData.tabData">{{ currentpageName }}</div>
		<div class="paddinglr40 relative" style="height: 58px;border-bottom: 2px solid #f0f2f5;line-height: 58px;margin-bottom: 20px;" v-else-if="commonTopData.tabData">
			<span class="fleft" style="width: 84px;">
				{{ currentpageName }}
			</span>
			<div class="textcenter">
				<span v-for="(item,index) in commonTopData.tabData" :key="item.linkTo" :class="index == commonTopData.tabnums ? 'tabs tabactive' : 'tabs'" @click="tabsChange(index)">
					<el-badge :value="doCount[(index+1)] == 0 ? '' : doCount[(index+1)]" :max="99" class="badge">{{ item.name }}</el-badge>
				</span>
			</div>
		</div>
		<div class="margin40 borderb" style="position: relative;padding-bottom: 22px;">
			<div class="ofh">
				<div class="fleft">
					<el-button class="btnorgle" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</el-button>
				</div>
				<div class="fright">
					<div class="fleft" v-for="(item,index) in commonTopData.commonrightbtn" :key="item.id">
						<button class="defaultbtn" @click="getparent(item.id,commonTopData.pageName)">{{ item.name }}</button>
						<div class="sel-tooltip" v-if="item.id == 'right1' && Istooltip">
							<div v-for="(item,index) in operations" :key="item.name" class="comonbtn" @click="IsShow(index)">{{ item.name }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="margin40" style="height: 60px;">
			<div class="tagbts">
				<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
				 :disable-transitions="false" @close="handleClose(item.id)">
					{{item.btnName + "：" + item.val}}
				</el-tag>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ["commonTopData"],
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
				operations:[]
			};
		},
		methods: {
			handleClose(tag) {
				this.$parent.resetSave(tag)
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
					break;
					case "roleManager":
						if(idIndex == "right1"){
							this.router.push({
								path:"/power/roleManager/createRoles"
							})
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
					break;
					default:
						
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
				if(index == 0) {
					if (this.$parent.selectData.length == 0) {
						this.$message({
							message: '请勾选用户',
							type: 'warning'
						});
						return;
					}
					this.$parent.centerDialogVisible = true;
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
						this.router.push({path:"/review/applyPerson"})
						break;
					default:
						break;
				}
				
			},
			gettodoCount(){
				this.api.todoCount({
					access_token:2,
				}).then(da =>{
					//alert(1);
					//console.log(da);
					this.doCount = da;
					console.log(this.doCount)
				}).catch(da=>{
					
				})
			}
		},
		created() {
			this.gettodoCount();
		},
		mounted() {
			//alert(typeof this.commonTopData.tabnums)
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title
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
	
	.tabs{
		width: 96px;
		height: 58px;
		display: inline-block;
		margin-right: 71px;
		cursor: pointer;
	}
	
	.tabactive{
		color: #FF5121;
		border-bottom: 2px solid #FF5121;
	}
	
	.badge .el-badge__content.is-fixed{
		top:13px
	}
</style>
