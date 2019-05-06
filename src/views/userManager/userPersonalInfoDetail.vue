<template>
	<div class="wh Detail">
		<div class="detailtitle">查看用户信息</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户ID</span>
					<span class="fleft detailValue">{{ detailData.open_id }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户名</span>
					<span class="fleft detailValue">{{ detailData.username }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">手机号</span>
					<span class="fleft detailValue">{{ detailData.username }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">邮箱</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">身份证姓名</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey ">身份证号码</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey squareKey">身份证正面照片</span>
					<span class="fleft detailValue squareImg"></span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey squareKey">身份证反面照片</span>
					<span class="fleft detailValue squareImg"></span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey squareKey">手持身份证照片</span>
					<span class="fleft detailValue squareImg"></span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">收款账户名</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">银行卡号</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">所属开户银行</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">所属开户支行</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">银行预留手机号</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">累计收益</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">累计录用作品</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ 0 }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">当前状态</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">最近更新时间</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn"  @click="getparent()">返回</button>
		</div>
	</div>
</template>

<script>
	export default {
		props:['detailData'],
		methods:{
			getparent(){
				this.$parent.IsDetail = false;
			}
		}
	}
</script>

<style>
	.Detail{
		background: white;
	}
	.detailtitle{
		padding-left: 40px;
		padding-top: 18px;
	}
	
	.detailContent{
		height: calc(100% - 139px);
		overflow-y: auto;
	}
	
	.detailContent ul{
		padding-left: 132px;
		padding-top: 64px;
	}
	
	.margint13{
		margin-bottom: 13px;
	}
	
	.detailKey{
		width: 160px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
	}
	
	.detailValueImg{
		width: 68px;
		height: 68px;
		border-radius: 50%;
		background: red;
	}
	
	.detailKeyImg{
		line-height: 68px;
	}
	
	.routerLink{
		color: #FF5121;
	}
	
	.detailbtn{
		height: 100px;
	}
	
	.squareImg{
		width: 160px;
		height: 102px;
		background: red;
	}
</style>
