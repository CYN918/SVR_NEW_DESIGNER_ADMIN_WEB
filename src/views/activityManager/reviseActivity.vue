<template>
	<div class="wh Detail">
		<div class="detailtitle">{{ currentpageName }}</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">主题分类名称</span>
					<el-input placeholder="请输入内容" v-model="input10" style="width:357px;height:40px;" clearable></el-input>
				</li>
				<li class="margint13 ofh" v-if="id">
					<span class="fleft detailKey">进行中的活动数</span>
					<div class="fleft status">{{ num }}</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">状态</span>
					<div class="fleft status">
						<el-radio v-model="radio2" label="1" class="fleft">启用</el-radio>
						<el-radio v-model="radio2" label="0" class="fleft">停用</el-radio>
					</div>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" @click="add()" v-if="!id">添加</button>
			<button class="defaultbtn defaultbtnactive" @click="edit()" v-if="id">确认修改</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				detailData: '',
				input10: '',
				radio2:"1",
				id:this.$route.query.id,
				num:this.$route.query.num,
				name:this.$route.query.name,
				status:this.$route.query.status,
				currentpageName:""
			}
		},
		methods: {
			getparent() {
				this.router.push({
					path: "/activityManager/activityClass"
				})
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			add(){
				
				if(this.input10.length == 0){
					this.$message({
						message:"主题分类名称不能为空"
					});
					return;
				}
				
				const id = this.$route.query.open_id;
				this.api.categoryAdd({
					access_token:localStorage.getItem("access_token"),
					category_name: this.input10,
					status:this.radio2
				}).then(da => {
					//console.log(da)
					if(da = "添加成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				})
			},
			edit(){
				if(this.input10.length == 0){
					this.$message({
						message:"主题分类名称不能为空"
					});
					return;
				}
				
				const id = this.$route.query.open_id;
				this.api.categoryEdit({
					access_token:localStorage.getItem("access_token"),
					category_name: this.input10,
					status:this.radio2,
					id:this.id
				}).then(da => {
					//console.log(da)
					if(da = "修改成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				})
			},
		},
		created() {
			if(this.id){
				this.input10 = this.name;
				this.radio2  = this.status;
			}
		},
		mounted(){
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			console.log(this.$route.matched);
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
