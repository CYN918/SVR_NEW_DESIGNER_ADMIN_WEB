<template>
  <div class="wh">
      <div class="sideBar h fleft">
        <side-bar></side-bar>    
      </div>
      <div class="mainContent h fright">
        <div class="mainContentNav w">
          <nav-bar></nav-bar>
        </div>
        <div class="mainContentMidden">
          <keep-alive>
            <transition name="fade-transform" mode="out-in">
             <router-view/>
            </transition>
          </keep-alive>
        </div>
		<div class="mainContentMiddenBottom">Copyright @ www.zookingsoft.com, All Rights Reserved.</div>
      </div>
	  <div class="screenbg" v-if="IsScreen == 'No'">
		  <common-screen :pageName="pageName"></common-screen>
	  </div>
	  <div class="screenbg" v-if="IsScreenShow == 'No'">
	  	  <common-screen-show :pageName="pageName"></common-screen-show>
	  </div>
  </div>
</template>

<script>
import sideBar from '@/components/Sidebar.vue'
import navBar from '@/components/NavBar.vue'
export default {
  components:{
    sideBar,
    navBar
  },
  props:{},
  data(){
    return {
		IsScreen:"Off",//筛选显隐控制
		IsScreenShow:"off",//展示字段筛选显隐控制
		pageName:"",
    }
  },
  watch:{},
  computed:{},
  methods:{
	screenmask(data,n){
		this.pageName = "";
		switch (n){
			case "left1":
				this.IsScreen = data;
				break;
			case "right2":
				this.IsScreenShow = data;
				break;
			default:
				break;
		}
		
	},
	eventbus(){
		eventBus.$on("screenshow",(data)=>{
			this.pageName = data.pageName;
			switch (data.num){
				case "left1":
					this.IsScreen = data.showmask;
					break;
				case "right2":
					this.IsScreenShow = data.showmask;
					break;
				default:
					break;
			}
		})
	}
	
  },
  created(){},
  mounted(){
	this.eventbus();
  }
}
</script>
<style lang="scss" scoped>
  $sideBarWidt: 280px;
  .sideBar {
    width: $sideBarWidt;
  }
  .mainContent{
    width: calc(100% - 280px);   
  }
  .mainContentNav {
    height: 60px;
  }
  .mainContentMidden{
		width: calc(100% - 40px);
    height: calc(100% - 175px);
		background: #f0f2f5;
		padding: 20px;
		overflow: hidden;
  }
	
	.mainContentMiddenBottom{
		font-size: 14px;
		color: #999999;
		padding: 25px 0 28px;
		text-align: center;
		background: #f0f2f5;
		
	}
	
	.screenbg{
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.5);
		width: 100%;
		height: 100%;
		z-index: 999;
	}
</style>