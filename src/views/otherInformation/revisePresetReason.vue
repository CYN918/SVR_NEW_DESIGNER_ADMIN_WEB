<template>
	<div class="wh Detail">
		<div class="detailtitle">添加驳回理由</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">审核类型</span>
					<el-select v-model="type" placeholder="请选择">
						<el-radio-group v-model="type">
							<el-option v-for="(item,index) in tableData" :key="item.id" :value="item.id" :label="item.name">
								<el-radio :label="item.id">{{ item.name }}</el-radio>
							</el-option>
						</el-radio-group>
					</el-select>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">驳回理由</span>
					<el-input placeholder="请输入内容" v-model="content" style="width:357px;height:40px;" clearable></el-input>
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
			<button class="defaultbtn defaultbtnactive" @click="add()" >添加</button>
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
				tableData:[
					{name:"作品发布",id:"1"},
					{name:"作品入围",id:"2"},
					{name:"作品录用",id:"3"},
					{name:"平台供稿人",id:"4"},
					{name:"项目验收",id:"5"},
				],
				type:"1",
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
				this.api.reviewaddReason({
					access_token:localStorage.getItem("access_token"),
					type:this.type,
					content:this.content,
					status:this.status
				}).then(da => {
					//console.log(da)
					if(da = "添加成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				})
			},
			edit(){
				if(this.content.length == 0){
					this.$message({
						message:"主题分类名称不能为空"
					});
					return;
				}
				this.api.categoryEdit({
					access_token:localStorage.getItem("access_token"),
					
				}).then(da => {
					//console.log(da)
					if(da = "修改成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				})
			},
		},
		created() {}
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
