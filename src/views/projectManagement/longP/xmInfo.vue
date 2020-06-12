<template>
    <div class="box">
        <div class="box_message">
            <ul>
        
                <li><span class="left">项目名称</span><span class="right">{{info.name}}</span></li>
                <li>
                    <span class="left">业务类型</span>
                    <span class="right">{{business_type}}</span>
                </li>
                <li>
                    <span class="left">结算方式</span>
                    <span class="right">
						<div class="jsfs_01">
							<span :class="el.v==info.settlement?'jsfs_02':''" v-for="el in fcfs">{{el.n}}</span>
						</div>
					</span>
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
                            <span class="box_process_content_right"><img v-if="info.detail_banner" width="320" height="120" :src="info.detail_banner" alt=""/><img v-else width="320" height="120" :src="info.banner" alt=""/></span>
                            <span class="box_process_content_right" v-if="info.banner == ''">没有图片</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">领域范围</span>
                            <span class="box_process_content_right">{{info.fields}}</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">项目附件</span>
                            <span class="box_process_content_right" v-if="info && info.business_type == '5'">{{info.file_name}}({{info.download_file_size}})</span>
                            <span class="box_process_content_right" v-else>{{info.file_name}}({{info.file_size}})</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">预计收益</span>
                            <span class="box_process_content_right">{{info.expected_profit}}</span>
                        </li>
                        <!-- <li>
                            <span class="box_process_content_left">额外赏金</span>
                            <span class="box_process_content_right">{{info.extra_reward}}</span>
                        </li> -->
                        <li>
                            <span class="box_process_content_left">项目顾问QQ</span>
                            <span class="box_process_content_right">{{info.qq}}</span>
                            <span class="box_process_content_right" v-if="info.qq == ''">暂无QQ</span>
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
                            <span class="box_process_content_right">{{info.publish_time}}</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">下架时间</span>
                            <span class="box_process_content_right">{{info.dismount_time}}</span>
                         
                        </li>
                        <li>
                            <span class="box_process_content_left">制作周期</span>
                            <span class="box_process_content_right">{{info.production_cycle_d}}天{{info.production_cycle_h}}时</span>
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
                            <span class="box_process_content_right">{{info.demand_id}}</span>
                            <span class="box_process_content_right" v-if="info.demand_id == ''">暂未绑定需求</span>
                        </li>
                        <li>
                            <span class="box_process_content_left">状态</span>
                            <span class="box_process_content_right">{{project_status}}</span>
                            
                        </li>
                    </ul>  
                </div>
            </div>
        </div>
        <div class="box_process" style="height:180px;" v-if="info.project_status == '3' || info.project_status == '4'">
            <div class="box_process_title">补充合同</div>
            <div class="box_process_content">
                <div class="bt_o">
                    <ul>
                        <li v-if="info.contract_files.length == '0'">
                            <span class="box_process_content_left">绑定合同</span>
                            <span class="box_process_content_right">暂未绑定合同</span>
                        </li>
                        <li v-for="(todo,index) in info.contract_files" v-else>
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
		props:{
			value:Object,
		},
        data(){
            return {
                list:[],
				fcfs:[
					{n:'用户选择',v:0},
					{n:'买断',v:1},
					{n:'分成',v:2}
				],
				info:{},
            }
        },
		computed:{
			business_type(){
				let map = {
					'1':'广告模板',
					'2':'广告图',
					'3':'场景主题',
					'4':'个性化主题',
					'5':'来电秀',
					'6':'其他',
					'7':'杂志锁屏'
				};
				return map[this.info.business_type];				
			},
			project_status(){
				let map = {
					'0':'待发布',
					'1':'招募期',
					'2':'选标期',
					'3':'制作期',
					'4':'待验收',
					'5':'已验收',
					'-1':'已终止'
				};
				return map[this.info.project_status];
			},
		},
        methods:{
			getworkdetial(){
				this.api.projectdetail({
					project_id:this.$route.query.id,
					access_token:localStorage.getItem("access_token")
				}).then(da => {
					this.info = da;					
				})
			},
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
        mounted(){
            this.getworkdetial();
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
	.jsfs_01>span{
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		vertical-align: middle;
		background: #FFF;
		border: 1px solid #DCDFE6;
		font-weight: 500;
		border-left: 0;
		color: #606266;
		-webkit-appearance: none;
		text-align: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		cursor: pointer;
		-webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
		transition: all .3s cubic-bezier(.645,.045,.355,1);
		padding: 12px 20px;
		font-size: 14px;
	}
	.jsfs_01>span:first-child{
		border-left: 1px solid #DCDFE6;
	}
	.jsfs_01>span.jsfs_02{
		background: #409EFF;
		border-color: #409EFF;
		color: #fff;
	}
</style>