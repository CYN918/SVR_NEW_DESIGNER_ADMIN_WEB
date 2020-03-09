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
	import commonTop from '@/components/commonTop.vue'
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
					"pageName": "projectreview1",
					"commonleftbtn": [{
						name: "筛选",
						id: "left1",
						url: ""
					}],
					"commonbottombtn":[],
					"tabData":[
						{
							name:"作品发布",
							linkTo:"/review/publishWork",
							accessid:"12",
						},
						{
							name:"作品入围",
							linkTo:"/review/finalistsWork",
							accessid:"13",
						},
						{
							name:"作品录用",
							linkTo:"/review/employWork",
							accessid:"14",
						},
						{
							name:"项目验收",
							linkTo:"/review/projectreview",
							accessid:"16",
						},
						{
							name:"供稿人申请",
							linkTo:"/review/applyPerson",
							accessid:"15",
						}
					],
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
					'tabnums':3,
					'mintabnums': 0,
				},
				screenConfig: [],
				tableConfig: {
					total: 0,
					currentpage:1,
					pagesize:10,
					list: DataScreen.screenShow.projectreview.bts
				},
				tableData: [],
				tableAction: DataScreen.screenShow.projectreview.action,
				detailData: "",
				filterFields:DataScreen.screen.projectreview.filterFields,
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
				if(localStorage.getItem("access")){
					this.top_banner = JSON.parse(localStorage.getItem("access")).top_banner
					this.top_banner.forEach(item => {
						item.child.forEach(element => {		
						if(element.id == '16'){					
								element.child.forEach(val => {			
									if(val.id == '55'){
										if(val.child.length == '2'){
											this.check_steps = '0,1';
										}else{
											val.child.forEach(da => {
												if(da.id == '200580'){
													this.check_steps = 0;
												}else if(da.id == '200581'){
													this.check_steps = 1;
												}
											})
										}		
										let obj = {
											business_id:3,
											check_steps:this.check_steps,
										}
										this.mxArr.push(obj)
									}
									if(val.id == '53'){
										if(val.child.length == '2'){
											this.check_steps = '0,1';
										}else{
											val.child.forEach(da => {
												if(da.id == '200573'){
													this.check_steps = 0;
												}else if(da.id == '200575'){
													this.check_steps = 1;
												}
											})
										}		
										let obj1 = {
											business_id:5,
											check_steps:this.check_steps,
										}	
										this.mxArr.push(obj1)
									}
									if(val.id == '54'){
										if(val.child.length == '2'){
											this.check_steps = '0,1';
										}else{
											val.child.forEach(da => {
												if(da.id == '200577'){
													this.check_steps = 0;
												}else if(da.id == '200578'){
													this.check_steps = 1;
												}
											})
										}		
										let obj2 = {
											business_id:4,
											check_steps:this.check_steps,
										}	
										this.mxArr.push(obj2)
									}
									if(val.id == '56'){
										if(val.child.length == '2'){
											this.check_steps = '0,1';
										}else{
											val.child.forEach(da => {
												if(da.id == '200583'){
													this.check_steps = 0;
												}else if(da.id == '200584'){
													this.check_steps = 1;
												}
											})
										}		
										let obj3 = {
											business_id:6,
											check_steps:this.check_steps,
										}	
										this.mxArr.push(obj3)	
									}
								})
							}
						})
					})
				}
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
					data = sreenData;
				}
				console.log(data)

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
										a += '场景锁屏' + ",";
									}
									if(item == '4'){
										a += '个性化主题' + ",";
									}
									if(item == '5'){
										a += '来电秀' + ",";
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
				//获取子组件表格数据
				var data = {
					access_token: localStorage.getItem("access_token"),
					page: 1,
					limit: 10000,
					status:1
				}
			
				this.api.projectclassifylist(data).then((da) => {
					
					da.data.forEach(item =>{
						DataScreen.screen.projectreview.filterFields[2].child.push({
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
<style>
	
</style>
