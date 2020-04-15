<template>
    <div class="box">
        <div class="box_message">
            <ul>
                <li><span class="left">提审用户ID</span><span class="right">{{reviewinfocommon.check_admin}}</span></li>
                <li><span class="left">提审用户昵称</span><span class="right" style="color:#33B3FF;">{{reviewinfocommon.admin_name}}</span></li>
                <li><span class="left">提审时间</span><span class="right">{{reviewinfocommon.created_at}}</span></li>
                <li>
                    <span class="left">当前审核状态</span>
                    <span class="right" style="color:#000000;" v-if="reviewinfocommon.check_status == '0'"><i></i>待审核</span>
                    <span class="right" style="color:#000000;" v-if="reviewinfocommon.check_status == '1'"><i></i>审核通过</span>
                    <span class="right" style="color:#000000;" v-if="reviewinfocommon.check_status == '-1'"><i></i>审核驳回</span>
                    <span class="right" style="color:#000000;" v-if="reviewinfocommon.check_status == '-2'"><i></i>失效或撤回</span>
                </li>
            </ul>
        </div>
        <div class="box_process">
            <div class="box_process_title">审核流程</div>
            <div class="box_process_content">
                <div class="bt_o" v-if="reviewinfocommon.check_steps == '0' && reviewinfocommon.check_status == '0'">
                    <ul>
                        <li>
                            <span class="box_process_content_left"><i></i>待审核(1/2)</span>
                            <span class="box_process_content_right">内容确认:<el-tooltip placement="top"><el-button>角色名称</el-button><div slot="content">{{reviewinfocommon.role}}</div></el-tooltip></span>
                        </li>
                        <li style="margin-top:30px;">
                            <span class="box_process_content_left" style="background: #BFBFBF;"><i></i>待审核(2/2)</span>
                            <span class="box_process_content_right" style="background: #f2f2f2;">结算确认:<el-tooltip placement="top"><el-button>角色名称</el-button><div slot="content">{{reviewinfocommon.role}}</div></el-tooltip></span>
                        </li>
                    </ul>  
                </div>
                <div class="bt_o" v-if="reviewinfocommon.check_steps == '1'">
                    <ul>
                        <li>
                            <span class="box_process_content_left" style="background: #4DC600;border-bottom-left-radius: 0px;"><i></i>已通过(1/2)</span>
                            <span class="box_process_content_right">内容确认:<b style="margin-left:5px;">{{reviewinfocommon.check_admin_content_name}}&nbsp;&nbsp;&nbsp;{{reviewinfocommon.content_check_confim_time}}</b></span>
                        </li>
                        <div class="bt_o_contenaut">
                            <ul>
                                <li><span>项目评级</span><span>{{reviewinfocommon.level}}</span></li>
                                <li><span>绑定需求</span><span>{{demand_id}}</span></li>
                                <li><span>能否直接入库</span><span v-if="reviewinfocommon.is_ruku == '1'">可直接入库</span><span v-if="reviewinfocommon.is_ruku == '0'">需整理后入库</span></li>
                                <li><span>入库素材数量</span><span>{{reviewinfocommon.storage_number}}</span></li>
                                <li v-if="reviewinfocommon.content_remark != ''"><span>内容备注</span><span>{{reviewinfocommon.content_remark}}</span></li>
                                <li v-if="reviewinfocommon.content_remark == ''"><span>内容备注</span><span>暂无内容</span></li>
                            </ul>           
                        </div>
                        <li style="margin-top:30px;">
                            <span class="box_process_content_left" style="background: #FF9200;"><i></i>待审核(2/2)</span>
                            <span class="box_process_content_right" style="background: #fff4e5;">结算确认:<el-tooltip placement="top"><el-button>角色名称</el-button><div slot="content">{{reviewinfocommon.role}}</div></el-tooltip></span>
                        </li>
                    </ul>  
                </div>
                <div class="bt_o" v-if="reviewinfocommon.check_steps == '2'">
                    <ul>
                        <li>
                            <span class="box_process_content_left" style="background: #4DC600;border-bottom-left-radius: 0px;"><i></i>已通过(1/2)</span>
                            <span class="box_process_content_right">内容确认:<b style="margin-left:5px;">{{reviewinfocommon.check_admin_content_name}}&nbsp;&nbsp;&nbsp;{{reviewinfocommon.content_check_confim_time}}</b></span>
                        </li>
                        <div class="bt_o_contenaut">
                            <ul>
                                <li><span>项目评级</span><span>{{reviewinfocommon.level}}</span></li>
                                <li><span>绑定需求</span><span>{{demand_id}}</span></li>
                                <li><span>能否直接入库</span><span v-if="reviewinfocommon.is_ruku == '1'">可直接入库</span><span v-if="reviewinfocommon.is_ruku == '0'">需整理后入库</span></li>
                                <li><span>入库素材数量</span><span>{{reviewinfocommon.storage_number}}</span></li>
                                <li v-if="reviewinfocommon.content_remark != ''"><span>内容备注</span><span>{{reviewinfocommon.content_remark}}</span></li>
                                <li v-if="reviewinfocommon.content_remark == ''"><span>内容备注</span><span>暂无内容</span></li>
                            </ul>           
                        </div>
                        <li style="margin-top:30px;">
                            <span class="box_process_content_left" style="background: #4DC600;border-bottom-left-radius: 0px;"><i></i>已通过(2/2)</span>
                            <span class="box_process_content_right">结算确认:<b style="margin-left:5px;">{{reviewinfocommon.admin_name}}&nbsp;&nbsp;&nbsp;{{reviewinfocommon.check_time}}</b></span>
                        </li>
                        <div class="bt_o_contenaut">
                            <ul>
                                <li><span>结算方式</span><span v-if="reviewinfocommon.deal_type == '1'">买断</span><span v-if="reviewinfocommon.deal_type == '2'">分成</span><span v-if="reviewinfocommon.deal_type == '3'">预约金+分成</span></li>
                                <li v-if="reviewinfocommon.deal_type == '1'"><span>最终结算价格</span><span style="color:#FF9200;">¥{{formatMoney(reviewinfocommon.deal_price)}}</span></li>
                                <div class="bt_o_contenaut_t" v-if="reviewinfocommon.deal_type == '1'">
                                    <ul>
                                        <li><div style="color:#999999;font-size:12px;">验收价格</div><div style="margin-top:5px;color:#282828;font-size:14px;">¥{{formatMoney(reviewinfocommon.acceptance_price)}}</div></li>
                                        <li style="width:30px;">+</li>
                                        <li><div style="color:#999999;font-size:12px;">收益加成（{{gain_share_rate}}.00%）</div><div style="margin-top:5px;color:#282828;font-size:14px;">¥{{formatMoney(reviewinfocommon.gain_share_price)}}</div></li>
                                    </ul>
                                </div>
                                <li v-if="reviewinfocommon.deal_type == '2'"><span>分成比例</span><span>{{reviewinfocommon.user_split_rate}}%</span></li>
                                <li v-if="reviewinfocommon.deal_type == '3'"><span>预约金</span><span>¥{{formatMoney(reviewinfocommon.advance_payment)}}</span></li>
                                <li v-if="reviewinfocommon.deal_type == '3'"><span>分成比例</span><span>{{reviewinfocommon.user_split_rate}}%</span></li>
                            </ul>           
                        </div>
                    </ul>  
                </div>
                <div class="bt_o" v-if="reviewinfocommon.check_steps == '0' && reviewinfocommon.check_status == '-1'">
                    <ul>
                        <li>
                            <span class="box_process_content_left" style="background: #FF3B30;"><i></i>已驳回</span>
                            <span class="box_process_content_right">内容确认:<b style="margin-left:5px;">用户名称&nbsp;&nbsp;&nbsp;{{reviewinfocommon.check_time}}</b></span>
                        </li>
                        <div class="bt_o_contenaut">
                            <ul>
                                <li><span>驳回理由</span><span>{{reviewinfocommon.check_reason}}</span></li>
                                <li><span>驳回详情说明</span><span>{{reviewinfocommon.check_comment}}</span></li>
                            </ul>           
                        </div>
                    </ul>  
                </div>


            </div>

        </div>

    </div>

