<template>
	<div>
		<div v-show="chekin" class="upBoxd">
			<div class="upBoxd1">
				<div class="upBoxd1_2 relative">
					<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="form.content"></vue-ueditor-wrap>
					<div class="upBoxd2">
						<div class="fleft" @click="showUp(0)">图片</div>
						<div @click="showUp1(1)" class="fleft relative">视频<input @change="handleAvatarSuccessvideo" class="uploadBoxd2_2_2_1" ref="upnfile"  multiple="multiple" type="file" /></div>
						<div @click="showUp1(2)" class="fleft relative">音频<input @change="handleAvatarSuccessvideo" class="uploadBoxd2_2_2_1" ref="upnfile"  multiple="multiple" type="file" /></div>
					</div>
				</div>
			</div>
			<UplodImg v-if="isshowd" :configData="upConfig"></UplodImg>
		</div>
	</div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import UplodImg from './uploadImag'
import {Message} from 'element-ui'
export default {
	name: 'index',
	components:{VueUeditorWrap,UplodImg},
	props:[
		'uploaddata'
	],
	data(){
		return{
			ifBjType:0,
			isPhto:false,
			chekin:true,
			isshowT1:false,
			isshowT2:false,
			ck2:'',
			ck3:'',
			csz:'',
			fjtext:'选择附件',
			chekusername:()=>{},
			form:{
				work_name:'',
				
				attachment_visible:1,
				labels:[],
				copyright:'禁止匿名转载；禁止商业使用；禁止个人使用。',
				is_platform_work:0,
				content:'<p style="color:#999">从这里开始编辑作品类容...</p>'
			},
			uD:{},
			upConfig:'',
			myConfig: {
			  autoHeightEnabled: false,
			  initialFrameHeight: 324,
			  initialFrameWidth: '100%',
			  UEDITOR_HOME_URL: '/UEditor/',
			  toolbars: [[
			  				'undo','redo', '|','fontsize','link','unlink',
			  				'bold','underline','forecolor','|','justifyleft','justifycenter',
			  				'justifyright','justifyjustify','lineheight','lineheight'
			  				]
			  //             'fullscreen', 'source', '|', 'undo', 'redo', '|',
			  //             'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
			  //             'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
			  //             'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
			  //             'directionalityltr', 'directionalityrtl', 'indent', '|',
			  //             'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
			  //             'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
			  //             'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
			  //             'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
			  //             'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
			  //             'print', 'preview', 'searchreplace', 'drafts', 'help'
			          ]
			},			
			isshowd:false,
			upList:[
				{
					title:'我的图片素材库',
					title2:'上传文件大小需小于10M，支持JPG、PNG、GIF格式。',					
					btn:'上传图片素材',
					max:10*1024*1024,
					type:['image/gif','image/jpeg','image/png'],
					getType:'image'
				},
				{
					title:'我的视频素材',
					title2:'上传文件大小需小于1.5G，支持主流的视频格式',
					tip:['常见的在线流媒体格式：mp4、Ogg、WebM'],
					btn:'上传视频素材',
					max:1.5*1024*1024*1024,
					type:['video/mp4','video/ogg','video/webm'],
					getType:'video'
				},
				{
					title:'我的音频素材',
					title2:'格式支持mp3、Ogg、Wav，文件大小不超过50M',
					btn:'上传音频素材',
					max:50*1024*1024,
					type:['audio/ogg','audio/mp3','audio/wav','audio/mpeg'],
					getType:'audio'
				}
				
			],
			autoSave:{
				time:'',
				obj:'',
				saveData:'',
			},
			upfjData:{
				
			},
			tags:'',
			page2:{
				classify:[],
				classify_1:0,
				classify_2:0,
				classify_3:0,
			},
			selectedOptions:[],
			dmtData:'',
			zk_wrokids:[],
		}  
	},
	watch: {	
		'form.work_name'(val,oldval) {				
			this.checkPage1();			
		},
		'form.content'() {
			this.checkPage1();
			this.$parent.changedatial()
		},
		'form.face_pic'() {
			this.checkPage2();
			this.setAutoSave();
		},
		'selectedOptions'() {
			if(this.selectedOptions.length==0){
				return
			}
			this.form.classify_1 = this.selectedOptions[0];
			this.form.classify_2 = this.selectedOptions[1];
			this.form.classify_3 = this.selectedOptions[2];
			this.checkPage2();
			this.setAutoSave();
		},
		'form.copyright'() {
			this.checkPage2();
			this.setAutoSave();
		},
		'form.labels'() {
			this.setAutoSave();
		},
		'form.attachment_id'() {
			this.setAutoSave();
		},
		'form.attachement_visible'() {
			this.setAutoSave();
		},
		'form.is_platform_work'() {
			this.setAutoSave();
		},
	},
	created:function(){
		this.init();
		//this.getClassify();
		//console.log()
	},
	mounted: function () {	
		//this.init();
	},
	methods: {
		/*page2*/
		handleAvatarSuccessvideo(params) {
			const _file = params.target.files[0];
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
			this.$parent.$parent.setpercentage("start");
			this.axios.post('http://139.129.221.123/File/File/insert', formData).then(function (response) {
				//_this.uptype = "video";
				_this.$parent.$parent.setpercentage("end",response.data.data.url,"con",response.data.data.cover_img);
				 //console.log(response)
				_this.inImg([response.data.data.url],[response.data.data.fid])
				///_this.closed(1)
			}).catch(function (error) {
				console.log(error);
			});
			 
		},
		seletClassify(name,on){
			this.page2[name] = on;
		},
		backTyped(){
			if(this.form.classify_1){
				
				return this.form.classify_1+'-'+this.form.classify_2+'-'+this.form.classify_3
			}
			return '选择作品类型';
		},
		keydown(){
			if(!this.tags){
				return
			}
			if(this.form.labels.indexOf(this.tags)!=-1){
				Message({message: '该标签已添加'});
				return
			}
			if(this.form.labels.length===5){
				Message({message: '最多填写5个标签'});
				return
			}
			this.form.labels.push(this.tags);
			this.tags = '';
			this.$refs.tageds.clearValue();
		},
		
		deletTage(on){
		
			this.form.labels.splice(on,1);
		},
		seletB1(on){
			this.form.copyright1 = on;
			this.closeTd('isshowT2');
		},
		seletBq(on){
			this.form.copyright = on;
			this.closeTd('isshowT2');
		},
		showupFm(){
			this.isPhto = true;
			this.$refs.upoloadcaver.setImgd(this.form.face_pic);
		},
		close(img,fmid){
			this.isPhto = false;
			if(img){
				this.form.face_pic = img;
			}	
			this.zk_wrokids[0] = fmid;	
		},
		showTd(on){
			this[on] = true;
		},
		closeTd(on){
			window.event? window.event.cancelBubble = true : e.stopPropagation();
			this[on] = false;
		},
		setAutoSave(){
			clearTimeout(this.autoSave.obj);
			this.autoSave.obj = setTimeout(()=>{				
				this.checkAutoSave();
			},30000);
		},
		checkAutoSave(){
			if(!this.form.work_name){
				return
			}
			if(!this.form.content){
				return
			}	
			let dat = this.setSaveData(0);
			let da = JSON.stringify(dat);
			/*内容相同不保存*/			
			if(this.autoSave.saveData==da){
				return
			}
			/*内容不同开始保存*/
			this.autoSave.saveData = da;
			if(this.$route.fullPath!='/upload'){
				/*已离开不再保存*/
				return 
			}
			
			this.saveData(dat,'自动保存成功');
		},
		init(O){
			this.form.content = "";
			//console.log(this.uploaddata)
			if(this.uploaddata){
				this.form.content = this.uploaddata
				this.ifBjType = 1;
				
			}
			
		},
		saved(){
			this.saveData(0,'保存成功');			
		},
		setChekin(type){
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){
				Message({message: '请先填写标题'});
				return
			}
			if(!this.form.content || this.ifBjType==0){
				Message({message: '请先填写内容'});
				return
			}
			
			
			this.chekin = type;
			let regex = /<img.*?src="(.*?)"/;
			
			let src = regex.exec(this.form.content);
			if(!src){
				return
			}
			src = src[1];			
			// if(!this.form.face_pic){
			// 	this.form.face_pic = src;
			// }
			
		},
		ready (editorInstance) {
			this.uD = editorInstance;
		
			editorInstance.addListener('focus',(editor)=>{			
					if(this.ifBjType==0){
						this.form.content = '';
						this.ifBjType=1;				
					}
			});
			editorInstance.addListener('blur',(editor)=>{
				console.log(this.form.content)
				if(this.ifBjType==1 && this.form.content==''){			
					this.form.content = '<p style="color:#999">从这里开始编辑作品类容...</p>';
					this.ifBjType=0;
				}	
			});

		},
		closed(cr){
			this.isshowd=false;
			if(cr){
				return
			}
			if(this.ifBjType==1 && this.form.content==''){			
				this.form.content = '<p style="color:#999">从这里开始编辑作品类容...</p>';
				this.ifBjType=0;
			}
		},
		showUp(on){
			this.upConfig = this.upList[on];
			this.isshowd = true;
			if(this.ifBjType == 0){
				this.ifBjType = 1;
				this.form.content = '';
			}
			
		},
		showUp1(on){
			this.upConfig = this.upList[on];
			if(this.ifBjType == 0){
				this.ifBjType = 1;
				this.form.content = '';
			}
			
		},
		inImg(list,ids){
			/* console.log(list);
			console.log(ids); */
			let str = '';
			if(this.upConfig.type[0]=='image/gif'){
				list.map((el,index,va)=>{
					str+='<p style="max-width:100%;height:auto;"><img zk_workid="'+ids[index]+'" style="max-width:100%;height:auto" src="'+el+'"/></p>';
				});								
				this.uD.execCommand('insertHtml', str);	
				this.uD.execCommand( 'insertparagraph' )
				return
				
			}
			
			if(this.upConfig.type[0]=='video/mp4'){
				list.map((el,index,va)=>{
					str+='<p style="display:none">1</p><p style="box-shadow: 0 5px 10px 0 rgba(0,0,0,0.10);border-radius: 12.55px;overflow: hidden;margin: 40px auto;width: 600px;height: 338px;"><video zk_workid="'+ids[index]+'" style="width: 100%;height:100%" controls="controls" src="'+el+'"></video></p>'
					//str+='<p style="box-shadow: 0 5px 10px 0 rgba(0,0,0,0.10);border-radius: 12.55px;overflow: hidden;margin: 40px auto;height: 338px;"><video zk_workid="'+ids[index]+'" style="width: 100%;height:100%" controls="controls" src="'+el+'"></video></p>';					
				});
				
				this.uD.execCommand('insertHtml', str);
				this.uD.execCommand('insertparagraph')
				console.log(str)
				console.log(this.form.content);
				return
			}
			if(this.upConfig.type[0]=='audio/ogg'){
				list.map((el,index,va)=>{					
					str+='<p style="background: #FFFFFF;box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);border-radius: 5px;margin: 40px auto;height:90px;" ><audio zk_workid="'+ids[index]+'" style="width: 86%;margin: 18px;" id="xx" src="'+el+'" controls="controls"></audio></p>';
				});
			
				this.uD.execCommand('insertHtml', str);
				this.uD.execCommand( 'insertparagraph' )
				return
			}
			
			
		},
		getWorkId(){
					
			let params = {
				access_token:window.userInfo.access_token
			};
			this.api.getWorkId(params).then((da)=>{
				if(!da){
					return
				}
				this.form.work_id = da.work_id;
			});
		},
		getData(id){
			let pr = {
				access_token:window.userInfo.access_token,
				work_id:id,
				is_draft:1
			};
			this.api.getWorkDetail(pr).then((da)=>{
				if(!da){
					return
				}
				this.form = da
				this.csz = da.work_name;
				this.form.labels = JSON.parse(this.form.labels);

				this.selectedOptions = [this.form.classify_1,this.form.classify_2,this.form.classify_3];
				if(this.form.attachment){
					this.upfjData.fid=this.form.attachment_id;
					this.upfjData.type='上传成功';
					this.$refs.upnfile2.value ='';		
					this.form.attachment_id = da.attachment_id;	
					this.upfjData.bf = 100;
					this.upfjData.file_name = this.form.attachment.file_name;
				};
				this.ifBjType=1;
			})

		},
		seeCg(){
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){Message({message: '请先填写标题'});return}
			if(!this.form.content){Message({message: '请先填内容'});return}
			if(!this.form.face_pic){Message({message: '请先上传封面'});return}
			if(!this.form.classify_1){Message({message: '请先选择作品类型'});return}
		
			this.checkAutoSave();
			setTimeout(()=>{
				window.open('#/conts?id='+this.form.work_id)
			
			},1000)			
		},
		savZp(){
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){Message({message: '请先填写标题'});return}
			if(!this.form.content){Message({message: '请先填内容'});return}
			if(!this.form.face_pic){Message({message: '请先上传封面'});return}
			if(!this.form.classify_1){Message({message: '请先选择作品类型'});return}	
			let str = this.form.content;
			var matchReg = /zk_workid=".*?(?=")/gi;
			let arr = str.match(matchReg);
			if(arr){
				for(let i=0,n=arr.length;i<n;i++){
					arr[i] = arr[i].split('"')[1];
				}
				this.zk_wrokids = this.zk_wrokids.concat(arr);
			}	
			let dp = this.setSaveData(1,1);
			dp.link_ids = this.zk_wrokids.join(',');
			this.saveData(dp,'上传成功',()=>{setTimeout(()=>{this.$router.push({path:'/'})},1000)});
		},
		userSave(){
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){Message({message: '请先填写标题'});return}
            if(!this.form.content){Message({message: '请先填内容'});return}
			this.saveData(this.setSaveData(0,0),'草稿保存成功');
				
		},
		setSaveData(type,step){
			let p = localStorage.getItem('userT');
			if(!p){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}	
			let pr = this.form;
			pr.is_publish = type || 0;
			pr.step = step||0;
			pr.access_token = JSON.parse(p).access_token;		
			return pr;
		},
		saveData(data,messg,fn){	
			let pr = JSON.stringify(data);
			pr = JSON.parse(pr);
			
			pr.labels = JSON.stringify(pr.labels);
			this.api.saveWorks(pr).then(()=>{
				Message({message:messg});
				if(fn){
					fn();
				}
				
			});
		},
		checkPage1(){
			this.ck2 = "";
			if(!this.form.work_name){return false}
			if(!this.form.content){return false}
			console.log(222222)
			if(this.ifBjType==0){
				return false;
			}
			this.ck2 = "onck2";
			this.setAutoSave();
			return true
		},
		checkPage2(){
			this.ck3 = "";
			if(!this.form.face_pic){
				return false
			}
			if(!this.form.classify_1){
				return false
			}
			this.ck3 = "onck2";
			return true
		},
		fileUpfj(flie){
			let fld = flie.target.files[0];
			
            if(['application/x-zip-compressed','application/zip'].indexOf(fld.type)==-1){

                Message({message: '格式不正确'});
				return
			}
			if(fld.size>20*1024*1024){
				Message({message: '文件过大'});
				return
			}
		           
				
			let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
			let token = JSON.parse(localStorage.getItem('userT'));
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				app_secret,
				token.open_id,
				times
			];
			
			let formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',token.open_id)
			formData.append('file',fld)
			formData.append('relation_type','work')
			formData.append('timestamp',times)
			let xhr = new XMLHttpRequest();
			this.upfjData = {
				file_name:fld.name,
				bf:0,
				xhr:xhr,
				type:'上传中'
			};
			console.log(this.upfjData)
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
					this.upfjData.bf  = Math.floor(percent); 
				}
			};
			let uploadComplete = (data)=>{
				
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;
					this.upfjData.fid=da.fid;					
					this.zk_wrokids[1] = da.fid;
					this.fjtext= '重新上传';
					this.upfjData.type='上传成功';
					this.$refs.upnfile2.value ='';		
					this.form.attachment_id = da.fid;	
					Message({message: '文件上传成功'});
				}
				
			};
			let uploadFailed = ()=>{
				// delete p;
				p.type="none";
				this.$refs.upnfile2.value ='';
				this.this.upfjData = {};
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				p.type="none";
				this.$refs.upnfile2.value ='';
				this.this.upfjData = {};
				Message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", "http://139.129.221.123/File/File/insert");
			xhr.send(formData);
		},
		qxclosd(obj){
			this.fjtext = '选择附件';
			if(obj.xhr){
				obj.xhr.abort();
				
				return
			}		
			this.form.attachment_id='';
			this.upfjData = {};
		},
		getClassify(){
			let token = localStorage.getItem('userT');
			if(!token){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}
			let pr ={
				access_token:JSON.parse(token).access_token,
			};
			
			this.api.getClassify(pr).then((da)=>{
				if(!da){
					return
				}
				let p = JSON.stringify(da);
				p = p.replace(/classify_name/g,"label");
				p = p.replace(/id/g,"value");
				p = p.replace(/sub_data/g,"children");
				this.page2.classify = JSON.parse(p);
         
			})
		},
    }
}
</script>
<style>

