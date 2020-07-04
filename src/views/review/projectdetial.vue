<template>
<div>
	<common-top :commonTopData="projectdetialTopData"></common-top>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<!-- <span class="fleft worktabs">
				审核详情
			</span> -->
			<div class="textcenter">
				<span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
				 @click="tabsChange(index,item.name)" style="height: 33px;">
					{{ item.name }}
				</span>
			</div>

		</div>
		<div class="detailContent1 ofh">
			
			
		</div>
		<div v-if="tabsnum == 1">
			<Cent :dataList="material_info" :check_status="reviewinfocommon.check_status" :check_steps="reviewinfocommon.check_steps"></Cent>

		</div>
		<div v-if="tabsnum == 2">
			<reviewinfocommon :apply_info="apply_info" :reviewinfocommon="reviewinfocommon" :demand_id="apply_info.demand_id" :gain_share_rate="apply_info.gain_share_rate"></reviewinfocommon>
		</div>
		<div v-if="tabsnum == 0">
			<workData :reviewinfocommon="apply_info" :material_info="material_info" :type="type"></workData>
		</div>
		<div class="screenContent detailbtn" v-if="detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button v-if="material_info.type == '1'" class="defaultbtn" @click="up">下载稿件</button>
			<button v-if="material_info.type == '2'" class="defaultbtn" @click="openwindow(material_info['online_disk_url'])">前往下载</button>
			<!-- <button v-if="getstatusinfo() && (adminuseraccess.indexOf('200511') > -1)" class="defaultbtn" @click="reject">验收驳回</button> -->
			<button v-if="getstatusinfo() && check_steps == '0'" class="defaultbtn" @click="reject">验收驳回</button>
			<button v-if="check_steps == '0' && (adminuseraccess.indexOf(this.audit1) > -1) && status_info == '0'" class="defaultbtn defaultbtnactive" @click="reject2()">验收通过</button>
			<button v-if="check_steps == '1' && (adminuseraccess.indexOf(this.audit2) > -1)" class="defaultbtn defaultbtnactive" @click="priceAudit()">价格审核</button>
		</div>

		<el-dialog :title="title + '-审核驳回'" :visible.sync="centerDialogVisible" width="738px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<span class="fleft Dialogkey">
							驳回方式
						</span>
						<el-radio-group v-model="radiox" class="sel-dialog-content fleft">
							<div class="w  sel-radio" v-for="(item,index) in tableDatax" :key="item.id">
								<el-radio :label="item.content">{{ item.content }}</el-radio>
							</div>
						</el-radio-group>
					</li>
					
					
					<li class="w ofh">
						<span class="fleft Dialogkey">
							驳回理由
						</span>
						<el-radio-group v-model="radio1" class="sel-dialog-content fleft">
							<div class="w  sel-radio" v-for="(item,index) in tableData" :key="item.id">
								<el-radio :label="item.content">{{ item.content }}</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="其他理由">其他理由（请在详细说明中填写）</el-radio>
							</div>
						</el-radio-group>
					</li>
					<li class="w ofh">
						<span class="fleft Dialogkey">
							驳回详细说明
						</span>
						<div class="fleft defaultbtnworkbg">
							<div>
								<textarea name="" id="" cols="60" rows="10" v-model="text100" Maxlength="100" class="defaultbtnwork"></textarea>
							</div>
							<span class="fright fontcolorg">{{ text100.length }}/100</span>
						</div>
					</li>
				</ul>

			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="reject">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="contributor">确定驳回</button>
			</span>
		</el-dialog>
		<el-dialog :title="title + '-审核通过'" :visible.sync="centerDialogVisible1" width="406px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<span class="fleft" style="margin: 2px 33px 26px 66px;">
							推荐等级
						</span>
						<el-radio-group v-model="radio2" class="sel-dialog-content fleft">
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
							<div class="w textcenter sel-radio">
								<el-radio label="">不推荐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
							</div>
						</el-radio-group>
					</li>
				</ul>

			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<el-button type="primary" @click="contributor1('fa')">确 定</el-button>
			</span>
		</el-dialog><!-- centerDialogVisible2 -->
		<el-dialog title="项目验收审核" :visible.sync="centerDialogVisible2">
			<div style="position: relative;">
				<div v-if="material_info.type == '2'" style="margin-bottom: 30px;border-bottom: 1px solid #F1F4F5;">
					<ul>
						<li class="ofh">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">网盘地址</span>
							<span @click="openwindow(material_info['online_disk_url'])" style="cursor: pointer;color: #FF5121;">{{ material_info["online_disk_url"] }}</span>
						</li>
						<li class="ofh">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">提取密码</span>
							<span>{{ material_info["access_code"] }}</span>
						</li>
						<li class="ofh">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;color: transparent;">提取密码</span>
							<el-upload
							  class="upload-demo"
							  action="111"
							  :http-request = "httprequest">
							  
								  <el-button size="small" type="primary">上传文件</el-button>
								  <div slot="tip" class="el-upload__tip">上传文件不能超过1G</div>
							  
							</el-upload>
						</li>
					</ul>
				</div>
				<ul class="textcenter">
					<li class="w ofh">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">项目评级</span>
							<el-button-group class="sel-dialog-content fleft">
								<el-button :type="typebtn=='S' ? 'primary' : ''" @click="getrule('S')">S</el-button>
								<el-button :type="typebtn=='A' ? 'primary' : ''" @click="getrule('A')">A</el-button>
								<el-button :type="typebtn=='B' ? 'primary' : ''" @click="getrule('B')">B</el-button>
								<el-button :type="typebtn=='C' ? 'primary' : ''" @click="getrule('C')">C</el-button>
								<el-button :type="typebtn=='D' ? 'primary' : ''" @click="getrule('D')">D</el-button>
							</el-button-group>
						</div>
					</li>
					<li class="w ofh">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">绑定需求</span>
							<el-select v-model="did" placeholder="请选择" class="fleft sel-dialog-content" style="width: 300px;" disabled>
								<el-radio-group v-model="did">
									<el-option v-for="(item,index) in demandlist" :key="index" :disabled="parseInt(item.need_num) == 0" :value="item.did"
									 :label="item.demand_name">
										<el-radio :disabled="parseInt(item.need_num)  == 0" :value="item.did" :label="item.did">{{ item.demand_name + " " + item.did  }}</el-radio>
									</el-option>
								</el-radio-group>
							</el-select>
						</div>
					</li>
					<li class="w ofh" v-if="this.business_title == '【业务】来电秀'">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">能否直接入库</span>
							<el-select v-model="is_ruku" placeholder="请选择" class="fleft sel-dialog-content" style="width: 300px;" disabled>
								<el-option
									v-for="item in rukuOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
					</li>
					<li class="w ofh" v-else>
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">能否直接入库</span>
							<el-select v-model="is_ruku" placeholder="请选择" class="fleft sel-dialog-content" style="width: 300px;">
								<el-option
									v-for="item in rukuOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
					</li>
					<!-- <li class="w ofh" v-if="this.business_title == '【业务】来电秀'">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">来电秀分类</span>
							<el-select v-model="ld_show" placeholder="请选择" class="fleft sel-dialog-content" style="width: 300px;">
								<el-option
									v-for="item in showOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
					</li> -->
					<li class="w ofh" v-if="is_ruku == '0'">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">入库素材数量</span>
							<el-input v-model="storage_number" placeholder="请输入内容" style="width: 300px;float: left;"></el-input>
						</div>
					</li>
					<li class="w ofh">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">内容备注</span>
							<el-input v-model="content_remark" type="textarea" :rows="4" placeholder="请输入内容" style="width: 300px;float: left;"></el-input>
						</div>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<el-button size="medium" @click="reject2()">取消</el-button>
				<el-button size="medium" class="defaultbtn defaultbtnactive" type="primary" @click="contentAudit(material_info.type)" :loading="loading">确定并通过</el-button>
			</span>
		</el-dialog>
		<el-dialog title="项目验收审核" :visible.sync="centerDialogVisible6">
			<div style="position: relative;">
				<ul class="textcenter">
					<li class="w ofh">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;float:left;">结算方式</span>
							<el-radio-group v-model="want_deal_type" style="width:290px;float:left;" class="customGroup">
								<el-radio-button label="1" ><i class="iconfont" v-if="settlement==0 && origin_type==1" >&#xe730;</i>买断</el-radio-button>
								<el-radio-button label="2" ><i class="iconfont" v-if="settlement==0 && origin_type==2" >&#xe730;</i>分成</el-radio-button>
								<el-radio-button label="3" >预付金+分成</el-radio-button>
							</el-radio-group>

							<span class="pro_settlement_type_tips" v-if="want_deal_type == 2">请先确保制作者同意，再修改结算方式</span>
						</div>
					</li>
					<li class="w ofh" v-if="want_deal_type == '2' || want_deal_type == '3'">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">分成比例</span>
							<el-input
								style="width: 400px"
								class="fleft sel-dialog-content"
								placeholder="按掌酷各渠道收益，请输入0-100数字"
								v-model="user_split_rate"
							 	clearable
							>
								<template slot="suffix">%</template>
							</el-input>
						</div>
					</li>
					<li class="w ofh" v-if="want_deal_type == '3'">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">预付金</span>
							<el-input style="width: 400px" class="fleft sel-dialog-content" placeholder="填写金额(单位:元)，请确保和线下打款金额一致" v-model="advance_payment"
							 clearable>
							</el-input>
						</div>
					</li>
					<li class="w ofh" v-if="want_deal_type == '1'">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">验收价格</span>
							<el-input style="width: 300px" class="fleft sel-dialog-content" placeholder="请输入内容" @focus="deductionf(0)" v-model="acceptance_price"
							 clearable>
							</el-input>
						</div>
					</li>
					<!-- <li class="w ofh">
						<div class="textcenter employipt">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">延期交稿扣减</span>
							<el-input style="width: 300px" v-if="deduction" :disabled="lflag"  class="fleft sel-dialog-content" placeholder="请输入内容" v-model="deductionprice"
							></el-input>
							<el-input style="width: 300px" v-if="!deduction" :disabled="lflag" @focus="deductionf(1)" class="fleft sel-dialog-content" placeholder="请输入内容" v-model="deduction_price"
							></el-input>
						</div>
						<div class="textcenter employipt">
							<span v-if="!lflag" class="fleft sel-dialog-content">
								作者已延期<span>{{ get_time_diff(apply_info.delivery_deadline) }}</span>，理应扣减<span>￥{{ getdeduction_price(apply_info.delivery_deadline) }}</span>（验收价格*10%*延期天数）
							</span>
							<span v-if="lflag" class="fleft sel-dialog-content">
								作者未延期
							</span>
						</div>
					</li> -->
					
				</ul>
				<ul v-if="want_deal_type == '1'">
					<li class="w ofh">
						<div class="textcenter employipt ofh">
							<span class="fleft Dialogkey" style="width: 84px;text-align: right;">最终价格</span>
							<span class="fleft sel-dialog-content">
								<span>
									￥{{ getdeal_price() }}
								</span>
							</span>
						</div>
						<div class="textcenter">
							<ul class="ofh sel-dialog-content" style="margin-left: 184px;">
								<li class="fleft" style="line-height: 40px;">
									<div>￥{{ acceptance_price }}</div>
									<div>验收价格</div>
								</li>
								<!-- <li v-if="!lflag" class="fleft" style="margin: 0 20px;line-height: 40px;">
									<div>-</div>
								</li>
								<li v-if="!lflag" class="fleft" style="line-height: 40px;">
									<div>￥{{ this.deduction ? this.deductionprice : this.deduction_price }}</div>
									<div>延期交稿扣减</div>
								</li>
								<li class="fleft" style="margin: 0 20px;line-height: 40px;">
									<div>+</div>
								</li>
								<li class="fleft" style="line-height: 40px;">
									<div>￥{{ apply_info.extra_reward }}</div>
									<div>额外赏金</div>
								</li> -->
								<li class="fleft" style="margin: 0 20px;line-height: 40px;">
									<div>+</div>
								</li>
								<li class="fleft" style="margin: 0 20px;line-height: 40px;">
									<div>￥{{ acceptance_price * apply_info.gain_share_rate / 100 }}</div>
									<div>收益加成</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<el-button size="medium" @click="priceAudit()">取消</el-button>
				<el-button size="medium" class="defaultbtn defaultbtnactive" type="primary" @click="contributor1('lu')" :loading="loading">确定验收</el-button>
			</span>
		</el-dialog>
		<el-dialog :title="title + '-发送修改通知'" :visible.sync="centerDialogVisible3" width="738px">
			<div style="position: relative;">
				<ul>

					<li class="w ofh">
						<span class="fleft Dialogkey">
							修改内容
						</span>
						<div class="fleft defaultbtnworkbg">
							<div>
								<textarea name="" id="" cols="60" rows="10" v-model="content" class="defaultbtnwork"></textarea>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="reject3">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="sendmessage">发送通知</button>
			</span>
		</el-dialog>

		<el-dialog :title="title + '-选择需求ID'" :visible.sync="centerDialogVisible4" width="738px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<div class="textcenter employipt">
							<span style="display: inline-block;margin-right: 60px;">选择需求</span>
							<el-select v-model="did" placeholder="请选择" style="width: 375px;">
								<el-radio-group v-model="did">
									<el-option v-for="(item,index) in demandlist" :key="index" :disabled="parseInt(item.need_num) == 0" :value="item.did"
									 :label="item.demand_name">
										<el-radio :disabled="parseInt(item.need_num)  == 0" :value="item.did" :label="item.did">{{ item.demand_name + " " + item.did  }}</el-radio>
									</el-option>
								</el-radio-group>
							</el-select>
						</div>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="reject4">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="setdemand">下一步</button>
			</span>
		</el-dialog>

		<el-dialog :title="title + '确定全部下载'" :visible.sync="centerDialogVisible5" width="738px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<div class="textcenter employipt">
							<span>
								<span style="width: auto;padding: 0 5px;" @click="downWorks('')">一共 {{ openurls.length }}
									个选项（{{ this.font_size / 1024 >= 1 ? (this.font_size/1024).toFixed(2) +"M" : this.font_size.toFixed(2) + "KB"   }}）</span>
							</span>
						</div>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class="defaultbtn" @click="centerDialogVisible5=false">取消</button>
				<button class="defaultbtn defaultbtnactive" @click="downWorks('')">确定</button>
			</span>
		</el-dialog>

		<div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片">
		</div>
	</div>
