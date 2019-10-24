<template>
	<tanC :title="'报名项目'">
		<template v-slot:todo="{ todo }">
			<div class="xm_shar_01">
				<div class="xm_shar_01_1">
					<div class="xm_shar_01_2" id="qrcode"></div>
					分享到微信
				</div>
				<div class="xm_shar_01_3">
					
					<a @click="tzld(fxUrl1,'新浪')">
						<img src="/imge/svg/new/wb.svg" alt="">
						新浪
					</a>
					<a @click="tzld(fxUrl2,'QQ')">
						<img src="/imge/svg/new/qq.svg" alt="">
						QQ
					</a>
					<a @click="tzld(fxUrl3,'QQ空间')">
						<img src="/imge/svg/new/kj.svg" alt="">
						QQ空间
					</a>
				</div>
				
				<div class="xm_shar_01_4">
					<input v-model="onUrl" type="text" ref="copd"/>
					<span @click="copy" class="btns xm_shar_01_4b pend">{{hdwz}}</span>
				</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
import QRCode from 'qrcodejs2'
export default {
	components:{tanC,QRCode},
	props:{
		datad:Object
	},
	data(){
		return{
			config:{
				value: '',
				logo:''
			},
			fxUrl1:'',
			fxUrl2:'',
			fxUrl3:'',
			onUrl:'',
			hdwz:'复制'
		}
	},
	mounted: function(){
		this.initShaer();
	},
	methods: {	
		qrcode(u) {
		    let qrcode = new QRCode('qrcode', {
		        width: 96,  
		        height: 96,
		        text: u, // 二维码地址
		        colorDark : "#000",
		        colorLight : "#fff",
		    })
	    },
		initShaer(){
			this.onUrl = window.location.href;
			let ulrd = encodeURIComponent(window.location.href);
			let da = {
				title:this.datad.name,
				ulrd:ulrd,
				pics:this.datad.banner,
				desc:'惊现大神快来膜拜',
				summary:this.datad.name+'-狮圈儿创作者平台',
			}
			this.qrcode(ulrd);
			this.config.value = ulrd;
			this.fxUrl1 = 'http://service.weibo.com/share/share.php?appKey=3473072390&title='+da.title+'&url='+ulrd+'&pic='+da.pics+'#_loginLayer_'+(new Date()).valueOf();
			this.fxUrl2 ='https://connect.qq.com/widget/shareqq/index.html?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&desc=&summary='+da.summary+'&site=wo';			
			this.fxUrl3 = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&summary='+da.summary+'&desc=&site=xx';
		},
		tzld(ur,a){
		
			
			window.open(ur);
		},
		copy(){
			this.$refs.copd.select();
			document.execCommand("copy");
			this.$message({message:'复制成功'});
			this.hdwz = '复制成功';
		},
		
		pr_cancelSignup(){
		
			this.api.pr_cancelSignup({
				project_id:this.$parent.deta.id,
			}).then((da)=>{
				if(da=='error'){return}
				this.$parent.setBm(0);
				this.$parent.close();
			}).catch(()=>{
				
			});
		},
		close(){
			this.$parent.close();
		},
	}
}		
	
</script>

<style>
.xm_shar_01{
	width: 560px;
	padding: 30px 0;
}
.xm_shar_01_1{
	display: block;
    margin: 0 auto 30px;
    width: 96px;
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.xm_shar_01_2{
	display: block;
    margin: 0 auto 7px;
    width: 96px;
    height: 96px;
}
.xm_shar_01_3{
	margin-bottom: 30px;
}
.xm_shar_01_3>a{
	cursor: pointer;
	display: inline-block;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 120px;
}
.xm_shar_01_3>a>img{
	display: block;
	margin:0 auto 8px;
	width: 40px;
	height: 40px;
}
.xm_shar_01_4>input{
	display: inline-block;
	border: 1px solid #BBBBBB;
	padding: 0 10px;
	width:217px;
	height:38px;
	border-radius:5px;
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:38px;
}
.xm_shar_01_4>input:focus{
	border-color: #282828;
}
.xm_shar_01_4b{
	width: 100px;
}
</style>
