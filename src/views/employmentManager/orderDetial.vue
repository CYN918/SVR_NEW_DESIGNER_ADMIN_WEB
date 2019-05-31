<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				订单详情
			</span>
		</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh" v-for="(item,index) in workData" :key="index" :type="item.type">
					<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ orderinfo[item.id] }}</span>
					<span v-if="!item.type">{{ orderinfo[item.id] }}</span>
					<span v-if="item.type == 'keyvalue'">{{ item.child[orderinfo[item.id]] }}</span>
					<!-- <img class="img-top" v-else-if="item.type == 'imgtou'" src="../../assets/img/scsc_icon_yp.png" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" src="../../assets/img/scsc_icon_yp.png" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" src="../../assets/img/scsc_icon_yp.png" alt="">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" src="../../assets/img/scsc_icon_yp.png" alt=""> -->
					<button :class="'workbtn defaultbtn0 defaultbtn'+1" v-else-if="item.type == 'btn'">
						{{12}}
					</button>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ orderinfo[item.id] }}</span>
					</router-link>
				</li>
			</ul>
			<div class="marginlr30">
				<ul class="margint13">
					<li class="margint13 ofh" style="padding-left: 102px;border-top: 1px solid #f0f2f5;">
						<img class="fleft fontcolorg" style="margin-right: 20px;" src="../../assets/img/ly_fc_ckxq_icon_empty.png" alt="">
					</li>
					<!-- <li class="margint13 ofh w" style="border-top: 1px solid #f0f2f5;">
						<span class="fleft fontcolorg">渠道1</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">分成渠道ID</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">广告位ID</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">投放渠道</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">分成指标</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">录用价格</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">投放效果数据</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">结算收益</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">当前状态</span>
						<span>{{ 12345 }}</span>
					</li>
					<li class="margint13 ofh" style="margin-left: 102px;">
						<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">最近更新</span>
						<span>{{ "--" }}</span>
					</li> -->
				</ul>
			</div>
		</div>
		<div class="screenContent detailbtn" v-if="detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
		</div>
	</div>
</template>

<script>
	import workData from "../../assets/workData.js"
	export default {
		data() {
			return {
				detailbtn:true,
				workselect:false,
				checkList: [],
				checkAll: ["1", "2", "3", "4", "5", "6"],
				work_info:{},
				hire_info:{},
				font_size:0,
				orderinfo:{},
				workData:workData.orderDetial
			}
		},
		methods: {
			getparent() {
				//alert(parseInt(this.$route.query.type))
				this.$router.go(-1);
				
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			
			
			showselectwork() {
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
			},
			handleCheckAllChange(val) {
				this.checkList = this.checkAll;
				this.detailbtn = false;
				this.workselect = true;
			},
			getworkdetial(){
				this.api.orderinfo({
					id:this.$route.query.id,
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					//console.log(da)
					this.orderinfo = da;
				}).catch(da =>{
					
				})
			},
			handleCheckedCitiesChange(val){
				//console.log(val
				this.font_size = 0;
				val.forEach((item,index) =>{
					this.font_size += Number(item)
				});
			},
			
		},
		created() {
			this.getworkdetial();
		},
		mounted() {
			
		}
	}
</script>

<style>
	.materiallist .el-checkbox__label {
		display: none;
	}
	
	.work .el-button--primary{
		background: #FF5121;
		border-color: #FF5121;
	}
	
</style>

<style scoped>
	.Detail {
		background: white;
	}

	.Dialogkey {
		margin: 0 33px 26px 66px;
		width: 84px;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent1 {
		height: calc(100% - 139px);
		overflow-y: auto;
	}

	.detailContent1>ul {
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

	.roles-input {
		height: 40px;
		line-height: 40px;
	}

	.width500 {
		width: 500px;
	}

	.roles-input input {
		height: 100%;
		width: 400px;
	}

	.roletree {
		height: 460px;
		border: 1px solid #D9D9D9;
		display: inline-block;
		overflow-y: auto;
		border-radius: 5px;
	}

	.account-ipt {
		padding: 10px;
		text-align: center;
		border: 1px solid #999999;
		border-radius: 5px;
	}

	.tabs {
		width: 96px;
		height: 33px;
		display: inline-block;
		margin-right: 71px;
		cursor: pointer;
	}

	.tabactive {
		color: #FF5121;
		border-bottom: 2px solid #FF5121;
	}

	.img-top {
		width: 68px;
		height: 68px;
		border-radius: 50%;
	}
	
	.img-zheng {
		width: 160px;
		height: 100px;
	}

	.img-fengmian {
		width: 200px;
		height: 150px;
	}

	.img-banner {
		width: 341px;
		height: 110px;
	}

	.materiallist {
		display: flex;
		overflow: hidden;
		flex-wrap: wrap;
		justify-content: flex-start
	}

	.materiallist li {
		margin: 0 17px 17px 0;
	}

	.material {
		width: 239px;
		height: 135px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		background: #F9F9F9;
	}

	.material-fu {
		width: 60px;
		height: 68px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -34px;
		margin-left: -30px;
	}

	.material-bo {
		width: 32px;
		height: 32px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -16px;
		margin-left: -16px;
	}

	.material-checkbox {
		position: absolute;
		top: 6px;
		right: 10px;
	}

	.materialdownload {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.color66 {
		color: #666666;
		margin-top: 3px;
		overflow: hidden;
		font-size: 14px;
	}

	.el-message-box--center .el-message-box__title {
		justify-content: left;
	}

	.sel-alert {
		width: 406px;
	}

	.el-message-box__header,
	.el-dialog__header {
		padding: 27px 30px !important;

	}

	.el-dialog__title {
		font-size: 16px !important;
	}

	.el-dialog__body {
		padding: 27px 0 27px !important;
		border-top: 1px solid #e6e6e6;
	}

	.el-radio-group {
		display: block;
	}

	.el-dialog__headerbtn {
		position: "";
		float: right;
		font-size: 18px;
	}

	.sel-footer {
		display: block;
		text-align: center;
	}

	.el-radio {
		line-height: 28px;
	}

	.el-radio__input.is-checked .el-radio__inner,
	.el-button--primary {
		background: #FF5121;
		border-color: #FF5121;
	}

	.el-button--primary:focus,
	.el-button--primary:hover {
		background: #FF5121;
		border-color: #FF5121;
	}

	[class*=" el-icon-"],
	[class^=el-icon-] {
		line-height: 2;
	}

	.sel-radio-title {
		position: absolute;
		left: 30px;
	}

	.font12 {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #999999;
	}

	.el-message-box--center .el-message-box__content {
		padding: 20px 0 37px;
		border-top: 1px solid #E6E6E6;
	}

	.workbtn {
		width: 70px;
	}
	
	.employipt{
		height: 40px;
		line-height: 40px;
		margin: 30px;
	}
	
	.employmonre {
		width: 300px;
		display: inline-block;
		margin: 0 20px;
	}
	
	.employmonre input {
		width: 200px;
		height: 100%;
		margin-left: 5px;
	}
</style>
