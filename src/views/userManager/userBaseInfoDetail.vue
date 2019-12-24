<template>
	<div class="wh Detail ofh">
		<div class="detailtitle">查看用户信息</div>
		<div style="overflow-y: auto;height:calc(100% - 40px);width: 100%;">
			<div class="textcenter" style="margin: 10px 0;">
				<span :class="index == 0 ? 'userchange userchangeactive' : 'userchange'" @click="change(0)">基本资料</span>
				<span :class="index == 1 ? 'userchange userchangeactive' : 'userchange'" @click="change(1)">能力资料</span>
			</div> 
			<ul style="padding-left: 132px;" v-if="index == 0">
				<li class="margint13 ofh">
					<span class="fleft detailKey" >用户ID</span>
					<span class="fleft detailValue">{{ getValue(detailData.open_id) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey detailKeyImg">头像</span>
					<span class="fleft detailValue detailValueImg" :style="{background:'url('+ detailData.avatar +') center center no-repeat / 100% 100%'}"></span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户名</span>
					<span class="fleft detailValue">{{ getValue(detailData.username)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">手机区号</span>
					<span class="fleft detailValue">{{ getValue(detailData.mobile_zone) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">手机号</span>
					<span class="fleft detailValue">{{ getValue(detailData.mobile) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">邮箱</span>
					<span class="fleft detailValue">{{ getValue(detailData.email) }}</span>
				</li>
				<!-- <li class="margint13 ofh">
					<span class="fleft detailKey">目前状态</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li> -->
				<li class="margint13 ofh">
					<span class="fleft detailKey">性别</span>
					<span class="fleft detailValue">{{  getsex(detailData.sex) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">职业</span>
					<span class="fleft detailValue">{{ getValue(detailData.vocation) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">所在地</span>
					<span class="fleft detailValue">{{ detailData.country+detailData.province+detailData.city+detailData.address }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">个性签名</span>
					<span class="fleft detailValue">{{ getValue(detailData.personal_sign)  }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">作品数量</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ getValue(detailData.work_num) }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">关注人数</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ getValue(detailData.follow_num)  }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">粉丝人数</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ getValue(detailData.fans_num)  }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">学校名称</span>
					<span class="fleft detailValue">{{ getValue(detailData.education_school)  }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">授权认证-微信号</span>
					<span class="fleft detailValue">{{ getValue(detailData.weixin_name)  }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">授权认证-QQ号</span>
					<span class="fleft detailValue">{{ getValue(detailData.qq_name)  }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">授权认证-微博</span>
					<span class="fleft detailValue">{{ getValue(detailData.weibo_name)  }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">主页链接</span>
					<span class="fleft detailValue routerLink pointer" @click="openwindow(detailData.home_page)">
						{{ getValue(detailData.home_page)  }}
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">注册时间</span>
					<span class="fleft detailValue">{{ getValue(detailData.create_time)   }}</span>
				</li>
				<!-- <li class="margint13 ofh">
					<span class="fleft detailKey">上次登录时间</span>
					<span class="fleft detailValue">{{ getValue(detailData.follow_num)}}</span>
				</li> -->
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否为平台推荐创作者</span>
					<span class="fleft detailValue">{{ detailData.is_contributor=='1' ? "是" : "否" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">平台推荐等级</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ detailData.recommend_level ? getValue(detailData.recommend_level) : "不推荐"  }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否供稿人</span>
					<span class="fleft detailValue">{{ getValue2(detailData.is_contributor) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">供稿人认证账号主体</span>
					<span class="fleft detailValue">{{ getValue1(detailData.contributor_type) }}</span>
				</li>
			</ul>
			<ul style="padding-left: 132px;" v-if="index == 1">
				<li class="margint13 ofh">
					<span class="fleft detailKey" >工作现状</span>
					<span class="fleft detailValue">{{ getValue(SkillInfo.situation) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey ">每周承接项目时间</span>
					<span class="fleft detailValue ">{{ getValue(SkillInfo.work_experience) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">设计经验</span>
					<span class="fleft detailValue">{{ getValue(SkillInfo.design_experience)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">偏好项目类别</span>
					<span class="fleft detailValue">{{ getValue(SkillInfo.preference_classify)}}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">擅长风格</span>
					<span class="fleft detailValue">{{ getValue(SkillInfo.style	) }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">擅长领域</span>
					<span class="fleft detailValue">{{ getValue(SkillInfo.field) }}</span>
				</li>
				
			</ul>
			<div class="screenContent detailbtn">
				<button v-if="!hide" class="defaultbtn"  @click="getparent()">返回</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				detailData:'',
				hide:"",
				index:0,
				SkillInfo:{}
			}
		},
		methods:{
			change(n){
				this.index = n; 
			},
			openwindow(url){
				window.open(url);
			},
			getValue(val){
				if(val) {
					return val
				} else{
					return "--"
				}
			},
			getValue1(n){
				let child={
					"1":"个人",
					"2":"企业"
				};
				return child[n];
			},
			getValue2(n){
				let child={
					"0":"否",
					"1":"是"
				};
				return child[n];
			},
			getparent(){
				//this.$parent.IsDetail = false;
				this.$router.go(-1);
			},
			getdata(){
				
				this.api.getUserInfo({open_id:this.$route.query.open_id}).then(da => {
					this.detailData = da;
					console.log(da);
				}).catch(()=>{
					
				})
			},
			getsex(id){
				var child={
					"1":"男",
					"2":"女",
				}
				if(id){
					return child[id]
				} else {
					return "未填"
				}
			},
			getSkillInfo(){
				this.api.getSkillInfo({
					access_token:localStorage.getItem('access_token'),
					open_id:this.$route.query.open_id
				}).then(da=>{
					console.log(da);
					this.SkillInfo = da;
				}).catch(da=>{
					
				})
			}
		},
		mounted(){
			this.getdata();
			this.getSkillInfo();
			this.hide = this.$route.query.hide;
		}
	}
</script>

<style>
	.Detail{
		background: white;
	}
	.detailtitle{
		padding-left: 40px;
		padding-top: 18px;
	}
	
	.detailContent{
		height: calc(100% - 18px);
		overflow-y: auto;
	}
	
	.detailContent ul{
		padding-left: 132px;
		padding-top: 64px;
	}
	
	.margint13{
		margin-bottom: 13px;
	}
	
	.detailKey{
		width: 160px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
	}
	
	.detailValueImg{
		width: 68px;
		height: 68px;
		border-radius: 50%;
	}
	
	.detailKeyImg{
		line-height: 68px;
	}
	
	.routerLink{
		color: #FF5121;
	}
	
	.detailbtn{
		height: 100px;
	}
	.userchange{
		margin: 0 20px;
		display: inline-block;
		padding-bottom: 10px;
		cursor: pointer;
	}
	
	.userchangeactive{
		color: #FF5121;
		border-bottom: 2px solid #FF5121;
	}
</style>
