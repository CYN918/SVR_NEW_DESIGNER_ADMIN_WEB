<template>
    <div class="box" v-loading="loading" style="background: #ffff;">
        <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
            <ul class="boxllist">
                <li v-for="(item,index) in tableDatas" :key="index">
                    <div class="boxContent" @mouseover="hover(item.face_pic)">
                        <el-checkbox class="box-checkbox" @click.stop.native v-if="workselect" :label="item"></el-checkbox>
                        <img class="Img" :src="item.face_pic" alt="">
                        <el-dropdown trigger="hover">
                            <img src="../../assets/img/icon_more.svg" class="bt-Img">
                            <el-dropdown-menu class="sel-tooltip" slot="dropdown">
                                <el-dropdown-item class="comonbtn" style="width:124px;height:32px;margin:0;line-height:32px;text-align: center;padding:0;" @click.native="preview(item)">预览作品</el-dropdown-item>
                                <el-dropdown-item class="comonbtn" style="width:124px;height:32px;margin:0;line-height:32px;text-align: center;padding:0;" @click.native="setContributor(item)">修改推荐等级</el-dropdown-item>
                                <el-dropdown-item class="comonbtn" style="width:124px;height:32px;margin:0;line-height:32px;text-align: center;padding:0;" @click.native="shelves(item)">下架作品</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="box-bt">
                        <div class="work_name">
                            <span class="boxtover">{{item.work_name}}</span>
                            <span class="boxfright"><img src="../../assets/img/zs_icon_tj.svg" width="14px" height="14px"></span>
                        </div>
                        <div class="classify">
                            <div class="classift-type">
                                <div class="classift-type-t">{{item.classify}}</div>
                                <div class="view-comment-like">
                                    <ul>
                                        <li><img src="../../assets/img/zs_icon_gk.svg" width="15" height="15"><div class="user-message-time" style="float:left;text-align: left;">{{item.view_num}}</div></li>
                                        <li><img src="../../assets/img/zs_icon_dz.svg" width="15" height="15"><div class="user-message-time" style="float:left;text-align: left;">{{item.comment_num}}</div></li>
                                        <li><img src="../../assets/img/zs_icon_xx.svg" width="15" height="15"><div class="user-message-time" style="float:left;text-align: left;">{{item.like_num}}</div></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="pj">{{item.recommend_level}}</div>
                        </div>
                        <div class="user-message">
                            <div class="user-message-toux"><img :src="item.avatar" alt=""/></div>
                            <div class="user-message-time" style="float:left;color:#333333;font-size:12px;text-align: left;height: 24px;line-height: 24px;margin-left: 10px;">{{item.username}}</div>
                            <div class="user-message-time">{{getTimes(item.create_time)}}</div>
                        </div>        
                    </div>
                </li>
            </ul>
        </el-checkbox-group>
        <div class="w" style="text-align: right;background: #FFFFFF;">
            <div class="fleft" style="line-height: 100px;color: #999999;margin-left: 40px;">
                <span>已选择{{ checkList.length }}条,</span><span>共{{tableConfig.total}}条数据</span>
                <button style="width:87px;height: 32px;" class="defaultbtn" @click="setall" v-if="tableConfig.ischeck">{{btnStatus?'选择全部':'取消全选'}}</button>
            </div>
            <el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
            :page-sizes="[50, 100, 200, 500]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="作品信息-设为平台推荐作品" :visible.sync="centerDialogVisible1" width="406px">
			<div style="position: relative;">
				<ul>
					<li class="w ofh">
						<span class="fleft Dialogkey">作品ID</span>
						<span class="fleft">{{ selectOne.work_id }}</span>
					</li>
					<li class="w ofh">
						<span class="fleft Dialogkey">作品名称</span>
						<span>{{ selectOne.work_name }}</span>
					</li>
					<li class="w ofh">
						<span class="fleft Dialogkey">
							推荐等级
						</span>
						<el-radio-group v-model="radioS" class="sel-dialog-content fleft">
							<div class="w textcenter sel-radio">
								<el-radio label="S">S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
							</div>
							<div class="w textcenter sel-radio">
								<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
							</div>
							<div class="w textcenter sel-radio">
								<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
							</div>
							<div class="w textcenter sel-radio">
								<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
							</div>
							<div class="w textcenter sel-radio">
								<el-radio label="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不推荐</el-radio>
							</div>
						</el-radio-group>
					</li>
				</ul>

			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<button class=""></button>
				<el-button type="primary" @click="contributor('on')">确 定</el-button>
			</span>
		</el-dialog>
        <el-dialog title="批量操作-设为平台推荐创作者" :visible.sync="centerDialogVisible" width="406px">
			<div style="position: relative;">
				<div class="sel-radio-title">
					<div style="color: #1E1E1E;">推荐评级</div>
					<div class="font12">已选择{{ tableDatas.length }}条数据</div>
				</div>
				<el-radio-group v-model="radioS" class="sel-dialog-content">
					<div class="w textcenter sel-radio">
						<el-radio label="S">S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大神级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="A">A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专家级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="B">B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;普通级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="C">C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业余级</el-radio>
					</div>
					<div class="w textcenter sel-radio">
						<el-radio label="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不推荐</el-radio>
					</div>
				</el-radio-group>
			</div>
			<span slot="footer" class="dialog-footer sel-footer">
				<el-button type="primary" @click="contributor">确 定</el-button>
			</span>
		</el-dialog>
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
            centerDialogVisible:false,
            centerDialogVisible1: false,
            selectOne: {},
            radioS: "",
            pagesize:50,
            total:0,
            currentpage:1,
            workselect:false,
            btnStatus: true,
        }
    },
    components:{

    },
    methods:{
        setLoding(type){
            this.loading = type;
        },
        handleCheckedCitiesChange(val){
            console.log(val)
            this.checkList = val;
        },
        hover(fid,url,na){
            this.fid = fid;
            this.oneload = {
                name:na,
                id:url
            }
        },
        preview(row){
            window.open( localStorage.getItem("baseURLs")+"/work/preview?work_id=" + row.work_id+"&access_token="+localStorage.getItem('access_token'));
        },
        setContributor(val) {
            this.selectOne = val;
            this.radioS = this.selectOne.recommend_level;
            this.centerDialogVisible1 = true;
        },
        getworkids() {
            //console.log(this.tableDatas);
            var workids = '';
            this.tableDatas.forEach((item, index) => {
                workids += (index == (this.tableDatas.length - 1)) ? item.work_id : item.work_id + ",";
            })
            if (this.centerDialogVisible) {
                this.checkList.forEach((item, index) => {
                    workids += (index == (this.checkList.length - 1)) ? item.work_id : item.work_id + ",";
                })
                workids = workids
            };

            if (this.centerDialogVisible1) {
                workids = this.selectOne.work_id;
            }
            return workids;
        },
        contributor(info) {
            // console.log(info)
            //console.log(this.tableDatas);
            var work_ids = this.getworkids();
            this.centerDialogVisible = false;
            this.centerDialogVisible1 = false;
            this.api.getRecommendCountwork({
                access_token:localStorage.getItem("access_token"),
                work_ids:work_ids,
            }).then(da => {
                if(info == 'on'){
                    let data = {
                        work_id: work_ids,
                        recommend_level: this.radioS,
                        access_token: localStorage.getItem("access_token"),
                    };
                    
                    this.api.setRecommendLevelwork(data).then(da => {
                        this.$parent.getData({pageCurrent:1,pageSize:50});
                        this.$refs.Tabledd.setinit();
                    }).catch(() => {
                        this.$refs.Tabledd.setinit();
                    });

                }else{
                    // console.log(da)
                    this.$confirm('有'+ da +'个作品已经是平台推荐作品</br>是否统一将推荐评级修改为'+this.radioS, '确认修改', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true,
                        type: '',
                        center: true
                    }).then(() => {
                        // console.log(this.radioS)
                        let data = {
                            work_id: work_ids,
                            recommend_level: this.radioS,
                            access_token: localStorage.getItem("access_token"),
                        };
                        //alert(this.$refs.Tabledd.sel);
                        //return;
                        if(this.$refs.Tabledd.sel == false) {
                            data = {};
                            if(this.$route.query.urlDate){
                                data = JSON.parse(this.$route.query.urlDate);
                            }
                            data.access_token = localStorage.getItem("access_token");
                            data.recommend_level = this.radioS;
                        } 
                        
                        this.api.setRecommendLevelwork(data).then(da => {
                            this.$parent.getData({pageCurrent:1,pageSize:50});
                            this.$refs.Tabledd.setinit();
                        }).catch(() => {
                            this.$refs.Tabledd.setinit();
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已经取消'
                        });
                        this.$refs.Tabledd.setinit();
                    });

                }
                
            }).catch(da => {
                
            })
            
        },
        getTimes(ont) {
            let times = (new Date(ont)).getTime(),
            nowt = new Date().getTime(),
            pt = nowt-times,
            s = 1000,
            m = s*60,
            h = m*60,
            d = h*24,
            ms = 30*d;
                if(pt<=0){
                    return '刚刚';
                }
                if(pt>ms*12){
                    return formatDate(new Date(times));		
                }
                if(pt>ms){
                    return parseInt(pt/ms) + "个月前";
                }
                if(pt>d){
                    return parseInt(pt/d) + "天前";
                }
                if(pt>h){
                    return parseInt(pt/h) + "小时前";
                }
                if(pt>m){
                    return parseInt(pt/m) + "分钟前";
                }
                return '刚刚';				
        },
        handleSizeChange(val) {
            this.$parent.getData(this.currentpage,val)
        },
        handleCurrentChange(val) {
            this.$parent.getData(val,this.pagesize)
        },
        shelves(row){
            this.router.push({path:"/workManager/workInfo/worksShelves",query:{id:row.work_id,open_id:row.open_id}});
        },
        setall(){	
            this.btnStatus = !this.btnStatus;	
            this.workselect = !this.workselect;
            if(this.btnStatus == true){
                this.checkList = [];
            }else{
                this.checkList = this.tableDatas;
            }
        },

    },
    created(){
        // console.log(this.tableDatas)
        // console.log(this.tableConfig)
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
        height: 800px;
	}
    .boxllist{
        width: 100%;
        max-height: 720px;
        overflow-y: scroll;
        padding-left: 40px;
    }
	.boxllist li {
		margin: 30px 15px 15px 20px;
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
    .view-comment-like,.view-comment-like > ul{
        width: 100%;
        height: 20px;
        line-height: 20px;
        margin-top: 15px;
    }
    .view-comment-like > ul > li{
        float: left;
        height: 20px;
        width: 33%;
        margin: 0;
    }
    .view-comment-like > ul > li > img{
        position: relative;
        top: 2px;
        float: left;
    }
    .user-message{
        width: 90%;
        margin: 0 auto;
        height: 45px;
        margin-top: 10px;
    }
    .user-message-toux{
        width: 24px;
        float: left;
        height: 24px;
    }
    .ts{
        color: #333333;
        float: left;
        height: 24px;
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
    .boxContent >>> .el-dropdown{
        position: absolute;
        right: 0;
        top: 28px;
    }
    .bt-Img{
        width: 50px;
        height: 32px;
        position: absolute;
        right: 0;
        top: -22px;
    }
    .boxContent >>> .el-popper{
        position: absolute !important;
        width: 124px !important;
        left: -106px !important;
        top: 22px !important;
        /* display: block !important; */
    }
    .sel-tooltip{
        width: 124px !important;
    }
    .sel-tooltip .comonbtn:hover{
		background: #e5f5ff !important;
		color: #33B3FF !important;
	}
    .boxContent >>> .el-checkbox__label{
        display: none;
    }
    
	
</style>