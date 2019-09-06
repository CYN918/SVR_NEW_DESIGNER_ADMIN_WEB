<template>
	<div class="wh Detail">
		<div class="detailtitle">{{ currentpageName }}</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey">项目模板ID</span>
					<span style="width:357px;height:40px;">{{ datadetial.id }}</span>
				</li>
				
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >项目模板名称</span>
					<span style="width:357px;height:40px;">{{ datadetial.template_name }}</span>
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >banner</span>
					<img :src="datadetial.banner" alt="" width="340px" height="110px">
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >领域范围</span>
					<span style="width:357px;height:40px;">{{ datadetial.fields }}</span>
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >预计收益</span>
					<span style="width:357px;height:40px;">{{ datadetial.expected_profit }}</span>
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >额外赏金</span>
					<span style="width:357px;height:40px;">{{ datadetial.extra_reward }}</span>
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >项目顾问QQ</span>
					<span style="width:357px;height:40px;">{{ datadetial.qq }}</span>
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey">状态</span>
					<div class="fleft status">
						<el-radio disabled v-model="datadetial.status" label="1" class="fleft disabled" style="height: 40px;line-height: 40px;">是</el-radio>
						<el-radio disabled v-model="datadetial.status" label="0" class="fleft disabled" style="height: 40px;line-height: 40px;">否</el-radio>
					</div>
				</li>
			</ul>
			<div style="border-top: 1px solid #E6E6E6;padding-top: 40px;margin-top: 40px;">
				<div v-for ="(item,index) in detialtext">
					<div class="fleft" style="line-height: 40px;padding-left: 40px;">说明模块-{{ index+1 }}</div>
					<ul style="padding-top: 0px;margin-top: 0px;">
						<li class="margint13 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">模块标题</span>
							<span style="width:357px;height:40px;line-height: 40px;">{{ item.title }}</span>
						</li>
						<li class="margint13 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">详细说明</span>
							<span style="width:357px;height:40px;line-height: 40px;" v-html="item.text"></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
		</div>
		<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				datadetial:{},
				currentpageName:"",
				detialtext:[],
				
			}
		},
		methods: {
			getparent() {
				this.$router.push({
					path:"/projectManagement/projectclass",
					query:{
						tabsnum:localStorage.getItem('projectclass')
					}
				})
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			getinfo(){
				this.api.projecttemplatedetail({
					access_token:localStorage.getItem("access_token"),
					id:this.$route.query.id
				}).then(da=>{
					this.datadetial = da;
					this.detialtext = JSON.parse(da.desc);
				}).catch(da=>{
					
				})
			},
		},
		created() {
			this.getinfo();
		},
		mounted(){
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
		}
	}
</script>

<style>
	.disabled .el-radio__input.is-checked .el-radio__inner{
		background-color: #C0C4CC !important;
        border-color: #C0C4CC !important;
	}
	
	.disabled .el-radio__input.is-checked + .el-radio__label{
		color: #C0C4CC !important;
	}
	
	.Detail {
		background: white;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent1 {
		height: calc(100% - 194px);
		overflow-y: auto;
	}

	.detailContent1 ul {
		padding-left: 132px;
		padding-top: 64px;
	}

	.margint13 {
		margin-bottom: 13px;
	}

	.detailKey {
		width: 160px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
	}

	.detailValueImg {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		background: red;
	}

	.detailKeyImg {
		line-height: 68px;
	}

	.routerLink {
		color: #FF5121;
	}

	.detailbtn {
		height: 100px;
	}

	.squareImg {
		width: 160px;
		height: 102px;
		background: red;
	}
	
	.status .el-radio{
		width: auto;
	}
	
	.addzu{
		color: #FF5121;
		padding-left: 40px;
	}
	
	.sel-dialog  {
		width: 1000px;
	}
</style>
