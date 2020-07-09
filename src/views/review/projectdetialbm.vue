<template>
<div>
	<common-top :commonTopData="projectdetialTopData"></common-top>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<div class="textcenter">
				<span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
				 @click="tabsChange(index,item.name)" style="height: 33px;">
					{{ item.name }}
				</span>
			</div>
		</div>
		<div class="detailContent1 ofh"></div>
		
		
		<div class="bmwork_01" v-if="tabsnum == 0">
			<div class="bmwork_02">
				<work1 v-for="(el,index) in works" v-model="works[index]"></work1>
			</div>

		</div>
		
		<div v-if="tabsnum == 1">
			<reviewinfocommon :apply_info="check_info" :reviewinfocommon="reviewinfocommon" :demand_id="apply_info.demand_id" :gain_share_rate="apply_info.gain_share_rate"></reviewinfocommon>
		</div>
		
		<div v-if="tabsnum == 2">
			<xmInfo></xmInfo>
		</div>
		
		
		<div class="screenContent detailbtn" v-if="detailbtn">
			<button class="defaultbtn" @click="xmyl()">预览项目</button>
			<button v-if="getstatusinfo() && adminuseraccess.indexOf(ywArr_bmqx[9][1]) > -1" class="defaultbtn" @click="reject">审核驳回</button>
			<button v-if="getstatusinfo() && adminuseraccess.indexOf(ywArr_bmqx[9][1]) > -1" class="defaultbtn" @click="reject2()">审核通过</button>
		
		</div>

		<el-dialog :title="title + '-审核驳回'" :visible.sync="centerDialogVisible" width="738px">
			<div style="position: relative;">
				<ul>
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
				<div class="tiopcs">
					是否分配子项目给{{check_info.username}}制作？
				</div>

			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<el-button type="primary" @click="reject2()">取 消</el-button>
				<el-button type="primary" @click="contributor1('fa')">确 定</el-button>
			</span>
		</el-dialog><!-- centerDialogVisible2 -->
		
		<div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片">
		</div>
	</div>
</div>
</template>

<script>
	import reviewData from "@/assets/reviewData.js"
	import commonTop from '@/components/commonTop.vue'
	import reviewinfocommon from './reviewinfocommonNew'
	import workData from './workData'
	import Cent from './cent'
	import work1 from '../com/work1'
	
	import xmInfo from '../projectManagement/longP/xmInfo'
	
	export default {
		props: ['detailData', 'roles'],
		components:{
			commonTop,
			reviewinfocommon,
			workData,
			Cent,
			work1,
			xmInfo
		},
		data() {
			return {
				works:[],
				
				
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
						name: "案例作品",
					},
					{
						name: "审核信息",
					},
					{
						name: "项目信息",
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
		computed:{},
		filters:{},
		methods: {
			xmyl(){
				this.opPrCont(this.$route.query.id);
			},
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
				this.centerDialogVisible1 = !this.centerDialogVisible1;
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
					type: 6,
					id: this.$route.query.signup_id,
					check_status: -1,
					reason: this.radio1,
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
				
				var data = {
					access_token: localStorage.getItem("access_token"),
					type: 6,
					id: this.$route.query.signup_id,
					check_status: 1,
					project_id: this.$route.query.id,
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
				};
				
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
				this.api.reviewInfo({
					access_token: localStorage.getItem("access_token"),
					type: this.pagetype,
					id: this.$route.query.signup_id,
				}).then(da => {
					console.log(da);
					let workarr = [];
					for(let k in da.file_info){
						let obj = {id:k};
						obj = Object.assign(obj,da.file_info[k]);
						workarr.push(obj)
					}
					
					this.works = workarr;
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
					this.defaultTab();
				}).catch(da => {

				})
			},
			// 切换至初始化选项卡
			defaultTab() {
				let query = this.$route.query || {};
				if(query.tabIdx) this.tabsChange(query.tabIdx)
			},
			submint(data) {
				
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
				console.log([-1,1,-2].indexOf(this.status_info-0)==-1);
				return [-1,1,-2].indexOf(this.status_info-0)==-1;
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
					type: 6,
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
				this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
				this.access = JSON.parse(localStorage.getItem("access"))
				this.business_title = '【业务】' + this.workData[2].child[this.$route.query.business_type]
				// console.log(this.business_title)
				this.access.top_banner[0].child.forEach(item => {
					if(item.id == '16'){
						item.child.forEach(element => {
							if(element.title == this.business_title){
								element.child.forEach(val => {
									if(val.id == '200573'){
										this.audit1 = val.id;
									}else if(val.id == '200577'){
										this.audit1 = val.id;
									}else if(val.id == '200580'){
										this.audit1 = val.id;
									}else if(val.id == '200583'){
										this.audit1 = val.id;
									}else if(val.id == '200585'){
										this.audit1 = val.id;
									}else if(val.id == '200575'){
										this.audit2 = val.id;
									}else if(val.id == '200578'){
										this.audit2 = val.id;
									}else if(val.id == '200581'){
										this.audit2 = val.id;
									}else if(val.id == '200584'){
										this.audit2 = val.id;
									}else if(val.id == '200586'){
										this.audit2 = val.id;
									}
								})
							}			
						})
					}
				})
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

</style>

<style scoped>
.bmxq_01{
	cursor: pointer;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%,50%;
}
.bmwork_01{
	padding: 20px;
	text-align: center;
}
.bmwork_02{
	display: inline-block;
	vertical-align: top;
	text-align: left;
}
.bmwork_02 .work1_01{
	margin: 0 10px;
}
.tiopcs{
	text-align: center;
}
</style>
