<template>
	<div class="wh screenContent" style="position: relative; z-index: 2013;">
		<div class="screenborder">
			<div class="screenTop paddinglr30">
				<span class="fleft">{{ currentpageName }}-筛选</span>
				<span class="fright fontsize24 screenclose pointer" @click="getparent()">x</span>
			</div>
			<div class="screenMidden paddinglr30">
				<ul class="screenMiddenul ofh w">
					<li v-for="(item,index) in texts" :key="item.id">
						<div>
							{{ item.name }}
						</div>
						<!-- form.selct[item.a] -->
						<el-input class="ipt" placeholder="请输入内容" v-model="form[item.id]" v-if="(!item.child) && (!item.type)"
						 clearable></el-input>
						<el-dropdown trigger="click" v-else-if="item.child && item.type == 'more'" :hide-on-click="false">
							<el-input class="ipt el-dropdown-link" placeholder="请输入内容" v-model="vocation.join(',')" suffix-icon="el-icon-arrow-down"
							 clearable></el-input>
						    <el-dropdown-menu slot="dropdown" style="width: 200px;height: 260px;">
								<el-checkbox-group v-model="vocation">
									<el-dropdown-item v-for="(citem,index) in item.child" :key="index" >
										<el-checkbox  :label="citem" >{{citem}}</el-checkbox>
									</el-dropdown-item>
								</el-checkbox-group>
						    </el-dropdown-menu>
						</el-dropdown>
						<el-select v-model="form[item.id]" placeholder="请选择" v-else-if="item.child && !item.type">
							<el-option value="" label="全部"></el-option>
							 <el-radio-group v-model="form[item.id]">
								<el-option v-for="(childitem,index) in item.child" :value="childitem.id" :label="childitem.name">
									<el-radio :value="childitem.id" :label="childitem.id">{{ childitem.name }}</el-radio>
								</el-option>
							</el-radio-group>
						</el-select>
						 <el-date-picker
						  v-if="item.type == 'time'"
						   @change="timetwo(item.child)"
						  class="ipt"
						  v-model="times"
						  type="daterange"
						  value-format="yyyy-MM-dd HH:mm:ss"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  >
						</el-date-picker>
						<el-cascader v-if="item.type == 'cascader'"
							expand-trigger="hover"
							:options="item.child"
							:props="item.optionProps"
							v-model="selectedOptions"
							@change="handleChange">
						</el-cascader>
						<div v-if="item.type == 'two'">
							<el-input v-model="form[item.child[0].id]" class="ipt90" placeholder="请输入内容" clearable></el-input>
							<span style="padding: 0 14px;">至</span>
							<el-input v-model="form[item.child[1].id]" class="ipt90" placeholder="请输入内容" clearable></el-input>
						</div>
						<div v-if="item.type == 'text'">
							<el-input class="ipt" placeholder="请输入内容" v-model="form[item.id]"  clearable></el-input>
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
		props: ["pageName","tabnum"],
		data() {
			return {
				form: {},
				vocation:[],
				texts: '',
				options: [],
				value: '',
				value2:[],
				currentpageName:"",
				times:[],
				selectedOptions:[],
				citye:["中国","北京市","东城区"]
			}
		},
		components:{
			city
		},
		methods: {
			getparent(data) {
				if (data == "reach") {
					//console.log()
					if(this.vocation != ""){
						this.form['vocation'] = this.vocation;
					};
					
					if(this.selectedOptions.length != 0){
						this.form['classify_1'] = this.selectedOptions[0];
						this.form['classify_2'] = this.selectedOptions[1];
						this.form['classify_3'] = this.selectedOptions[2];
					}
					
					
					this.$router.push({
						path: this.$route.matched[this.$route.matched.length - 1].path,
						query: {
							urlDate: JSON.stringify(this.form)
						}
					});
					eventBus.$emit("sreenData", this.form);
				}
				this.$parent.screenmask("Off", "left1");
			},
			init() {
				//alert(typeof this.$route.query.urlDate != "string")
				if(this.$route.query.urlDate){
					this.form = JSON.parse(this.$route.query.urlDate);
				}
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
					this.texts = DataScreen.screen[this.pageName].filterFields
				}
			},
			reset() {
				this.form = {};
			},
			timetwo(time){
				//console.log(time,thistimes)
				this.form[time[0].id] = this.times[0];
				this.form[time[1].id] = this.times[1];
				//console.log(this.form)
			},
			handleChange(value) {
				console.log(value);
			 }
		},
		watch: {
			"$route":function(){
				this.form = JSON.parse(this.$route.query.urlDate);
			}
		},
		mounted() {
			this.getScreen();
			this.init();
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
			console.log(this.$route.matched);
		},
		
		
	}
</script>

<style>
	.screenborder {
		width: 772px;
		background: #FFFFFF;
		border-radius: 5px;
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
</style>
