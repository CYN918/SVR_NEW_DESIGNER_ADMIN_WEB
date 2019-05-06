<template>
	<div class="w ctcontent">
		
		<div class="margin40 cttitle" v-if="!commonTopData.tabData">{{ currentpageName }}</div>
		<div class="paddinglr40 relative" style="height: 58px;border-bottom: 2px solid #f0f2f5;line-height: 58px;margin-bottom: 20px;" v-else-if="commonTopData.tabData">
			<span class="fleft">
				{{ currentpageName }}
			</span>
			<div class="textcenter">
				<router-link v-for="(item,index) in commonTopData.tabData" :key="item.linkTo" :to="item.linkTo" tag="span" >
					<span :class="tabsnum == index ? 'tabs tabactive' : 'tabs'" @click="tabsChange(index)">
						<el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge>
					</span>
				</router-link>
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
							<div class="comonbtn" @click="IsShow()">设为平台推荐创作者</div>
							<div class="comonbtn">添加至黑名单</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="margin40" style="height: 60px;">
			<div class="tagbts">
				<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="btntag"
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
				tabsnum:0,
				currentpageName:''
			};
		},
		methods: {
			handleClose(tag) {
				this.$parent.resetSave(tag)
			},
			getparent(id,name) {
				var idIndex = id
				switch (name)
				{
					case "userBaseInfo":
						if (idIndex == "right1") {
							this.Istooltip = !this.Istooltip;
							return;
						}
						
						const shownum = {
							num: idIndex,
							showmask: "No",
							pageName: this.commonTopData.pageName,
						}
						eventBus.$emit("screenshow", shownum);
					break;
					case "userCompanyInfo":
						const shownum1 = {
							num: idIndex,
							showmask: "No",
							pageName: this.commonTopData.pageName,
						}
						eventBus.$emit("screenshow", shownum1);
					break;
					case "userPersonalInfo":
						const shownum2 = {
							num: idIndex,
							showmask: "No",
							pageName: this.commonTopData.pageName,
						}
						eventBus.$emit("screenshow", shownum2);
					break;
					case "roleManager":
						if(idIndex == "right1"){
							this.$parent.IsDetail = 2;
							
						};
						const shownum3 = {
							num: idIndex,
							showmask: "No",
							pageName: this.commonTopData.pageName,
						}
						eventBus.$emit("screenshow", shownum3);
					break;
					case "accountManager":
						
						const shownum4 = {
							num: idIndex,
							showmask: "No",
							pageName: this.commonTopData.pageName,
						}
						eventBus.$emit("screenshow", shownum4);
					break;
					default:;
				}
				
			},

			initbtn() {
				//根据页面的名字进行展示字段-筛选按钮的初始化

			},
			IsShow() {
				if (this.$parent.selectData.length == 0) {
					this.$message({
						message: '请勾选用户',
						type: 'warning'
					});
					return;
				}
				this.$parent.centerDialogVisible = true;
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			tabsChange(num){
				this.tabsnum = num
			}
		},
		mounted() {
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
