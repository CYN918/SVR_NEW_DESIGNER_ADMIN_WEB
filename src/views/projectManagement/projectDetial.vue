<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				查看作品
			</span>
			<div class="textcenter">
				<span v-for="(item,index) in tabData" :key="item.name" v-if="index < 2" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'" 
				 @click="tabsChange(index,item.name)">
					{{ item.name }}
				</span>
				<span  v-else-if="index != 4 && status > item.status" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'" 
				 @click="tabsChange(index,item.name)">
					{{ item.name }}
				</span>
				<span  v-else-if="index == 4 && status > item.status && status < 5" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'" 
				 @click="tabsChange(index,item.name)">
					{{ item.name }}
				</span>
				
			</div> 
		</div>
		<div class="detailContent ofh">
			<ul v-if="tabsnum == 0">
				<li class="margint13 ofh" v-for="(item,index) in baseInfo" :key="index" :type="item.type">
					<span v-if="!item.sh" class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.sh && (status > item.status)" class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.sh && (status > item.status && status <5)" class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text' && !item.sh">{{ info[item.id] }}</span>
					<span v-if="item.type == 'text' && item.sh && status>item.status">{{ info[item.id] }}</span>
					<span v-if="item.type == 'recommend'">{{ info[item.id] ? info[item.id] : "不推荐" }}</span>
					<span v-if="!item.type">{{ info[item.id] }}</span>
					<span v-else-if="item.type == 'isnum'"> {{ info[item.id] > 0 ? item.child[0]:item.child[1] }} </span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="info[item.id]" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="info[item.id]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="info[item.id]" alt="">
					<span v-else-if="item.type == 'imgbanner'"> {{ info[item.id] }} </span>
					<span v-else-if="item.type == 'keyvalue'">{{item.child[info[item.id]]}}</span>
					<span v-else-if="item.type == 'urlopen'"><span class="routerLink pointer" @click="openwindow(item.id + info.work_id)">{{ item.id + info.work_id }}</span></span>
					<span v-else-if="item.type == 'status'"> 
						<span v-if="info['is_del'] == '0'">
							{{ item.child.status[info['status']] }} 
						</span>
						<span v-else-if="info['is_del'] != '0'">
							{{ item.child.is_del[info['is_del']] }}
						</span>
					</span>
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="info[item.id]" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ info[item.id] }}</span>
					</router-link>
				</li>
			</ul>
			<ul v-if="tabsnum == 4">
				<li class="margint13 ofh" v-for="(item,index) in yanshou" :key="index" :type="item.type">
					<span v-if="!item.sh" class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.sh && (status > item.status)" class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text' && !item.sh">{{ info[item.id] }}</span>
					<span v-if="item.type == 'text' && item.sh && status>item.status">{{ info[item.id] }}</span>
					<span v-if="item.type == 'recommend'">{{ info[item.id] ? info[item.id] : "不推荐" }}</span>
					<span v-if="!item.type">{{ info[item.id] }}</span>
					<span v-else-if="item.type == 'isnum'"> {{ info[item.id] > 0 ? item.child[0]:item.child[1] }} </span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="info[item.id]" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="info[item.id]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="info[item.id]" alt="">
					<span v-else-if="item.type == 'imgbanner'"> {{ info[item.id] }} </span>
					<span v-else-if="item.type == 'keyvalue'">{{item.child[info[item.id]]}}</span>
					<span v-else-if="item.type == 'urlopen'"><span class="routerLink pointer" @click="openwindow(item.id + info.work_id)">{{ item.id + info.work_id }}</span></span>
					<span v-else-if="item.type == 'status'"> 
						<span v-if="info['is_del'] == '0'">
							{{ item.child.status[info['status']] }} 
						</span>
						<span v-else-if="info['is_del'] != '0'">
							{{ item.child.is_del[info['is_del']] }}
						</span>
					</span>
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="info[item.id]" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ info[item.id] }}</span>
					</router-link>
				</li>
			</ul>
			<div class="paddinglr40 ofh" v-if="tabsnum == 1">
				<div v-for ="(item,index) in desc" class="ofh">
					<div class="fleft" style="line-height: 40px;padding-left: 40px;">说明模块-{{ index+1 }}</div>
					<ul style="padding-top: 0px;margin-top: 0px;">
						<li class="margint13 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">模块标题</span>
							<span style="width:357px;height:40px;line-height: 40px;">{{ item.module_title }}</span>
						</li>
						<li class="margint13 ofh">
							<span class="fleft detailKey" style="line-height: 40px;">详细说明</span>
							<span style="width:357px;height:40px;line-height: 40px;" v-html="item.module_content"></span>
						</li>
					</ul>
				</div>
			</div>
			<div v-if="tabsnum == 2" class="detailContent0">
				<common-table :commonTopData="commonTopData" :tableConfig="tableConfig1" :tableAction="tableAction" :filterFields="filterFields"
				 ref="Tabledd"></common-table>
			</div>
			<div v-if="tabsnum == 3">
				<ul class="ofh">
					<li class="ofh signlist" v-for="(item,index) in signupLists">
						<div class="ofh" style="padding-bottom: 60px;border-bottom: 1px solid rgba(251,252,259,1);">
							<div class="fleft ofh signl" style="margin: 10px;margin-top: 0;">
								<div class="fleft" style="width: 100%;height: 100%;">
									<el-carousel style="width: 100%;height: 100%;">
									  <el-carousel-item v-for="citem in item.works" style="width: 100%;height: 100%;">
										<div class="signlistwork">
											<img :src="citem.face_pic" width="100%" height="100%">
										</div>
										<div class="ofh" style="margin: 10px 10px 0;color: #333333;">
											<span class="fleft" style="color: #999999;">{{ citem.work_name }}</span> 
											<span class="fright"><img src="../../assets/img/icon_img.png" width="14px" height="14px"></span>
										</div>
										<div class="ofh" style="margin-left: 10px;">
											<span class="labelbtn textcenter">{{ '--' }}</span>
											<span style="padding: 3px 5px;color: #999999;">{{ '--' }}</span>
										</div>
										<div class="ofh" style="margin: 10px 10px 0;">
											<div class="fleft" style="width: 33.3%;">
												<img src="../../assets/img/icon_img.png" width="14px" height="14px" alt="">
												<span style="padding: 3px 5px;color: #999999;">{{ '--' }}</span>
											</div>
											<div class="fleft" style="width: 33.3%;">
												<img src="../../assets/img/icon_img.png" width="14px" height="14px" alt="">
												<span style="padding: 3px 5px;color: #999999;">{{ '--' }}</span>
											</div>
											<div class="fleft" style="width: 33.3%;">
												<img src="../../assets/img/icon_img.png" width="14px" height="14px" alt="">
												<span style="padding: 3px 5px;color: #111111;">{{ '--' }}</span>
											</div>
										</div>
									  </el-carousel-item>
									</el-carousel>
								</div>
							</div>
							<div class="fleft ofh">
								<div style="margin-left: 20px;width: 300px;border-bottom: 1px solid rgba(251,252,253,1);">
									<div class="ofh">
										<img class="fleft" :src="item.user.avatar" width="48px" height="48px" style="border-radius: 50%;" alt="">
										<div class="fleft" style="margin-left: 8px;">
											<div>{{ item.user.username }}</div>
											<div style="color:rgba(187,187,187,1);font-size: 12px;">{{ item.user.vocation + "|" +item.user.province }}</div>
										</div>
									</div>
									<div class="screenContent" style="margin-top: 10px;">
										<div style="margin-right: 20px;width: 30%;">
											<span style="color:rgba(187,187,187,1);font-size: 12px;">粉丝 </span>
											<span>{{ item.user.fans_num }}</span>
										</div>
										<div style="margin-right: 20px;width: 30%;">
											<span style="color:rgba(187,187,187,1);font-size: 12px;">人气 </span>
											<span>{{ item.user.popular_num }}</span>
										</div>
										<div style="width: 30%;">
											<span style="color:rgba(187,187,187,1);font-size: 12px;">创作 </span>
											<span>{{ item.user.work_num }}</span>
										</div>
									</div>
									<div class="screenContent" style="margin-top: 10px;">
										<div style="margin-right: 20px;width: 30%;">
											<span style="color:rgba(187,187,187,1);font-size: 12px;">接单 </span>
											<span>--</span>
										</div>
										<div style="margin-right: 20px;width: 30%;">
											<span style="color:rgba(187,187,187,1);font-size: 12px;">收益 </span>
											<span>--</span>
										</div>
										<div style="width: 30%;">
											<span style="color:rgba(187,187,187,1);font-size: 12px;">评级 </span>
											<span>{{ item.user.recommend_level }}</span>
										</div>
									</div>
								</div>
								<div style="margin-left: 20px;line-height: 35px;margin-top: 40px;">
									<div>
										<span style="color:rgba(187,187,187,1);font-size: 12px;">工作现状 </span><span> --</span>
									</div>
									<div>
										<span style="color:rgba(187,187,187,1);font-size: 12px;">每周时间 </span><span> --</span>
									</div>
									<div>
										<span style="color:rgba(187,187,187,1);font-size: 12px;">类型偏好 </span><span> --</span>
									</div>
									<div>
										<span style="color:rgba(187,187,187,1);font-size: 12px;">擅长风格 </span><span> --</span>
									</div>
									<div>
										<span style="color:rgba(187,187,187,1);font-size: 12px;">擅长领域 </span><span> --</span>
									</div>
								</div>
							</div>
						</div>
						<div class="screenContent">
							<button class="defaultbtn" @click="userdetail(item.user.open_id)">用户详情</button>
							<button class="defaultbtn" @click="gotoweb(item.user.open_id)">个人主页</button>
							<button v-if="status == 2" class="defaultbtn" @click="getselectUser(item)">中标录用</button>
							<button class="defaultbtn" @click="feipei(item.user.username,item.user)">分配其他项目</button>
						</div>
					</li>
				</ul>
				<div class="w" id="bottoms" style="text-align: right;background: #FFFFFF;">
					<div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
						<span>共{{tableConfig.total}}条数据</span>
					</div>
					<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableConfig.currentpage"
					 :page-sizes="[50, 100, 200, 500]" :page-size="tableConfig.pagesize" layout="sizes, prev, pager, next, jumper" :total="tableConfig.total">
					</el-pagination>
				</div>
			</div>
			<div class="screenContent detailbtn" v-if="detailbtn">
				<button class="defaultbtn" @click="getparent()">返回</button>
				<button class="defaultbtn defaultbtnactive" @click="gotouser()">前往选标</button>
			</div>
			<div v-if="detailbtn" class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
		</div>
		<div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片">
		</div>
		
		<el-dialog title="分配项目" :visible.sync="centerDialogVisible1">
			<common-table :commonTopData="commonTopData2" :tableConfig="tableConfig2" :tableAction="tableAction2" :filterFields="filterFields"
			 ref="Tabledd"></common-table>
		</el-dialog>
		
		<el-dialog
		  title="分配项目"
		  :visible.sync="centerDialogVisible">
		  	<ul>
		  		<li class="w ofh textcenter" style="margin-bottom: 20px;">
		  			<span>希望给</span>
		  			<sapn style="color: #FF5121;">{{ username }}</sapn>
		  			<span>如何分配项目</span>
		  		</li>
		  		<li class="textcenter" style="margin-bottom: 20px;">
		  			<button class="defaultbtn" style="width: 180px;margin: 0;" @click="centerDialogVisible1=true">成为已创建项目的制作人</button>
		  		</li>
		  		<li class="textcenter" style="margin-bottom: 20px;">
		  			<button class="defaultbtn" style="width: 180px;margin: 0;" @click="addnewuser()">新建项目并指定TA来制作</button>
		  		</li>
		  	</ul>
		</el-dialog>
	</div>
