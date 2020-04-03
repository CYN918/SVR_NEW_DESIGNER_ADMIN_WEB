<template>
    <div class="box">
        <div class="box-top">
            <div class="box-total">共{{dataList.length}}条数据</div>
            <div class="box-sx">
                <el-select v-model="status" @change="changeSx()">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <ul class="box-content">
            <li v-for="todo in dataList">
                <div class="preview_pic" v-if="business_type != '5'">
                    <img :src="todo.preview_pic" alt="" @click="getimgulr(todo.preview_pic)"/>
                </div>
                <div class="preview_pic" v-else>
                    <video :src="todo.file_url" controls="controls" @click="getvideoulr(todo.file_url)"></video>
                </div>
                <div class="preview_pic_message">
                    <div class="detailed-information">
                        <p v-if="todo.online_disk_url == ''">{{todo.file_name}}</p>
                        <p v-else>{{todo.online_disk_url}}</p>
                        <p>{{todo.created_at}}</p>
                        <div class="flie-mesa">
                            <div class="download-file" v-if="todo.online_disk_url == ''" @click="download(todo)"><img :src="imgSig + 'toltImg/icon_download.svg'"/>下载({{todo.file_size}})</div>
                            <div class="download-file" v-else>提取码:<b style="color:#33B3FF;margin-left:5px;">{{todo.access_code}}</b></div>
                            <div class="t" v-if="todo.check_status == '-2'" style="background:#ffe7e5;color:rgba(255,59,48,1);">已撤销</div>
                            <div class="t" v-if="todo.check_status == '-1'" style="background:#ffe7e5;color:rgba(255,59,48,1);">已驳回</div>
                            <div class="t" v-if="todo.check_status == '0'" style="background:#fff4e5;color:rgba(255,146,0,1);">待审核</div>
                            <div class="t" v-if="todo.check_status == '1'" style="background:#efffe5;color:rgba(77,198,0,1);">已验收</div>
                        </div>
                    </div>
                    <div class="instructions" v-if="todo.remark == ''">暂无说明</div>
                    <div class="instructions" v-else style="color:#333333;">{{todo.remark}}</div>
                </div>
            </li>
        </ul>
        <div v-if="dataList.length == '0'">
            <img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_nodata.svg" alt="">
        </div>
        <div class="maskimg screenContent" v-if="isimgurl" @click="getimgulr">
			<img :src="imgurl" alt="暂无图片" style="max-height:500px;">
		</div>
        <div class="maskimg screenContent" v-if="isvideourl" @click="getvideoulr">
			<video :src="videourl" controls="controls" style="max-height:500px;"></video>
		</div>
    </div>
    
</template>
<script>
export default {
    props:['dataList'],
    data(){
        return{
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '-2',
                label: '已撤销'
            }, {
                value: '-1',
                label: '已驳回'
            }, {
                value: '0',
                label: '待审核'
            }, {
                value: '1',
                label: '已验收'
            }],
            status: '',
            imgurl:"",
            isimgurl:false,
            videourl:"",
            isvideourl:false,
            business_type:this.$route.query.business_type,
        }
    },
    created(){
        
    },
    methods:{
        download(row){
            if(row.download_file_url == ''){
                window.open(row.file_url);
            }else{
                window.open(row.download_file_url);
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
        }
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

</style>