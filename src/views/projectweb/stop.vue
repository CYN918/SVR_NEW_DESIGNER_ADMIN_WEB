<template>
	<tanC :title="titilse[stopT]">
		<template v-slot:todo="{ todo }">
			<div v-if="stopT==0">
				<div class="qxBm_btns_1">终止项目将会永久降低你的信用分，并影响<br/>之后项目中标率，确定要终止项目？</div>	
				<div class="qxBm_btns">
					<div @click="next" class="btns pend">确认终止</div>
					<div @click="close" class="btns btns_js pend">取消</div>			
				</div>
			</div>
			<div v-if="stopT==1">
				<textarea v-model="reason" placeholder="终止项目将会永久降低你的信用分，并影响之后项目中标率，确定要终止项目？" class="stopT_2"></textarea>
				<div class="maxd_ss">{{reason.length}}/140</div>
				<div class="qxBm_btns">
					
					<div @click="close" class="btns pend">取消</div>	
					<div @click="pr_terminate" class="btns btns_js pend">终止并提交</div>	
					
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
		data:Object
	},
	data(){
		return{
			stopT:0,
			titilse:['终止项目','请填写终止理由'],
			reason:'',
		}
	},
	watch:{
		reason:function(v,oldv){		
			if(v.length>140){			
				this.reason = v.substring(0,140);
			}
		}
	},
	methods: {	
		next(){
			this.stopT = 1;
		},
		pr_terminate(){
			if(!this.reason){return}
			this.api.pr_terminate({
				project_id:this.$parent.deta.id,
				reason:this.reason
			}).then((da)=>{
				if(da=='error'){return}				
				this.$message({message:"项目已终止"});
				this.$parent.close();				
				this.$router.push({path: '/index'})	
			}).catch(()=>{
				
			});
		},
		close(){
			this.$parent.close();
		},
	}
}		
	
</script>

<style>
.qxBm_btns_1{
	margin: 30px 84px;
}
.qxBm_btns{
	border-top: 1px solid rgba(244,246,249,1);
	height: 79px;
	line-height: 79px;
}
.stopT_2{
	margin: 40px 100px;
	padding: 15px 20px;
	width:458px;
	height:118px;
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	font-weight:400;
	line-height:20px;
}
</style>
