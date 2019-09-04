<template>
	<div class="wh Detail">
		<div class="detailtitle">{{ currentpageName }}</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">项目类型名称</span>
					<el-input :disabled="row.id" placeholder="请输入内容" v-model="content" style="width:357px;height:40px;" clearable></el-input>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">状态</span>
					<div class="fleft status">
						<el-radio v-model="status" label="1" class="fleft">启用</el-radio>
						<el-radio v-model="status" label="0" class="fleft">停用</el-radio>
					</div>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive"  v-if="!row.id" @click="add()" >添加</button>
			<button class="defaultbtn defaultbtnactive" v-if="row.id" @click="edit()" >保存</button>
		</div>
		<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				detailData: '',
				content: '',
				status:"1",
				row:{},
				currentpageName:''
			}
		},
		methods: {
			getparent() {
				this.$router.go(-1)
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			add(){
				if(!this.content){
					this.$message({
						message:"项目类型名称不能为空"
					})
					return;
				}
				
				this.api.projectclassifyadd({
					access_token:localStorage.getItem("access_token"),
					classify_name:this.content,
					status:this.status
				}).then(da => {
					//console.log(da)
					if(da = "添加成功"){
						this.$router.go(-1)
					}
				}).catch(() => {
					
				})
			},
			edit(){
				if(!this.content){
					this.$message({
						message:"项目类型名称不能为空"
					})
					return;
				}
				this.api.projectclassifyupdate({
					access_token:localStorage.getItem("access_token"),
					classify_name:this.content,
					status:this.status,
					id:this.row.id
				}).then(da => {
					//console.log(da)
					if(da = "添加成功"){
						this.$router.go(-1)
					}
				}).catch(() => {
					
				})
			}
		},
		created() {
			if(this.$route.query.row){
				this.row = JSON.parse(this.$route.query.row);
				this.content = this.row.classify_name;
				this.status = this.row.status;
			}
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
		}
	}
</script>

<style>
	.Detail {
		background: white;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent {
		height: calc(100% - 139px);
		overflow-y: auto;
	}

	.detailContent ul {
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
</style>
