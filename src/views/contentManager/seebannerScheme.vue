<template>
<div>
	<common-top :commonTopData="commonTopData"></common-top>
	<div class="wh Detail">
		<div class="detailtitle">{{ currentpageName }}</div>
		<div class="detailContent1 ofh" v-if="edit != 'edit'">
			<ul>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey">banner展示方案ID</span>
					<span style="width:357px;height:40px;">{{ datadetial.id }}</span>
				</li>
				
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >banner方案名称</span>
					<span style="width:357px;height:40px;">{{ datadetial.banner_program_name }}</span>
				</li>
				<li class="margint23 ofh" style="line-height: 40px;">
					<div>
						<span class="fleft detailKey" >展示时间段</span>
						<span class="fleft">{{ datadetial.program_begin_time }}</span>
						<span class="fleft" >
							&nbsp;至&nbsp;
						</span>
						<span class="fleft">{{ datadetial.program_end_time }}</span>
					</div>
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey">是否设为默认展示方案</span>
					<div class="fleft status">
						<el-radio disabled v-model="datadetial.is_default" label="1" class="fleft disabled" style="height: 40px;line-height: 40px;">是</el-radio>
						<el-radio disabled v-model="datadetial.is_default" label="0" class="fleft disabled" style="height: 40px;line-height: 40px;">否</el-radio>
					</div>
				</li>
			</ul>
			<div style="border-top: 1px solid #E6E6E6;padding-top: 40px;margin-top: 40px;">
				<div v-for ="(item,index) in datadetial.banner_info" :key="item.id">
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
					<div class="rleft" style="float:right;padding-right:120px;cursor: pointer;position: relative;bottom: 200px;" @click="deleteCanal(index,myArray)">删除</div>
				</div>
			</div>
		</div>
		<div class="detailContent1 ofh" v-if="edit == 'edit'">
			<ul>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey">banner展示方案ID</span>
					<span style="width:357px;height:40px;">{{ datadetial.id }}</span>
				</li>
				
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey" >banner方案名称</span>
					<el-input style="width:357px;height:40px;" v-model="datadetial.banner_program_name"></el-input>
				</li>
				<li class="margint23 ofh" style="line-height: 40px;">
					<div>
						<span class="fleft detailKey" style="line-height: 40px;">展示时间段</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="datadetial.program_begin_time" type="datetime"
						 placeholder="开始时间">
						</el-date-picker>
						<span class="fleft" style="line-height: 40px;">
							&nbsp;至&nbsp;
						</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="datadetial.program_end_time" type="datetime"
						 placeholder="结束时间">
						</el-date-picker>
					</div>
				</li>
				<li class="margint13 ofh" style="line-height: 40px;">
					<span class="fleft detailKey">是否设为默认展示方案</span>
					<div class="fleft status">
						<el-radio v-model="datadetial.is_default" label="1" class="fleft" style="height: 40px;line-height: 40px;">是</el-radio>
						<el-radio v-model="datadetial.is_default" label="0" class="fleft" style="height: 40px;line-height: 40px;">否</el-radio>
					</div>
				</li>
			</ul>
			<div style="border-top: 1px solid #E6E6E6;padding-top: 40px;margin-top: 40px;">
				<draggable v-model="myArray" class="createGoods-show-list">
					<li v-for ="(item,index) in myArray" :key="item.id">
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
						<div class="rleft" style="float:right;padding-right:120px;cursor: pointer;position: relative;bottom: 200px;" @click="deleteCanal(index,myArray)">删除</div>
					</li>  
                </draggable>
			</div>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" v-if="edit == 'edit'" @click="editp()">确定</button>
		</div>
	</div>
</div>
</template>

<script>
	import commonTop from '@/components/commonTop.vue'
	import commonTable from '@/components/commonTable.vue'
	import DataScreen from "@/assets/DataScreen.js"
	import draggable from 'vuedraggable';
	
	export default {
		
		components: {
			commonTop,
			commonTable,
			draggable,
		},
		data() {
			return {
				edit:this.$route.query.edit,
				datadetial:{},
				currentpageName:"",
				commonTopData: {
					"pageName": "seebannerScheme",
					"commonleftbtn": [],
					"commonrightbtn": [],
					"commonbottombtn":[],
				},
				myArray:[],
				newArr:[],
				tabsnum:1,
			}
		},
		methods: {
			getparent() {
				this.router.push({
					path: "/contentManager/homeBanner",
					query: {
						tabsnum: this.tabsnum
					}
				})
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
					//console.log(da);
					this.datadetial = da;
					this.myArray = da.banner_info;
				}).catch(da=>{
					
				})
			},
			editp(){
				var heavyArr = this.unique(this.myArray);
				heavyArr.forEach(item => {
					this.newArr.push(item.id)
					return
				})
				// console.log(typeof(JSON.parse(this.datadetial.banner_material_ids)))
				// console.log(JSON.parse(this.datadetial.banner_material_ids).join(","))
				// console.log(typeof(this.newArr))
				// console.log(this.newArr.join(","))
				
				this.api.bannerprogramedit({
					access_token:localStorage.getItem("access_token"),
					id:this.datadetial.id,
					banner_program_name:this.datadetial.banner_program_name,
					is_default:this.datadetial.is_default,
					program_begin_time:this.datadetial.program_begin_time,
					program_end_time:this.datadetial.program_end_time,
					banner_material_ids:  this.newArr.join(",")
				}).then(da=>{
					if(da.result == 0){
						this.$router.go(-1);
					}
				}).catch(da=>{
					
				})
			},
			unique(arr){
				var newArr = [];
				for(var i = 0; i < arr.length; i++){
					if(newArr.indexOf(arr[i]) == -1){
						newArr.push(arr[i])
					}
				}
				return newArr;
			},
			deleteCanal(index,rows){
				rows.splice(index, 1);
			},
		},
		created() {
			this.getinfo();
		},
		mounted(){
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			console.log(this.$route.matched);
		}
	}
</script>

<style>
	.disabled .el-radio__input.is-checked .el-radio__inner{
		background-color: #C0C4CC !important;
        border-color: #C0C4CC !important;
	}
	
	.disabled .el-radio__input.is-checked + .el-radio__label{
		color: #C0C4CC !important;
	}
	
	.Detail {
		background: white;
	}

	.detailtitle {
		padding-left: 40px;
		padding-top: 18px;
	}

	.detailContent1 {
		height: calc(100% - 194px);
		overflow-y: auto;
	}

	.detailContent1 ul {
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
