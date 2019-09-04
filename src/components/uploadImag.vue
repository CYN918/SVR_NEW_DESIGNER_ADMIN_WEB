<template>
	<div class="uploadBoxd">
		<div class="uploadBoxd1" ></div>
		<div class="uploadBoxd2">
			<img class="uploadBoxd2_1" @click="closed" src="/imge/cj_00.png"/>
			<div class="uploadBoxd2_2">
				<div class="uploadBoxd2_2_1">
					<div>{{configData.title}}</div>
					<div>{{configData.title2}}
						<span v-if="configData.tip" class="uploadBoxd2_2_3">
							<div><div v-for="(el,index) in configData.tip" :key="index">{{el}}</div></div>
						</span>					
					</div>
				</div>
				<div class="uploadBoxd2_2_2">{{configData.btn}}<input @change="fileUp" class="uploadBoxd2_2_2_1" ref="upnfile" :accept="typexz"  multiple="multiple" type="file" /></div>				
			</div>
			<ul class="uploadBoxd2_3" ref="imgd">
				<li v-for="(el,index) in list" :key="index" v-if="el.type!='none'">
					<div v-if="el.type=='up'">
						<div class="loadingsd">
							<div class="circleProgress_wrapper">
							    <div class="wrapper right">
							        <div class="circleProgress rightcircle" :style="{transform:'rotate('+backLift(el.bf)+'deg)'}"></div>
							    </div>
							    <div class="wrapper left">
							        <div class="circleProgress leftcircle" :style="{transform:'rotate('+backRigh(el.bf)+'deg)'}"></div>
							    </div>								
							</div>
							<div class="loadingsdsd">{{el.bf+'%'}}</div>
							<div class="qxclos" @click="qxclosd(el)">取消上传</div>
						</div>
						<div><span>{{el.file_name.split('.')[0]}}</span><span>{{el.s}}</span></div>
					</div>
					<div v-else class="zzched" @click="onxz(el)">
						<div class="imgxzd"><img :src="configData.type[0]=='audio/ogg'?'/imge/m.jpg':configData.type[0]=='video/mp4'?el.cover_img:el.url"/></div>
						<div><span>{{el.file_name}}</span><span>{{el.file_size_format}}</span></div>
						<div :class="['zzched_1',checkin.indexOf(el.fid)!=-1?'zzched2':'']"></div>
					</div>					
				</li>				
			</ul>
			<div class="uploadBoxd2_4">
				<div class="uploadBoxd2_4_1">已选{{this.checkin.length}}项，最多可选50项</div>
				<div @click="closed">取消</div>
				<div @click="deleteFile">删除</div>
				<div class="uploadBoxd2_4_2" @click="InImg">插入</div>
			</div>
		</div>	
	</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
	props:{
		configData:Object,
	},
    data() {
      	return {
      	    bf:0,
        	dialogImageUrl: '',
        	dialogVisible: false,
        	list:[],
			loadList:[],
			leftRo:225,
			rightRo:225,
			checkin:[],
			deletObj:[],
			checIurl:[],
			deldetType:0,
			typexz:'',
      	};
    },
	mounted: function () {	
		this.getList();
	}, 	
    methods: {
		InImg(){
			this.$parent.inImg(this.checIurl,this.checkin);
			this.closed(1);
		},
		deleteFile(){	
			if(this.deldetType==1){
				Message({message: '正在删除'});
				return
			}
			if(this.checkin.length==0){return}
			let token = JSON.parse(localStorage.getItem('userT'));
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				//token.open_id,
				times
			];
			let formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			//formData.append('user',token.open_id)
			formData.append('fid',this.checkin)
			formData.append('timestamp',times)
			this.deldetType=1;
			this.axios.post('http://139.129.221.123/File/File/delete', formData)
			.then((response)=>{
				this.deldetType=0;
				if(response.data.result==0){
					Message({message: '删除成功'});
                   // this.closed();
					for(let i=0,n=this.deletObj.length;i<n;i++){
						this.deletObj[i].type='none';						
					}
				}else{
					Message({message: '删除失败'});	
				}
				
			})
			.catch(function (error) {	
				this.deldetType=0;
				Message({message: '删除失败'});	
			});
		},
		closed(on){
		
			this.$parent.closed(on);
		},
		onxz(obj){
			let lend = this.checkin.indexOf(obj.fid);
			if(lend==-1){
				this.checkin.push(obj.fid);
				this.checIurl.push(obj.url);
				this.deletObj.push(obj)
				return
			}
			this.deletObj.splice(lend,1);
			this.checIurl.splice(lend,1);
			this.checkin.splice(lend,1);
		},
		getList(){
			if(this.configData){
				for(let i=0,n=this.configData.length;i<n;i++){
					this.typexz+=','+this.configData.type;
				}
				this.typexz = this.typexz.substring(1);
			}
			
			
			let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
			//let token = JSON.parse(localStorage.getItem('userT'));
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				app_secret,
				//token.open_id,
				times
			];
			let params = {
				app_id:1001,
				sign:this.MD5(encodeURIComponent(arr.sort())),
				//user:token.open_id,
				timestamp:times,
				file_type:this.configData.getType,
			}
			/* this.api.getFList(params).then((da)=>{
				if(!da){
					return
				}
				this.list =da.data;
			}) */
		},
		backRigh(on){
			if(on<=50){
				return 225;
			}
			if(on>100){
				return 405;
			}
			return 45+on*3.6;
		},
		backLift(on){
			if(on>50){
				return 405;
			}
			if(on<0){
				return 225;
			}
			return 225+on*3.6;
		},
		qxUpload(on){
			this.loadList[on].show='';
		},
		qxclosd(obj){
			obj.xhr.abort();
		},
		clPic(fld,on){
			if(this.configData.type.indexOf(fld.type)==-1){
				Message({message: '第'+on+1+'个文件格式不正确'});
				return
			}
			if(fld.size>this.configData.max){
				Message({message: '第'+on+1+'个文件过大'});
				return
			}
			
			let fileSize = this.backSize(fld.size);
			let app_secret = '1Q61s1iP8I376GyMTdsjOzd4hcLpZ4SG';
			let open_id = 7;
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1003,
				app_secret,
				times,
				open_id
			];
			
			let formData = new FormData();
			formData.append("file", fld);
			formData.append('app_id', 1003);
			formData.append('sign', this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user', open_id)
			formData.append('relation_type', 'activity')
			formData.append('timestamp', times)
			let xhr = new XMLHttpRequest();
			this.list.unshift({type:'up',file_name:fld.name,s:fileSize,bf:0,xhr:xhr,show:1});
			let p = this.list[0];
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
			        percent = percent>98?98:percent;
					p.bf  = Math.floor(percent);
				}
			};
			let uploadComplete = (data)=>{
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;
					p.type="img";
					p.url = da.url;
					p.file_name = da.file_name;
					p.s = this.backSize(da.file_size);	
					p.fid=da.fid;
					if(da.cover_img){
						this.$set(p,'cover_img',da.cover_img);
					}
					this.$refs.upnfile.value ='';			
					Message({message: '文件上传成功'});
				}
				
			};
			let uploadFailed = ()=>{
				// delete p;
				p.type="none";
				this.$refs.upnfile.value ='';
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				p.type="none";
				this.$refs.upnfile.value ='';
				Message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", 'http://139.129.221.123/File/File/insert');
			xhr.send(formData);
		},
		backSize(fld){
			let fileSize = 0;
			if(fld > 1024 * 1024){
			 	fileSize = (Math.round(fld * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			}else{
				fileSize = (Math.round(fld * 100 / 1024) / 100).toString() + 'KB';
			} 
			return fileSize;
		},	
      	fileUp(flie){
			for(let i=0,n=flie.target.files.length;i<n;i++){
				this.clPic(flie.target.files[i],i);
			}
      		
      	},
    }
}
</script>

