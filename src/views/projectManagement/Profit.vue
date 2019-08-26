<template>
	<div class="wh Detail" ref="height">
		<div class="detailtitle">
			<span class="fleft">{{ currentpageName }}</span>
		</div>
		<div class="detailContent" ref="scroll" style="height: calc(100% - 47px) !important;">
			<div class="relative" >
				<div class="detailContent" v-for="(item,index) in detailtext">
					<div class="modeltitle ofh" style="margin-left: 50px;">
						<div class="fleft">说明模块{{ index+1 }}</div>
						<div class="fright uediterspan h relative pointer" style="margin-right:50%;">
							<span @click="swapItems(detailtext,index,index-1)">上移</span><span @click="swapItems(detailtext,index,index+1)">下移</span><span @click="delect(index)">删除</span>
						</div>
					</div>
					<ul style="padding-top: 30px;">
						<li class="margint23 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">累计收益值</span>
							<el-input placeholder="请输入内容" v-model="item.total_income" style="width:357px;height:40px;" clearable></el-input>
						</li>
						<li class="margint23 ofh" >
							<span class="fleft detailKey" style="line-height: 40px;">加成百分比</span>
							<div class=" ofh" style="width: 800px;">
								<div class="fleft">
									<el-input placeholder="请输入内容" v-model="item.gain_share_rate" style="width:357px;height:40px;" clearable></el-input>
								</div>
								
							</div>
						</li>
					</ul>
					
				</div>
				<div class="addDetailContent" @click="addDetailContent()">+</div>
			</div>
			<div class="screenContent detailbtn">
				<button class="defaultbtn defaultbtnactive" @click="edit()">保存</button>
			</div>
			<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
				currentpageName:"",
				
				detailtext:[
					{
						total_income:0,
						gain_share_rate:0
					},
				]
			}
		},
		components: {
		},
		methods: {
			addDetailContent(){
				this.detailtext.push({
					total_income:0,
					gain_share_rate:0
				})
			},
			swapItems(arr, index1, index2) {
				
				if(index2 >= arr.length){
					this.$message({
						message:"到底了"
					});
					return
				}
				
				if(index2 < 0){
					this.$message({
						message:"已经是第一个了"
					});
					return
				}
				
				arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				this.detailtext = arr; 
			},
			delect(index){
				this.detailtext.splice(index,1);
			},
			getactivityinfo(){
				this.api.profitconfiginfo({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.detailtext = da;
				})
			},
			edit(){
				this.api.profitconfigsave({
					access_token:localStorage.getItem("access_token"),
					config:JSON.stringify(this.detailtext)
				}).then(da=>{
					this.getactivityinfo();
				})
			},
			
		},
		created() {
			
		},
		mounted(){
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			this.getactivityinfo();
		},
		watch:{
			
		}
	}
</script>

<style>
	.addDetailContent {
		font-size: 40px;
		color: #999999;
		text-align: center;
		line-height: 80px;
		border: 1px dotted #606266;
		cursor: pointer;
		border-radius: 10px;
		margin: 30px;
	}
	.uediterspan span{
		position: position;
		bottom: 0;
		margin:10px;
	}
	.sel-dialog  {
		width: 1100px;
	}
	
	.Detail {
		background: white;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent {
		height: calc(100% - 145px);
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

	.status .el-radio {
		width: auto;
	}

	.margint23 {
		margin-bottom: 23px;
	}

	.upload {
		padding-left: 158px;
		text-align: left;
	}

	#app .el-upload {
		text-align: left;
	}

	.ueditoruploadul {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 999;
	}

	.detailContent .ueditoruploadul ul {
		padding: 10;
	}
</style>
