<template>
	<tanC :title="'项目评价'">
		<template v-slot:todo="{ todo }">
			<div class="question_00">
				<div class="question_01">{{datad.name}}</div>
				<ul class="question_02">
					<li v-for="(el,index) in List" :key="index">
						<div class="ques_01">{{el.sort+'、'+el.question}}</div>
						<div class="ques_02" v-if="el.type==1">
							<label @click="chekdeal_type(el.id,key)" v-for="(el2,key) in el.option" :key="key">
								<span :class="key==postData[el.id]?'chekdOn':''"></span>
								{{el2}}
							</label>
						</div>
						<textAert v-model="postData[el.id]" v-if="el.type==2"></textAert>													
					</li>
				</ul>
				
			</div>
			
			<div class="bmXm_01Btn">
				<div @click="close" class="btns pend">取消</div>
				<div @click="pushd" class="btns btns_js pend">确定</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
import textAert from './textAert';
export default {
	components:{tanC,textAert},
	props:{
		datad:Object,
	},
	data(){
		return{
			postData:{},
			textar:'',
			List:[],
			lisr:[],
		}
	},
	
	mounted: function(){
		this.init();
	},

	methods: {	
		init(){			
			this.pr_question();
		},
		chekdeal_type(a,b){
			if(!this.postData[a]){
				this.$set(this.postData,a,b);
				return
			}
			this.postData[a] = b;
		},
		cseee(e){
			console.log(e)
		},
		close(){			
			this.$parent.close();
		},
		pushd(){
			let ond = 0;
			for(let i=0,n=this.lisr.length;i<n;i++){
				if(!this.postData[this.lisr[i]]){
					
					this.$message({message:'请先回答问题'});
					ond=1;
					break;
				}
			}
			if(ond==1){return}
			
			this.api.pr_evaluate({
				project_id:this.datad.id,
				result:JSON.stringify(this.postData)
			}).then((da)=>{
				if(da=='error'){return}
				this.$message({message:'项目评价完成，感谢你的评价'});
				this.$parent.getData();
				this.close();
			});
		},
		pushBm(){
		
			this.api.pr_signup(this.postData).then((da)=>{
				if(da=='error'){return}
				this.$message({message: '报名成功'});
				this.close();
				this.$parent.setBm(1);
			}).catch(()=>{
				
			});
		},
		pr_question(){			
			this.api.pr_question({}).then((da)=>{				
				if(da=='error'){					
					return
				}		
				for(let i=0,n=da.length;i<n;i++){
					this.lisr.push(da[i].id);
				}		
						
				this.List = da;	
			})
		},
		
	}
}		
	
</script>

<style>
.question_00{
	overflow: hidden;
	overflow-y: auto;
	padding: 30px 40px 0;
	width: 700px;
	height: 454px;
	text-align: left;
}
.question_01{
	font-size:16px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 30px;
}
.question_02>li{
	margin-bottom: 23px;
}
.ques_01{
	font-size:14px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 13px;
}

.ques_02 span{
	position: relative;
	display: inline-block;
	vertical-align: middle;
	margin-right: 8px;
	width:14px;
	height:14px;
	background:rgba(255,255,255,1);
	border-radius:2px;
	border:1px solid rgba(217,217,217,1);
}
.ques_02 label{
	cursor: pointer;
	margin-right: 20px;
}
.ques_02 span.chekdOn{
	background: #33B3FF;
	border-color: #33B3FF;
}
.ques_02 span.chekdOn:after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 4px;
    border: 1px solid #fff;
    border-top: 0;
    border-right: 0;
    -webkit-transform: rotate(-58deg) translate(-21%,76%);
    transform: rotate(-58deg) translate(-21%,76%);
}


</style>