.topNavComBox{
	min-width: 100%;
	height: 80px;
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);	
	margin-bottom: 20px;
}
.topNavComBox1{
	width: 100%;
	margin: 0 auto;
	text-align: left;
	
}
.topNavComBox2{
	display: inline-block;
	font-size: 24px;
	color: #1E1E1E;
	line-height: 80px;
	margin-right: 124px;
}
.topNavComBox1>a{
	display: inline-block;
	position: relative;
	font-size: 16px;
	line-height: 74px;
	
	color: #999999;
	margin-right: 59px;
}
.topNavComBox1>a:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 58px;
	height: 2px;
}
.topNavComBox1>a.onchekd{
	color: #1E1E1E;
}
.topNavComBox1 .nubMax{
	font-weight: 200;
}
.onchekd:after{
	background: #FF5121;
}
.upBoxd>div{
	display: inline-block;
}
.upBoxd1{
	
}
.upBoxd1_1{
	background: #FFFFFF;
	border-radius: 5px;
}
.upBoxd1_2>.edui-default{
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	border: none;
}
/* .edui-default .edui-editor{
	border: none !important;
}
.edui-default .edui-editor-bottomContainer{
	display: none;
} */
.upBoxd1_1{
	width: 1080px;
	height: 80px;
	margin-bottom: 17px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	box-sizing: border-box;
    padding: 24px 30px;
	font-size: 24px;

}
.upBoxd1_1 .myInput{
	border: none;
}
.upBoxd1_1 input{
	font-size: 24px;
}

