<template>
	<div v-loading="loading" >
		<el-table 
			
			:data="tableDatas" 
			style="width: 100%"
			tooltip-effect
			:header-cell-style="cellStyle" 
		>
			<el-table-column 
			v-for="(item, idx) in tConfig" 
			:prop="item.prop" :key="idx" :label="item.lable" :width="item.width">
				<template slot-scope="scope">
					<div>
						<div class="bm_uimg" v-if="item.type=='imgs'">
							<span 
							v-for="(el, idx) in scope.row[item.prop]" 
							@click="tabCl(item.clfn,scope.row,idx)"
							:style="setImg(el)" :key="idx"></span>
						</div>
						<span v-else-if="item.type=='status'">
							{{item.clfn(scope.row)}}
						</span>
						<span v-else-if="item.type=='mosFn'">
							<span @mouseout="tabmsout($event,item,scope.row)" @mouseover="tabmsover($event,item,scope.row)">{{scope.row[item.prop]}}</span>
							
						</span>
						
						<span v-else-if="item.type=='showUser'">
							<userTc :value="scope.row.userData"></userTc>
						</span>
						
						<span v-else>
							{{scope.row[item.prop]}}
						</span>
					</div>
				</template>	
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="160">
				<template slot-scope="scope">
					<span :key="idx" @click="tabCl(el.fn, Object.assign(scope.row, {text: el.n}))" v-for="(el, idx) in gettools(scope.row)">
						{{el.n}}
					</span>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
			 :page-sizes="[50, 100, 200, 500]" :page-size="limit" layout="sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		
		<div :style="dwpsDat" @mouseover="setT2(true)" @mouseout="setT2(false)" class="user_n_01">
			<div>
				<img class="user_n_02" :src="userInfo.avatar">
				<div class="user_n_03">
					<div class="user_n_04">{{userInfo.username}}</div>
					<div class="user_n_05">{{userInfo.vocation}}|{{userInfo.city}}</div>
				</div>
			</div>
			<div class="user_n_06">
				<span>粉丝<i></i>{{userInfo.fans_num}}</span>
				<span>人气<i></i>{{userInfo.popular_num}}</span>
				<span>作品<i></i>{{userInfo.work_num}}</span>
				<span>接单<i></i>{{userInfo.project_hire_num}}</span>
				<span>收益<i></i>{{userInfo.project_income}}</span>
				<span>评级<i></i>{{userInfo.recommend_level}}</span>
			</div>
			<div class="user_n_07">
				工作现状<span class="user_n_08">{{userInfo.situation}}</span>
			</div>
			<div class="user_n_07">
				类型偏好<span class="user_n_08">{{userInfo.preference_classify}}</span>
			</div>
			<div class="user_n_07">
				每周时间<span class="user_n_08">{{userInfo.work_experience}}</span>
			</div>
			<div class="user_n_07">
				擅长风格
				<div class="user_n_09">
					<span v-for="el in arrchange(userInfo.style)">{{el}}</span>
				</div>
			</div>
			<div class="user_n_07">
				擅长领域
				<div class="user_n_09">
					<span v-for="el in arrchange(userInfo.field)">{{el}}</span>
				</div>
			</div>
			<div class="user_n_07 user_n_10">
				<span @click="userdetail(userInfo.open_id)">用户详情</span>
				<span @click="gotoweb(userInfo.open_id)">个人主页</span>
			</div>
		</div>
	</div>
</template>

