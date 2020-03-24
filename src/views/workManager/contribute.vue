<template>
    <div class="box" v-loading="loading" style="background: #ffff;">
        <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
            <ul class="boxllist">
                <li v-for="(item,index) in tableDatas" :key="index">
                    <div class="boxContent" @mouseover="hover(item.face_pic)">
                        <el-checkbox class="box-checkbox" @click.stop.native></el-checkbox>
                        <img class="Img" :src="item.face_pic" alt="">
                    </div>
                    <div class="box-bt">
                        <div class="work_name">
                            <span class="boxtover">{{item.work_name}}</span>
                            <span class="boxfright"><img src="../../assets/img/zs_icon_tj.svg" width="14px" height="14px"></span>
                        </div>
                        <div class="classify">
                            <div class="classift-type">
                                <div class="classift-type-t">{{item.classify}}</div>
                                <div></div>
                            </div>
                            <div class="pj">A</div>
                        </div>
                        <div class="user-message">
                            <div class="user-message-toux"><img :src="item.avatar" alt=""/><span>{{item.username}}</span></div>
                            <div class="user-message-time">3天前</div>
                        </div>        
                    </div>
                </li>
            </ul>
        </el-checkbox-group>
    </div>
    
</template>
<script>
export default {
    props:['tableDatas','tableConfig'],
    data(){
        return {
            loading:true,
            fid:"",
            checkList:[],
            workselect:false,
            adminuseraccess:[],
        }
    },
    components:{

    },
    methods:{
        setLoding(type){
            this.loading = type;
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
            // console.log(this.openurls);
        },
        hover(fid,url,na){
            this.fid = fid;
            this.oneload = {
                name:na,
                id:url
            }
        },

    },
    created(){
        console.log(this.tableDatas)
        console.log(this.tableConfig)
        if(localStorage.getItem("adminuseraccess")){
            this.adminuseraccess = JSON.parse(localStorage.getItem("adminuseraccess"))
        }
    },
    mounted(){

    },
    watch:{

    }
}
</script>
<style scoped>
	.box {
		width: 100%;
        height: 700px;
	}
    .boxllist{
        width: 100%;
        max-height: 650px;
        overflow-y: scroll;
    }
	.boxllist li {
		margin: 30px 15px 15px 15px;
        width: 310px;
        height: 373px;
        float: left;
	}
    .boxContent{
        width: 310px;
        height: 232px;
        position: relative;
    }
    .boxContent .Img{
        width: 100%;
        height: 100%;
    }
    .box-checkbox{
        position: absolute;
        left: 10px;
        top: 8px;
    }
    .user-message-toux > img{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        float: left;
    }
    .box-bt{
        width: 310px;
        height: 141px;
    }
    .work_name{
        width: 90%;
        margin: 0 auto;
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
    }
    .boxtover{
        width: 80%;
        display: block;
        float: left;
        color: #333333;
        font-size: 14px;
        overflow: hidden;
        font-weight: bold;
    }
    .boxfright{
        float: right;
    }
    .classify{
        width: 90%;
        margin: 0 auto;
        height: 65px;
        margin-top: 6px;
        border-bottom: 1px solid #F4F6F9;
    }
    .classift-type{
        width: 91%;
        height: 65px;
        float: left;
    }
    .pj{
        width: 9%;
        height: 65px;
        float: right;
        color: #FF9200;
        font-size: 48px;
        line-height: 65px;
        text-align: center;
    }
    .classift-type-t{
        width: 100%;
        height: 20px;
        color: #BBBBBB;
        font-size: 12px;
        text-align: left;
    }
    .user-message{
        width: 90%;
        margin: 0 auto;
        height: 45px;
        margin-top: 10px;
    }
    .user-message-toux{
        width: 70%;
        float: left;
        height: 20px;
    }
    .user-message-toux span{
        color: #333333;
        height: 20px;
        display: block;
        margin-left: 28px;
    }
    .user-message-time{
        float: right;
        width: 30%;
        height: 20px;
        line-height: 20px;
        color: #BBBBBB;
        font-size: 12px;
        text-align: right;
    }
	
</style>