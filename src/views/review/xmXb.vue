<template>
	<div class="wh">
		<div class="wh">
			<common-top :commonTopData="commonTopData" ></common-top>
			<div class="calc205">
				<common-table :screenConfig="screenConfig" :tableConfig="tableConfig" :tableDatas="tableData" :tableAction="tableAction"
				 ref="Tabledd"></common-table>
			</div>
		</div>
	</div>
</template>

<script>
	import commonTop from '@/components/commonTop1.vue'
	import commonTable from '@/components/commonTable.vue'
	import DataScreen from "@/assets/DataScreen.js"
	import createRoles from '@/views/power/createRoles.vue'

	export default {
		components: {
			commonTop,
			commonTable,
			createRoles,
		},
		props: {},
		data() {
			return {
				commonTopData: {
					"pageName": "projectreviewxb",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					"commonbottombtn":[],
					"option":[
						{
							name:"我的待审",
							linkTo:"/review/xmXb",
							/* accessid:"12", */
						},
						{
							name:"我通过的",
							linkTo:"/review/xmXb1",
							/* accessid:"13", */
						},
						{
							name:"全部记录",
							linkTo:"/review/xmXb2",
							// accessid:"52",
						}
					],
					'tabnums':1,
					
					'mintabnums': 0,
				},
				
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					list:[
						{prop:"banner",lable:"项目banner",type:"img",width:150},
						{prop:'name',lable:'报名项目'},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:window.ywArr2},
						{prop:'signup_num',lable:'报名人数'},
						{prop:'deadline',lable:'提审时间'},
						{prop:'status',lable:'当前状态',type:"clFnd",clFnd:(da)=>{
							return da.status==2?'待选标':'已选标'
						},width:350},						
					]
				},
				tableData: [],
				tableAction:{
					morebtns:{
						name:"设置角色",
						Ishow:false,
						page:"projectreviewxb"
					},
					links:{
						name:"详情",
						Ishow:true,
						// accessid:"200510"
					}
				},
				detailData: "",

				IsDetail:1,
				roles:{},
				mxArr:[],
			}
		},
		watch: {},
		computed: {},
		methods: {
			setLoding(type){
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				this.tableConfig.currentpage = pg.pageCurrent;
				this.tableConfig.pagesize = pg.pageSize
				//获取子组件表格数据
				let data = {}
				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					data = sreenData;					
				}
				data.access_token = localStorage.getItem("access_token");
				data.type = 7;
				data.select_status = 0;
				data.page = pg.pageCurrent;
				data.limit = pg.pageSize;
				this.api.reviewList5(data).then((da) => {
					this.tableData = da.data;
					this.tableConfig.total = da.total;
					this.tableConfig.currentpage = da.page;
					this.tableConfig.pagesize = da.page_size;
					this.setLoding(false)
				}).catch(() => {
					this.setLoding(false)
				});
			},
			screenreach() {
				eventBus.$on("sreenData", (data) => {
					this.getcommonrightbtn();
					this.getData({pageCurrent:1,pageSize:50});
					
				})
			},
			getcommonrightbtn(){
				return
				this.commonTopData.commonbottombtn = [];
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate);
					//console.log(urldata);
					this.filterFields.forEach(item=>{
						//console.log(item);
						if(urldata[item.id] && !item.type){
							var val = urldata[item.id];
							if(item.child){	
								val = "";
								item.child.forEach(citem=>{
									//alert(urldata[item.id])
									if(citem.id == urldata[item.id]){
										val = citem.name;
									}
								})
							} 
							this.commonTopData.commonbottombtn.push({btnName:item.name,val:val,id:item.id});
							// console.log(this.commonTopData.commonbottombtn);
						}
						if(item.type == "more"){
							if(urldata[item.id]){
								let a = '';	
				
								urldata.business_type.split(',').forEach(item => {
									if(item == '3'){
										a += '场景主题' + ",";
									}
									if(item == '4'){
										a += '个性化主题' + ",";
									}
									if(item == '5'){
										a += '来电秀' + ",";
									}
									if(item == '6'){
										a += '其他' + ",";
									}
									if(item == '7'){
										a += '杂志锁屏' + ",";
									}
									if(item == '8'){
										a += '投稿作品' + ",";
									}
									if(item == '9'){
										a += '贴纸花字（华为）' + ",";
									}
								})
								this.commonTopData.commonbottombtn.push({btnName:item.name,val:a.substring(0,a.lastIndexOf(',')),id:item.id})
							}
								
						}
					})
				}
				
			},
			resetSave(tag){
				if(this.$route.query.urlDate){
					const urldata = JSON.parse(this.$route.query.urlDate)
					delete urldata[tag];

					this.$router.push({path:'/review/projectreview/projectrepending',query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			delect(id){
				this.api.deleteRole({
					access_token:localStorage.getItem("access_token"),
					id:id
				}).then(da => {

					this.$message({
						type:"waring",
						message:da
					})
					this.getData({pageCurrent:1,pageSize:50});
				}).catch()
			},
			getData1() {
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 10000,
					status:1
				}
			
				this.api.projectclassifylist(data).then((da) => {
					
					da.data.forEach(item =>{
						DataScreen.screen.projectreview.filterFields[3].child.push({
							name:item.classify_name,
							id:item.id
						})
					})
			
				}).catch(() => {
			
				});
			},
		},
		created() {
			this.screenreach();
			this.getcommonrightbtn();
			this.getData1();
			DataScreen.screen.projectreviewxb.filterFields[1].child = window.ywArr;
			if(localStorage.getItem("access")){
				this.top_banner = JSON.parse(localStorage.getItem("access")).top_banner;
				let map = {
					"53":{
						"200573":"0",
						"200575":"1",
						"business_type":5
					},
					"54":{
						"200577":"0",
						"200578":"1",
						"business_type":4
					},
					"55":{
						"200580":"0",
						"200581":"1",
						"business_type":3
					},
					"56":{
						"200583":"0",
						"200584":"1",
						"business_type":6
					},
					"57":{
						"200585":"0",
						"200586":"1",
						"business_type":7
					},
					"60":{
						"200603":"0",
						"200604":"1",
						"business_type":8
					},
					"200680":{
						"200685":"0",
						"200686":"1",
						"business_type":9
					}
				};
				this.top_banner.forEach(item => {
					item.child.some((element,index) => {		
						if(element.id == '16'){					
							element.child.forEach(val => {		
								let clfn = (da)=>{
									if(!da){return}
									let arr = [];
									val.child.forEach(dx => {
										if(da[dx.id]){
											arr.push(da[dx.id])
										}										
									})
									this.mxArr.push({
										business_type:da.business_type,
										check_steps:arr.join(','),
									})
								};
								clfn(map[val.id]);
							})
							return true;
						}
					})					
				})
			}
		},
		mounted() {
			this.getData({pageCurrent:1,pageSize:50});
			if(localStorage.getItem("access")){
				this.top_banner = JSON.parse(localStorage.getItem("access")).top_banner
			}
		},
		watch:{
			"$route":function(){
				this.screenreach();
				this.getcommonrightbtn();
				this.getData({pageCurrent:1,pageSize:50});
			}
		}
	}

</script>
<style scoped='scoped'>
	.wh{
		overflow: hidden;
	}
</style>