</div>
</template>

<script>
	import reviewData from "@/assets/reviewData.js"
	import commonTop from '@/components/commonTop.vue'
	import reviewinfocommon from './reviewinfocommon'
	import workData from './workData'
	import Cent from './cent1'
	export default {
		props: ['detailData', 'roles'],
		components:{
			commonTop,
			reviewinfocommon,
			workData,
			Cent
		},
		data() {
			return {
				radiox:'1',
				tableDatax:[
					{id:'1',content:'驳回后可重新提交'},
					{id:'2',content:' 驳回后终止项目'}
				],
				projectdetialTopData:{
					"pageName": "projectdetial",
					"commonleftbtn": [],
					"commonrightbtn": [],
					"commonbottombtn": [],
					// "IsShow": true,
					upload: true
				},
				settlement: 0,
				origin_type:1,
				want_deal_type:1,
				user_split_rate:'',
				advance_payment:'',
				isbusiness_type:false,
				is_ruku: '1',
				rukuOptions: [{
					value: '1',
					label: '直接入库'
					}, {
					value: '0',
					label: '需整理后入库'
				}],
				ld_show:'0',
				showOptions:[{
					value: '0',
					label: '明星网红'
				}],
				storage_number: '',
				content_remark: '',
				adminuseraccess: [],
				text100: '',
				text30: "",
				length10: 0,
				length30: 0,
				tabData: [{
						name: "项目信息",
					},
					{
						name: "交稿文件",
					},
					{
						name: "审核信息",
					}
				],
				tabData1: [{
					name: "买断式"
				}],
				tabsnum: 0,
				tabsnum1: 0,
				type:1,
				fileData: [
					{
						name: "内容预览图",
						id: "preview_pic",
						type:"img"
					},
					{
						name: "视频内容预览",
						id: "download_file_url",
						type:"video"
					},
					{
						name: "交稿文件/网盘链接",
						id1: "file_name",
						id2:"online_disk_url",
						type:"twourl"
					},
					{
						name: "文件大小/取件密码",
						id1: "file_size",
						id2:"access_code",
						type:"two"
					},
					{
						name: "备注说明",
						id: "remark",
					}
				],
				workData: [{
						name: "项目ID",
						id: "project_id",
						type: "text"
					},
					{
						name: "项目名称",
						id: "name",
						type: "text"
					},
					{
						name: "业务类型",
						id: "business_type",
						type:"keyvalue",
						child:{"3":"场景主题","4":"个性化主题","5":"来电秀","6":"其他","7":"杂志锁屏"}
					},
					{
						name: "banner",
						id: "banner",
						type: "imgfeng"
					},
					{
						name: "领域范围",
						id: "fields",
						type: "arr"
					},
					{
						name: "项目需求说明",
						id: "desc",
						type: "text1"
					},

					{
						name: "预计收益",
						id: "expected_profit",
						type: "text"
					},
					{
						name: "额外赏金",
						id: "extra_reward",
						type: "text"
					},

					{
						name: "发布时间",
						id: "publish_time",
						type: "text"
					},
					{
						name: "中标时间",
						id: "bidding_time",
						type: "text"
					},
					{
						name: "截稿时间",
						id: "delivery_deadline",
						type: "text"
					},
					{
						name: "中标人",
						id: "username",
						type: "text"
					},
					{
						name: "状态",
						id: "project_status",
						type:"keyvalue",
						child:{"0":"待发布","1":"招募期","2":"选标期","3":"制作期","4":"待验收","5":"已验收","-1":"已终止"}
					},

				],
				centerDialogVisible: false,
				centerDialogVisible1: false,
				centerDialogVisible2: false,
				centerDialogVisible3: false,
				centerDialogVisible5: false,
				centerDialogVisible6: false,
				radio1: '',
				radio2: "",
				workselect: false,
				detailbtn: true,
				checkList: [],
				checkAll: [],
				reviewinfocommon:{},
				reviewinfostatus: [],
				/* status_info: parseInt(this.$route.query.check_status), */
				status_info: "",
				check_steps: "",
				apply_info: {},
				check_info: {},
				material_info: {},
				title: "项目验收",
				options: [],
				value: '',
				channel: "",
				price1: "",
				price2: "",
				pagetype: parseInt(this.$route.query.type),
				hire_type: "",
				contributor_type: parseInt(this.$route.query.contribute_type),
				font_size: 0,
				tableData: [],
				openurls: [],
				videofid: "",
				audiofid: "",
				content: "",
				centerDialogVisible4: false,
				demandlist: [{
						"did": "SDE_000016",
						"num": 1,
						"hire_num": 0,
						"need_num": 1
					},
					{
						"did": "SDE_000017",
						"num": 1,
						"hire_num": 0,
						"need_num": 0
					},
					{
						"did": "SDE_000018",
						"num": 1,
						"hire_num": 0,
						"need_num": 1
					},
					{
						"did": "SDE_000019",
						"num": 1,
						"hire_num": 0,
						"need_num": 0
					}
				],
				did: '',
				fid: "",
				isimgurl: false,
				imgurl: "",
				adminuseraccess: [],
				oneload: {},
				typebtn: "S",
				typebtn1: "",
				level: "",
				deal_type: "",
				acceptance_price: '0',
				deduction_price: 0,
				deductionprice: 0,
				deal_price: 0,
				lflag:false,
				deduction:false,
				file:{
					file_url:"",
					file_name:"",
					file_size:"",
				},
				isShow: true,
				audit1: '',
				audit2: '',
				fileStr:'',
				loading:false,
			}
		},
		watch:{
			acceptance_price(newValue, oldValue) {
				this.acceptance_price = this.acceptance_price.replace(/(^\s*) | (\s*$)/g,'')
				if(isNaN(Number(newValue))) {
					this.acceptance_price = ''
				}
			}
		},
		computed:{

		},
		filters:{
			
		},
		methods: {
			contentAudit(id){

				if(id == '2'){
					
					if(!this.did && this.apply_info.business_type!=6){
						this.$message({
							message: "请选择绑定需求!",
							type: 'warning',
							customClass:'zZindex'
						})
						return;
					}
					if(!this.file.file_url){
						this.$message({
							message: "请上传文件!",
							type: 'warning',
							customClass:'zZindex'
						})
						return;
					}
					this.loading = true;
					var data = {
						access_token: localStorage.getItem("access_token"),
						type: 5,
						id: this.$route.query.id,
						check_status: 0,
						project_id: this.$route.query.project_id,
						level: this.typebtn,
						demand_id: this.did,
						is_ruku: this.is_ruku,
						storage_number: 1,
						content_remark: this.content_remark,
						file_url: this.file.file_url,
					    file_name: this.file.file_name,
						file_size: this.file.file_size,
						check_steps: 1,
						file_info: this.fileStr,
					}
					this.api.reviewCheck(data).then(da => {
						if(da.result == '0'){
							this.loading = false;
							this.getreviewInfo();
							this.centerDialogVisible2 = false;
						}
					}).catch(da => {

					})
				}else{
					if(!this.did && this.apply_info.business_type!=6){
						this.$message({
							message: "请选择绑定需求!",
							type: 'warning',
							customClass:'zZindex'
						})
						return;
					}
					if(this.is_ruku == '0'){
						if(!this.storage_number){
							this.$message({
								message: "请填写入库素材数量!",
								type: 'warning',
								customClass:'zZindex'
							})
							return;
						}else{
							var re = /^[1-9]\d*$/;
							// console.log(re.test(this.storage_number))
							if(re.test(this.storage_number) == false){
								this.$message({
									message: "请填写大于1的正整数!",
									type: 'warning',
									customClass:'zZindex'
								})
								return;
							}
						}
					}else{
						this.storage_number = 1;
					}
					this.loading = true;		
					var data = {
						access_token: localStorage.getItem("access_token"),
						type: 5,
						id: this.$route.query.id,
						check_status: 0,
						project_id: this.$route.query.project_id,
						level: this.typebtn,
						deal_type: 1,
						demand_id: this.did,
						is_ruku: this.is_ruku,
						storage_number: this.storage_number,
						content_remark: this.content_remark,
						check_steps: 1,
					}
					this.api.reviewCheck(data).then(da => {
						if(da.result == '0'){
							this.loading = false;
							this.getreviewInfo();
							this.centerDialogVisible2 = false;
							if(this.$route.query.business_type == '5'){
								this.$message({
									message: "审核通过，视频正在打包，请稍后前往“交稿文件”处下载",
									type: 'success',
									customClass:'zZindex'
								})
							}else{
								this.$message({
									message: "审核通过",
									type: 'success',
									customClass:'zZindex'
								})
							}
							
						}
					}).catch(da => {

					})
				}
			},
			httprequest(params) {
				const _file = params.file;
				this.file_info = params.file;
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
			    var _this = this;
				this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
					
					_this.fileStr = JSON.stringify(response.data.data)
					// console.log(_this.fileStr);
					_this.file={
						file_url:response.data.data.url,
						file_name:response.data.data.file_name,
						file_size:response.data.data.file_size,
					}
					//_this.isupload = true;
					//console.log("1111111");
				}).catch(function (error) {
					console.log(error);
				});
				//console.log(this.form.banner = url)
			},
			openwindow(url){
				window.open(url);
			},
			deductionf(n){
				if(n == 0){
					this.deduction = false;
				} else {
					this.deduction = true;
				}
				
			},
			up(){

				// let reg2 = /^(\s|\S)+(.zip|.ZIP)$/;
				// if (reg2.test(this.material_info.download_file_url)) {
				//   	this.downloadZip(this.material_info.download_file_url)			  
				// 	return
				// }
				
				
				

				if(this.$route.query.business_type == 5){
					this.openurls.push({name:this.material_info.file_name,id:this.material_info.download_file_url});
					var inptext = this.material_info.download_file_url;
					var last = inptext.lastIndexOf(".");           
					var source = inptext.length;
					var sheng = Number(source)-last - 1;
					var fileSuffix = inptext.slice(-sheng);
					if(fileSuffix == 'mp4'){
						this.openurls.forEach(item =>{
							let src = item.id;
							fetch(item.id).then(res => res.blob()).then(blob => {
								const a = document.createElement('a');
								document.body.appendChild(a)
								a.style.display = 'none'
								// 使用获取到的blob对象创建的url
								const url = window.URL.createObjectURL(blob);
								a.href = url;
								// 指定下载的文件名
								a.download = item.name;
								a.click();
								document.body.removeChild(a)
								// 移除blob对象的url
								window.URL.revokeObjectURL(url);
							});	
						})
					}else{
						fetch(this.material_info.download_file_url).then(res => res.blob()).then(blob => {
							const a = document.createElement('a');
							document.body.appendChild(a)
							a.style.display = 'none'
							// 使用获取到的blob对象创建的url
							const url = window.URL.createObjectURL(blob);
							a.href = url;
							// 指定下载的文件名
							a.download = this.material_info.file_name;
							a.click();
							document.body.removeChild(a)
							// 移除blob对象的url
							window.URL.revokeObjectURL(url);
						});
					}
					
				}else{
					fetch(this.material_info.file_url).then(res => res.blob()).then(blob => {
						const a = document.createElement('a');
						document.body.appendChild(a)
						a.style.display = 'none'
						// 使用获取到的blob对象创建的url
						const url = window.URL.createObjectURL(blob);
						a.href = url;
						// 指定下载的文件名
						a.download = this.material_info.file_name;
						a.click();
						document.body.removeChild(a)
						// 移除blob对象的url
						window.URL.revokeObjectURL(url);
					});
				}
	
			},
			downloadZip(url){
				const content = url;
				const blob = new Blob([content],{type:"application/zip"});
				var timestamp = (new Date()).valueOf();
				const fileName = timestamp+'.zip';
				if('download' in document.createElement('a')) { // 非IE下载
				    const elink = document.createElement('a');
				    elink.download = fileName;
				    elink.style.display = 'none';
				    elink.href = window.URL.createObjectURL(blob);
				    document.body.appendChild(elink);
				    elink.click();
				    window.URL.revokeObjectURL(elink.href); // 释放URL 对象
				    document.body.removeChild(elink);
				} else { // IE10+下载
				    navigator.msSaveBlob(blob, fileName);
				}				
			},
			getarr(arr){
				
				return arr.split(",")	
			},
			getdes(ds){
				return JSON.parse(ds);
			},
			get_time_diff(ti) {
				if(ti){
					var time = new Date(ti.replace(/-/g, "/")).getTime();
					var diff = '';
					var time_diff = new Date().getTime() - time; //时间差的毫秒数 
					
					//计算出相差天数 
					var days = Math.floor(time_diff / (24 * 3600 * 1000));
					if (days > 0) {
						diff += days + '天';
					}
					if(days <= 0){
						this.lflag = true;
					} else {
						this.lflag = false;
					}
					return diff;
				} else {
					return "";
				}
				
			},
			getdeduction_price(ti) {
				if(ti){
					var time = new Date(ti.replace(/-/g, "/")).getTime();
					var diff = 0;
					var time_diff = new Date().getTime() - time; //时间差的毫秒数 
					
					//计算出相差天数 
					var days = Math.floor(time_diff / (24 * 3600 * 1000));
					if (days > 0) {
						diff += days;
					}
					this.deduction_price  =  (this.acceptance_price * diff * 0.1).toFixed(2)
					return (this.acceptance_price * 0.1 * diff).toFixed(2);
				} else {
					return 0;
				}
				
			},
			getdeductions(){
				let data = 0;
				data = this.deduction ? this.deductionprice : this.deduction_price
				return data;
			},
			getdeal_price() {
				let pic = this.acceptance_price*100;
				let upic = parseInt(pic+parseInt(pic*this.apply_info.gain_share_rate / 100))/100;
				if(upic<0){
					return 0;
				}
				return upic
				
				// if(((parseInt(this.acceptance_price) - this.getdeductions() + parseInt(this.apply_info.extra_reward) + parseInt(this.acceptance_price) * this.apply_info.gain_share_rate / 100).toFixed(2)) <= 0){
				// 	return 0;
				// } else {
				// 	return (parseInt(this.acceptance_price) - this.getdeductions() + parseInt(this.apply_info.extra_reward) + parseInt(this.acceptance_price) * this.apply_info.gain_share_rate / 100).toFixed(2);
				// }
				// return (parseInt(this.acceptance_price) - this.getdeductions() + parseInt(this.apply_info.extra_reward) + parseInt(this.acceptance_price) * this.apply_info.gain_share_rate / 100).toFixed(2);
				// let acceptance_price = this.acceptance_price ? parseInt(this.acceptance_price) : 0;
				// if(((parseInt(acceptance_price) + parseInt(acceptance_price) * this.apply_info.gain_share_rate / 100).toFixed(2)) <= 0){
				// 	return 0;
				// } else {
				// 	return (parseInt(acceptance_price) + parseInt(acceptance_price) * this.apply_info.gain_share_rate / 100).toFixed(2);
				// }
			},
			getrule(n) {
				this.typebtn = n;
			},
			getrule1(n) {
				this.typebtn1 = n;
				this.deal_type = n;
			},
			getimgulr(url) {
				this.imgurl = url;
				this.isimgurl = !this.isimgurl
			},
			getpower() {
				let a = false
				switch (this.pagetype) {
					case 1:
						if (this.adminuseraccess.indexOf("200466") > -1) {
							a = true;
						}
						break;
					case 2:
						if (this.adminuseraccess.indexOf("200467") > -1) {
							a = true;
						}
						break;
					case 3:
						if (this.adminuseraccess.indexOf("200468") > -1) {
							a = true;
						}
						break;
				};
				return a;
			},
			getparent() {
				if(this.$route.query.blank){
					this.$router.push({
						path:"/projectManagement/projectList",
					})
				}else{
					this.$router.go(-1);
				}
			},
			getValue(val) {
				if (val) {
					return val
				} else {
					return "--"
				}
			},
			getleng(n) {
				if (n == 10) {
					this.length10 = this.text100.length
				} else if (n == 30) {
					this.length30 = this.text30.length
				}
			},
			tabsChange(num) {
				this.tabsnum = num;
				//alert(this.tabsnum)
				if (this.tabsnum != 1) {
					this.detailbtn = true;
					this.workselect = false;
				}
			},
			tabsChange1(num) {
				this.tabsnum1 = num;
			},
			reject() {
				this.centerDialogVisible = !this.centerDialogVisible;
			},
			reject2() {
				this.centerDialogVisible2 = !this.centerDialogVisible2;
			},
			priceAudit(){
				this.centerDialogVisible6 = !this.centerDialogVisible6;
			},
			reject3() {
				this.centerDialogVisible3 = !this.centerDialogVisible3;
			},
			reject4() {
				this.centerDialogVisible4 = !this.centerDialogVisible4;
			},
			contributor() {
				// console.log(this.radio1)
				// console.log(this.text100)
				if (!this.radio1) {
					this.$message({
						message: "请选择驳回理由",
						type: 'warning',
						customClass:'zZindex'
					})
					return;
				}
				
				let data = {
					access_token: localStorage.getItem("access_token"),
					type: 5,
					id: this.$route.query.id,
					check_status: -1,
					reason: this.radio1,
					reject_type:this.radiox,
					check_steps: 0,
					comment:'',
				}
				
				if (this.radio1 == "其他理由") {
					data.reason = '其他';
					data.comment=this.text100;
				}else{
					data.comment=this.text100;
				}
				
				this.submint(data)
				this.reject();
			},
			contributor1(n) {
				if(n == 'lu'){
					this.loading = true;
					if(this.want_deal_type == '1'){
						if(Number(this.acceptance_price) <= 0) {
							this.$message({
								message: '买断金额不能为负或0或空!',
								type: 'warning',
								customClass: 'zZindex'
							})
							this.loading = false
							return
						}
						
						
						var data = {
							access_token: localStorage.getItem("access_token"),
							type: 5,
							id: this.$route.query.id,
							check_status: 1,
							project_id: this.$route.query.project_id,
							deal_type: this.want_deal_type,
							acceptance_price: this.acceptance_price,
							deal_price: this.getdeal_price(),
							gain_share_rate:this.apply_info.gain_share_rate,
							gain_share_price:(this.acceptance_price * this.apply_info.gain_share_rate / 100),
							check_steps: 2,
							want_deal_type:this.want_deal_type,
						}	
					}else{
						if(this.user_split_rate){
							if(this.user_split_rate <= 0 || this.user_split_rate > 100){
								this.$message({
									message: "分成比例为1到100之间的整数!",
									type: 'warning',
									customClass:'zZindex'
								})
								this.loading = false
								return;
							}
							if(!Number.isInteger(Number(this.user_split_rate))){
								this.$message({
									message: '分成比例为1到100之间的整数!',
									type: 'warning',
									customClass:'zZindex'
								})
								this.loading = false
								return
							}
						}else{
							this.$message({
								message: "请填写分成比例!",
								type: 'warning',
								customClass:'zZindex'
							})
							this.loading = false
							return;
						}


						if(this.want_deal_type ==3 && !this.advance_payment){

							this.$message({
								message: '请填写预付金!',
								type: 'warning',
								customClass: 'zZindex'
							})
							this.loading = false
							return
						}
							
							
						if(this.advance_payment && isNaN(Number(this.advance_payment))){
							this.$message({
								message: '预付金为数字!',
								type: 'warning',
								customClass: 'zZindex'
							})
							this.loading = false
							return
						}
						if(this.advance_payment && +this.advance_payment<=0){
							this.$message({
								message: '预付金不能为负数或0!',
								type: 'warning',
								customClass: 'zZindex'
							})
							this.loading = false
							return
						}
						var data = {
							access_token: localStorage.getItem("access_token"),
							type: 5,
							id: this.$route.query.id,
							check_status: 1,
							project_id: this.$route.query.project_id,
							deal_type: this.want_deal_type,
							// acceptance_price: this.acceptance_price,
							// deal_price: this.getdeal_price(),
							// gain_share_rate:this.apply_info.gain_share_rate,
							check_steps: 2,
							user_split_rate:this.user_split_rate,
							advance_payment:this.advance_payment,
							want_deal_type:this.want_deal_type,
						}
					}
				}else{
					var data = {
						access_token: localStorage.getItem("access_token"),
						type: 5,
						id: this.$route.query.id,
						check_status: 1,
						project_id: this.$route.query.project_id,
						deal_type: 1,
						acceptance_price: this.acceptance_price,
						deduction_price: this.getdeductions(),
						deal_price: this.getdeal_price(),
						gain_share_rate:this.apply_info.gain_share_rate,
						gain_share_price:(this.acceptance_price * this.apply_info.gain_share_rate / 100),
						check_steps: 2,
						user_split_rate:this.user_split_rate,
						advance_payment:this.advance_payment,
						want_deal_type:this.want_deal_type,
					}
				}		
				///console.log(data)
				// if(this.material_info.type == "2"){
				// 	data.file_url = this.file.file_url;
				// 	data.file_name = this.file.file_name
				// 	data.file_size = this.file.file_size
				// }
				this.submint(data);
			},
			sendmessage() {
				this.centerDialogVisible3 = false;
				this.$confirm('确定发送修改通知', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					customClass: "work",
					center: true
				}).then(() => {
					this.api.noticesend({
						access_token: localStorage.getItem("access_token"),
						content: this.content,
						activity_id: this.apply_info.activity_id,
						work_id: this.apply_info.work_id,
						open_id: this.apply_info.open_id
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
			showselectwork() {
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
			},
			downWorks(type) {
				if (type == "one") {
					this.openurls = [
						this.oneload
					]
				}
				console.log(this.openurls);
				this.openurls.forEach(item => {
					console.log(item);
					if (item.name == "图片") {
						let src = item.id;
						var canvas = document.createElement('canvas');
						var img = document.createElement('img');
						img.onload = function(e) {
							canvas.width = img.width;
							canvas.height = img.height;
							var context = canvas.getContext('2d');
							context.drawImage(img, 0, 0, img.width, img.height);
							canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
							canvas.toBlob((blob) => {
								let link = document.createElement('a');
								link.href = window.URL.createObjectURL(blob);
								link.download = '图片文件';
								link.click();
							}, "image/jpeg");
						}
						img.setAttribute("crossOrigin", 'Anonymous');
						img.src = src;
					}

					if (item.name == "附件") {
						//alert(1);
						window.open(item.id);
					}

					if (item.name == "视频") {
						//alert(1);
						let src = item.id;
						/* var a = document.createElement('a');
						  a.href = src; //图片地址
						  a.download = src; //图片名及格式
						  document.body.appendChild(a);
						  a.click(); */
						fetch(item.id).then(res => res.blob()).then(blob => {
							const a = document.createElement('a');
							document.body.appendChild(a)
							a.style.display = 'none'
							// 使用获取到的blob对象创建的url
							const url = window.URL.createObjectURL(blob);
							a.href = url;
							// 指定下载的文件名
							a.download = '视频文件';
							a.click();
							document.body.removeChild(a)
							// 移除blob对象的url
							window.URL.revokeObjectURL(url);
						});
					}

					if (item.name == "音频") {
						//alert(1);
						let src = item.id;
						/* var a = document.createElement('a');
						  a.href = src; //图片地址
						  a.download = src; //图片名及格式
						  document.body.appendChild(a);
						  a.click(); */
						fetch(item.id).then(res => res.blob()).then(blob => {
							const a = document.createElement('a');
							document.body.appendChild(a)
							a.style.display = 'none'
							// 使用获取到的blob对象创建的url
							const url = window.URL.createObjectURL(blob);
							a.href = url;
							// 指定下载的文件名
							a.download = '音频文件';
							a.click();
							document.body.removeChild(a)
							// 移除blob对象的url
							window.URL.revokeObjectURL(url);
						});
					}
				})
				this.centerDialogVisible5 = false;
			},
			cancel() {
				this.checkList = [];
				this.font_size = 0;
			},
			getreviewInfo() {
				this.api["reviewInfo" + this.pagetype]({
					access_token: localStorage.getItem("access_token"),
					type: 5,
					id: this.$route.query.id,
				}).then(da => {
					console.log(da)
					this.did = da.project_info.demand_id;
					this.reviewinfocommon = da.check_info;
					this.apply_info = da.project_info;
					this.check_info = da.check_info;
					this.material_info = da.file_info;
					this.status_info = da.check_info.check_status;
					//console.log(this.workdetail)
					this.check_steps = da.check_info.check_steps;
					// console.log(this.check_steps)
					if(this.check_steps == '1'){
						this.isShow = false;
					}
					if (da.check_info.hire_type) {
						this.hire_type = da.check_info.hire_type;
					}
					this.want_deal_type = da.project_info.want_deal_type
					this.settlement = da.project_info.settlement
					this.origin_type = da.project_info.want_deal_type
					/* if(da.check_info.contributor_type){
						this.contributor_type = da.apply_info.contributor_type;
					} */


					this.getdemandcheck();
				}).catch(da => {

				})
			},

			submint(data) {
				//console.log(data);
				this.api.reviewCheck(data).then(da => {
					if(da.result == 0){
						this.loading = false;
						this.$router.go(-1)
					}
					this.loading = false;
					setTimeout(()=>{
						window.close();
					}, 10);
					//this.getreviewInfo();
				}).catch(da => {

				})
			},
			getstatusinfo() {
				if (this.status_info == -1 || this.status_info == 1 || this.status_info == -2) {
					return false;
				} else {
					return true;
				}
			},
			getaccessid() {
				let id = "";

				if (this.pagetype == 1) {
					id = "200079";
				} else if (this.pagetype == 2) {
					id = "200084";
				} else if (this.pagetype == 3) {
					id = "200089";
				} else if (this.pagetype == 4) {
					id = "200094";
				}

				if (this.adminuseraccess.indexOf(id) > -1) {
					return true;
				} else {
					return false;
				}
			},
			handleCheckedCitiesChange(val) {
				//console.log(val
				this.font_size = 0;
				this.openurls = [];
				val.forEach((item, index) => {
					this.font_size += Number(item.split(",")[2]);
					this.openurls.push({
						name: item.split(",")[3],
						id: item.split(",")[0]
					});
				});
				console.log(this.openurls);
			},
			linksee() {
				window.open(localStorage.getItem("URL") + "/#/conts?id=" + this.$route.query.work_id);
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 100,
					type: 5,
					status:"1"
				}
				this.api.reviewreason(data).then((da) => {

					this.tableData = da.data;
					// console.log(this.tableData)

				}).catch(() => {

				});
			},
			showvideo(fid) {
				if (this.videofid) {
					document.getElementById(this.videofid).pause();
				}
				this.videofid = fid;
				document.getElementById(fid).play();
			},
			showaudio(fid) {
				if (this.audiofid) {
					document.getElementById(this.audiofid).pause();
				}
				this.audiofid = fid;
				document.getElementById(fid).play();
			},
			getdemandcheck() {
				this.api.demandlist({
					access_token: localStorage.getItem("access_token"),
					is_activity: 1
				}).then(da => {
					this.demandlist = da;
					//console.log(da)
				})
			},
			setdemand() {
				/* if(this.demandlist.length  == 0){
					this.$message({
						message:"需求ID不能为空"
					});
					return;
				} */

				this.reject4();
				this.reject2();
				this.priceAudit();

			},
			gotodetail(name, fid, num) {
				this.router.push({
					path: "/workManager/materialBank/materialBankdetail",
					query: {
						tabsnum: num,
						name: name,
						fid: fid
					}
				})
			},
			hover(fid, url, na) {
				this.fid = fid;
				this.oneload = {
					name: na,
					id: url
				}
			}
		},
		created() {
			this.getreviewInfo();
			this.getData();
			if (localStorage.getItem("adminuseraccess")) {
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"));				
				this.access = JSON.parse(localStorage.getItem("access"))
				this.business_title = '【业务】' + this.workData[2].child[this.$route.query.business_type]
				let type = this.$route.query.business_type;
				this.audit1 = this.ywArr_qx[type][0]?this.ywArr_qx[type][0]:'';
				this.audit2 = this.ywArr_qx[type][1]?this.ywArr_qx[type][1]:'';
			}
		},
		mounted() {
			if(this.$route.query.business_type == "5"){
				this.isbusiness_type = true;
			}
		}
	}
</script>

<style>
.customGroup .el-radio-button__inner{
	height: 40px!important;
	line-height: 40px!important;
	padding-top: 0!important;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner{
	color: #FFF;
	background: #409EFF;
	border-color: #409EFF;
	-webkit-box-shadow: -1px 0 0 0 #409EFF;
	box-shadow: -1px 0 0 0 #409EFF;
}
.Detail{
	background: #FFF;
}
.detailContent1 > ul{
	padding-top: 30px;
}

.pro_settlement_type_tips{
	position: absolute;
    left: 188px;
    top: 32px;
    font-size: 12px;
    color: #999;
}

</style>

<style scoped>

</style>
