const workData = {
	//url imgzheng  imgfeng imgtou text imgbanner
	
		workInfo:[{
			name:"作品ID",
			id:"work_id",
			type:"text"
		},
		{
			name:"作品标题",
			id:"work_name",
			type:"text"
		},
		{
			name:"封面图",
			id:"face_pic",
			type:"imgfeng"
		},
		{
			name:"用户ID",
			id:"open_id",
			type:"text"
		},
		{
			name:"用户昵称",
			id:"username",
			type:"url"
		},
		{
			name:"用户头像",
			id:"avatar",
			type:"imgtou",
		},
		{
			name:"作品类型",
			id:"classify",
			type:"text"
		},
		{
			name:"版权说明",
			id:"copyright",
			type:"text"
		},
		{
			name:"作品标签",
			id:"labels",
			type:"text"
		},
		{
			name:"是否为平台推荐作品",
			id:"is_recommend",
			type:"keyvalue",
			child:{
				"1":"是",
				"0":"否"
			}
		},
		{
			name:"作品推荐等级",
			id:"recommend_level",
			type:"text"
		},
		{
			name:"是否为平台投稿作品",
			id:"is_platform_work",
			type:"keyvalue",
			child:{
				"1":"是",
				"0":"否"
			}
		},
		{
			name:"是否已被录用",
			id:"hire_id",
			type:"isnum",
			child:["是","否"]
		},
		{
			name:"创建时间",
			id:"create_time",
			type:"text"
		},
		{
			name:"最近更新时间",
			id:"updated_at",
			type:"text"
		},
		{
			name:"作品预览链接",
			id: localStorage.getItem("URL")+"/#/cont?id=",
			type:"urlopen"
		},
		{
			name:"当前状态",
			id:"status",
			type:"status",
			child:{
				is_del:{"1":"用户删除","2":"系统下架"},
				status:{"0":"待审核","1":"审核中","2":"审核通过","-1":"草稿","-2":"未通过"}
			}
		}],
		employInfo:
			[
				{
					name:"录用来源",
					id:"activity_id",
					type:"isnum",
					child:["活动录用","直接录用"]
				},
				{
					name:"录用时间",
					id:"hire_time",
					type:"text"
				},
				{
					name:"录用活动ID",
					id:"activity_id",
					type:"text"
				},
				{
					name:"录用活动名称",
					id:"activity_name",
					type:"text"
				},
				{
					name:"录用订单ID",
					id:"id",
					type:"text"
				},
				{
					name:"录用订单名称",
					id:"hire_order_name",
					type:"url"
				},
				{
					name:"录用方式",
					id:"hire_type",
					type:"keyvalue",
					child:{"1":"买断式","2":"分成式"}
				},
				{
					name:"当前状态",
					id:"status",
					type:"btn",
					child:{"0":"待审核","1":"审核中","2":"审核通过","-1":"草稿","-2":"未通过","-3":"已下架","-4":"已删除"}
				},
				{
					name:"最近更新时间",
					id:"updated_at",
					type:"text"
				}
			],
		worksShelves:[
			{
				name:"作品ID",
				id:"work_id",
				type:"text"
			},
			{
				name:"作品标题",
				id:"work_name",
				type:"text"
			},
			
			
			{
				name:"封面图",
				id:"face_pic",
				type:"imgfeng"
			},
			{
				name:"用户ID",
				id:"open_id",
				type:"text"
			},
			{
				name:"用户昵称",
				id:"username",
				type:"url"
			},
			{
				name:"作品类型",
				id:"classify",
				type:"text"
			},
			{
				name:"作品预设链接",
				id:"ids",
				type:"url"
			},
		],
		orderDetial:[
			{
				name:"录用订单ID",
				id:"order_id",
				type:"text"
			},
			{
				name:"录用订单名称",
				id:"hire_order_name",
				type:"text"
			},
			{
				name:"作品ID",
				id:"work_id",
				type:"text"
			},
			{
				name:"作品名称",
				id:"work_name",
				type:"text"
			},
			{
				name:"用户ID",
				id:"open_id",
				type:"text"
			},
			{
				name:"用户昵称",
				id:"username",
				type:"url"
			},
			{
				name:"录用方式",
				id:"hire_type",
				type:"keyvalue",
				child:{"1":"买断式","2":"分成式"}
			}
		]
			
}

export default workData