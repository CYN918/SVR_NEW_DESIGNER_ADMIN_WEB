import commonScreen from './commonScreen.vue'
import commonScreenShow from './commonScreenShow.vue'

function common (Vue){
	if(common.installed){
		return
	}
	Vue.component("commonScreen",commonScreen);
	Vue.component("commonScreenShow",commonScreenShow);
}

export default common