</template>

<script>
	import commonTable from '@/components/commonTable2.vue'
	
	export default {
		components:{
			commonTable
		},
		data() {
			return {
				tabData: [
					{
						name: "基本信息"
					},
					{
						name: "项目详情"
					},
					{
						name: "交稿记录",
						status:2
					},
					{
						name: "报名列表",
						status:0
					},
					{
						name: "验收信息",
						status:3
					}
				],
				tabsnum: 0,
				desc:[],
				baseInfo:[
					{
						name:"项目ID",
						id:"project_id",
						type:"text"
					},
					{
						name:"项目名称",
						id:"name",
						type:"text"
					},
					{
						name:"banner",
						id:"banner",
						type:"imgfeng"
					},
					{
						name:"业务类型",
						id:"business_type",
						type:"text"
					},
					{
						name:"领域范围",
						id:"fields",
						type:"url"
					},
					{
						name:"预计收益",
						id:"expected_profit",
						type:"imgtou",
					},
					{
						name:"额外赏金",
						id:"extra_reward",
						type:"text"
					},
					{
						name:"发布时间",
						id:"publish_time",
						type:"text"
					},
					{
						name:"报名截止时间",
						id:"deadline",
						type:"text"
					},
					{
						name:"制作周期（天）",
						id:"production_cycle_d",
						type:"text"
					},
					{
						name:"制作周期（时）",
						id:"production_cycle_h",
						type:"text"
					},
					{
						name:"绑定需求",
						id:"demand_id",
						type:"text"
					},
					{
						name:"报名人数",
						id:"signup_num",
						type:"text",
						status:0,
						sh:true
					},
					{
						name:"终止理由",
						id:"terminate_reason",
						type:"text",
						status:0,
						sh:true
					},
					{
						name:"当前状态",
						id:"status",
						type:"keyvalue",
						child:{
							"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"
						}
					}
				],
				yanshou:[
					{
						name:"验收价格",
						id:"project_id",
						type:"text"
					},
					{
						name:"额外赏金",
						id:"name",
						type:"text"
					},
					{
						name:"延期交稿扣减",
						id:"banner",
						type:"imgfeng"
					},
					{
						name:"收益加成",
						id:"business_type",
						type:"text"
					},
					{
						name:"成交价格",
						id:"fields",
						type:"url"
					},
					{
						name:"成交方式",
						id:"expected_profit",
						type:"imgtou",
					},
					{
						name:"需求ID",
						id:"extra_reward",
						type:"text"
					},
					{
						name:"项目评级",
						id:"publish_time",
						type:"text"
					},
					{
						name:"验收时间",
						id:"deadline",
						type:"text"
					},
					{
						name:"验收审核人",
						id:"production_cycle_d",
						type:"text"
					}
				],
				employInfo:[],
				detailbtn:true,
				workselect:false,
				checkList: [],
				checkAll: ["1", "2", "3", "4", "5", "6"],
				work_info:{},
				material_list:{
				},
				hire_info:{},
				font_size:0,
				imgurl:"",
				isimgurl:false,
				openurls:[],
				videofid:"",
				audiofid:"",
				fid:"",
				centerDialogVisible:false,
				centerDialogVisible1:false,
				oneload:{},
				adminuseraccess:[],
				info:[],
				signupLists:[],
				tableConfig: {
					total:0,
					pagesize:50,
					currentpage:1,
				},
				tableConfig1: {
					url:"fileRecord",
					title:"项目发布",
					list: [
						{prop:'file_name',lable:'交稿文件'},
						{prop:'file_size',lable:'文件大小'},
						{prop:'remark',lable:'备注说明'},
						{prop:'created_at',lable:'交稿时间'},
						{prop:'check_status',lable:'验收结果',type:"keyvalue",child:{"-2":"已撤销","-1":"已驳回","0":"待审核","1":"已验收"}},
						
					],
					project_id:"project_id"
				},
				tableConfig2: {
					num:true,
					url:"projectlist",
					title:"项目发布",
					list0: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'business_type',lable:'项目类型'},
						{prop:'template_num',lable:'业务类型'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间'},
						{prop:'bidding_time',lable:'中标时间'},
						{prop:'deadline',lable:'截稿时间'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list1: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'business_type',lable:'项目类型'},
						{prop:'template_num',lable:'业务类型'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间'},
						{prop:'bidding_time',lable:'中标时间'},
						{prop:'deadline',lable:'截稿时间'},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					list2: [
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'business_type',lable:'项目类型'},
						{prop:'template_num',lable:'业务类型'},
						{prop:'banner',lable:'banner',type:"img"},
						{prop:'fields',lable:'领域范围'},
						{prop:'expected_profit',lable:'预计收益'},
						{prop:'extra_reward',lable:'额外赏金'},
						{prop:'publish_time',lable:'发布时间'},
						{prop:'bidding_time',lable:'中标时间'},
						{prop:'deadline',lable:'截稿时间'},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'status',lable:'当前状态',type:"keyvalue",child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}},
					],
					project_id:"project_id"
				},
				tableAction2: {
					morebtns:{
						
					},
					links:{
						name:(da)=>{
							return "添加"
						},
						accessid:"1",
						fun:"adduser",
					},
					
				},
				tableAction:{
					num:false,
					morebtns:{
						name:(da)=>{
							return "下载"
						},
						accessid:"1",
						fun:"up",
						
					},
					links:{
						name:(da)=>{
							if(da == '0'){
								return "验收审核"
							} else {
								return null
							}
							
						},
						accessid:"1",
						fun:"check",
						filterFields:"check_status"
					},
						
					
				},
				filterFields:[
					{name:"项目ID",id:"classify_name"},
					{name:"项目名称",id:"classify_name"},
					{name:"业务类型",id:"classify_name"},
					{name:"领域范围",id:"classify_name"},
					{name:"额外赏金",id:"classify_name"},
					{name:"发布时间",id:"classify_name"},
					{name:"中标时间",id:"classify_name"},
					{name:"截稿时间",id:"classify_name"},
				],
				commonTopData: {
					"pageName": "publishWork",
					"commonleftbtn": [{
						name: "筛选",
						fun: "ISshow"
					}],
					"commonrightbtn": [{
						name: "新建项目",
						id: "right1",
						fun: "add"
					}],
					"commonbottombtn":[
						
					],
					"tabData":[
						
					],
					'tabnums':0,
					is:true
				},
				commonTopData2: {
					"commonleftbtn": [{
						name: "筛选",
						fun: "ISshow"
					}],
					"commonrightbtn": [],
					"commonbottombtn":[],
					"tabData": [
						{name:"待发布"},
						{name:"招募期"},
						{name:"待选标"},
					],
					'tabnums':0,
				},
				status:0,
				project_id:"",
				username:"",
				usernameitem:""
			}
		},
		methods: {
			gotouser(){
				this.tabsnum = 3
			},
			gotoweb(id){
				window.open(localStorage.getItem("URL")+"/#/works?id=" + id);
			},
			userdetail(open_id){
				this.$router.push({
					path:"/userManager/userBaseInfo/userBaseInfoDetail",
					query:{
						open_id:open_id
					}
				})
			},
			check(){
				this.$router.push({
					path:"/review/projectreview"
				})
			},
			up(row){
				window.open(row.file_url);
			},
			getselectUser(item){
				this.$confirm('确定中标', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					customClass:"work",
					center: true
				}).then(() => {
					this.api.selectUser({
						access_token: localStorage.getItem("access_token"),
						project_id:item.project_id,
						open_id:item.user.open_id
					}).then(da => {
						
					}).catch(da => {
					
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			adduser(row){
				this.$confirm('确认将【'+ this.username +'】定为【' + row.name+'】的中标人', '', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString:true,
					type: '',
					center: true
				}).then(() => {
					//console.log({open_ids:openids,level:this.radioS})
					this.$router.push({
						path:"/projectManagement/projectList/editproject",
						query:{
							row: JSON.stringify(row),
							usernameitem: JSON.stringify(this.usernameitem)
						}
					})
				}).catch(() => {
					this.$message({
					  type: 'info',
					  message: '已经取消'
					});
					this.$refs.Tabledd.setinit();
				});
			},
			addnewuser(row){
				this.$router.push({
					path:"/projectManagement/projectList/newproject",
					query:{
						usernameitem: JSON.stringify(this.usernameitem)
					}
				})
			},
			feipei(n,item){
				this.centerDialogVisible = true;
				this.username = n;
				this.usernameitem = item; 
			},
			handleSizeChange(val) {
				this.tableConfig.pagesize = val;
				this.getTabData();
				this.$nextTick(() => {
					this.$refs.elememt.scrollTo(0,'34px');
				})
			},
			handleCurrentChange(val) {
				this.tableConfig.currentpage = val;
				this.getTabData();
				this.$nextTick(() => {
					this.$refs.elememt.scrollTo(0,'34px');
				})
			},
			getimgulr(url){
				this.imgurl = url;
				this.isimgurl = !this.isimgurl
			},
			showvideo(fid){
				if(this.videofid){
					document.getElementById(this.videofid).pause();
				}
				this.videofid = fid;
				document.getElementById(fid).play();
			},
			showaudio(fid){
				if(this.audiofid){
					document.getElementById(this.audiofid).pause();
				}
				this.audiofid = fid;
				document.getElementById(fid).play();
			},
			getparent() {
				this.$router.push({
					path:"/projectManagement/projectList",
					query:{
						tabsnum:localStorage.getItem('projectlist')
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
			tabsChange(num) {
				this.tabsnum = num;
				//alert(this.tabsnum)
				if (this.tabsnum == 2) {
					this.detailbtn = false;
				}
			},
			showselectwork() {
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
			},
			getworkdetial(){
				this.api.projectdetail({
					project_id:this.$route.query.id,
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					this.info = da;
					this.desc = JSON.parse(da.desc);
				}).catch(da =>{
					
				})
			},
			signupList(){
				let data={
					project_id:this.$route.query.id,
					access_token:localStorage.getItem("access_token"),
					limit:this.tableConfig.pagesize,
					page:this.tableConfig.currentpage
				}
				
				this.api.signupList(data).then(da => {
					this.signupLists = da.data;
					this.tableConfig.total = da.total;
				}).catch(da =>{
					
				})
			},
			openwindow(url){
				window.open(url)
			},
			gotodetail(name,fid,num){
				this.router.push({
					path:"/workManager/materialBank/materialBankdetail",
					query:{tabsnum:num,name:name,fid:fid}
				})
			},
			hover(fid,url,na){
				this.fid = fid;
				this.oneload = {
					name:na,
					id:url
				}
			},
			handleCheckedCitiesChange(val){
				//console.log(val
				this.font_size = 0;
				this.openurls = [];
				val.forEach((item,index) =>{
					//console.log(item.split(",")[1])
					this.font_size += Number(item.split(",")[2]);
					this.openurls.push({name:item.split(",")[3],id:item.split(",")[0]});
				});
				//console.log(this.openurls);
			},
		},
		created() {
			this.getworkdetial();
			this.signupList();
			this.status = parseInt(this.$route.query.status);
			if(localStorage.getItem("adminuseraccess")){
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
			}
			this.project_id = this.$route.query.id;
			if(this.$route.query.index){
				this.tabsnum = this.$route.query.index;
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
	.detailContent .detailContent0 ul {
		padding: 0;
	}
	
	.el-carousel__container {
		width: 100%;
		height: 100%;
	}
	.el-carousel__indicators {
		display: none;
	}
	.labelbtn{
		padding: 3px 5px;
		background:rgba(244,246,249,1);
		border-radius:5px;
		display: inline-block;
		font-weight:400;
		color:#999999;
		font-size: 12px;
	}
	.signlistwork{
		width: 310px;
		height: 232px;
		border-radius:5px 5px 0px 0px;
	}
	.signlist {
		padding: 20px;
		border-radius:5px;
		border:1px solid rgba(153,153,153,1);
		float: left;
		margin-top: 10px;
		margin-left: 10px;
	}
	
	.signl {
		width:310px;
		height:327px;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 10px 0px rgba(0,0,0,0.06);
		border-radius:5px;
	}
	
	.materiallist .el-checkbox__label {
		display: none;
	}
	
	.work .el-button--primary{
		background: #FF5121;
		border-color: #FF5121;
	}
	
	#bottoms .el-pager{
		padding: 0;
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
