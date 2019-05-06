<template>
	<div class="wh Detail">
		<div class="detailtitle">创建角色</div>
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
			},
			getValue(val){
				if(val) {
					return val
				} else{
					return "--"
				}
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