.upBoxd2{
	position: absolute;
	font-size: 14px;
	color: #1E1E1E;
	z-index: 999;
	top: 0;
	right: 0;
}
.upBoxd2>div{
	text-align: center;
	margin-top: 23px;
	cursor: pointer;
	margin-right: 10px;
}
.upBoxd2>div:hover{
	opacity: .7;
}
.upBoxd2>div>span{
	font-size: 14px;
	color: #1E1E1E;
	margin-right: 20px;
}
.upBoxd1_2{
	width: 130%;
	height: 440px;
}
.edui-default .edui-editor-toolbarboxouter{
	border: none !important;
	background: none !important;
	text-align: left;
	padding-left: 21.2px;
}
.edui-editor-toolbarboxinner>div{
	margin: 20px 0;
}
.upBoxd{
	min-width: 100%;
	height: 100%;
}
.UpBtn1{display: block !important;margin-bottom: 120px;}
.UpBtn1>div{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 138px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	font-size: 16px;
	color: #999;
	cursor: pointer;
	margin-right: 20px;
}
.UpBtn1>div:hover{
	opacity: .7;
}
.UpBtn1>.UpBtn1_2{
	
	border-color:#666;
	background: #666;
	color: #fff;
}
.UpBtn1>div:last-child{
	margin-right: 0;
}
.UpBtn1_2.onck2 {
    background: #FF5121;
    border-color: #FF5121;
}
.page2_1{
	box-sizing: border-box;
	vertical-align: top;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	margin-right: 20px;
	width: 310px;

	padding: 30px;
}
.page2_2{
	width: 960px;
}
.page2_2>div{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	margin-bottom: 20px;
	width: 100%;
}
.page2_2_1{
	height: 177px;
}
.page2_2_2{
	height: 137px;
}
.page2_2_3{
	height: 110px;
}
.page2_1_1{
	font-size: 14px;
	color: #333333;
	text-align: left;
	margin-bottom: 17px;
}
.btRed{
	display: inline-block;
	vertical-align: middle;
	width: 4px;
	height: 4px;
	background: red;
	border-radius: 50%;
	margin-left: 10px;
}
.page2_1_2{
	position: relative;
	background: #E6E6E6;
	border-radius: 5px;
	margin:  0 auto 57px;
	overflow: hidden;
	width: 260px;
	height: 195px;
	cursor: pointer;
}
.page2_1_2:hover{
	opacity: .7;
}
.page2_1_2:hover>img{
	opacity: 0.2;
}
.page2_1_2>img{
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	pointer-events: none;
	background:#E6E6E6 ;
}
.page2_1_2>div{	
	background: #E6E6E6;
	border-radius: 5px;
	width: 100%;
	height: 100%;
	font-size: 14px;
	color: #333333;
}
.page2_1_2>div>div{
	width: 22.9px;
	height: 22.9px;
	border-radius: 50%;
	font-size: 21px;
	text-align: center;
	line-height: 22.9px;
	background: #FF5121;
	color:  #E6E6E6;
	margin: 84px auto 11px;
}
.page2_1_2>input{
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	
}
.page2_1_3{
	text-align: left;
	font-size: 14px;
	color: #333333;
	margin-bottom: 12px;
}
.page2_1_3>span{
	color: #999999;
	margin-left: 30px;
}
.page2Tbnd1{
	display: inline-block;
	box-sizing: border-box;
	border: 1px solid #979797;
	border-radius: 15px;
	width: 90px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	font-size: 14px;
	color: #333333;
	cursor: pointer;
}
.page2_1_4{
	text-align: left;
	position: relative;
	margin-bottom: 27px;
}
.page2_1_4file{
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.page2_1_5{
	text-align: left;
	font-size: 14px;
	color: #333333;
	margin-bottom: 7px;
}
.page2_1_5>span{
	position: relative;
    display: inline-block;
    background: #D8D8D8;
    border-radius: 4px;
    margin: 0 8px 0 20px;
    width: 127px;
    height: 4px;
	overflow: hidden;
}
.page2_1_5>span>span{

	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #FF5121;
	-webkit-transform: translateX(-100%);
	transform: translateX(-100%);
}
.page2_1_6{
	text-align: left;
	position: relative;
	margin-bottom: 27px;
}
.page2_1_6>div{
	position: relative;
	display: inline-block;
	margin-right: 32px;
}
.page2_1_6>div:hover{
	opacity: .7;
}
.page2_1_6>span{
	font-size: 14px;
	color: #333333;
}
.page2_1_6>span>span{
	vertical-align: middle;
	margin-left: 9px;
	color: #999;
}
.page2_1_7>div{
	text-align: left;
	font-size: 14px;
	color: #333333;
}
.page2_1_7>div:first-child{
	margin-bottom: 9px;
}
.page2_1_7_r>label>div{
	display: inline-block;
	position: relative;
	margin-right: 10px;
}



.page2_1_7_r>label>div>div{
	vertical-align: middle;
	box-sizing: border-box;
	border: 1px solid #999999;
	border-radius: 2px;
	width: 8px;
	height: 8px;
}


.page2_1_7_r>label>div>div.chekdOn{
	border-color: rgb(255, 81, 33);
	background: rgb(255, 81, 33);
}
.page2_1_7_r>label{
	cursor: pointer;
}
.page2_1_7_r>label:hover{
	opacity: .7;
}
.page2_1_7_r>label:first-child{
	margin-right: 34px;
}
.page2_2>div{
	box-sizing: border-box;
	padding: 30px;
}
.page2_2_1_1{
	text-align: left;
	font-size: 12px;
	color: #333333;
	margin-bottom: 17px;
}
.page2_2_1_1>span{
	margin-left: 29px;
	color: #999;
}
.page2_2_1_2{
	text-align: left;
	font-size: 14px;
	color: #333333;
}
.page2_2_1_2 .inptud{
	display: inline-block;
	width: 311px;
	margin-right: 10px;
	vertical-align: middle;
	margin-bottom: 0;
	
}
.inptud{
	height: 47px!important;
}
.page2_2_1_2 .myInput{
	box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    
    height: 44px;
    padding: 1px 10px;
}
.page2_2_1_2x>span{
	box-sizing: border-box;
	display: inline-block;
	background: #e6e6e6;
	border-radius: 5px;
	padding: 0 10px;
	height: 27px;
    line-height: 27px;
	font-size: 14px;
	color: #666;
	margin-right: 20px;
}
.page2_2_1_2x>span>span{
	font-size: 12px;
	text-align: center;
	margin-left: 12px;
}
.page2_2_1_2>div{
	margin-bottom: 12px;
}
.page2_2_2{
	text-align: left;
}
.page2_2_2>div{
	display: inline-block;
	font-size: 14px;
	color: #333333;
	vertical-align: middle;
}
.xzInput{
	position: relative;
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	padding: 10px;
	cursor: pointer;
}

.xzInput:after{
    content: "";
    position: absolute;
    top: 15px;
    right: 16px;
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    border-color: #999 transparent transparent transparent;
    border-radius: 4px;
}
.xzInput>div{
	position: absolute;
	bottom: 0;
	left: 0;
	background: #FFFFFF;
	box-shadow: 0 3px 6px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	-webkit-transform: translateY(117%);
	transform: translateY(101%);
	overflow: hidden;
	width: 100%;
}
.xzInput2>div{
	
	width: 50%;
}
.xzInput2>div:nth-child(2){
	transform: translate(100%,101%);
}
.xzInput2>div:nth-child(3){
	transform: translate(200%,101%);
}
.xzInput3>div>div{
	width: 100%;
	height: 30px;
	font-size: 14px;
	line-height: 30px;
	text-align: left;
	font-size: 14px;
	color: #333333;
	text-indent: 20px;
}
.xzInput2>div>div{
	width: 100%;
	height: 30px;
	font-size: 14px;
	line-height: 30px;
	text-align: left;
	font-size: 14px;
	color: #333333;
	text-indent: 20px;
}
/* .xzInput>div>div{
	text-indent: 20px;
	overflow: hidden;
} */
.sertcheck{
	color: #666666;
	background: #999999;
	opacity: .3;
}

.page2_2_2_1{
	width: 150px;
	margin-right: 221px;
}
.page2_2_2_1_1,.page2_2_2_2_1{
	margin-bottom: 17px;
}
.page2_2_2_2{
	width: 357px;
}
.page2_2_3_1{
	text-align: left;
	font-size: 14px;
	color: #333333;
	margin-bottom: 13px;
}
.page2_2_3_1>span:last-child{
	font-size: 12px;
	color: #999999;
	margin-left: 30px;
	
}

.page2_2_3 .page2_1_7_r{
	text-align: left;
	font-size: 14px;
	color: #333333;
}
.page2_1_7_r .chekdOn>div{
	background: #FF5121;
	border-color: #FF5121;
}
.el-select{width: 100%}
.upBoxd1_2 iframe{
	padding: 0 22px;
	box-sizing: border-box;
}
.el-cascader .el-input.is-focus .el-input__inner{
	border-color: #FF5121 !important;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
	border-color: #FF5121 !important;
}
.edui-default .edui-editor-toolbarbox{
	position: relative !important; 
	background: #fff;
}
.page2_2_2_2_2 .el-input.is-active .el-input__inner, .el-input__inner:focus{
	border-color: #C0C4CC !important;
}
</style>