</template>

<script>
    export default {
        props: ['reviewinfocommon','demand_id','gain_share_rate'],
        data(){
            return {

            }
        },
        components:{

        },
        methods:{
            formatMoney(input){ 
                var n = parseFloat(input).toFixed(2);
                var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
                return n.replace(re, "$1,");
            }
        },
        created(){
            console.log(this.reviewinfocommon)
        },
        mounted(){

        },
        
    }

</script>
<style scoped="scoped">
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
        min-height: 659px;
    }
    .box_process_title{
        width: 166px;
        padding-left: 30px;
        float: left;
    }
    .box_process_content{
        float: left;
    }
    .bt_o > ul > li{
        width: 100%;
        height: 38px;
        line-height: 38px;
    }
    .bt_o > ul > li .box_process_content_left{
        width: 124px;
        text-align: center;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background: #FF9200;
        float: left;
        color: #FFFFFF;
    }
    .bt_o > ul > li .box_process_content_left > i{
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #FFFFFF;
        display: inline-block;
        margin-right: 6px;
    }
    .bt_o > ul > li .box_process_content_right{
        /* width: 277px; */
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background: #fff4e5;
        float: left;
        color: #595959;
        padding-left: 16px;
    }
    .bt_o > ul > li .box_process_content_right >>> .el-button{
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        padding: 0;
        margin-left: 10px;
    }
    .bt_o_contenaut{
        width:560px;
        min-height:240px;
        border:1px solid #BFBFBF;
    }
    .bt_o_contenaut > ul > li{
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-top: 10px;
    }
    .bt_o_contenaut > ul > li > span:nth-child(1){
        width: 100px;
        color: #999999;
        text-align: right;
        float: left;
        padding-left: 24px;
    }
    .bt_o_contenaut > ul > li > span:nth-child(2){
        width: 412px;
        color: #1E1E1E;
        float: left;
        padding-left: 20px;
    }
    .bt_o_contenaut_t{
        width: 412px;
        margin-left: 144px;
        margin-top: 20px;
    }
    .bt_o_contenaut_t > ul > li{
        width: 115px;
        float: left;
    }


</style>