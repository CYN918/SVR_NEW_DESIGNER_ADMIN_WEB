<template>
    <div class="box">
        <div class="box-top">
            <div class="box-total">共1条数据</div>
        </div>
        <ul class="box-content">
			<li class="xnsdf_01" v-if="business_type != '5'">
				<div class="preview_picX" >
					<lbt v-model="dataList.preview_pic"></lbt>
				</div>
				<div class="preview_picX2">
					<p class="preview_picX2_1">{{dataList.online_disk_url?dataList.online_disk_url:dataList.file_name}}</p>
					<p class="preview_picX2_2">{{dataList.created_at}}</p>
					<p class="preview_picX2_3">
						<div v-if="dataList.online_disk_url">
							提取码:<b style="color:#33B3FF;margin-left:5px;">{{dataList.access_code}}</b>
						</div>
						<div v-else-if="business_type == '5'" @click="download(dataList)">
							<div v-if="check_steps == '0' && fileType != 'zip'">
							    <img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{dataList.download_file_size}})
							</div>
							<div v-if="check_steps == '1' && fileType == 'zip'">
							    <img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{dataList.download_file_size}})
							</div>
							<div v-if="check_steps == '2'">
							    <img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{dataList.download_file_size}})
							</div>
							<div v-if="check_steps == '1' && fileType != 'zip'">
							    正在打包，请稍后下载
							</div>
						</div>
				
						<div class="download-file" v-else @click="download(dataList)">
						    <img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{dataList.file_size}})
						</div>
					</p>
					
				</div>
				<div :class="['preview_picX3',maps[this.check_status].cls]">
					{{check_statusfl}}
				</div>
				
				
				<div class="preview_picX4">
					{{dataList.remark?dataList.remark:"暂无说明"}}					
				</div>				
			</li>
			
			
			
            <li v-else>

                <div class="preview_pic" >
                    <video id="video" @click="getvideoulr(dataList.file_url)" controls="controls">
                        <source :src="dataList.file_url" type="video/ogg">
                        <source :src="dataList.file_url" type="video/mp4">
                    </video>
                </div>
                <div class="preview_pic_message">
                    <div class="detailed-information">
                        <p v-if="dataList.online_disk_url == ''">{{dataList.file_name}}</p>
                        <p v-else>{{dataList.online_disk_url}}</p>
                        <p>{{dataList.created_at}}</p>
                        <div class="flie-mesa">
                            <div class="download-file" v-if="dataList.online_disk_url == '' && business_type == '5'" @click="download(dataList)">
                                <div v-if="check_steps == '0' && fileType != 'zip'">
                                    <img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{dataList.download_file_size}})
                                </div>
                                <div v-if="check_steps == '1' && fileType == 'zip'">
                                    <img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{dataList.download_file_size}})
                                </div>
                                <div v-if="check_steps == '2'">
                                    <img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{dataList.download_file_size}})
                                </div>
                                <div v-if="check_steps == '1' && fileType != 'zip'">
                                    正在打包，请稍后下载
                                </div>
                            </div>
                            <div class="download-file" v-else-if="dataList.online_disk_url == '' && business_type != '5'" @click="download(dataList)">
                                <img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{dataList.file_size}})
                            </div>
                            <div class="download-file" v-else>提取码:<b style="color:#33B3FF;margin-left:5px;">{{dataList.access_code}}</b></div>
                            <div class="t" v-if="check_status == '-2'" style="background:#ffe7e5;color:rgba(255,59,48,1);">已撤销</div>
                            <div class="t" v-if="check_status == '-1'" style="background:#ffe7e5;color:rgba(255,59,48,1);">已驳回</div>
                            <div class="t" v-if="check_status == '0'" style="background:#fff4e5;color:rgba(255,146,0,1);">待审核</div>
                            <div class="t" v-if="check_status == '1'" style="background:#efffe5;color:rgba(77,198,0,1);">已验收</div>
                        </div>
                    </div>
                    <div class="instructions" v-if="dataList.remark == ''">暂无说明</div>
                    <div class="instructions" v-else style="color:#333333;">{{dataList.remark}}</div>
                </div>
            </li>
        </ul>
        <div v-if="dataList.length == '0'">
            <img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_nodata.svg"/>
        </div>
        <div class="maskimg screenContent" v-if="isimgurl">
            <div class="delete-window" @click="getimgulr">x</div>
			<img :src="imgurl" alt="暂无图片" style="max-height:500px;">
		</div>
        <div class="maskimg screenContent" v-if="isvideourl"> 
            <div class="delete-window" @click="getvideoulr">x</div>
			<video id="playVideo" style="width: 414px;height:736px;" controls="controls">
                <source :src="videourl" type="video/ogg">
                <source :src="videourl" type="video/mp4">
            </video>
        </div>
    </div>
    
