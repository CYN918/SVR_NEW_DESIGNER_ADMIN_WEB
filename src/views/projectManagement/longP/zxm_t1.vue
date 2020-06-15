<template>
	<div v-loading="loading">
		<el-table 
			:reserve-selection="true" 
			:data="tableDatas" 
			tooltip-effect  
			:header-cell-style="cellStyle">
			<el-table-column v-for="(item,index) in tConfig" :prop="item.prop" :label="item.lable" :width="item.width">
				<template slot-scope="scope">
					<div>
						<div class="bm_uimg" v-if="item.type=='imgs'">
							<span 
							v-for="(el,index) in scope.row[item.prop]" 
							@click="tabCl(item.clfn,scope.row,index)"
							:style="setImg(el)"></span>
						</div>
						<span v-else-if="item.type=='status'">
							{{item.clfn(scope.row)}}
						</span>
						<span v-else-if="item.type=='mosFn'">
							<span @mouseout="tabmsout($event,item,scope.row)" @mouseover="tabmsover($event,item,scope.row)">{{scope.row[item.prop]}}</span>
							
						</span>
						
						<span v-else>
							{{scope.row[item.prop]}}
						</span>
					</div>
				</template>	
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="160">
				<template slot-scope="scope">
					<span @click="tabCl(el.fn,scope.row)" v-for="el in gettools(scope.row)">
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
	</div>
</template>

<script>
export default{
	data(){
		return {
			loading:false,
			tableDatas:[],
			page:1,
			limit:50,
			total:0,
			tConfig:[
				{prop:'project_id',lable:'ID'},
				{prop:'name',lable:'子项目'},
				{prop:'username',lable:'制作人',width:120},
				{prop:'delivery_deadline',lable:'截稿时间'},
				{prop:'status',lable:'当前状态',type:'status',width:120,clfn:(da)=>{
					if(da.status==5){
						return "待验收"
					}
					let onTim = (new Date()).getTime();
					let gq = (new Date(da.delivery_deadline)).getTime();
					if(onTim>gq){
						return "制作期(延期)"
					}					
					return "制作期"
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
			let arr = [{n:"查看子项目",fn:'seeXM'}];
			
			if(obj.status==5){
				arr.push({
					n:"前往审核",fn:'goSh'
				})
			}
			
			return arr;
		},
		seeXM(obj){
			const {href} = this.$router.resolve({ path: "/projectManagement/projectList/projectDetial",query:{
				id:obj.project_id,
				status:obj.status,
				business_type:3,
				blank:'_blank',
			}})
			window.open(href, '_blank')
		},
		goSh(cs){
			
		},
		tabCl(fn,cs,on){
			console.log(fn);
			if(!fn){
				return
			}
			this[fn](cs,on);
		},
		gozp(obj,on){
			
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
			this.api.subprojectsList({
				project_id:this.$route.query.id,
				status:'4,5',
				page:this.page,
				limit:this.limit,
				access_token: localStorage.getItem("access_token")
			}).then(da => {
				this.loading = false;
				this.tableDatas = da;
				// this.total = da.total;
			}).catch(da =>{
				this.loading = false;
			})
		},
		
	}
}
</script>

<style>
</style>
