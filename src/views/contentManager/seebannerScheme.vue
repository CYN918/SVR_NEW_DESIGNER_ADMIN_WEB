<template>
	<div class="wh Detail">
		<div class="detailtitle">新建banner方案</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey">banner展示方案ID</span>
					<span style="width:357px;height:40px;">{{ data.id }}</span>
				</li>
				
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >banner方案名称</span>
					<span style="width:357px;height:40px;">{{ data.banner_program_name }}</span>
				</li>
				<li class="margint23 ofh" style="line-height: 40px;">
					<div>
						<span class="fleft detailKey" >展示时间段</span>
						<span class="fleft">{{ data.program_begin_time }}</span>
						<span class="fleft" >
							&nbsp;至&nbsp;
						</span>
						<span class="fleft">{{ data.program_end_time }}</span>
					</div>
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey">是否设为默认展示方案</span>
					<div class="fleft status">
						<el-radio v-model="data.is_default" label="1" class="fleft" style="height: 40px;line-height: 40px;">是</el-radio>
						<el-radio v-model="data.is_default" label="0" class="fleft" style="height: 40px;line-height: 40px;">否</el-radio>
					</div>
				</li>
			</ul>
			<div style="border-top: 1px solid #E6E6E6;padding-top: 40px;margin-top: 40px;">
				<div v-for ="(item,index) in data.banner_info" :key="item.id">
					<div class="fleft" style="line-height: 40px;padding-left: 40px;">banner-{{ index+1 }}</div>
					<ul style="padding-top: 0px;margin-top: 0px;">
						<!-- <div class="detailtitle">Banner-1</div> -->
						<li class="margint23 ofh">
							<span class="fleft detailKey"  style="line-height: 40px;">banner</span>
							
							<img :src="item.banner_pic" alt="" width="340px" height="110px">
						</li>
						<li class="margint13 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">banner素材活动</span>
							<span style="width:357px;height:40px;line-height: 40px;">{{ item.banner_name }}</span>
						</li>
						<li class="margint13 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">跳转链接</span>
							<span style="width:357px;height:40px;line-height: 40px;">{{ item.jump_url }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
		</div>
	</div>
</template>

<script>
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import DataScreen from "@/assets/DataScreen.js"
	
	export default {
		components: {
			commonTop,
			commonTable,
		},
		data() {
			return {
				data:{}
			}
		},
		methods: {
			getparent() {
				this.$router.go(-1);
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			getinfo(){
				this.api.bannerprograminfo({
					access_token:localStorage.getItem("access_token"),
					id:this.$route.query.id
				}).then(da=>{
					console.log(da);
					this.data = da;
				}).catch(da=>{
					
				})
			}
		},
		created() {
			this.getinfo();
		},
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
	
	.addzu{
		color: #FF5121;
		padding-left: 40px;
	}
	
	.sel-dialog  {
		width: 1000px;
	}
</style>
