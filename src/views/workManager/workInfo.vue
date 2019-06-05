<template>
	<div class="wh">
		<div class="wh">
			<common-top :commonTopData="commonTopData"></common-top>
			<div class="calc205">
				<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
				 ref="Tabledd"></common-table>
			</div>
		</div>
		<el-dialog title="批量操作-设为平台推荐创作者" :visible.sync="centerDialogVisible" width="406px">
			<div style="position: relative;">
				<div class="sel-radio-title">
					<div style="color: #1E1E1E;">推荐评级</div>
					<div class="font12">已选择{{ selectData.length }}条数据</div>
				</div>
				<el-radio-group v-model="radioS" class="sel-dialog-content">
					<div class="w textcenter sel-radio">
						<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="S">D&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
					</div>
				</el-radio-group>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<el-button type="primary" @click="contributor">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="请选择录用方式" :visible.sync="centerDialogVisible2" custom-class="width610">
			<div style="position: relative;">
				<div class="textcenter">
					<div class="employment">
						<!-- <span>
							<span :class="['number',{'numberactive':!Isnextshow}]">1</span>
							<span :class="{'fontactive':!Isnextshow}">绑定综合平台需求</span>
						</span>
						<span :class="['centerline',{'centerlineactive': Isnextshow}]"></span>
						<span>
							<span :class="['number',{'numberactive':Isnextshow}]">2</span>
							<span :class="{'fontactive': Isnextshow}">绑定综合平台需求</span>
						</span> -->
						<span>录用方式</span>
					</div>
					<span style="margin-right:0;height: auto; margin-top: 62px;" v-for="(item,index) in tabData1" :key="item.name" :class="tabsnum1 == index ? 'tabs tabactive' : 'tabs'"
					 @click="tabsChange1(index,item.name)">
						<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
						{{ item.name }}
					</span>
					<div class="textcenter employipt" v-if="false">
						<span style="display: inline-block;margin-right: 60px;">选择需求</span>
						<!-- <el-select v-model="value" placeholder="请选择" multiple  style="width: 357px;">
							<el-option
							  v-for="item in options"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select> -->
					</div>
					<div v-if="tabsnum1 == 0">
						<div class="textcenter employipt">
							<span style="display: inline-block;width: 84px;text-align: right;">录用价格</span>
							<span class="defaultbtn0 employmonre" style="border-color: #DCDFE6;"><input class="w fleft" style="color: #DCDFE6;" type="text" v-model="price">单位：元</span>
						</div>
					</div>
					<div v-if="tabsnum1 == 1">
						暂无
						<!-- <div class="textcenter employipt">
							<span style="display: inline-block;width: 84px;text-align: right;">录用价格</span>
							<span class="defaultbtn0 employmonre" style="border-color: #DCDFE6;"><input class="w fleft" style="color: #DCDFE6;" type="text" v-model="price2">单位：元</span>
						</div>
						<div class="textcenter employipt">
							<span style="display: inline-block;width: 84px;text-align: right;">预计投放渠道</span>
							<span class="defaultbtn0 employmonre" style="border-color: #DCDFE6;"><input class="w fleft" style="color: #DCDFE6;" type="text" v-model="channel"><span style="color: transparent;">1</span></span>
							<el-select v-model="value" class="employmonre" placeholder="请选择" multiple>
								<el-option
								  v-for="item in options"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							  </el-select> <span class="defaultbtn0 employmonre"><input class="w fleft" type="text">单位：元</span>
						</div> -->
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<!-- <button class="defaultbtn" @click="prev()" v-show="Isnextshow">上一步</button> -->
				<button class="defaultbtn" @click="reject2()">取消</button>
				<!-- <button class="defaultbtn defaultbtnactive" @click="next()"  v-show="!Isnextshow">下一步</button> -->
				<button class="defaultbtn defaultbtnactive" @click="workhire">确认</button>
			</span>
		</el-dialog>
		<el-dialog title="请选择录用方式" :visible.sync="centerDialogVisible3" custom-class="width610">
			<div style="position: relative;">
				<div class="textcenter">
					<div class="textcenter employipt">
						<span style="display: inline-block;margin-right: 60px;">合同ID</span>
						  <el-input placeholder="请输入内容" style="width: 357px;" v-model="contract_id"></el-input>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				
				<button class="defaultbtn" @click="centerDialogVisible3 = false">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="setcontractid">确认</button>
			</span>
		</el-dialog>
		<el-dialog title="用户基础信息-设为平台推荐创作者" :visible.sync="centerDialogVisible1" width="406px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<span class="fleft Dialogkey">作品ID</span>
						<span class="fleft">{{ selectOne.work_id }}</span>
					</li>
					<li class="w ofh">
						<span class="fleft Dialogkey">作品名称</span>
						<span>{{ selectOne.work_name }}</span>
					</li>
					<li class="w ofh">
						<span class="fleft Dialogkey">
							推荐等级
						</span>
						<el-radio-group v-model="radioS" class="sel-dialog-content fleft">
							<div class="w textcenter sel-radio">
								<el-radio label="S">S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
							</div>
							<div class="w textcenter sel-radio">
								<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
							</div>
							<div class="w textcenter sel-radio">
								<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
							</div>
							<div class="w textcenter sel-radio">
								<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
							</div>
						</el-radio-group>
					</li>
				</ul>

			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class=""></button>
				<el-button type="primary" @click="contributor">确 定</el-button>
			</span>
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
		props: {},
		data() {
			return {
				centerDialogVisible: false,
				centerDialogVisible1: false,
				centerDialogVisible2:false,
				centerDialogVisible3:false,
				bts: DataScreen.screenShow.workInfo.bts,
				defaultbts: DataScreen.screenShow.workInfo.defaults,
				tableAction: DataScreen.screenShow.workInfo.action,
				filterFields: DataScreen.screen.workInfo.filterFields,
				screenShowDataChange: "",
				IsDetail: false,
				tabsnum1:0,
				tabData1:[{
					name: "买断式"
				},{
					name: "分成式"
				}],
				commonTopData: {
					"pageName": "workInfo",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}, ],
					"commonrightbtn": [{
							name: '批量操作',
							id: "right1",
							url: ''
						},
						{
							name: '展示字筛选',
							id: "right2",
							url: ''
						},
						{
							name: '导出数据',
							id: "right3",
							url: ''
						}
					],
					"commonbottombtn": [],
				},
				screenConfig: [],
				tableConfig: {
					"pageName": "workInfo",
					total: 0,
					currentpage: 1,
					pagesize: 10,
					list: [],
					ischeck: true,

				},
				tableData: [],
				detailData: {},
				radioS: "C",
				selectData: [],
				selectOne: {},
				Isnextshow:false,
				contract_id:"",
				workid:"",
				price:""
			}
		},
		methods: {
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
				//console.log(JSON.parse(this.$route.query.urlDate))
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					//console.log(sreenData)
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					data = sreenData;
				}

				this.api.workList(data).then((da) => {
					if (!da) {
						this.$message('数据为空');
					}
					console.log(da.data)
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					this.setLoding(false);
				}).catch(() => {
					this.setLoding(false);
				});

				/* this.setLoding(false); */
			},
			getScreenShowData() {
				//获取字段展示-筛选修改
				eventBus.$on("screenShowDataChange", (data) => {
					this.tableConfig.list = [];
					this.forshowkey(data)
				});

				//获取字段展示-筛选初始化
				if (localStorage.getItem("screenShowDataChange")) {
					this.forshowkey(localStorage.getItem("screenShowDataChange").split(','))
				} else {
					this.forshowkey(this.defaultbts);
				}
			},
			forshowkey(data) {
				//筛选展示字段
				this.tableConfig.list = [];
				this.bts.forEach(item => {
					const val = item;
					data.forEach(item1 => {
						if (val.prop == item1) {
							this.tableConfig.list.push(val)
						}
					})
				})
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:10});
				})
			},
			linkDetail(id) {
				//alert(id);
				this.IsDetail = true;
				this.api.getUserInfo({
					open_id: id
				}).then(da => {
					this.detailData = da;
				}).catch(() => {

				})
			},
			setContributor(val) {
				this.selectOne = val;
				this.centerDialogVisible1 = true;
			},
			contributor() {
				//console.log(workids)
				//console.log(this.selectData);
				var work_ids = this.getworkids();
				this.centerDialogVisible = false;
				this.centerDialogVisible1 = false;
				this.api.getLevelCount({
					access_token:localStorage.getItem("access_token"),
					recommend_level:this.radioS,
				}).then(da => {
					console.log(da)
					this.$confirm('有'+ da +'个作品已经是平台推荐作品</br>是否统一将推荐评级修改为'+this.radioS, '确认修改', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						dangerouslyUseHTMLString: true,
						type: '',
						center: true
					}).then(() => {
						//console.log({work_ids:workids,level:this.radioS})
						this.api.setRecommendLevelwork({
							work_ids: work_ids,
							recommend_level: this.radioS,
							access_token: localStorage.getItem("access_token"),
						}).then(da => {
							
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已经取消'
						});
					});
				}).catch(da => {
					
				})
				
			},
			getworkids() {
				//console.log(this.selectData);
				var workids = '';
				this.selectData.forEach((item, index) => {
					workids += (index == (this.selectData.length - 1)) ? item.work_id : item.work_id + ",";
				})
				if (this.centerDialogVisible) {
					workids = workids
				};

				if (this.centerDialogVisible1) {
					workids = this.selectOne.work_id;
				}
				return workids;
			},
			getcommonrightbtn() {
				this.commonTopData.commonbottombtn = [];
				if (this.$route.query.urlDate) {
					const urldata = JSON.parse(this.$route.query.urlDate);
					//console.log(urldata);
					this.filterFields.forEach(item => {
						//console.log(item);

						if (urldata[item.id]) {
							var val = urldata[item.id];
							if (item.child) {
								val = "";
								item.child.forEach(citem => {
									//alert(urldata[item.id])
									if (citem.id == urldata[item.id]) {
										val = citem.name;
									}
								})
							}
							this.commonTopData.commonbottombtn.push({
								btnName: item.name,
								val: val,
								id: item.id
							});
							//console.log(this.commonTopData.commonbottombtn);
						}
						if (item.type == "two") {
							if (item.child) {
								item.child.forEach(citem => {
									if (urldata[citem.id]) {
										this.commonTopData.commonbottombtn.push({
											btnName: citem.name,
											val: urldata[citem.id],
											id: citem.id
										})
									}
								})
							}
							//this.commonTopData.commonbottombtn.push({btnName:item.child[0].name,val:val,id:item.child[0].id})
							/* this.commonTopData.commonbottombtn.push({btnName:item.child[0].name,val:val,id:item.child[0].id});
							this.commonTopData.commonbottombtn.push({btnName:item.child[1].name,val:val,id:item.child[1].id}); */
						}
					})
				}

			},
			resetSave(tag) {
				if (this.$route.query.urlDate) {
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];
					//console.log(tag);
					this.$router.push({
						path: '/workManager/workInfo',
						query: {
							urlDate: JSON.stringify(urldata)
						}
					});
				}
			},
			tabsChange1(num){
				this.tabsnum1 = num;
			},
			reject2() {
				this.centerDialogVisible2 = !this.centerDialogVisible2;
			},
			next(){
				this.Isnextshow = true;
			},
			prev(){
				this.Isnextshow = false;
			},
			getLevelworkCount(){
				this.api.getLevelCount({
					access_token:localStorage.getItem("access_token"),
					recommend_level:"",
				}).then(da => {
					
				}).catch(da => {
					
				})
			},
			setcontractid(){
				
				this.api.bindContract({
					access_token:localStorage.getItem("access_token"),
					work_id:this.workid,
					contract_id:this.contract_id
				}).then(da => {
					this.centerDialogVisible3=!this.centerDialogVisible3;
				}).catch(da => {
					this.centerDialogVisible3=!this.centerDialogVisible3;
				})
			},
			workhire(){
				this.$confirm('确定录用改作品', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					center: true
				}).then(() => {
					//console.log({work_ids:workids,level:this.radioS})
					this.api.hire({
						work_id: this.workid,
						hire_type: 1,
						price:this.price,
						access_token: localStorage.getItem("access_token"),
					}).then(da => {
						
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			}
		},
		created() {
			this.getScreenShowData();
			this.screenreach();
			this.getcommonrightbtn();
		},
		mounted() {
			//console.log(this.tableConfig)
			this.getData({pageCurrent:1,pageSize:10});
		},
		watch:{
			"$route":function(){
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:10});
				this.getScreenShowData();
			}
		}
	}
</script>
<style lang="scss">
	.Dialogkey {
		margin: 0 33px 26px 66px;
		width: 57px;
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

	.el-radio__input.is-checked+.el-radio__label {
		color: #FF5121;
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

	/* .el-button--small, .el-button--small.is-round{
		width: 100px;
		height: 40px;
	} */

	/* .el-button:focus, .el-button:hover{
		border-color: #FF5121;
		color: #FF5121;
	} */
</style>