<style>
.uploadBoxd{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
}
.uploadBoxd1{
	background: rgba(0,0,0,.3);
	width: 100%;
	height: 100%;
}
.uploadBoxd2{
	width: 818px;
	height: 560px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
}
.uploadBoxd2_1{
	position: absolute;
	top: -45px;
	right: -45px;
	width: 44px;
	height: 44px;
	cursor: pointer;
	
}
.uploadBoxd2_2_3{
	position: relative;
	cursor: pointer;
}

.uploadBoxd2_2_3:hover:before{
	display: block;
}
.uploadBoxd2_2_3:hover>div{
	display: block;
	z-index: 9;
}
.uploadBoxd2_2_3:before{
	display: none;
	content: "";
    position: absolute;
    top: 19px;
    left: 25%;
    width: 10px;
    height: 10px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    transform: rotate(45deg);
    z-index: 9;
    background: #fff;
}
.uploadBoxd2_2_3>div{
	display: none;
	position: absolute;
	left: 50%;
	bottom: 0;
    transform: translate(-50%,115%);
	padding: 20px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px 1px 1px 1px 5px 5px 5px;
}

.uploadBoxd2_2_3>div>div{
	white-space: nowrap;
}
    
.uploadBoxd2_1:hover{
	opacity: .7;
}
.uploadBoxd2_2{
	display: flex;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
}
.uploadBoxd2_2_1{
	flex: 1;
	text-align: left;
	margin: 27px 0 0 30px;
}
.uploadBoxd2_2_1>div{
	font-size: 14px;
	color: #999999;
}
.uploadBoxd2_2_1>div:nth-child(1){
	font-size: 14px;
	color: #333333;
	margin-bottom: 3px;
}
.uploadBoxd2_2_2{
	position: relative;
	width: 120px;
	height: 40px;
	background: #FF5121;
	border-radius: 5px;
	font-size: 14px;
	color: #FFFFFF;
	text-align: center;
	line-height: 40px;
	margin: 28px 30px 18px 0;
	cursor: pointer;
	
}
.uploadBoxd2_2_2_1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.uploadBoxd2_2_2:hover{
	opacity: .7;
}
.uploadBoxd2_2{
	margin-bottom: 20px;
}
.uploadBoxd2_3{
    margin: 9px 0px 9px 25px;
    height: 377px;
    text-align: left;
    overflow: hidden;
    overflow-y: auto;

}
.uploadBoxd2_3::-webkit-scrollbar {
    width: 6px;     
    height: 1px;
}
.uploadBoxd2_3::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
}
.uploadBoxd2_3::-webkit-scrollbar-track {
    background: none;
}
.uploadBoxd2_3>li{
    display: inline-block;
    width: 236px;
    margin: 0 10px 17px;
    vertical-align: top;
}


