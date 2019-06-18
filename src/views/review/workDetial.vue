<template>
	<div class="wh Detail">
		<div class="detailtitle ofh relative">
			<span class="fleft worktabs">
				审核详情
			</span>
			<div class="textcenter">
				<span v-for="(item,index) in tabData" :key="item.name" tag="span" :class="tabsnum == index ? 'tabs tabactive' : 'tabs'"
				 @click="tabsChange(index,item.name)" style="height: 33px;">
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
					<span v-if="item.type == 'text'">{{ getValue(apply_info[item.id])  }}</span>
					<span v-if="!item.type">{{ title }}</span>
					<span v-else-if="item.type == 'arr'">
						<span v-for="(item,index) in apply_info.labels" :key = "item">{{ item + (index == (apply_info.labels.length - 1) ? "" : "/")  }}</span>
					</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="apply_info[item.id]" alt="没有图片">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="apply_info[item.id]" alt="没有图片">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="apply_info[item.id]" alt="没有图片">
					<span v-else-if="item.type == 'imgbanner'"> {{ getValue(apply_info[item.id])  }} </span>
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="apply_info[item.id]" alt="没有图片">
					<span v-else-if="item.type == 'child'">{{  getValue(item.child[apply_info[item.id]])}}</span>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ getValue(apply_info[item.id]) }}</span>
					</router-link>
				</li>
			</ul>
			<div class="paddinglr40 ofh" v-if="tabsnum == 1 && pagetype != 4">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
					<div v-if="material_info['附件']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">附件</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_info['附件']" :key = "item.fid">
								<div class="material relative">
									<el-checkbox class="material-checkbox" :label=" item.url +','+item.fid+','+item.file_size+',附件'" v-if="workselect"></el-checkbox>
									<img class="material-fu" src="../../assets/img/SHT_SHXQ_ZIP_icon.png" alt="没有图片">
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
							
						</ul>
					</div>
					<div v-if="material_info['图片']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">图片</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_info['图片']" :key="item.fid">
								<div class="material relative" :style="{backgroundImage: 'url(' + item.url + ')', backgroundSize:'contain'}">
									<el-checkbox class="material-checkbox" :label=" item.url +','+item.fid+','+item.file_size+',图片'" v-if="workselect"></el-checkbox>
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_info['视频']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">视频</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_info['视频']" :key = "item.fid">
								<div class="material relative" :style="{backgroundImage: 'url(' + item.cover_img + ')', backgroundSize:'contain'}">
									<el-checkbox class="material-checkbox" :label=" item.url +','+item.fid+','+item.file_size+',视频'" v-if="workselect"></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_zt.png" alt="没有图片">
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if="material_info['音频']">
						<div style="font-size: 14px;color: #1E1E1E;margin:46px 0 12px;">音频</div>
						<ul class="materiallist">
							<li v-for="(item,index) in material_info['音频']" :key = "item.fid">
								<div class="material relative">
									<el-checkbox class="material-checkbox" :label=" item.url +','+item.fid+','+item.file_size+',音频'" v-if="workselect"></el-checkbox>
									<img class="material-bo" src="../../assets/img/scsc_icon_yp.png" alt="没有图片">
								</div>
								<div class="color66">
									<span class="fleft">{{ item.file_name }}</span>
									<span class="fright">{{ item.file_size_format }}</span>
								</div>
							</li>

						</ul>
					</div>
				</el-checkbox-group>
			</div>
			<ul v-if="tabsnum == 1 && pagetype == 4">
				<li class="margint13 ofh" v-for="(item,index) in reviewinfocommon" :key="index" :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ getValue(check_info[item.id]) }}</span>
					<span v-if="!item.type">{{ title }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="check_info[item.id]" alt="没有图片">
					<button :class="'workbtn defaultbtn0 defaultbtn'+check_info[item.id]" v-else-if="item.type == 'btn'">
						{{ getValue(item.child[check_info[item.id]]) }}
					</button>
					<span v-else-if="item.type == 'child'">{{ getValue(item.child[check_info[item.id]]) }}</span>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ getValue(check_info[item.id]) }}</span>
					</router-link>
				</li>
				<li v-if="reviewinfostatus" class="margint13 ofh" v-for="(item,index) in reviewinfostatus" :key="index+item.type"
				 :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ getValue(check_info[item.id]) }}</span>
					<span v-if="!item.type">{{ title }}</span>
					<span v-else-if="item.type == 'child'">{{ getValue(item.child[check_info[item.id]]) }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="check_info[item.id]" alt="没有图片">
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ getValue(check_info[item.id]) }}</span>
					</router-link>
				</li>
			</ul>
			<ul v-if="tabsnum == 2">
				<li class="margint13 ofh" v-for="(item,index) in reviewinfocommon" :key="index" :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ getValue(check_info[item.id]) }}</span>
					<span v-if="!item.type">{{ title }}</span>
					<span v-else-if="item.type == 'child'">{{ getValue(item.child[check_info[item.id]]) }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="check_info[item.id]" alt="没有图片">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="check_info[item.id]" alt="没有图片">
					<button :class="'workbtn defaultbtn0 defaultbtn'+check_info[item.id]" v-else-if="item.type == 'btn'">
						{{ getValue(item.child[check_info[item.id]]) }}
					</button>
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ getValue(check_info[item.id]) }}</span>
					</router-link>
				</li>
				<li v-if="reviewinfostatus" class="margint13 ofh" v-for="(item,index) in reviewinfostatus" :key="index+item.type"
				 :type="item.type">
					<span class="fleft" style="margin-right: 20px;width: 140px;">{{ item.name }}</span>
					<span v-if="item.type == 'text'">{{ getValue(check_info[item.id]) }}</span>
					<span v-if="!item.type">{{ title }}</span>
					<span v-else-if="item.type == 'child'">{{ getValue(item.child[check_info[item.id]]) }}</span>
					<img class="img-top" v-else-if="item.type == 'imgtou'" :src="check_info[item.id]" alt="没有图片">
					<!-- <span v-else-if="item.type == 'imgbanner'" style="{background: ;}"></span> -->
					<img class="img-fengmian" v-else-if="item.type == 'imgfeng'" :src="[check_info[item.id]]" alt="没有图片">
					<img class="img-banner" v-else-if="item.type == 'imgbanner'" :src="[check_info[item.id]]" alt="没有图片">
					<img class="img-zheng" v-else-if="item.type == 'imgzheng'" :src="check_info[item.id]" alt="没有图片">
					
					<router-link to="/" v-else-if="item.type == 'url'">
						<span class="routerLink">{{ getValue(check_info[item.id]) }}</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn" v-if="detailbtn">
			<button class="defaultbtn" @click="getparent()">返回</button>
			<button v-if="getstatusinfo()" class="defaultbtn" @click="reject()">审核驳回</button>
			<button v-if="getstatusinfo()" class="defaultbtn defaultbtnactive" @click="agree()">审核通过</button>
			<button class="defaultbtn" v-if="pagetype != 4" @click="linksee">预览作品</button>
		</div>
		<div class="screenContent detailbtn" v-if="!detailbtn">
			<button class="defaultbtn" @click="cancel">取消选项</button>
			<button class="defaultbtn defaultbtnactive" style="width: auto;padding: 0 5px;" @click="downWorks">下载 {{ checkList.length }}
				个选项（{{ this.font_size / 1024 >= 1 ? (this.font_size/1024).toFixed(2) +"M" : this.font_size.toFixed(2) + "KB"   }}）</button>
		</div>
		<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
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
				checkAll: [],
				reviewinfocommon: [],
				reviewinfostatus: [],
				/* status_info: parseInt(this.$route.query.check_status), */
				status_info:"",
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
				contributor_type:parseInt(this.$route.query.contribute_type),
				font_size:0,
				tableData:[],
				openurls:[],
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
				if (this.tabsnum != 1) {
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
					//alert(this.contributor_type)
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
					access_token: localStorage.getItem("access_token"),
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
						access_token: localStorage.getItem("access_token"),
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
				this.openurls.forEach(item =>{
					//console.log(item);
					if(item.name == "图片"){
						let src = item.id;
						var canvas = document.createElement('canvas');
						var img = document.createElement('img');
						img.onload = function(e) {
							canvas.width = img.width;
							canvas.height = img.height;
							var context = canvas.getContext('2d');
							context.drawImage(img, 0, 0, img.width, img.height);
							canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
							canvas.toBlob((blob)=>{
								let link = document.createElement('a');
								link.href = window.URL.createObjectURL(blob);
								link.download = '图片文件'; 
								link.click();  
							}, "image/jpeg");
						}
						img.setAttribute("crossOrigin",'Anonymous');
						img.src = src;
					}
					
					if(item.name == "附件"){
						//alert(1);
						window.open(item.id);
					}
					
					if(item.name == "视频"){
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
					
					if(item.name == "音频"){
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
			},
			handleCheckAllChange(val) {
				this.checkList = this.checkAll;
				this.detailbtn = false;
				this.workselect = true;
			},
			cancel() {
				this.checkList = [];
				this.font_size = 0;
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
					access_token: localStorage.getItem("access_token"),
					type: this.$route.query.type,
					id: this.$route.query.id,
				}).then(da => {
					console.log(da)
					this.apply_info = da.apply_info;
					this.check_info = da.check_info;
					this.material_info = da.material_info;
					this.status_info = da.check_info.check_status;
					//console.log(this.workdetail)
					if(da.check_info.hire_type){
						this.hire_type = da.check_info.hire_type;
					}
					/* if(da.check_info.contributor_type){
						this.contributor_type = da.apply_info.contributor_type;
					} */
					this.getkey();
				}).catch(da => {

				})
			},
			
			submint(data){
				//console.log(data);
				this.api.reviewCheck(data).then(da => {
					//getparent()
					this.getreviewInfo();
				}).catch(da => {
				
				})
			},
			getstatusinfo(){
				if(this.status_info == -1 || this.status_info == 1){
					return false;
				} else{
					return true;
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
				console.log(this.openurls);
			},
			linksee(){
				window.open("http://dev-web-ndesigner.idatachain.cn/#/conts?id=" + this.$route.query.work_id);   
			},
			getData(pg) {
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 100,
					type:this.pagetype
				}
				this.api.reviewreason(data).then((da) => {
					
					this.tableData = da.data;
					console.log(this.tableData	)
					
				}).catch(() => {
					
				});
			},

		},
		created() {
			this.getreviewInfo();
			this.getData();
		},
		mounted() {
			
		}
	}
</script>

<style>
	
	
</style>

<style scoped>
	
</style>
