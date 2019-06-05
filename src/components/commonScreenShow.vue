<template>
	<div class="wh screenContent">
		<div class="screenbordershow">
			<div class="screenTop paddinglr30">
				<span class="fleft">{{ currentpageName }}-展示字段筛选</span>
				<span class="fright fontsize24 screenclose pointer" @click="getparent()">x</span>
			</div>
			<div class="screenMidden paddinglr30">
				<el-checkbox-group class="screenMiddenShowul" v-model="selectbtns">
					<el-checkbox class="checkboxshow" v-for="(item,index) in btns" :label="item.prop" :key="item.lable" border>{{item.lable}}</el-checkbox>
					<button class="defaultbtn" style="visibility: hidden;width: 170px;"></button>
				</el-checkbox-group>
			</div>
			<div class="screenBottom paddinglr30">
				<div class="screenBottombtn ofh">
					<button  class="fleft defaultbtn" @click="reset">恢复默认</button>
					<button class="fright defaultbtn defaultbtnactive" @click="getparent('reach')">确 定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DataScreen from "@/assets/DataScreen.js"
	export default {
		props:["pageName"],
		data() {
		  return {
			checkAll: false,
			btns: [],
			isIndeterminate: true,
			selectbtns:[],
			currentpageName:"",
		  };
		},
		methods:{
			getparent(data){
				//传值到父组件隐藏本组件 
				if(data == "reach") {
					this.saveSelectBts(this.selectbtns)
				}
				this.$parent.screenmask("Off","right2");
			},
			reset() {
				//重置默认选中按钮
				this.selectbtns = DataScreen.screenShow[this.pageName].defaults;
			},	
			handleCheckedCitiesChange(value) {
				this.selectbtns = value;
			},
			getScreen(){
				//alert(this.pageName)
				//以及pagenema获取相应的展示字段
				this.btns = DataScreen.screenShow[this.pageName].bts;
			},
			saveSelectBts(value){
				//传值到commonTable.vue;
				//console.log(value);
				eventBus.$emit("screenShowDataChange",value);
				localStorage.setItem("screenShowDataChange",value.join(","));
			},
			initbts(){
				//初始化
				//console.log(localStorage.getItem("screenShowDataChange"))
				if(localStorage.getItem("screenShowDataChange")){
					this.selectbtns =  localStorage.getItem("screenShowDataChange").split(',');
				} else {
					this.selectbtns = DataScreen.screenShow[this.pageName].defaults ;
				}
			}
		},
		mounted() {
			this.getScreen();
			this.initbts();
			this.currentpageName = this.$route.matched[this.$route.matched.length-1].meta.title;
		}
	}
</script>

<style>
	.screenbordershow{
		width: 709px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	
	.screenMiddenShowul{
		padding-top:30px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		flex-flow: row wrap; 
	}
	
	.checkboxshow{
		width: 203px;
		height: 56px;
		margin: 0;
		margin-bottom: 20px;
	}
	
	.el-checkbox.is-bordered.is-checked{
		border-color: #FF5121 !important;
	}
	
	.el-checkbox.is-bordered+.el-checkbox.is-bordered{
		margin-left: 0 !important;
	}
	
	.el-checkbox__input.is-focus .el-checkbox__inner{
		border-color: #DCDFE6 !important;
	}
	
	.el-checkbox{
		margin-right: 0 !important;
	}
</style>
