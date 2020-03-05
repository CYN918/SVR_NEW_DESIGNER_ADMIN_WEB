<template>
	<div class="wh Detail">
		<div class="detailtitle">查看用户信息</div>
		<div style="overflow-y: auto;height:calc(100% - 40px);width: 100%;">
			<ul style="padding-left: 132px;">
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.open_id) }}</span>
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
					<span class="fleft detailKey">身份证姓名</span>
					<span class="fleft detailValue">{{ getValue(detailData.name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey ">身份证号码</span>
					<span class="fleft detailValue">{{ getValue(detailData.id_card) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey squareKey">身份证正面照片</span>
					<img class="fleft detailValue squareImg" :src="detailData.front_photo" alt="">
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey squareKey">身份证反面照片</span>
					<img class="fleft detailValue squareImg" :src="detailData.back_photo" alt="">
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey squareKey">手持身份证照片</span>
					<img class="fleft detailValue squareImg" :src="detailData.hand_hold_photo" alt="">
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">收款账户名</span>
					<span class="fleft detailValue">{{ getValue(detailData.name) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">银行卡号</span>
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
					<span class="fleft detailKey">银行预留手机号</span>
					<span class="fleft detailValue">{{ getValue(detailData.reserve_phone) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">累计收益</span>
					<span class="fleft detailValue">{{ money(detailData.hire_price) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">累计录用作品</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ getValue(detailData.hire_num) }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">当前状态</span>
					<span class="fleft detailValue">{{ getstatus(detailData.status) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">最近更新时间</span>
					<span class="fleft detailValue">{{ getValue(detailData.updated_at) }}</span>
				</li>
			</ul>
			<div class="screenContent detailbtn">
				<button class="defaultbtn"  @click="getparent()">返回</button>
			</div>
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
			money(str){
				let d = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				return "¥"+d;
			},
			getstatus(n){
				switch (n){
					
					case '1':
						return "审核通过"
						break;
					case '0':
						return "审核中"
						break;
					case '-1':
						return "审核不通过"
						break;
					default:
						return "--"
						break;
				}
			},
			getparent() {
				this.loading = false;
				this.$router.push({
					path:"/userManager/userInfo",
					query:{
						tabsnum:localStorage.getItem('userInfo')
					}
				})
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
					contribute_type:1
				}).then(da => {
					this.detailData = da;
					console.log(da)
				}).catch(() => {})
			}
		},
		created() {
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
		background: red;
	}
</style>
