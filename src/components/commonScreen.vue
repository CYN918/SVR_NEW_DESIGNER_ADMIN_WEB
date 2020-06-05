<template>
	<div class="wh screenContent" style="position: relative; z-index: 2040;">
		<div class="screenborder">
			<div class="screenTop paddinglr30" style="position: fixed;width: 338px;background: #FFFFFF;z-index:999999;">
				<span class="fleft">{{ name? name: currentpageName }}-筛选</span>
				<span class="fright fontsize24 screenclose pointer" @click="getparent()">x</span>
			</div>
			<div class="screenMidden paddinglr30" style="margin-top:76px;">
				
				<ul class="screenMiddenul ofh w" style="padding-bottom:50px;">
					<li v-for="(item,index) in texts" :key="item.id">
						<div class="label">
							{{ item.name }}
						</div>
						<!-- form.selct[item.a] -->
						<el-input class="ipt" placeholder="请输入内容" v-model="form[item.id]" v-if="(!item.child) && (!item.type)"
						 clearable></el-input>
						<el-dropdown trigger="click" class="ipt" v-else-if="item.child && item.type == 'more'" :hide-on-click="false">
							<el-input class="ipt el-dropdown-link" placeholder="请输入内容" v-model="form[item.id]" suffix-icon="el-icon-arrow-down"
							 clearable></el-input>
						    <el-dropdown-menu slot="dropdown" style="width: 335px;min-height: 120px;">
								<el-checkbox-group v-model="vocation[item.id]">
									<el-dropdown-item v-for="(citem,index) in item.child" :key="index">
										<el-checkbox  :label="citem" @change="vocations(item.id)">{{citem}}</el-checkbox>
									</el-dropdown-item>
								</el-checkbox-group>
						    </el-dropdown-menu>
						</el-dropdown>

						<div class="ipt" v-else-if="item.child && !item.type">
							<el-select v-model="form[item.id]" placeholder="请选择" >
								<el-option value="" label="全部"></el-option>
								<el-option v-for="(childitem,index) in item.child" :value="childitem.id" :label="childitem.name"></el-option>
							</el-select>
						</div>
						 <el-date-picker
						  v-if="item.type == 'time'"
						   @change="timetwo(item.child,index)"
						  class="ipt"
						  v-model="times[index]"
						  type="daterange"
						  value-format="yyyy-MM-dd HH:mm:ss"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  >
						</el-date-picker>
						<!-- <el-cascader class="ipt" v-if="item.type == 'cascader'"
						    expand-trigger="hover"
							:options="item.child"
							:props="item.optionProps"
							v-model="selectedOptions"
							@change="handleChange"
							collapse-tags
							clearable>
						</el-cascader> -->
						<div class="box">
							<el-multi-cascader ref="myCascader" class="ipt" @change="handleChange" v-if="item.type == 'linkage'" 
								expand-trigger="hover" 
								v-model="cascaderOptions" 
								:options="item.child" 
								multiple 
								filterable 
								select-children 
								clearable 
								collapse-tags
								only-out-put-leaf-node
								change-on-select> 
							</el-multi-cascader>
						</div>
						
						
						<!-- <el-select v-model="form[item.id]" multiple collapse-tags placeholder="请选择" v-if="item.type == 'businessType'">
							<el-option
							v-for="citem in item.child"
							:key="citem.id"
							:label="citem.name"
							:value="citem.id">
							</el-option>
						</el-select> -->
						
						<!-- <div v-if="item.type == 'cascader'">
							<el-input class="ipt"  v-popover:popover placeholder="请输入内容" v-model="form[item.id]"></el-input>
							<el-popover
							  ref="popover"
							  placement="right"
							  width="200">
							  <div style="max-height: 400px;min-height: 200px;overflow-y: auto;">
								  <el-tree
								    v-if="item.type == 'cascader'"
								    :data="item.child"
								    show-checkbox
								    node-key="id"
								    :props="defaultProps">
								  </el-tree>
							  </div>

							</el-popover>
						</div> -->
						
						
				
						<div v-if="item.type == 'two'" class="ipt">
							<el-input v-model="form[item.child[0].id]" class="ipt90" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入内容" clearable></el-input>
							<span style="padding: 0 11.5px;color:#999999;font-size:12px;">至</span>
							<el-input v-model="form[item.child[1].id]" onkeyup="value=value.replace(/[^\d]/g,'')" class="ipt90" placeholder="请输入内容" clearable></el-input>
						</div>
						<div v-if="item.type == 'three'" class="ipt">
							<el-input v-model="form[item.child[0].id]" class="ipt91" placeholder="国家" clearable style="width: 100px;"></el-input>
							<span style="color:#999999;font-size:12px;margin: 0 5px;">-</span>
							<el-input v-model="form[item.child[1].id]" class="ipt91" placeholder="省" clearable style="width: 100px;"></el-input>
							<span style="color:#999999;font-size:12px;margin: 0 5px;">-</span>
							<el-input v-model="form[item.child[2].id]" class="ipt91" placeholder="市" clearable style="width: 100px;"></el-input>
						</div>
						<div v-if="item.type == 'text'" class="ipt">
							<el-input  placeholder="请输入内容" v-model="form[item.id]"  clearable></el-input>
						</div>
						<div v-if="item.type == 'display'" :style="{visibility: (item.type == 'display' ? 'hidden' : '')}">
							<button class="ipt"></button>
						</div>
					</li>
					<!-- <li>
						<city></city>
					</li> -->
				</ul>
			</div>
			<div class="screenBottom paddinglr30">
				<div class="screenBottombtn ofh">
					<button class="fleft defaultbtn" @click="reset">重置</button>
					<button class="fright defaultbtn defaultbtnactive" @click="getparent('reach')">查询</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DataScreen from "@/assets/DataScreen.js"
	import city from "@/components/citys.vue"
	
	export default {
		props: ["pageName","tabnum","name"],
		data() {
			return {
				form: {},
				vocation:{
					vocation:[],
					recommend_level:[],
					business_type:[]
				},
				texts: '',
				options: [],
				value: '',
				value2:[],
				currentpageName:"",
				times:[],
				selectedOptions:[],
				cascaderOptions: [],
				citye:["中国","北京市","东城区"],
				defaultProps: {
				  children: 'sub_data',
				  label: 'classify_name'
				},
			}
		},
		components:{
			city
		},
		methods: {
			vocations(arr){
				this.form[arr] = this.vocation[arr].toString();
				// console.log(this.form[arr])
			},
			getparent(data) {
				

				if (data == "reach") {
					//console.log()
					// if(this.vocation != ""){
					// 	this.form['vocation'] = this.vocation.join(',');
					// };
					if(this.form.business_type != 'undefined'){	
						let a = '';				
						(this.form.business_type || '').split(',').forEach(item => {
							if(item == '场景主题'){
								a += 3 + ",";
							}
							if(item == '个性化主题'){
								a += 4 + ",";
							}
							if(item == '来电秀'){
								a += 5 + ",";
							}
							if(item == '其他'){
								a += 6 + ",";
							}
							if(item == '杂志锁屏'){
								a += 7 + ",";
							}
						})
						this.form.business_type = a.substring(0,a.lastIndexOf(','));	 
					}
					if(this.selectedOptions.length != 0){
						this.form['classify_1'] = this.selectedOptions[0];
						this.form['classify_2'] = this.selectedOptions[1];
						this.form['classify_3'] = this.selectedOptions[2];
					}
					if(this.cascaderOptions.length != 0){
						var arr = '';
						var arr1 = '';
						var arr2 = '';
						this.cascaderOptions.forEach((item, index) => {
							arr += item[0] + ",";
							arr1 += item[1] + ",";
							arr2 += item[2] + ",";
						})
						this.form['classify_1'] = this.removeRepeatStr(arr).substring(0,this.removeRepeatStr(arr).lastIndexOf(','));
						this.form['classify_2'] = this.removeRepeatStr(arr1).substring(0,this.removeRepeatStr(arr1).lastIndexOf(','));
						this.form['classify_3'] = this.removeRepeatStr(arr2).substring(0,this.removeRepeatStr(arr2).lastIndexOf(','));					
					}		
					this.$router.push({
						query: {
							urlDate: JSON.stringify(this.form)
						}
					});
					// eventBus.$emit("sreenData", this.form);
				}
			    this.$parent.screenmask("Off", "left1");
			},
			removeRepeatStr(str){
				var arr = str.split(",");
				var newStr="";
				for(var i=0;i<arr.length;i++){
					if(newStr.indexOf(arr[i])==-1){
						newStr+=arr[i] + ",";
					}
				}
				return newStr;
			},
			init() {
				//alert(typeof this.$route.query.urlDate != "string")
				if(this.$route.query.urlDate){
					this.form = JSON.parse(this.$route.query.urlDate);
				}
				// document.addEventListener('keydown',(e)=>{
				// 	if(e.keyCode==13){				
				// 		this.getparent('reach');					
				// 	}
				// },false)
			},
			getScreen() {
				if(this.tabnum){
					if(this.tabnum == 1){
						this.texts = DataScreen.screen[this.pageName].filterFields0
					};
					if(this.tabnum == 2){
						this.texts = DataScreen.screen[this.pageName].filterFields1
					};
					if(!DataScreen.screen[this.pageName].filterFields1 && !DataScreen.screen[this.pageName].filterFields0){
						this.texts = DataScreen.screen[this.pageName].filterFields
						
					}
				} else {
					if(this.pageName && this.pageName == "addblack"){
						this.texts = DataScreen.screen.addblack["filterFields"+this.$parent.tabnum];
						return;
					} else if(this.pageName && this.pageName == "homeBanner"){
						this.texts = DataScreen.screen.homeBanner["filterFields"+0];
						return;
					} else {
						this.texts = DataScreen.screen[this.pageName].filterFields;
					}
				}
			},
			reset() {
				this.form = {};
				this.times = [];
				this.cascaderOptions = [];
				this.vocation = {
					vocation:[],
					recommend_level:[],
					business_type:[]
				};
			},
			timetwo(time,index){
				// console.log(this.times)
				this.form[time[0].id] = this.times[index][0];
				this.form[time[1].id] = this.times[index][1];
				//console.log(this.form)
			},
			handleChange(value) {
				// console.log(value)
			},
		},
		watch: {
			"$route":function(){
				// this.form = JSON.parse(this.$route.query.urlDate);
				this.vocation = {
					vocation:[],
					recommend_level:[],
					business_type:[]
				};
			}
		},
		mounted() {
			this.getScreen();
			this.init();
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			//console.log(this.$route.matched);
		}
	}