<script>
import userTc from '@/components/userTan.vue'
export default{
	props:{
		value:Object
	},
	components: {
		userTc
	},
	data(){
		return {
			loading:false,
			tableDatas:[],
			page:1,
			limit:50,
			total:0,
			tConfig:[
				{prop:'name',lable:'报名用户',width:200,type:'showUser'},
				{prop:'imgs',lable:'作品案例',type:'imgs',clfn:'gozp'},
				{prop:'check_status',lable:'当前状态',type:'status',width:120,clfn:(da)=>{
					let map = {
						"1":"已通过",
						"0":"待审核",
						"-1":"已驳回",
					};
					return map[da.check_status];
				}},
			],
			tools:[],
			dwpsDat:'',
			userInfo:{},
			ismv2:false,
		}
	},
	mounted(){
		this.init();
	},

	methods:{
		gettools(obj){
			let arr = [];
			if(obj.check_status==0){
				arr = [{n:"前往审核",fn:'goSh'}];
			}
			if(obj.check_status==1){
				arr = [
					{n:"查看子项目",fn:'seeZxm'},
					{n:"审核详情",fn:'goSh'}
				];
			}
			if(obj.check_status==-1){
				arr = [
					{n:"审核详情",fn:'goSh'}
				];
			}
			return arr;
		},
		goSh(row, on){
			this.router.push({
				path:"/review/projectreview/xxbmxq",
				query:{
					signup_id: row.id,
					id: row.project_id,
					type: 6,
					check_status: row.check_status,
					project_id: row.project_id,
					business_type: 7,// row.business_type
					tabIdx: row.text === '审核详情' ? 1 :0
				}
			});
		},
		seeZxm(){
			this.value.zj = 'zxm';			
		},
		tabCl(fn,cs,on){
			console.log(fn)
				console.log(cs)
					console.log(on)
			if(!fn){
				return
			}
			this[fn](cs,on);
		},
		gozp(obj,on){
			console.log(obj)
			window.open(localStorage.getItem("URL")+"/#/cont?id=" + obj.imgId[on]);
		},
		tabmsout(e,obj,cs){
			this[obj.outFn](e,cs);
		},
		tabmsover(e,obj,cs){
			this[obj.overFn](e,cs);
		},
		setType2(e,o){
			let bj = e.target.getBoundingClientRect();
			this.dwpsDat = 'display: block;top: '+bj.y+'px;left: '+(bj.x+bj.width-20)+'px;';
			this.userInfo = o.userData;
		},
		setType(){

			setTimeout(()=>{
				if(this.ismv2){
					return
				}
				this.dwpsDat = '';
				this.userInfo = {};
			},50)
			
		},
		setT2(t){
			this.ismv2 = t;	
			if(!t){
				this.setType();
			}
		},
		arrchange(item){
			return item?item.split(","):[];
		},
		userdetail(open_id){
			const {href} = this.$router.resolve({ 
				path: '/userManager/userBaseInfo/userBaseInfoDetail',
				query:{
					open_id:open_id,
					hide:"hide"
			    }
			})
			window.open(href, '_blank');
		},
		gotoweb(id){
			window.open(localStorage.getItem("URL")+"/#/works?id=" + id);
		},
		setImg(u){
			return "background-image: url("+u+");"
		},
		init(){
			this.getTabData();
		},
		cellStyle() {
		  return 'borderBottom: 5px solid #f0f2f5'
		},
		handleSizeChange(val){
			this.limit = val;
			this.getTabData();
		},
		handleCurrentChange(val){
			this.page = val;
			this.getTabData();
		},
		getTabData(){
			this.api.signupList({
				project_id:this.$route.query.id,
				page:this.page,
				limit:this.limit,
				access_token: localStorage.getItem("access_token")
			}).then(da => {
				this.loading = false;
				let arr = da.data.map((im,index,arr)=>{		
					let imgsId = [];
					let imgs = im.works.map((im,index,arr)=>{
						imgsId.push(im.work_id);
						return im.face_pic;
					})	
					return {
						name:im.user.username,
						check_status:im.check_status,
						imgs:imgs,
						imgId:imgsId,
						userData:im.user,
						project_id: im.project_id,
						id: im.id
					}
				});
				
				this.tableDatas = arr;
				this.total = da.total;
			}).catch(da =>{
				this.loading = false;
			})
		},
		
	}
}
</script>

<style>
.bm_uimg{
	text-align: left;
}
.bm_uimg>span{
	display: inline-block;
	vertical-align: top;
	width: 120px;
	height: 60px;
	background-size: cover;
	margin-right: 10px;
}
.user_n_01{
	display: none;
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	padding: 20px;
	width: 301px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(204, 204, 204, 1);
    border-radius: 0px;
    -moz-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
    -webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
}
.user_n_02{
	display: inline-block;
	vertical-align: top;
	width: 50px;
	margin-right: 10px;
}
.user_n_03{
	display: inline-block;
	vertical-align: top;
}
.user_n_04{
	line-height: 28px;
}
.user_n_06{
	margin: 10px auto;
}
.user_n_06>span{
	display: inline-block;
	vertical-align: top;
	width: 33.33%;
	margin-bottom: 10px;
}
.user_n_06>span>i{
	margin-right: 10px;
}
.user_n_07{
	margin-bottom: 10px;
}
.user_n_08{
	margin-left: 20px;
}
.user_n_09{
	display: inline-block;
    vertical-align: top;
    margin-left: 20px;
	width: 179px;
}
.user_n_09>span{
	display: inline-block;
	vertical-align: top;
	padding: 0 7px;
	border-radius: 5px;
	height: 24px;
	background: #000;
	text-align: center;
	line-height: 24px;
	font-size: 12px;
	line-height: 24px;
	margin-right: 5px;
	color: #fff;
	margin-bottom: 5px;
}
.user_n_10{
	text-align: center;
}
.user_n_10>span{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #33b3ff;
    color: #fff;
    border-radius: 5px;
    margin: 0 10px;
	cursor: pointer;
}
</style>
