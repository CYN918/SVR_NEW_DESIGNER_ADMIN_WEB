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
					"pageName": "projectreview",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					"commonbottombtn":[],
				
					"option":[
						{
							name:"我的待审",
							linkTo:"/review/projectreview/projectrepending",
							/* accessid:"12", */
						},
						{
							name:"我通过的",
							linkTo:"/review/projectreview/projectrethrough",
							/* accessid:"13", */
						},
						{
							name:"我驳回的",
							linkTo:"/review/projectreview/projectrerejected",
							/* accessid:"14", */
						},
						{
							name:"全部记录",
							linkTo:"/review/projectreview/projectreallrecords",
							// accessid:"52",
						}
					],
					'tabnums':5,
					'mintabnums': 0,
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					list:[
						{prop:'id',lable:'审核ID'},
						{prop:'project_id',lable:'项目ID'},
						{prop:'name',lable:'项目名称'},
						{prop:'classify_name',lable:'项目类型',},
						{lable:"稿件预览图",prop:"preview_pic",type:"img",width:270},
						{prop:'business_type',lable:'业务类型',type:"keyvalue",child:window.ywArr2},
						{prop:{prop1:"file_name",prop2:"online_disk_url"},type:"urlfile",filetype:{name:"type",id:'1'},lable:'交稿文件/网盘链接'},
						{prop:'remark',lable:'备注说明',width:350},
						{prop:'username',lable:'提审用户昵称'},
						{prop:'check_status',lable:'审核状态',type:"btn",child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"},width:350},
						{prop:'admin_name',lable:'审核人',type:"hiretime1",time:"check_time",width:200},
					]
				},
				tableData: [],
				tableAction: DataScreen.screenShow.projectreview.action,
				detailData: "",
				filterFields:[
					{name:"审核ID",id:"id"},
					{name:"项目ID",id:"project_id"},
					{name:"项目名称",id:"name"},
					{name:"项目类型",id:"classify_id",child:[]},
					
					{name:"业务类型",id:"business_type",child:window.ywArr},
					
					{name:"提审用户昵称",id:"username"},
					{name:"审核状态",id:"check_status",child:[{name:"待审核",id:"0"},{name:"审核通过",id:"1"},{name:"审核驳回",id:"-1"},{name:"失效或撤回",id:"-2"}]},
					{name:"",type:"display"}
				],
				IsDetail:1,
				roles:{},
				mxArr:[],
			}
		},
		watch: {},
		computed: {},
		methods: {
			setLoding(type){
				//alert(2);
				this.$refs.Tabledd.setLoding(type);	
			},
			getData(pg) {
				this.tableConfig.currentpage = pg.pageCurrent;
				this.tableConfig.pagesize = pg.pageSize
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: pg.pageCurrent,
					limit: pg.pageSize,
					type:5,
					// check_steps: this.check_steps_status,
					// per_check_name: this.$route.query.user,
					check_status:0,
					// business_type: this.business_id.substring(0,this.business_id.lastIndexOf(',')),
					mix_blens:JSON.stringify(this.mxArr),
				}
				//获取筛选的条件
				if (this.$route.query.urlDate) {
					const sreenData = JSON.parse(this.$route.query.urlDate);
					sreenData.page = pg.pageCurrent;
					sreenData.limit = pg.pageSize;
					sreenData.access_token = localStorage.getItem("access_token");
					sreenData.type = 5
					sreenData.mix_blens = JSON.stringify(this.mxArr)
					sreenData.check_status = sreenData.check_status!=0?sreenData.check_status:0
					data = sreenData;
					
				}

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
					//console.log(tag);
					this.$router.push({path:'/review/projectreview/projectrepending',query:{urlDate:JSON.stringify(urldata)}});
				}
			},
			delect(id){
				this.api.deleteRole({
					access_token:localStorage.getItem("access_token"),
					id:id
				}).then(da => {
					console.log(da);
					this.$message({
						type:"waring",
						message:da
					})
					this.getData({pageCurrent:1,pageSize:50});
				}).catch()
			},
			getData1() {
				// DataScreen.screen.projectreview.filterFields[2].child = [];
				//获取子组件表格数据
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
			DataScreen.screen.projectreview.filterFields[4].child = window.ywArr;
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
			//console.log(this.tableConfig)
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
