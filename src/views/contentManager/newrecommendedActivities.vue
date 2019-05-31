<template>
	<div class="wh Detail">
		<div class="detailtitle">新建干预任务</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">选择干预活动</span>
					<div class="fleft">	
						<div>
							<button class="defaultbtn" style="margin: 0;">选择活动</button>
						</div>
						<div>
							<span>活动名称</span>
						</div>
						<div>
							<span class="fontcolorg" style="font-size: 12px;">商业征集 2019/1/1至2019/2/2</span>	
						</div>
					</div>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">干预位置</span>
					<el-select v-model="position" placeholder="请选择">
						<el-radio-group v-model="position">
							<el-option v-for="(item,index) in tableData" :key="item.name" :value="item.id" :label="item.name">
								<el-radio :label="item.id">{{ item.name }}</el-radio>
							</el-option>
						</el-radio-group>
					</el-select>
				</li>
				<li class="margint13 ofh">
					<div>
						<span class="fleft detailKey" style="line-height: 40px;">展示时间段</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH-mm-ss" v-model="start_time" type="datetime"
						 placeholder="开始时间">
						</el-date-picker>
						<span class="fleft" style="line-height: 40px;">
							&nbsp;至&nbsp;
						</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH-mm-ss" v-model="end_time" type="datetime"
						 placeholder="结束时间">
						</el-date-picker>
					</div>
				</li>
				
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" v-if="!row" @click="add()">添加</button>
			<button class="defaultbtn defaultbtnactive" v-if="row" @click="edit()">确认</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				detailData: '',
				activity_id: '',
				start_time:'',
				end_time:'',
				position:'',
				row: '',
				tableData:[
					{name:"第一位",id:"1"},
					{name:"第二位",id:"2"},
					{name:"第三位",id:"3"},
					{name:"第四位",id:"4"},
					{name:"第五位",id:"5"}
				]
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
			add(){
				this.api.recommendactivityadd({
					access_token:localStorage.getItem("access_token"),
					activity_id: this.activity_id,
					start_time:this.start_time,
					end_time:this.end_time,
					position:this.position
				}).then(da => {
					//console.log(da)
					if(da = "添加成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				})
			},
			edit(){
				
				this.api.recommendactivityedit({
					access_token:localStorage.getItem("access_token"),
					activity_id: this.activity_id,
					start_time:this.start_time,
					end_time:this.end_time,
					position:this.position
				}).then(da => {
					//console.log(da)
					if(da = "修改成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				})
			},
		},
		created() {
			//console.log(this.row)
			if(this.$route.query.row){
				this.row = JSON.parse(this.$route.query.row)
				this.activity_id = this.row.activity_id;
				this.start_time = this.row.start_time;
				this.end_time = this.row.end_time;
				this.position = this.row.position;
			}
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
