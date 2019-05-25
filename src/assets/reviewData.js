const reviewData = {
	//url imgzheng  imgfeng imgtou text imgbanner
	publishWork:{
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
			id:"user_name",
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
			name:"作品标签",
			id:"labels",
			type:"arr"
		},
		{
			name:"是否为平台投稿作品",
			id:"is_platform_work",
			type:"child",
			child:{"0":"否","1":"是"}
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
		}],
		reviewinfo:{
			common:[
				{
					name:"审核ID",
					id:"id",
					type:"text"
				},
				{
					name:"提审项",
				},
				{
					name:"提审用户ID",
					id:"open_id",
					type:"text"
				},
				{
					name:"提审用户昵称",
					id:"username",
					type:"url"
				},
				{
					name:"提审时间",
					id:"check_time",
					type:"text"
				},
				{
					name:"当前审核状态",
					id:"check_status",
					type:"btn",
					child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"}
				},
				{
					name:"审核角色",
					id:"role",
					type:"text"
				},
				{
					name:"审核人",
					id:"check_admin_name",
					type:"text"
				},
				{
					name:"审核时间",
					id:"check_time",
					type:"text"
				},
				{
					name:"最近更新时间",
					id:"ads",
					type:"text"
				}
			],
			status1:[
				{
					name:"作品推荐等级",
					id:"recommend_level",
					type:"text"
				}
			],
			status_1:[
				{
					name:"驳回理由",
					id:"check_reason",
					type:"text"
				},
				{
					name:"驳回详细说明",
					id:"check_comment",
					type:"text"
				}
			]
		},
		
	},
	finalistsWork:{
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
			id:"user_name",
			type:"url"
		},
		{
			name:"用户头像",
			id:"avatar",
			type:"imgtou",
		},
		{
			name:"活动ID",
			id:"activity_id",
			type:"text",
		},
		{
			name:"活动标题",
			id:"activity_name",
			type:"url",
		},
		{
			name:"banner",
			id:"banner",
			type:"imgbanner",
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
			type:"arr"
		},
		{
			name:"是否为平台投稿作品",
			id:"is_platform_work",
			type:"child",
			child:{"0":"否","1":"是"}
		},
		{
			name:"是否为平台推荐作品",
			id:"is_recommend",
			type:"child",
			child:{"0":"否","1":"是"}
		},
		{
			name:"作品推荐等级",
			id:"recommend_level",
			type:"text"
		},
		{
			name:"创建时间",
			id:"create_time",
			type:"text"
		},
		{
			name:"最近更新时间",
			id:"name",
			type:"text"
		}],
		reviewinfo:{
			common:[
				{
					name:"审核ID",
					id:"id",
					type:"text"
				},
				{
					name:"提审项",
				},
				{
					name:"提审用户ID",
					id:"open_id",
					type:"text"
				},
				{
					name:"提审用户昵称",
					id:"username",
					type:"url"
				},
				{
					name:"提审时间",
					id:"check_time",
					type:"text"
				},
				{
					name:"当前审核状态",
					id:"check_status",
					type:"btn",
					child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"}
				},
				{
					name:"审核角色",
					id:"role",
					type:"text"
				},
				{
					name:"审核人",
					id:"check_admin_name",
					type:"text"
				},
				{
					name:"审核时间",
					id:"check_time",
					type:"text"
				},
				{
					name:"最近更新时间",
					id:"ads",
					type:"text"
				}
			],
			status_1:[
				{
					name:"驳回理由",
					id:"check_reason",
					type:"text"
				},
				{
					name:"驳回详细说明",
					id:"check_comment",
					type:"text"
				}
			]
		},
		
	},
	employWork:{
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
			id:"user_name",
			type:"url"
		},
		{
			name:"用户头像",
			id:"avatar",
			type:"imgtou",
		},
		{
			name:"活动ID",
			id:"activity_id",
			type:"text",
		},
		{
			name:"活动标题",
			id:"activity_name",
			type:"url",
		},
		{
			name:"banner",
			id:"banner",
			type:"imgbanner",
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
			type:"arr"
		},
		{
			name:"是否为平台投稿作品",
			id:"is_platform_work",
			type:"child",
			child:{"0":"否","1":"是"}
		},
		{
			name:"是否为平台推荐作品",
			id:"is_recommend",
			type:"child",
			child:{"0":"否","1":"是"}
		},
		{
			name:"作品推荐等级",
			id:"recommend_level",
			type:"text"
		},
		{
			name:"创建时间",
			id:"create_time",
			type:"text"
		},
		{
			name:"最近更新时间",
			id:"ids",
			type:"text"
		}],
		reviewinfo:{
			common:[
				{
					name:"审核ID",
					id:"id",
					type:"text"
				},
				{
					name:"提审项",
				},
				{
					name:"提审用户ID",
					id:"open_id",
					type:"text"
				},
				{
					name:"提审用户昵称",
					id:"username",
					type:"url"
				},
				{
					name:"提审时间",
					id:"check_time",
					type:"text"
				},
				{
					name:"当前审核状态",
					id:"check_status",
					type:"btn",
					child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"}
				},
				{
					name:"审核角色",
					id:"role",
					type:"text"
				},
				{
					name:"审核人",
					id:"check_admin_name",
					type:"text"
				},
				{
					name:"审核时间",
					id:"check_time",
					type:"text"
				},
				{
					name:"最近更新时间",
					id:"ads",
					type:"text"
				}
			],
			status1:{
				hire_type2:[
				{
					name:"录用方式",
					id:"hire_type",
					type:"text"
				},
				{
					name:"录用方案ID",
					id:"ids",
					type:"text"
				},
				{
					name:"预计投放渠道",
					id:"channel",
					type:"text"
				}],
				hire_type1:[
					{
						name:"录用方式",
						id:"hire_type",
						type:"text"
					},
					{
						name:"录用价格",
						id:"price",
						type:"text"
					}
				]
			},
			status_1:[
				{
					name:"驳回理由",
					id:"check_reason",
					type:"text"
				},
				{
					name:"驳回详细说明",
					id:"check_comment",
					type:"text"
				}
			]
		},
		
	},
	applyPerson:{
		contributor_type1:[
			{
				name:"提交类型",
				id:"check_type",
				type:"child",
				child:{"1":"为初次申请","2":"为驳回复审申请 ","3":"为修改信息申请"}
			},
			
			{
				name:"用户ID",
				id:"open_id",
				type:"text"
			},
			{
				name:"用户昵称",
				id:"user_name",
				type:"url"
			},
			{
				name:"用户头像",
				id:"avatar",
				type:"imgtou",
			},
			{
				name:"账号主体",
				id:"contributor_type",
				type:"child",
				child:{"1":"个体","2":"企业"}
			},
			{
				name:"身份证正面照片",
				id:"front_photo",
				type:"imgzheng",
			},
			{
				name:"身份证反面照片",
				id:"back_photo",
				type:"imgzheng",
			},
			{
				name:"手持身份证照片",
				id:"hand_hold_photo",
				type:"imgzheng",
			},
			{
				name:"收款账户名",
				id:"account_name",
				type:"text",
			},
			{
				name:"银行卡号",
				id:"bank_card_no",
				type:"text",
			},
			{
				name:"所属开户银行",
				id:"bank_name",
				type:"text",
			},
			{
				name:"所属开户支行",
				id:"branch_bank",
				type:"text",
			},
			{
				name:"银行预留手机号",
				id:"reserve_phone",
				type:"text",
		}],
		contributor_type2:[
			{
				name:"提交类型",
				id:"check_type",
				type:"child",
				child:{"1":"为初次申请","2":"为驳回复审申请 ","3":"为修改信息申请"}
			},
			
			{
				name:"用户ID",
				id:"open_id",
				type:"text"
			},
			{
				name:"用户昵称",
				id:"user_name",
				type:"url"
			},
			{
				name:"用户头像",
				id:"avatar",
				type:"imgtou",
			},
			{
				name:"账号主体",
				id:"contributor_type",
				type:"child",
				child:{"1":"个体","2":"企业"}
			},
			{
				name:"统一社会信用代码",
				id:"code",
				type:"text",
			},
			{
				name:"营业执照",
				id:"business_license",
				type:"imgzheng",
			},
			{
				name:"开户许可证",
				id:"opening_permit",
				type:"imgzheng",
			},
			{
				name:"提供发票税率",
				id:"tax_rate_type",
				type:"text",
			},
			{
				name:"银行卡号",
				id:"bank_card_no",
				type:"text",
			},
			{
				name:"所属开户银行",
				id:"bank_name",
				type:"text",
			},
			{
				name:"所属开户支行",
				id:"branch_bank",
				type:"text",
			}],
		reviewinfo:{
			common:[
				{
					name:"审核ID",
					id:"id",
					type:"text"
				},
				{
					name:"提审项",
				},
				{
					name:"提审用户ID",
					id:"open_id",
					type:"text"
				},
				{
					name:"提审用户昵称",
					id:"username",
					type:"url"
				},
				{
					name:"提审时间",
					id:"check_time",
					type:"text"
				},
				{
					name:"当前审核状态",
					id:"check_status",
					type:"btn",
					child:{"0":"待审核","1":"审核通过","-1":"审核驳回","-2":"失效或撤回"}
				},
				{
					name:"审核角色",
					id:"role",
					type:"text"
				},
				{
					name:"审核人",
					id:"check_admin_name",
					type:"text"
				},
				{
					name:"审核时间",
					id:"check_time",
					type:"text"
				},
				{
					name:"最近更新时间",
					id:"ads",
					type:"text"
				}
			],
			status1:{
				hire_type2:[
				{
					name:"录用方式",
					id:"ids",
					type:"text"
				},
				{
					name:"录用方案ID",
					id:"ids",
					type:"text"
				},
				{
					name:"预计投放渠道",
					id:"ids",
					type:"text"
				}],
				hire_type1:[
					{
						name:"录用方式",
						id:"ids",
						type:"text"
					},
					{
						name:"录用价格",
						id:"ids",
						type:"text"
					}
				]
			},
			status_1:[
				{
					name:"驳回理由",
					id:"check_reason",
					type:"text"
				},
				{
					name:"驳回详细说明",
					id:"check_comment",
					type:"text"
				}
			]
		},
		
	}
		
}

export default reviewData