</template>
<script>
import lbt from './lbt'
export default {
	components:{lbt},
    props:['dataList','check_status','check_steps'],
    data(){
        return{
            status: '',
            imgurl:"",
            isimgurl:false,
            videourl:"",
            isvideourl:false,
            business_type:this.$route.query.business_type,
            isShow:true,
            fileType:'',
            openurls:[],
			maps:{
				'-2':{n:'已撤销',cls:'cl_1x1'},
				'-1':{n:'已驳回',cls:'cl_1x1'},
				'0':{n:'待审核',cls:'cl_1x2'},
				'1':{n:'已验收',cls:'cl_1x3'}
			}
        }
    },
	computed:{
		check_statusfl:function(){
			return this.maps[this.check_status].n;
		},
	},
    created(){
        this.init();
    },
    methods:{
        init(){
            var inptext = this.dataList.download_file_url;
            var last = inptext.lastIndexOf(".");           
            var source=inptext.length;
            var sheng = Number(source)-last - 1;
            this.fileType = inptext.slice(-sheng);
        },
        download(row){
            if(this.business_type == '5'){
                this.openurls.push({name:row.file_name,id:row.download_file_url});
                var inptext = row.download_file_url;
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
                    fetch(row.download_file_url).then(res => res.blob()).then(blob => {
                        const a = document.createElement('a');
                        document.body.appendChild(a)
                        a.style.display = 'none'
                        // 使用获取到的blob对象创建的url
                        const url = window.URL.createObjectURL(blob);
                        a.href = url;
                        // 指定下载的文件名
                        a.download = row.file_name;
                        a.click();
                        document.body.removeChild(a)
                        // 移除blob对象的url
                        window.URL.revokeObjectURL(url);
                    });
                }
            }else{
                fetch(row.file_url).then(res => res.blob()).then(blob => {
                    const a = document.createElement('a');
                    document.body.appendChild(a)
                    a.style.display = 'none'
                    // 使用获取到的blob对象创建的url
                    const url = window.URL.createObjectURL(blob);
                    a.href = url;
                    // 指定下载的文件名
                    a.download = row.file_name;
                    a.click();
                    document.body.removeChild(a)
                    // 移除blob对象的url
                    window.URL.revokeObjectURL(url);
                });
            }
            
        },
        getimgulr(url){
            this.imgurl = url;
            this.isimgurl = !this.isimgurl; 
        },
        getvideoulr(url){
            this.videourl = url;
            this.isvideourl = !this.isvideourl;
        },
        changeSx(){
            this.$parent.fileRecord(this.status)
        },
        // playOn(){
        //     document.getElementById('video').play();
        //     this.isShow = false;
        //     // document.getElementById('video').addEventListener("ended",function(){
        //     //     this.isShow = true;
        //     // });
        // },
        playVideo(){
            document.getElementById('playVideo').play();
            this.isShow = false;
            // document.getElementById('playVideo').addEventListener("ended",function(){
            //     this.isShow = true;
            // });
        },
        // selectStyle(){
        //     // this.playOn();
        //     setTimeout(function(){
        //         document.getElementById('video').pause();
        //         this.isShow = true;
        //     },3000);
        // },
        // outStyle(){
        //     document.getElementById('video').pause();
        //     this.isShow = true;
        // }
    },
    mounted(){

    },
    watch:{

    }
    
}
</script>
<style scoped>
    .box{
        max-height: 870px;
    }
    .box-top{
        margin-top: 20px;
        height: 40px;
    }
    .box-total{
        float: left;
        margin-left: 30px;
        color: #666666;
        font-size: 14px;
        line-height: 40px;
    }
    .box-sx{
        float: right;
        margin-right: 30px;
    }
    .box-content{
        margin: 5px 15px 0px 15px;
    }
    .box-content > li{
        width: 571px;
        height: 318px;
        border: 1px solid #BBBBBB;
        border-radius: 5px;
        display: inline-block;
        margin: 15px 10px 15px 15px;
    }
    .box-content > li .preview_pic{
        width: 162px;
        height: 288px;
        float: left;
        margin: 16px;
        cursor: pointer;
        position: relative;
    }
    .box-content > li .preview_pic img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
    .box-content > li .preview_pic video{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
    .video-img{
        position: absolute;
        width: 44px;
        height: 44px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 50%;
    }
    .video-img-expand{
        position: absolute;
        width: 200px;
        height: 200px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 50%;
    }
    .box-content > li .preview_pic_message{
        float: left;
        width: 366px;
        margin-top: 16px;
    }
    .box-content > li .preview_pic_message .detailed-information{
        height: 110px;
        border-bottom: 1px solid #F4F6F9;
    }
    .box-content > li .preview_pic_message .detailed-information > p:nth-child(1){
        width: 366px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        color: #333333;
        font-size: 14px;
        text-align: left;
    }
    .box-content > li .preview_pic_message .detailed-information > p:nth-child(2){
        width: 366px;
        height: 18px;
        line-height: 18px;
        overflow: hidden;
        color: #BBBBBB;
        font-size: 12px;
        text-align: left;
        margin-top: 8px;
    }
    .box-content > li .preview_pic_message .instructions{
        color: #BBBBBB;
        font-size: 14px;
        text-align: left;
        padding-top: 12px;
    }
    .flie-mesa{
        width: 366px;
        height: 40px;
        margin-top: 15px;
        line-height: 40px;
    }
    .download-file{
        width: 150px;
        float: left;
        color: #33B3FF;
        font-size: 14px;
        cursor: pointer;
    }
    .download-file > img{
        margin-right: 3px;
        position: relative;
        top: 3px;
    }
    .t{
        width: 80px;
        height: 32px;
        border: 1px solid #F4F6F9;
        border-radius: 25px;
        line-height: 32px;
        text-align: center;
        float: right;
    }
    .delete-window{
        position: absolute;
        top: 10%;
        right: 10%;
        width: 48px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        background: rgba(40,40,40,1);
        color: #BBBBBB;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
    }
    .screenContent{
        background: #000000;
    }
    #playVideo{
        position: relative;
    }


