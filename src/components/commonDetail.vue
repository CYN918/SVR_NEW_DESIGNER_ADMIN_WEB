<template>
	<div class="wh Detail">
		<div class="detailtitle">查看用户信息</div>
		<div class="detailContent ofh">
			<ul>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户ID</span>
					<span class="fleft detailValue">{{ detailData.open_id }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey detailKeyImg">头像</span>
					<span class="fleft detailValue detailValueImg" :style="{background:'url('+ detailData.avatar +') center center no-repeat',backgroundSize:'100% 100%'}"></span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">用户名</span>
					<span class="fleft detailValue">{{ detailData.username }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">手机区号</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">手机号</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">邮箱</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">目前状态</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">性别</span>
					<span class="fleft detailValue">{{ detailData.sex }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">职业</span>
					<span class="fleft detailValue">{{ detailData.vocation }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">所在地</span>
					<span class="fleft detailValue">{{ detailData.country+detailData.province+detailData.city+detailData.address }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">个性签名</span>
					<span class="fleft detailValue">{{ detailData.personal_sign }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">作品数量</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ detailData.works_num }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">关注人数</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ detailData.follow_num }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">粉丝人数</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ detailData.fans_num }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">学校名称</span>
					<span class="fleft detailValue">{{ detailData.education_school }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">授权认证-微信号</span>
					<span class="fleft detailValue">{{ detailData.weixin }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">授权认证-QQ号</span>
					<span class="fleft detailValue">{{ detailData.qq }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">授权认证-微博</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">主页链接</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ detailData.home_page }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">注册时间</span>
					<span class="fleft detailValue">{{  detailData.create_time }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">上次登录时间</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">是否为平台推荐创作者</span>
					<span class="fleft detailValue">{{ detailData.is_contributor==1 ? "是" : "否" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">平台推荐等级</span>
					<span class="fleft detailValue routerLink pointer">
						<router-link to="/userPersonalInfo" tag="div">
							{{ detailData.recommend_level }}
						</router-link>
					</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">平台供稿人</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
				<li class="margint13 ofh">
					<span class="fleft detailKey">供稿人认证账号主体</span>
					<span class="fleft detailValue">{{ "--" }}</span>
				</li>
			</ul>
		</div>
		<div class="screenContent detailbtn">
			<button class="defaultbtn"  @click="getparent()">返回</button>
		</div>
	</div>
</template>

<script>
	export default {
		props:['detailData'],
		methods:{
			getparent(){
				this.$parent.IsDetail = false;
			}
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
		height: calc(100% - 139px);
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
		background: red;
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
</style>