.uploadBoxd2_3>li>div>div{
	text-align: left;
	font-size: 14px;
	color: #666666;
}
.uploadBoxd2_3>li>div>div>span{
	display: inline-block;
	line-height: 20px;
	
}
.uploadBoxd2_3>li>div>div>span:first-child{
	width: 71%;
    height: 20px;
    overflow: hidden;
}
.uploadBoxd2_3>li>div>div>span:last-child{
	float: right;
}
.uploadBoxd2_4{
	position: relative;
	background: #FFFFFF;
	border-top: 1px solid rgba(0,0,0,0.03);
	width: 818px;
	height: 88px;
	border-radius: 0 0 5px 5px;
	text-align:center;
}
.uploadBoxd2_4>div{
	display: inline-block;
	
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 100px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	color: #333333;
	margin-top: 20px;
	margin-right: 20px;
	cursor: pointer;
}
.uploadBoxd2_4>div:last-child{
	margin-right: 0;
}
.uploadBoxd2_4>.uploadBoxd2_4_1{
	position: absolute;
	top: 12px;
	left: 28px;
	font-size: 12px;
	border: none;
	width: auto;
}
.uploadBoxd2_4>div:hover{
	opacity: .7;
}
.uploadBoxd2_4>.uploadBoxd2_4_1:hover{
	opacity: 1;
}
.uploadBoxd2_4>.uploadBoxd2_4_2{
	background: #333;
	border-color: #333;
	color: #fff ;
}
.loadingsd{
	position: relative;
	width: 100%;
	height: 135px;
	margin-bottom: 6px;
	-webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0,0.2);
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0,0.2)
}
.qxclos{
	cursor: pointer;
    font-size: 14px;
    color: #FF5121;
    position: absolute;
    bottom: 15px;
    text-align: center;
    width: 100%;
}
.qxclos:hover{
	opacity: .7;
}
.loadingsdsd{
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
	font-size: 14px;
	color: #666666;
}


.circleProgress_wrapper{
   	width: 60px;
    height: 60px;
    margin: 0 auto;
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	border-radius: 50%;
}
.wrapper{
    width: 50%;
    height: 100%;
    position: absolute;
    top:0;
    overflow: hidden;
}
.right{
    right:0;
}
.left{
    left:0;
}
.circleProgress{
    width: 54px;
    height:54px;
    border:3px solid #E6E6E6;
    border-radius: 50%;
    position: absolute;
    top:0;
    -webkit-transform: rotate(225deg);
	transform: rotate(225deg);
}
.rightcircle{
    border-top:3px solid #FF5121;
    border-right:3px solid #FF5121;
    right:0;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
}
.leftcircle{
    border-bottom:3px solid #FF5121;
    border-left:3px solid #FF5121;
    left:0;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
} 
.zzched{
	position: relative;
	cursor: pointer;
	width: 239px;
	height: 135px;
	
}
.zzched:hover:after{
	background: rgba(225,225,225,.3);
}
.zzched:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height:135px;
	
}
.zzched_1{
	position: absolute;
	top: 10px;
	right: 10px;
	width: 10px;
	height:10px;
	border: 1px solid #979797;
	border-radius: 2px;
}
.zzched2{
	border-color: #FF5121;
	background: #FF5121;
}
.imgxzd{
	position: relative;
	width: 100%;
	height: 135px;
	overflow: hidden;
}
.imgxzd>img{
	position: relative;
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
</style>