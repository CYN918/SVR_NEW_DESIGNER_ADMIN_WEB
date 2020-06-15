<template>
	<div>
		<div class="zxm_l_01">
			<span @click="qhN(el.v)" v-for="el in btns">
				{{el.n}}<span v-if="el.num>0">（{{el.num}}）</span>
			</span>
		</div>
		<component v-bind:is="compData.zj" v-model="compData"></component>
	</div>
</template>

<script>
import zxm1 from './zxm_t1'
import zxm2 from './zxm_t2'
import zxm3 from './zxm_t3'
export default{
	components: {
		zxm1,
		zxm2,
		zxm3
	},
	data(){
		return {
			
			checkOn:"3",
			btns:[
				{n:'制作阶段',num:0,v:"zxm1"},
				{n:'已验收',num:0,v:"zxm2"},
				{n:'已停止',num:0,v:"zxm3"},
			],
			compData:{
				zj:'zxm1',
				// url:'subprojectsList',
				// status:'',
				// project_id:'',	
				// tabCon:[],
			},
			tabCon:{
				"3":[
					{prop:'id',lable:'ID'},
					{prop:'id',lable:'子项目'},
					{prop:'id',lable:'制作人',width:120},
					{prop:'id',lable:'截稿时间'},
					{prop:'id',lable:'当前状态',width:120},
				],
				"4":[
					{prop:'id',lable:'ID'},
					{prop:'id',lable:'子项目'},
					{prop:'id',lable:'制作人',width:120},
					{prop:'id',lable:'结算方式'},
					{prop:'id',lable:'成交价格'},
					{prop:'id',lable:'验收时间'},
					{prop:'id',lable:'当前状态',width:120},
				],
				"-1":[
					{prop:'id',lable:'ID'},
					{prop:'id',lable:'子项目'},
					{prop:'id',lable:'制作人',width:120},
					{prop:'id',lable:'终止理由'},
					{prop:'id',lable:'当前状态',width:120},
				]
			}
		}
	},
	mounted(){
		this.init();
	},
	methods:{	
		init(){
			console.log(1);
		},
		qhN(v){
			this.checkOn = v;	
		},
		
	}
}
</script>

<style>
</style>
