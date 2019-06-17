<template>
	<div class="wh Detail">
		<div class="detailtitle">查看页面</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" >提现单ID</span>
					<span>{{  getValue(detailData.apply_id)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey" >提现用户ID</span>
					<span>{{  getValue(detailData.open_id)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">提现用户账号名</span>
					<span>{{ getValue(detailData.username) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">提现金额</span>
					<span>{{ getValue(detailData.cash_money) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">账号主体</span>
					<span>{{ getValue(detailData.contributor_type) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">收款账户名</span>
					<span>{{ getValue(detailData.account_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">银行卡号</span>
					<span>{{ getValue(detailData.bank_card_id) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">开户银行</span>
					<span>{{ getValue(detailData.bank_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">开户支行</span>
					<span>{{ getValue(detailData.bank_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">银行预留手机号</span>
					<span>{{ getValue(detailData.mobile) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">状态</span>
					<span>{{ key(detailData.check_status) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">申请时间</span>
					<span>{{ getValue(detailData.apply_time) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">处理时间</span>
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
			key(n){
				var child ={
					"0":"待审核",
					"1":"审核中",
					"2":"审核通过",
					"3":"已付款 ",
					"-1":"审核失败",
					"-2":"已撤回",
				}
				
				return child[n];
			}
			
		},
		created() {
			this.detailData = JSON.parse(this.$route.query.row);
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
