<template>
	<div class="wh Detail">
		<div class="detailtitle">查看页面</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" >举报单ID</span>
					<span>{{  getValue(detailData.report_id)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey" >举报者ID</span>
					<span>{{  getValue(detailData.open_id)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">举报对象昵称</span>
					<span>{{ getValue(detailData.username) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">举报类型</span>
					<span>{{ getValue(detailData.classify_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">举报对象ID</span>
					<span>{{ getValue(detailData.accused_open_id) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">举报对象昵称</span>
					<span>{{ getValue(detailData.accused_username) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">举报位置</span>
					<span>{{ getValue(detailData.position) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">被举报作品ID</span>
					<span>{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">被举报作品名称</span>
					<span>{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">提交时间</span>
					<span>{{ getValue(detailData.create_time) }}</span>
				</li>
				
			</ul>
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
				detailData: '',
				pic:[],
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
			getinfo(){
				const report_id = this.$route.query.report_id;
				this.api.reportinfo({
					access_token:localStorage.getItem("access_token"),
					report_id:report_id
				}).then(da => {
					this.detailData = da;
				}).catch(() => {
					
				})
			},
		},
		created() {
			this.getinfo()
		},
		mounted(){
			
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
