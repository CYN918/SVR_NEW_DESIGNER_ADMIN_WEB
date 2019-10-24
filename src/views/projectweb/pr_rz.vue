<template>
	<tanC :title="'报名项目'">
		<template v-slot:todo="{ todo }">
			<div class="pr_rzd">
				<div class="pr_rzd_1">报名前你还需要完成以下事项</div>
				<div class="pr_rzd_2">
					<div v-if="!datad.is_contributor">
						<img src="/imge/project/rz_01.svg" alt="">
						<div>完成供稿人认证</div>
						<div @click="gorz()" class="btns btns_js pend">立即认证</div>
					</div><div @click="goTo('/upload')" v-if="datad.work_num!=3">
						<img src="/imge/project/rz_02.svg" alt="">
						<div>上传并通过3个原创作品（{{datad.work_num}}/3）</div>
						<div class="btns btns_js pend">立即创作</div>
					</div><div v-if="!datad.is_complete">
						<img src="/imge/project/rz_03.svg" alt="">
						<div>完善个人能力资料</div>
						<div @click="goTo('/setSkill')" class="btns btns_js pend">立即完善</div>
					</div>
				</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
export default {
	components:{tanC},
	props:{
		datad:Object
	},
	data(){
		return{}
	},
	methods: {	
		gorz(){
			this.is='';
		},
		close(){
			this.$parent.close();
		},
		goTo(p){
			this.$router.push({path: p})	
		}
	}
}		
	
</script>

<style>
.pr_rzd{
	white-space: nowrap;
	padding: 30px 67.5px;
}
.pr_rzd_1{
	margin-bottom: 30px;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.pr_rzd_2>div{
	display: inline-block;
	margin: 0 22.5px;
}
.pr_rzd_2>div>img{
	display: block;
	margin-bottom: 10px;
	width: 178px;
	height: 100px;
}
.pr_rzd_2>div>div:nth-child(2){
	margin-bottom: 30px;
	font-size:14px;
	text-align: center;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.tbn_1{
	
}
</style>
