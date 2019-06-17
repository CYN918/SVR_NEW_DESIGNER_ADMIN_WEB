<template>
	<div class="wh Detail">
		<div class="detailtitle">查看用户信息</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户ID</span>
					<span class="fleft detailValue">{{  getValue(detailData.open_id) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户名</span>
					<span class="fleft detailValue">{{ getValue(detailData.username) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">手机号</span>
					<span class="fleft detailValue">{{ getValue(detailData.mobile) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">邮箱</span>
					<span class="fleft detailValue">{{ getValue(detailData.email) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">企业/机构名称</span>
					<span class="fleft detailValue">{{ getValue(detailData.company_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey ">统一社会信用代码</span>
					<span class="fleft detailValue">{{getValue(detailData.code)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey squareKey">营业执照</span>
					<img class="fleft detailValue squareImg" :src="detailData.business_license" alt="">
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey squareKey">开户许可证</span>
					<img class="fleft detailValue squareImg" :src="detailData.opening_permit" alt="">	
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">提供发票税率</span>
					<span class="fleft detailValue">{{getValue(detailData.tax_rate_type) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">企业银行账号</span>
					<span class="fleft detailValue">{{ getValue(detailData.bank_card_no) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">所属开户银行</span>
					<span class="fleft detailValue">{{ getValue(detailData.bank_name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">所属开户支行</span>
					<span class="fleft detailValue">{{ getValue(detailData.branch_bank) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">累计收益</span>
					<span class="fleft detailValue">{{ getValue() }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">累计录用作品</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ getValue()}}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">当前状态</span>
					<span class="fleft detailValue">{{ getValue(detailData.status) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">最近更新时间</span>
					<span class="fleft detailValue">{{ getValue(detailData.updated_at) }}</span>
				</li>
				
			</ul>
			<div class="screenContent detailbtn">
				<button class="defaultbtn"  @click="getparent()">返回</button>
			</div>
			<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				detailData:''
			}
		},
		methods:{
			getparent(){
				this.$router.go(-1);
			},
			getValue(val){
				if(val) {
					return val
				} else{
					return "--"
				}
			},
			getdata(){
				
				const id = this.$route.query.open_id;
				this.api.getContributorInfo({
					open_id: id,
					contribute_type:2
				}).then(da => {
					this.detailData = da;
					console.log(da);
				}).catch(() => {})
			}
		},
		mounted(){
			this.getdata();
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
		height: calc(100% - 18px);
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
	}
</style>
