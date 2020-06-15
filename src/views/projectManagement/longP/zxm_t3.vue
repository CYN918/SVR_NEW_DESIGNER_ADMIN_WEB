<template>
	<div v-loading="loading">
		<el-table 
			:reserve-selection="true" 
			:data="tableDatas" 
			tooltip-effect  
			:header-cell-style="cellStyle">
			<el-table-column v-for="(item,index) in tConfig" :prop="item.prop" :label="item.lable" :width="item.width">
				<template slot-scope="scope">
					<div>
						<div class="bm_uimg" v-if="item.type=='imgs'">
							<span 
							v-for="(el,index) in scope.row[item.prop]" 
							@click="tabCl(item.clfn,scope.row,index)"
							:style="setImg(el)"></span>
						</div>
						<span v-else-if="item.type=='status'">
							{{item.clfn(scope.row)}}
						</span>
						<span v-else-if="item.type=='mosFn'">
							<span @mouseout="tabmsout($event,item,scope.row)" @mouseover="tabmsover($event,item,scope.row)">{{scope.row[item.prop]}}</span>
							
						</span>
						
						<span v-else>
							{{scope.row[item.prop]}}
						</span>
					</div>
				</template>	
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="160">
				<template slot-scope="scope">
					<span @click="tabCl(el.fn,scope.row)" v-for="el in gettools(scope.row)">
						{{el.n}}
					</span>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<el-pagination class="sel-pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
			 :page-sizes="[50, 100, 200, 500]" :page-size="limit" layout="sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		
		<div :style="dwpsDat" @mouseover="setT2(true)" @mouseout="setT2(false)" class="user_n_01">
			<div>
				<img class="user_n_02" :src="userInfo.avatar">
				<div class="user_n_03">
					<div class="user_n_04">{{userInfo.username}}</div>
					<div class="user_n_05">{{userInfo.vocation}}|{{userInfo.city}}</div>
				</div>
			</div>
			<div class="user_n_06">
				<span>粉丝<i></i>{{userInfo.fans_num}}</span>
				<span>人气<i></i>{{userInfo.popular_num}}</span>
				<span>作品<i></i>{{userInfo.work_num}}</span>
				<span>接单<i></i>{{userInfo.project_hire_num}}</span>
				<span>收益<i></i>{{userInfo.project_income}}</span>
				<span>评级<i></i>{{userInfo.recommend_level}}</span>
			</div>
			<div class="user_n_07">
				工作现状<span class="user_n_08">{{userInfo.situation}}</span>
			</div>
			<div class="user_n_07">
				类型偏好<span class="user_n_08">{{userInfo.preference_classify}}</span>
			</div>
			<div class="user_n_07">
				每周时间<span class="user_n_08">{{userInfo.work_experience}}</span>
			</div>
			<div class="user_n_07">
				擅长风格
				<div class="user_n_09">
					<span v-for="el in arrchange(userInfo.style)">{{el}}</span>
				</div>
			</div>
			<div class="user_n_07">
				擅长领域
				<div class="user_n_09">
					<span v-for="el in arrchange(userInfo.field)">{{el}}</span>
				</div>
			</div>
			<div class="user_n_07 user_n_10">
				<span @click="userdetail(userInfo.open_id)">用户详情</span>
				<span @click="gotoweb(userInfo.open_id)">个人主页</span>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>
