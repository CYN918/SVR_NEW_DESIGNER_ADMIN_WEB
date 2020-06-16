<template>
	<div>
		<div class="zxm_l_01">
			<span :class="el.v==compData.zj?'ischkon':''" @click="qhN(el.v)" v-for="el in btns">
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
			btns:[
				{n:'制作阶段',num:0,v:"zxm1"},
				{n:'已验收',num:0,v:"zxm2"},
				{n:'已停止',num:0,v:"zxm3"},
			],
			compData:{
				zj:'zxm1',
			},
		}
	},
	mounted(){
		this.init();
	},
	methods:{	
		init(){
			this.getNum();
		},
		qhN(v){
			this.compData.zj = v;
		},
		getNum(){
			this.api.subprogetCount({
				access_token:localStorage.getItem("access_token")
			}).then((da)=>{
				this.btns[0].num = da.product;
				this.btns[1].num = da.accept;
				this.btns[2].num = da.terminated;
			})
		}
		
	}
}
</script>

<style>
.zxm_l_01{
	margin-left: 10px;
}
.zxm_l_01>span{
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	cursor: pointer;
}
.zxm_l_01>.ischkon{
	color: #33B3FF;
}
</style>
