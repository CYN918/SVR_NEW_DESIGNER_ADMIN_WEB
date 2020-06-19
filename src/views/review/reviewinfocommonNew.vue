<template>
    <div class="box">
        <div class="box_message">
            <ul>
                <li><span class="left">提审用户ID</span><span class="right">{{apply_info.user_id}}</span></li>
                <li><span class="left">提审用户昵称</span><span class="right" style="color:#33B3FF;">{{apply_info.username}}</span></li>
                <li><span class="left">提审时间</span><span class="right">{{reviewinfocommon.sign_created_at}}</span></li>
                <li>
                    <span class="left">当前审核状态</span>
                    <span class="right" style="color:#000000;"><i></i>{{map1[reviewinfocommon.check_status].n}}</span>
                </li>
            </ul>
        </div>
        <div class="box_process">
            <div class="box_process_title">审核流程</div>
            <div class="box_process_content nsh_00">
				
				<div class="nsh_01">
					<span class="nsh_02">{{map1[reviewinfocommon.check_status].n}}</span>
					<div class="nsh_03">						
						项目报名审核：
						<div class="nsh_05" v-if="reviewinfocommon.check_status==0">
							<span v-for="(el,key) in apply_info.role" class="nsh_06">
								{{key}}
								<div class="nsh_07">
									<div class="nsh_08">{{key}}</div>
									<div class="nsh_09">
										{{el.role_description}}
									</div>
									<div class="nsh_10">角色成员:</div>
									<div class="nsh_11">
										<span v-for="el2 in el.username">
											{{el2}}
										</span>
									</div>
								</div>
							</span>
							
							
						</div>
						<div v-else class="nsh_04">
							{{apply_info.check_admin_name +" "+apply_info.check_time}}
						</div>
					</div>
					
					
				</div>
				
				<div class="nsh_12" v-if="reviewinfocommon.check_status==1">
					<div class="nsh_14">
						<span class="nsh_13">子项目ID</span>{{apply_info.child_project_id}}
					</div>
					<div class="nsh_14">
						<span class="nsh_13">子项目名称</span>{{apply_info.child_project_name}}
					</div>
				</div>
				<div class="nsh_12" v-if="reviewinfocommon.check_status==-1">
					<div class="nsh_14">
						<span class="nsh_13">驳回理由</span>{{apply_info.check_reason}}
					</div>
					<div class="nsh_14">
						<span class="nsh_13">驳回详情说明</span>{{apply_info.check_comment}}
					</div>
				</div>


            </div>

        </div>

    </div>

</template>

<script>
    export default {
        props: ['reviewinfocommon','demand_id','gain_share_rate','apply_info'],
        data(){
            return {
				map1:{
					'0':{n:'待审核',cls:''},
					'1':{n:'审核通过',cls:''},
					'-1':{n:'审核驳回',cls:''},
					'-2':{n:'失效或撤回',cls:''}
				},	
				jsN:[],
				jsC:[],
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
	
	.nsh_00{
		width: calc(100% - 196px);
	}
	.nsh_01{
		height: 38px;
		line-height: 38px;
	}
	.nsh_02{
		display: inline-block;
		width: 124px;
		text-align: center;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		background: #ff9200;
		float: left;
		color: #fff;
		height: 38px;
		line-height: 38px;
	}
	.nsh_03{
		display: inline-block;
		vertical-align: top;
		background: rgb(242, 242, 242);
		padding:0 10px;
	}
	.nsh_04{
		display: inline-block;
		vertical-align: top;
	}
	.nsh_05{
		display: inline-block;
		vertical-align: top;	
	}	
	.nsh_06{
		position: relative;
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		background: #FFF;
		border: 1px solid #DCDFE6;
		color: #606266;
		-webkit-appearance: none;
		text-align: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		outline: 0;
		margin: 0;
		-webkit-transition: .1s;
		transition: .1s;
		font-weight: 500;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		margin-right: 5px;
	}
	.nsh_06:hover .nsh_07{
		display: block;
	}
	.nsh_07{
		display: none;
		position: absolute;
		top:38px;
		left: 0;
		padding: 20px;
		background:rgba(255,255,255,1);
		box-shadow:0px 8px 32px 0px rgba(0,0,0,0.1);
		border-radius:5px;
		max-width: 460px;

		max-height: 460px;
		overflow: hidden;
		overflow-y: auto;
		text-align: left;
	}
	.nsh_08{
		font-size: 16px;
		line-height: 30px;
		margin-bottom: 10px;
		font-weight: 600;
	}
	.nsh_09{
		font-size: 14px;
		color: #000;
		line-height: 24px;
		margin-bottom: 20px;
	}
	.nsh_10{
		margin-bottom: 20px;
	}
	.nsh_11{

	}
	.nsh_11>span{
		display: inline-block;
		vertical-align: top;
		padding: 0 8px;

		line-height: 24px;
		height: 24px;
		font-size: 12px;

		margin-right: 5px;
		background: rgb(242, 242, 242);
		color: #000;
		border-radius: 5px;
	}
	.nsh_12{
		padding: 20px;
		width: 520px;
		border: 1px solid #BFBFBF;
	}
	.nsh_14{
		margin-bottom: 20px;
	}
	.nsh_13{
		display: inline-block;
		width: 100px;
		padding-left: 24px;
		margin-right: 20px;
	}
</style>