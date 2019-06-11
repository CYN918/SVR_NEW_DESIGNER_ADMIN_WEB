<template>
	<div class="wh Detail">
		<div class="detailtitle">编辑干预任务</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">词干预</span>
					<el-input placeholder="请输入内容" v-model="word" style="width:357px;height:40px;" clearable></el-input>
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
				word: '',
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
				const id = this.$route.query.open_id;
				this.api.hotwordadd({
					access_token:localStorage.getItem("access_token"),
					word: this.word,
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
				this.api.hotwordedit({
					access_token:localStorage.getItem("access_token"),
					word: this.word,
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
			if(this.$route.query.row){
				this.row = JSON.parse(this.$route.query.row)
				this.word = this.row.word;
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