</script>

<style scoped="scoped">
	.screenborder {
		width: 380px;
		background: #FFFFFF;
		border-radius: 5px;
		right: 26px;
		top: 108px;
        position: absolute;
		overflow-y: scroll;
		height: calc(100% - 127px);
	}

	.screenMiddenul {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		flex-flow: row wrap;
	}

	.screenMiddenul li {
		margin-top: 27px;
	}
	.screenMiddenul li .label{
		color: #999999;
		font-size: 12px;
	}

	.el-select-dropdown .checkboxipt {
		width: 200px;
		height: 32px;
		margin: 7px auto 14px;
		display: block;
	}

	.checkboxipt input {
		display: block;
		height: 32px;
		margin: 0 auto;
	}

	.el-select-dropdown__item .el-checkbox {
		width: 100%;
	}
	
	.sel-text .screentext{
		width: 200px;
		height: 32px;
		line-height: 32px;
		display: block;
	}
	
	.screentext .el-input__inner {
		height: 32px;
		line-height: 32px;
	}
	
	.screentextbg{
		padding:5px 12px;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
		border-radius: 4px;
		position: relative;
		z-index: 2013;
	}
	#app .el-dropdown-link{
		padding: 0;
	}
	.ipt91 >>> .el-input__inner{
		padding-right: 5px;
	}
	.ipt >>> .el-select{
		/* margin-bottom: 20px !important;
        margin-left: 2px !important; */
		height: auto !important;
		width: 335px;
	}
	.screenBottom{
		width: 380px;
		position: fixed;
		bottom: 2%;
		right: 1.33%;
		padding: 0;
		background: #FFFFFF;
		z-index: 999999;
	}
</style>
