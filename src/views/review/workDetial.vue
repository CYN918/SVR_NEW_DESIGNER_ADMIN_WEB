<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				审核详情
			</span>
			<div class="textcenter">
				<span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
				 @click="tabsChange(index,item.name)">
					<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
					{{ item.name }}
				</span>
			</div>
			<div class="materialdownload" v-if="tabsnum == 1 && pagetype != 4">
				<button class="defaultbtn" style="width: 87px;height: 32px;" @click="showselectwork()">选择下载</button>
				<button class="defaultbtn" style="width: 87px;height: 32px;" @click="handleCheckAllChange()">全部下载</button>
			</div>
		</div>
		<div class="detailContent1 ofh">
			<ul v-if="tabsnum == 0">
				<li class="margint13 ofh" v-for="(item,index) in workData" :key="index" :type="item.type">
					<span class="fleft fontcolorg" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ apply_info[item.id] }}</span>
					<span v-if="!item.type">{{ this.title }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="apply_info[item.id]" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="apply_info[item.id]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="apply_info[item.id]" alt="">
					<span v-else-if="item.type == 'imgbanner'"> {{ apply_info[item.id] }} </span>
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="apply_info[item.id]" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ apply_info[item.id] }}</span>
					</router-link>
				</li>
			</ul>
			<div class="paddinglr40 ofh" v-if="tabsnum == 1 && pagetype != 4">
				<el-checkbox-group v-model="checkList">
					<div v-if="material_info['附件']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">附件</div>
						<ul class="materiallist">
							<li class="">
								<div class="material relative">
									<el-checkbox class="material-checkbox" label="1" v-if="workselect"></el-checkbox>
									<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft">新概念</span>
									<span class="fright">新概念</span>
								</div>
							</li>
							<li class="">
								<div class="material relative">
									<el-checkbox class="material-checkbox" label="2" v-if="workselect"></el-checkbox>
									<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft">新概念</span>
									<span class="fright">新概念</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_info['图片']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">图片</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_info['图片']" :key = "item.url">
								<div class="material relative" :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'contain'}">
									<el-checkbox class="material-checkbox" label="3" v-if="workselect"></el-checkbox>
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
									<span class="fright">3M</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_info['视频']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">视频</div>
						<ul class="materiallist">
							<li class="">
								<div class="material relative">
									<el-checkbox class="material-checkbox" label="5" v-if="workselect"></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_zt.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft">新概念</span>
									<span class="fright">新概念</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_info['音频']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">音频</div>
						<ul class="materiallist">
							<li class="">
								<div class="material relative">
									<el-checkbox class="material-checkbox" label="6" v-if="workselect"></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_yp.png" alt="">
								</div>
								<div class="color66">
									<span class="fleft">新概念</span>
									<span class="fright">新概念</span>
								</div>
							</li>

						</ul>
					</div>
				</el-checkbox-group>
			</div>
			<ul v-if="tabsnum == 1 && pagetype == 4">
				<li class="margint13 ofh" v-for="(item,index) in reviewinfocommon" :key="index" :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ check_info[item.id] }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="check_info[item.id]" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="check_info[item.id]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="check_info[item.id]" alt="">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="check_info[item.id]" alt="">
					<button :class="'workbtn defaultbtn0 defaultbtn'+check_info[item.id]" v-else-if="item.type == 'btn'">
						{{item.child[check_info[item.id]]}}
					</button>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ check_info[item.id] }}</span>
					</router-link>
				</li>
				<li v-if="reviewinfostatus" class="margint13 ofh" v-for="(item,index) in reviewinfostatus" :key="index+item.type"
				 :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ check_info[item.id] }}</span>
					<span v-if="!item.type">{{ this.title }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="check_info[item.id]" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="check_info[item.id]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="check_info[item.id]" alt="">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="check_info[item.id]" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ check_info[item.id] }}</span>
					</router-link>
				</li>
			</ul>
			<ul v-if="tabsnum == 2">
				<li class="margint13 ofh" v-for="(item,index) in reviewinfocommon" :key="index" :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ check_info[item.id] }}</span>
					<span v-if="!item.type">{{ title }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="check_info[item.id]" alt="">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="check_info[item.id]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="check_info[item.id]" alt="">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="check_info[item.id]" alt="">
					<button :class="'workbtn defaultbtn0 defaultbtn'+check_info[item.id]" v-else-if="item.type == 'btn'">
						{{item.child[check_info[item.id]]}}
					</button>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ check_info[item.id] }}</span>
					</router-link>
				</li>
				<li v-if="reviewinfostatus" class="margint13 ofh" v-for="(item,index) in reviewinfostatus" :key="index+item.type"
				 :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ check_info[item.id] }}</span>
					
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="check_info[item.id]" alt="">
					<!-- <span v-else-if="item.type == 'imgbanner'" style="{background: ;}"></span> -->
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="[check_info[item.id]]" alt="">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="[check_info[item.id]]" alt="">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="check_info[item.id]" alt="">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ check_info[item.id] }}</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn" v-if="detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button v-if="getstatusinfo()" class="defaultbtn" @click="reject()">审核驳回</button>
			<button v-if="getstatusinfo()" class="defaultbtn defaultbtnactive" @click="agree()">审核通过</button>
			<button class="defaultbtn" v-if="pagetype != 4">预览作品</button>
		</div>
		<div class="screenContent detailbtn" v-if="!detailbtn">
			<button class="defaultbtn" @click="cancel">取消选项</button>
			<button class="defaultbtn defaultbtnactive" style="width: auto;padding: 0 5px;" @click="downWorks">下载 {{ checkList.length }}
				个选项（100M）</button>
		</div>
		<el-dialog :title="title + '-审核驳回'" :visible.sync="centerDialogVisible" width="738px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<span class="fleft Dialogkey">
							驳回理由
						</span>
						<el-radio-group v-model="radio1" class="sel-dialog-content fleft" v-if="pagetype == 1">
							<div class="w  sel-radio">
								<el-radio label="存在侵权">存在侵权</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="存在负面影响的言语或图片">存在负面影响的言语或图片</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="作品类型选择与内容不符">作品类型选择与内容不符</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="其他理由（请在详细说明中填写）">其他理由（请在详细说明中填写）</el-radio>
							</div>
						</el-radio-group>
						<el-radio-group v-model="radio1" class="sel-dialog-content fleft" v-if="pagetype == 2">
							<div class="w  sel-radio">
								<el-radio label="作品质量有所欠缺">作品质量有所欠缺</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="未按照活动要求提供内容">未按照活动要求提供内容</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="作品内容与活动主题无关">作品内容与活动主题无关</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="其他理由（请在详细说明中填写）">其他理由（请在详细说明中填写）</el-radio>
							</div>
						</el-radio-group>
						<el-radio-group v-model="radio1" class="sel-dialog-content fleft" v-if="pagetype == 3">
							<div class="w  sel-radio">
								<el-radio label="作品质量有所欠缺">作品质量有所欠缺</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="未按照活动要求提供内容">未按照活动要求提供内容</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="作品内容与活动主题无关">作品内容与活动主题无关</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="其他理由（请在详细说明中填写）">其他理由（请在详细说明中填写）</el-radio>
							</div>
						</el-radio-group>
						<el-radio-group v-model="radio1" class="sel-dialog-content fleft" v-if="pagetype == 4">
							<div class="w  sel-radio">
								<el-radio label="身份不明">身份不明</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="违规操作">违规操作</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="信息欠缺">信息欠缺</el-radio>
							</div>
							<div class="w sel-radio">
								<el-radio label="其他理由（请在详细说明中填写）">其他理由（请在详细说明中填写）</el-radio>
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
		</el-dialog>
		<el-dialog title="请选择录用方式" :visible.sync="centerDialogVisible2">
			<div style="position: relative;">
				<div class="textcenter">
					<span style="margin-right:0" v-for="(item,index) in tabData1" :key="item.name" :class="tabsnum1 == index ? 'tabs tabactive' : 'tabs'"
					 @click="tabsChange1(index,item.name)">
						<!-- <el-badge :value="200" :max="99" class="badge">{{ item.name }}</el-badge> -->
						{{ item.name }}
					</span>
					<div class="textcenter employipt" v-if="tabsnum1 == 0">
						<span style="display: inline-block;">录用价格</span>
						<span class="defaultbtn0 employmonre"><input class="w fleft" type="text" v-model="price1">单位：元</span>
					</div>
					<div v-if="tabsnum1 == 1">
						<div class="textcenter employipt">
							<span style="display: inline-block;width: 84px;text-align: right;">录用价格</span>
							<span class="defaultbtn0 employmonre" style="border-color: #DCDFE6;"><input class="w fleft" style="color: #DCDFE6;" type="text" v-model="price2">单位：元</span>
						</div>
						<div class="textcenter employipt">
							<span style="display: inline-block;width: 84px;text-align: right;">预计投放渠道</span>
							<span class="defaultbtn0 employmonre" style="border-color: #DCDFE6;"><input class="w fleft" style="color: #DCDFE6;" type="text" v-model="channel"><span style="color: transparent;">1</span></span>
							<!-- <el-select v-model="value" class="employmonre" placeholder="请选择" multiple>
								<el-option
								  v-for="item in options"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							  </el-select> -->
							<!-- <span class="defaultbtn0 employmonre"><input class="w fleft" type="text">单位：元</span> -->
						</div>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<el-button size="medium" @click="reject2()">取消</el-button>
				<el-button size="medium" type="primary" @click="contributor1('lu')">确定并通过</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import reviewData from "@/assets/reviewData.js"
	export default {
		props: ['detailData', 'roles'],
		data() {
			return {
				text100: '',
				text30: "",
				length10: 0,
				length30: 0,
				tabData: [{}],
				tabData1:[{
						name: "买断式"
					},{
						name: "分成式"
					}],
				tabsnum: 0,
				tabsnum1: 0,
				workData: '',
				centerDialogVisible: false,
				centerDialogVisible1: false,
				centerDialogVisible2: false,
				radio1: '',
				radio2: "",
				workselect: false,
				detailbtn: true,
				checkList: [],
				checkAll: ["1", "2", "3", "4", "5", "6"],
				reviewinfocommon: [],
				reviewinfostatus: [],
				status_info: parseInt(this.$route.query.check_status),
				apply_info: {},
				check_info:{},
				material_info:{},
				title: "作品发布",
				options: [{
				  value: '选项1',
				  label: '黄金糕'
				}, {
				  value: '选项2',
				  label: '双皮奶'
				}, {
				  value: '选项3',
				  label: '蚵仔煎'
				}, {
				  value: '选项4',
				  label: '龙须面'
				}, {
				  value: '选项5',
				  label: '北京烤鸭'
				}],
				value: '',
				channel:"",
				price1:"",
				price2:"",
				pagetype:parseInt(this.$route.query.type),
				hire_type:"",
				contributor_type:""
			}
		},
		methods: {
			getparent() {
				//alert(parseInt(this.$route.query.type))
				 switch (this.pagetype){
					case 1:
						this.router.push({
							path: "/review/publishWork"
						})
						break;
					case 2:
						this.router.push({
							path: "/review/finalistsWork"
						})
						break;
					case 3:
						this.router.push({
							path: "/review/employWork"
						})
						break;
					case 4:
						this.router.push({
							path: "/review/applyPerson"
						})
						break;
					default:
						break;
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
				if (num != 1) {
					this.detailbtn = true;
					this.workselect = false;
				}
			},
			tabsChange1(num){
				this.tabsnum1 = num;
			},
			getkey() {
				//alert(typeof this.status_info)
				var pagename = "";
				switch (this.pagetype) {
					case 1:
						pagename = "publishWork";
						this.title = "作品发布"
						break;
					case 2:
						pagename = "finalistsWork";
						
						this.title = "作品入围"
						break;
					case 3:
						pagename = "employWork";
						this.title = "作品录用"
						break;
					case 4:
						pagename = "applyPerson";
						this.title = "供稿人申请"
						break;
				};
				
				
				if(this.pagetype == 4){
					if(this.contributor_type == 1) {
						this.workData = reviewData[pagename].contributor_type1;
					} else {
						this.workData = reviewData[pagename].contributor_type2;
					}
				} else {
					this.workData = reviewData[pagename].workInfo;
				}
				
				
				this.reviewinfocommon = reviewData[pagename].reviewinfo.common;
				if (this.status_info == 1 && this.pagetype != 4) {
					if (this.pagetype == 3){
						if(this.hire_type == 1){
							this.reviewinfostatus = reviewData[pagename].reviewinfo.status1.hire_type1;
						} else {
							this.reviewinfostatus = reviewData[pagename].reviewinfo.status1.hire_type2;
						}
					} else {
						this.reviewinfostatus = reviewData[pagename].reviewinfo.status1;
					}
					
					//console.log(this.reviewinfostatus);
				};
				if (this.status_info == -1) {
					//alert(2)
					this.reviewinfostatus = reviewData[pagename].reviewinfo.status_1;
				};
			},
			reject() {
				this.centerDialogVisible = !this.centerDialogVisible;
			},
			reject2() {
				this.centerDialogVisible2 = !this.centerDialogVisible2;
				
			},
			contributor() {
				let data = {
					access_token: 2,
					type: this.$route.query.type,
					id: this.$route.query.id,
					check_status: -1,
					reason:this.radio1,
					comment:this.text100,
				}
				this.submint(data)
				this.reject();
			},
			contributor1(n) {
				this.centerDialogVisible1 = false;
				this.centerDialogVisible2 = false;
				this.$confirm('确定将该'+ this.title +'审核通过', '确认修改', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: '',
					customClass:"work",
					center: true
				}).then(() => {
					var data = {
						access_token: 2,
						type: this.$route.query.type,
						id: this.$route.query.id,
						check_status: 1,
						level: this.radio2
					}
					
					if(n == "lu"){
						if(this.tabsnum1 == 0){
							data.hire_type = 1;
							data.price = this.price1;
						} else{
							data.hire_type = 2;
							data.price = this.price2;
							data.channel= this.channel;
						}
						
					}
					
					this.submint(data)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已经取消'
					});
				});
			},
			agree() {
				switch (this.pagetype){
					case 1:
						this.centerDialogVisible1 = !this.centerDialogVisible1;
						break;
					case 2:
						this.contributor1();
						break;
					case 3:
						this.centerDialogVisible2 = !this.centerDialogVisible2;
						break;
					case 4:
						this.contributor1();
						break;
					default:
						break;
				}
			},
			showselectwork() {
				this.detailbtn = !this.detailbtn;
				this.workselect = !this.workselect;
			},
			downWorks() {
				console.log(this.checkList);
			},
			handleCheckAllChange(val) {
				this.checkList = this.checkAll;
				this.detailbtn = false;
				this.workselect = true;
			},
			cancel() {
				this.checkList = [];
			},
			getreviewInfo() {
				if(this.pagetype == 4){
					this.tabData = [{
						name: "申请信息",
						linkTo: "/review/publishWork",
						publishWorks: "",
					},
					{
						name: "审核详情",
						linkTo: "/review/finalistsWork",
						publishWorks: "",
					}];
				} else {
					this.tabData = [{
						name: "作品信息",
						linkTo: "/review/publishWork",
						publishWorks: "",
					},
					{
						name: "素材预览",
						linkTo: "/review/finalistsWork",
						publishWorks: "",
					},
					{
						name: "审核信息",
						linkTo: "/review/employWork",
						publishWorks: "",
					}];
				}
				
				
				this.api.reviewInfo({
					access_token: 2,
					type: this.$route.query.type,
					id: this.$route.query.id,
				}).then(da => {
					console.log(da)
					this.apply_info = da.apply_info;
					this.check_info = da.check_info;
					this.material_info = da.material_info;
					//this.status_info = da.check_info.check_status;
					//console.log(this.workdetail)
					if(da.check_info.hire_type){
						this.hire_type = da.check_info.hire_type;
					}
					if(da.check_info.contributor_type){
						this.contributor_type = da.apply_info.contributor_type;
					}
					this.getkey();
				}).catch(da => {

				})
			},
			
			submint(data){
				//console.log(data);
				this.api.reviewCheck(data).then(da => {
					if(da.msg == "ok"){
						this.$message({
							type: 'info',
							message: '已经取消'
						});
					}
					
					//console.log(da)
				}).catch(da => {
				
				})
			},
			getstatusinfo(){
				if(this.status_info == -1 || this.status_info == 1){
					return false;
				} else{
					return true;
				}
			}

		},
		created() {
			this.getreviewInfo();
		},
		mounted() {
			
		}
	}
</script>

<style>
	.materiallist .el-checkbox__label {
		display: none;
	}
	
	.work .el-button--primary{
		background: #FF5121;
		border-color: #FF5121;
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

	.detailContent1 {
		height: calc(100% - 139px);
		overflow-y: auto;
	}

	.detailContent1>ul {
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
