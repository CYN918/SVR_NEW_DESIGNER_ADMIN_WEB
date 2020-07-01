<template>
    <div class="box">
        <div class="box_message">
            <ul>
                <li><span class="left">项目ID</span><span class="right">{{reviewinfocommon.project_id}}</span></li>
                <li><span class="left">项目名称</span><span class="right">{{reviewinfocommon.name}}</span></li>
                <li>
                    <span class="left">业务类型</span>
					
                    <span class="right">{{ywArr[reviewinfocommon.business_type-1].name}}</span>
     
                </li>
                <li>
                    <span class="left">项目制作人</span>
                    <span class="right">{{reviewinfocommon.username}}</span>
                </li>
            </ul>
        </div>
        <div class="box_process" style="height:432px;border-bottom: 1px solid #F4F6F9;">
            <div class="box_process_title">项目详情信息</div>
            <div class="box_process_content">
                <div class="bt_o">
                    <ul>
                        <li style="height:150px;">
                            <span class="box_process_content_left">Banner</span>
                            <span class="box_process_content_right"><img v-if="reviewinfocommon.detail_banner" width="320" height="120" :src="reviewinfocommon.detail_banner" alt=""/><img v-else width="320" height="120" :src="reviewinfocommon.banner" alt=""/></span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.banner == ''">没有图片</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">领域范围</span>
                            <span class="box_process_content_right">{{reviewinfocommon.fields}}</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">项目附件</span>
                            <span class="box_process_content_right" v-if="material_info && reviewinfocommon.business_type == '5'">{{material_info.file_name}}({{material_info.download_file_size}})</span>
                            <span class="box_process_content_right" v-else>{{material_info.file_name}}({{material_info.file_size}})</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">预计收益</span>
                            <span class="box_process_content_right">{{reviewinfocommon.expected_profit}}</span>
                        </li>
                        <!-- <li>
                            <span class="box_process_content_left">额外赏金</span>
                            <span class="box_process_content_right">{{reviewinfocommon.extra_reward}}</span>
                        </li> -->
                        <li>
                            <span class="box_process_content_left">项目顾问QQ</span>
                            <span class="box_process_content_right">{{reviewinfocommon.qq}}</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.qq == ''">暂无QQ</span>
                        </li>
                    </ul>  
                </div>
            </div>
        </div>
        <div class="box_process" style="height:180px;border-bottom: 1px solid #F4F6F9;">
            <div class="box_process_title">项目时间</div>
            <div class="box_process_content">
                <div class="bt_o">
                    <ul>
                        <li>
                            <span class="box_process_content_left">发布时间</span>
                            <span class="box_process_content_right">{{reviewinfocommon.publish_time}}</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">报名截止时间</span>
                            <span class="box_process_content_right">{{reviewinfocommon.deadline}}</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">制作周期</span>
                            <span class="box_process_content_right">{{reviewinfocommon.production_cycle_d}}天{{reviewinfocommon.production_cycle_h}}时</span>
                        </li>
                    </ul>  
                </div>
            </div>
        </div>
        <div class="box_process" style="height:180px;">
            <div class="box_process_title">项目来源绑定</div>
            <div class="box_process_content">
                <div class="bt_o">
                    <ul>
                        <li>
                            <span class="box_process_content_left">绑定需求</span>
                            <span class="box_process_content_right">{{reviewinfocommon.demand_id}}</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.demand_id == ''">暂未绑定需求</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">状态</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.project_status == '0'">待发布</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.project_status == '1'">招募期</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.project_status == '2'">选标期</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.project_status == '3'">制作期</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.project_status == '4'">待验收</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.project_status == '5'">已验收</span>
                            <span class="box_process_content_right" v-if="reviewinfocommon.project_status == '-1'">已终止</span>
                        </li>
                    </ul>  
                </div>
            </div>
        </div>
        <div class="box_process" style="height:180px;" v-if="reviewinfocommon.project_status == '3' || reviewinfocommon.project_status == '4'">
            <div class="box_process_title">补充合同</div>
            <div class="box_process_content">
                <div class="bt_o">
                    <ul>
                        <li v-if="reviewinfocommon.contract_files.length == '0'">
                            <span class="box_process_content_left">绑定合同</span>
                            <span class="box_process_content_right">暂未绑定合同</span>
                        </li>
                        <li v-for="(todo,index) in reviewinfocommon.contract_files" v-else>
                            <span class="box_process_content_left">绑定合同{{index+1}}</span>
                            <span class="box_process_content_right">{{todo.file_name}}</span>
                            <!-- <span class="box_process_content_right" @click="download(todo)" style="margin-left: 100px;color: rgba(51,179,255,1);cursor: pointer;">下载</span> -->
                        </li>
                    </ul> 
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        props: ['reviewinfocommon','material_info','type'],
        data(){
            return {
                list:[],
            }
        },
        components:{

        },
        methods:{
            download(row){
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
        created(){
                
        },
        mounted(){
            

        },
        
    }

</script>
<style scoped="scoped">
    .box{
        min-height: 1000px;
    }
    .box_message{
        height: 240px;
        border-bottom: 1px solid #F4F6F9;
    }
    .box_message > ul{
        padding-top: 40px;
        padding-left: 196px;
    }
    .box_message > ul > li{
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
    }
    .box_message > ul > li .left{
        float: left;
        width: 100px;
        text-align: right;
        color: #999999;
    }
    .box_message > ul > li .right{
        float: left;
        width: 500px;
        text-align: left;
        padding-left: 18px;
        color: #1E1E1E;
    }
    .box_message > ul > li .right > i{
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #FAAD14;
        display: inline-block;
        margin-right: 6px;
    }
    .box_process{
        padding-top: 30px;
    }
    .box_process_title{
        width: 140px;
        padding-left: 30px;
        float: left;
    }
    .box_process_content{
        float: left;
        min-width: 600px;
    }
    .bt_o > ul > li{
        width: 100%;
        height: 38px;
        /* line-height: 38px; */
    }
    .bt_o > ul > li .box_process_content_left{
        width: 124px;
        text-align: right;
        float: left;
        color: #999999;
    }
    .bt_o > ul > li .box_process_content_right{
        /* width: 277px; */
        float: left;
        padding-left: 16px;
    }


</style>