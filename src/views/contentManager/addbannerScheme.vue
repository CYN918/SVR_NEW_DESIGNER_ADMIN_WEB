<template>
	<div class="wh Detail">
		<div class="detailtitle">{{ currentpageName }}</div>
		<div class="detailContent1 ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey" style="line-height: 40px;">banner方案名称</span>
					<el-input placeholder="请输入内容" v-model="banner_program_name" style="width:357px;height:40px;" clearable></el-input>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否设为默认展示方案</span>
					<div class="fleft status">
						<el-radio v-model="is_default" label="1" class="fleft">是</el-radio>
						<el-radio v-model="is_default" label="0" class="fleft">否</el-radio>
						<span>将替换当前默认展示方案：<span style="color: #FF5121;">{{ bannerprogramdefault.banner_program_name }}</span></span>
					</div>
				</li>
				
				<li class="margint23 ofh">
					<div>
						<span class="fleft detailKey" style="line-height: 40px;">展示时间段</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="program_begin_time" type="datetime"
						 placeholder="开始时间">
						</el-date-picker>
						<span class="fleft" style="line-height: 40px;">
							&nbsp;至&nbsp;
						</span>
						<el-date-picker class="fleft" value-format="yyyy-MM-dd HH:mm:ss" v-model="program_end_time" type="datetime"
						 placeholder="结束时间">
						</el-date-picker>
					</div>
				</li>
			</ul>
			<div style="border-top: 1px solid #E6E6E6;padding-top: 40px;margin-top: 40px;">
				<div v-for ="(item,index) in selectData" :key="item.id">
					<div class="fleft" style="line-height: 40px;padding-left: 40px;">banner-{{ index+1 }}</div>
					<ul style="padding-top: 0px;margin-top: 0px;">
						<!-- <div class="detailtitle">Banner-1</div> -->
						<li class="margint23 ofh">
							<span class="fleft detailKey"  style="line-height: 40px;">banner</span>
							<!-- <el-upload action="454535" :http-request="httprequest" :show-file-list="false">
								<div style="overflow: hidden;">
									<button class="defaultbtn fleft" style="margin-left: 0;">上传图片</button>
								</div>
								<div class="fontcolorg">1920px*620px，格式jpg，jpeg，png，大小不超过10M</div>
							</el-upload> -->
							<!-- <img :src="item.banner_pic" alt="" width="340px" height="110px" style="margin-left: 156px;"> -->
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
			<div class="addzu pointer" @click="select">+添加一组</div>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button class="defaultbtn defaultbtnactive" @click="add()">创建</button>
		</div>
		<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
		<el-dialog title="请选择banner素材" :visible.sync="dialogTableVisible" custom-class="sel-dialog">
			<div>
				<div class="margin40 borderb" style="position: relative;padding-bottom: 22px;">
					<div class="ofh">
						<div class="fleft">
							<el-button class="btnorgle" v-for="(item,index) in commonTopData.commonleftbtn" :key="item.id" @click="screen(item.id)">{{ item.name }}</el-button>
						</div>
					</div>
				</div>
				<div class="margin40" style="height: 60px;">
					<div class="tagbts">
						<el-tag :key="item.id" v-for="(item,index) in commonTopData.commonbottombtn" closable class="tag btntag"
						 :disable-transitions="false" @close="handleClose(item.id)">
							{{item.btnName + "：" + item.val}}
						</el-tag>
					</div>
				</div>
				<div class="calc205">
					<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
					 ref="Tabledd"></common-table>
				</div>
				<div class="screenContent detailbtn">
					<button class="defaultbtn defaultbtnactive" @click="select()">确定（{{selectData.length}}）</button>
				</div>
			</div>
		</el-dialog>
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
				detailData: '',
				input10: '',
				banner_pic:"",
				jump_url:"",
				form:{},
				radio2:"1",
				dialogTableVisible:false,
				commonTopData: {
					"pageName": "addbannerScheme",
					"commonleftbtn": [{
							name: "筛选",
							id: "left1",
							url: ""
						}
					],
					"commonrightbtn": [],
					"commonbottombtn": [],
					"IsShow": true,
				},
				screenConfig: [],
				tableConfig: {
					"pageName": "addbannerScheme",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: DataScreen.screenShow.addbannerScheme.bts,
					loading:true
				
				},
				tableData: [],
				tableAction: DataScreen.screenShow.addbannerScheme.action,
				selectData:[],
				banner_material_ids:"",
				banner_program_name:"",
				program_begin_time:"",
				program_end_time:"",
				is_default:"0",
				currentpageName:"",
				bannerprogramdefault:{},
			}
		},
		methods: {
			getparent() {
				this.router.push({
					path:"/contentManager/homeBanner",
					query:{
						tabsnum:1
					}
				})
			},
			getactivitiesrows(row){
				//console.log(row);
				this.selectData.push(row);
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			add(){
				
				this.selectData.forEach((item,index)=>{
					this.banner_material_ids += (this.selectData.length-1)== index ? item.id : (item.id+",")
				})
				
				if(this.banner_material_ids == "" || this.banner_program_name == "" || this.program_begin_time == "" || this.program_end_time == "" || this.selectData.length == 0){
					this.$message({
						type:"info",
						message:"方案名称*是否设为默认展示方案*展示时间段*banner素材不能为空！！"
					});
					return;
				}
				this.api.bannerprogramadd({
					access_token:localStorage.getItem("access_token"),
					banner_material_ids:this.banner_material_ids,
					banner_program_name:this.banner_program_name,
					program_begin_time:this.program_begin_time,
					program_end_time:this.program_end_time,
					is_default:this.is_default,
				}).then(da => {
					//console.log(da)
					
					if(da.result == 0){
						this.router.push({
							path:"/contentManager/homeBanner",
							query:{
								tabsnum:1
							}
						})
					}
				}).catch(() => {
					
				})
			},
			edit(){
				this.$message({
					message:"主题分类名称不能为空"
				});
				return;
				
				/* this.api.categoryEdit({
					access_token:2,
					category_name: this.input10,
					status:this.radio2,
					id:this.id
				}).then(da => {
					//console.log(da)
					if(da = "修改成功"){
						this.$router.go(-1);
					}
				}).catch(() => {
					
				}) */
			},
			httprequest(params) {
				//console.log("params",params)
				const _file = params.file;
				this.file = params.file
				//const isLt2M = _file.size / 1024 / 1024 < 2;
			
				/* if (!isLt2M) {
					this.$message.error("请上传2M以下是的文件");
					return false;
				} */
			
				let app_secret = '1Q61s1iP8I376GyMTdsjOzd4hcLpZ4SG';
				let open_id = 7;
				let times = (Date.parse(new Date()) / 1000);
				let arr = [
					1003,
					app_secret,
					open_id,
					times
				];
			
				// 通过 FormData 对象上传文件
				var formData = new FormData();
				formData.append("file", _file);
				formData.append('app_id', 1003);
				formData.append('sign', this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user', open_id)
				formData.append('relation_type', 'activity')
				formData.append('timestamp', times)
			    var _this = this
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					//console.log(response.data.data.url);
					_this.banner_pic = response.data.data.url
				}).catch(function (error) {
					console.log(error);
				});
				//console.log(this.form.banner = url)
			},
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize
				}
				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}
			
				this.api.bannerlist(data).then((da) => {
					//console.log(da.data)
					if (!da) {
						this.$message('数据为空');
					}
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
				}).catch(() => {
				});
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
					
				})
			},
			linkDetail(id) {
				//alert(id);
				this.IsDetail = true;
				this.api.getContributorInfo({
					open_id: id,
					contribute_type:2
				}).then(da => {
					this.detailData = da;
					//console.log(da);
				}).catch(() => {})
			},
			getcommonrightbtn(){
				this.commonTopData.commonbottombtn = [];
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate);
					//console.log(urldata);
					this.filterFields.forEach(item=>{
						//console.log(item);
						if(urldata[item.id]){
							var val = urldata[item.id];
							if(item.child){	
								val = "";
								item.child.forEach(citem=>{
									//alert(urldata[item.id])
									if(citem.id == urldata[item.id]){
										val = citem.name;
									}
								})
							} 
							this.commonTopData.commonbottombtn.push({btnName:item.name,val:val,id:item.id});
							console.log(this.commonTopData.commonbottombtn);
						}
					})
				}
				
			},
			resetSave(tag){
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					//console.log(tag);
					this.$router.push({path:'/userCompanyInfo',query:{urlDate:JSON.stringify(urldata)}});
					this.getcommonrightbtn();
					this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
				}
			},
			select(){
				this.dialogTableVisible = !this.dialogTableVisible
			},
			getbannerprogramdefault(){
				this.api.bannerprogramdefault({
					access_token:localStorage.getItem("access_token")
				}).then(da=>{
					this.bannerprogramdefault = da;
				})
			}
		},
		created() {
			this.getData({pageCurrent:this.tableConfig.currentpage,pageSize:this.tableConfig.pagesize});
			this.screenreach();
			this.getcommonrightbtn();
			this.getbannerprogramdefault();
		},
		mounted(){
			this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			//console.log(this.$route.matched);
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
		overflow-y: scroll;
	}
</style>