.preview_picX{
	display: inline-block;
	vertical-align: top;
	width:112px;
	height:84px;
	border-radius:5px;
}

.box-content > li.xnsdf_01 {
	position: relative;
	padding: 16px;
    width:540px;
    height:153px;
    background:rgba(255,255,255,1);
    border-radius:5px;
    border:1px solid rgba(187,187,187,1);
}
.preview_picX2{
	display: inline-block;
	vertical-align: top;
	margin-left: 24px;
}
.preview_picX2_1{
	margin-bottom: 8px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.preview_picX2_2{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 16px;
}
.preview_picX2_3{
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,179,255,1);
	line-height:20px;
}
.preview_picX3{
	position: absolute;
	top: 70px;
	right: 24px;
	width:80px;
	height:32px;
	text-align: center;
	font-size:14px;
	line-height:32px;
	border-radius:16px;
}
.cl_1x1{
	background:rgba(255,81,33,.1);
	color: rgba(255,81,33,1);
}
.cl_1x2{
	background:rgba(255, 146, 0, .1);
	color: rgba(255, 146, 0, 1);
}
.cl_1x3{
	background:rgba(77, 198, 0, .1);
	color: rgba(77, 198, 0, 1);
}
.preview_picX4{
	margin-top: 16px;
	border-top: 1px solid rgba(244, 246, 249, 1);
	padding:12px 0;
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:20px;
	width: 100%;
}
</style>