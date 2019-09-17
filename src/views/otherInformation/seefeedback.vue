<template>
	<div class="wh Detail">
		<div class="detailtitle">查看页面</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" >反馈单ID</span>
					<span>{{  getValue(detailData.feedback_id)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户ID</span>
					<span>{{ getValue(detailData.open_id) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户昵称</span>
					<span>{{ getValue(detailData.username) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">问题类型</span>
					<span>{{ getValue(detailData.classify_name) }}</span>
				</li>
				<li class="margint13 ofh" v-for="(item,index) in pic" :key="index">
					<span class="fleft detailKey">图片{{index+1}}</span>
					<img class="img-fengmian"  :src="item" alt="没有图片">
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">联系方式类型</span>
					<span>{{ getValue(detailData.link_type) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">联系方式</span>
					<span>{{ getValue(detailData.link) }}</span>
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
				const feedback_id = this.$route.query.feedback_id;
				this.api.feedbackinfo({
					access_token:localStorage.getItem("access_token"),
					feedback_id:feedback_id
				}).then(da => {
					this.detailData = da;
					this.pic = JSON.parse(da.pic);
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
