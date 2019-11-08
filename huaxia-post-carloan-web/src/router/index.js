import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
    // in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
    // detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
// import Layout from '../views/layout/Layout'
import Layout from '../App'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [

    {
        path: '/',
        component: _import('page/index'),
        meta: {
            title: "车贷贷后-调试主页"
        },
        hidden: true,
    },
    {
        path: '/404',
        component: _import('errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: _import('errorPage/401'),
        hidden: true
    },
    // 车贷贷后--账务列表
    {
        path: '/carLoanAfter',
        component: Layout,
        name: 'carLoanAfter',
        meta: {
            title: '账务列表'
        },
        children: [{
                path: 'loanAfterFinance',
                component: _import('carLoanAfter/loanAfterFinance/loanAfterFinanceIndex'),
                meta: {
                    title: '账务信息列表'
                }
            },
            {
                path: 'loanAfterInfo',
                component: _import('carLoanAfter/loanAfterInfo/carLoanIndex'),
                name: 'loanAfterInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },

        ]
    },
    // 车贷贷后--挂账撤销
    {
        path: '/revocation',
        component: Layout,
        name: 'revocation',
        meta: {
            title: '挂账撤销'
        },
        children: [{
                path: 'revocationRegister/pendingWork',
                component: _import('revocation/revocationRegister/index'),
                name: 'revocationRegister',
                meta: {
                    title: '挂账撤销登记'
                }
            },
            {
                path: 'revocationRegister/pendingWork/pendingInfo',
                component: _import('revocation/revocationRegister/pendingWork/pendingInfo/pendingIndex'),
                name: 'pendingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'revocationRegister/handledWork/handledInfo',
                component: _import('revocation/revocationRegister/handledWork/handledInfo/handledIndex'),
                name: 'handledInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            // {
            //     path: 'revocationRegister/pendingWork',
            //     component: _import('revocation/revocationRegister/pendingWork/pendingWorkIndex'),
            //     meta: {
            //         title: '挂账撤销登记-待处理任务'
            //     }
            // },
            // {
            //     path: 'revocationRegister/handledWork',
            //     component: _import('revocation/revocationRegister/handledWork/handledWorkIndex'),
            //     meta: {
            //         title: '挂账撤销登记-已处理任务'
            //     }
            // },
            {
                path: 'revocationCheck/pendingWork',
                component: _import('revocation/revocationCheck/index'),
                meta: {
                    title: '挂账撤销复核'
                }
            },
            {
                path: 'revocationCheck/pendingWork/pendingInfo',
                component: _import('revocation/revocationCheck/pendingWork/pendingInfo/pendingIndex'),
                name: 'pendingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
        ]
    },
    // 车贷贷后--提前结清
    {
        path: '/earlyClearance',
        component: Layout,
        name: 'earlyClearance',
        meta: {
            title: '提前结清'
        },
        children: [{
                path: 'entryToBeTreated/pendingWork',
                component: _import('earlyClearance/entryToBeTreated/index'),
                name: 'entryToBeTreated',
                meta: {
                    title: '录入待处理任务'
                }
            },
            {
                path: 'entryToBeTreated/pendingWork/pendingInfo',
                component: _import('earlyClearance/entryToBeTreated/pendingWork/pendingInfo/pendingIndex'),
                name: 'pendingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'entryToBeTreated/holdingWork/holdingInfo',
                component: _import('earlyClearance/entryToBeTreated/holdingWork/holdingInfo/holdingIndex'),
                name: 'holdingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'entryToBeTreated/handledWork/handledInfo',
                component: _import('earlyClearance/entryToBeTreated/handledWork/handledInfo/handledIndex'),
                name: 'handledInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            // {
            //     path: 'entryToBeTreated/pendingWork',
            //     component: _import('earlyClearance/entryToBeTreated/pendingWork/pendingWorkIndex'),
            //     meta: {
            //         title: '录入-待处理任务列表'
            //     }
            // },
            // {
            //     path: 'entryToBeTreated/holdingWork',
            //     component: _import('earlyClearance/entryToBeTreated/holdingWork/holdingWorkIndex'),
            //     meta: {
            //         title: '录入-处理中任务列表'
            //     }
            // },
            // {
            //     path: 'entryToBeTreated/handledWork',
            //     component: _import('earlyClearance/entryToBeTreated/handledWork/handledWorkIndex'),
            //     meta: {
            //         title: '录入-已处理任务列表'
            //     }
            // },
            {
                path: 'firstReview/pendingWork',
                component: _import('earlyClearance/firstReview/index'),
                name: 'firstReview',
                meta: {
                    title: '一级复核待处理任务'
                }
            },
            {
                path: 'firstReview/pendingWork/pendingInfo',
                component: _import('earlyClearance/firstReview/pendingWork/pendingInfo/pendingIndex'),
                name: 'pendingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'firstReview/holdingWork/holdingInfo',
                component: _import('earlyClearance/firstReview/holdingWork/holdingInfo/holdingIndex'),
                name: 'holdingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'firstReview/handledWork/handledInfo',
                component: _import('earlyClearance/firstReview/handledWork/handledInfo/handledIndex'),
                name: 'handledInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            // {
            //     path: 'firstReview/pendingWork',
            //     component: _import('earlyClearance/firstReview/pendingWork/pendingWorkIndex'),
            //     meta: {
            //         title: '一级复核-待处理任务列表'
            //     }
            // },
            // {
            //     path: 'firstReview/holdingWork',
            //     component: _import('earlyClearance/firstReview/holdingWork/holdingWorkIndex'),
            //     meta: {
            //         title: '一级复核-处理中任务列表'
            //     }
            // },
            // {
            //     path: 'firstReview/handledWork',
            //     component: _import('earlyClearance/firstReview/handledWork/handledWorkIndex'),
            //     meta: {
            //         title: '一级复核-已处理任务列表'
            //     }
            // },
            {
                path: 'secondReview/pendingWork',
                component: _import('earlyClearance/secondReview/index'),
                name: 'secondReview',
                meta: {
                    title: '二级复核待处理任务'
                }
            },
            {
                path: 'secondReview/pendingWork/pendingInfo',
                component: _import('earlyClearance/secondReview/pendingWork/pendingInfo/pendingIndex'),
                name: 'pendingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'secondReview/holdingWork/holdingInfo',
                component: _import('earlyClearance/secondReview/holdingWork/holdingInfo/holdingIndex'),
                name: 'holdingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'secondReview/handledWork/handledInfo',
                component: _import('earlyClearance/secondReview/handledWork/handledInfo/handledIndex'),
                name: 'handledInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            // {
            //     path: 'secondReview/pendingWork',
            //     component: _import('earlyClearance/secondReview/pendingWork/pendingWorkIndex'),
            //     meta: {
            //         title: '二级复核-待处理任务列表'
            //     }
            // },
            // {
            //     path: 'secondReview/holdingWork',
            //     component: _import('earlyClearance/secondReview/holdingWork/holdingWorkIndex'),
            //     meta: {
            //         title: '二级复核-处理中任务列表'
            //     }
            // },
            // {
            //     path: 'secondReview/handledWork',
            //     component: _import('earlyClearance/secondReview/handledWork/handledWorkIndex'),
            //     meta: {
            //         title: '二级复核-已处理任务列表'
            //     }
            // },

        ]
    },
    // 车贷贷后--对公还款
    {
        path: '/publicRepayment',
        component: Layout,
        name: 'publicRepayment',
        meta: {
            title: '对公还款'
        },
        children: [{
                path: 'Pipelining/public',
                component: _import('publicRepayment/Pipelining/index'),
                meta: {
                    title: '对公流水导入'
                }
            },
            {
                path: 'publicEnter/pendingWork',
                component: _import('publicRepayment/publicEnter/index'),
                name:'publicEnter',
                meta: {
                    title: '对公录入'
                }
            },
            {
                path: 'publicEnter/pendingWork/pendingInfo',
                component: _import('publicRepayment/publicEnter/pendingWork/pendingInfo/pendingIndex'),
                name: 'pendingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'publicEnter/handledWork/handledInfo',
                component: _import('publicRepayment/publicEnter/handledWork/handledInfo/handledIndex'),
                name: 'handledInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            // {
            //     path: 'publicEnter/pendingWork',
            //     component: _import('publicRepayment/publicEnter/pendingWork/pendingWorkIndex'),
            //     meta: {
            //         title: '对公录入-待处理任务'
            //     }
            // },
            // {
            //     path: 'publicEnter/handledWork',
            //     component: _import('publicRepayment/publicEnter/handledWork/handledWorkIndex'),
            //     meta: {
            //         title: '对公录入-已处理任务'
            //     }
            // },
            {
                path: 'initialAudit/pendingWork',
                component: _import('publicRepayment/initialAudit/index'),
                name: 'initialAudit',
                meta: {
                    title: '对公初审'
                }
            },
            {
                path: 'initialAudit/pendingWork/pendingInfo',
                component: _import('publicRepayment/initialAudit/pendingWork/pendingInfo/pendingIndex'),
                name: 'pendingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'initialAudit/handledWork/handledInfo',
                component: _import('publicRepayment/initialAudit/handledWork/handledInfo/handledIndex'),
                name: 'handledInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            // {
            //     path: 'initialAudit/pendingWork',
            //     component: _import('publicRepayment/initialAudit/pendingWork/pendingWorkIndex'),
            //     meta: {
            //         title: '对公初审-待处理任务'
            //     }
            // },
            // {
            //     path: 'initialAudit/handledWork',
            //     component: _import('publicRepayment/initialAudit/handledWork/handledWorkIndex'),
            //     meta: {
            //         title: '对公初审-已处理任务'
            //     }
            // },
            {
                path: 'lastAudit/pendingWork',
                component: _import('publicRepayment/lastAudit/index'),
                name: 'lastAudit',
                meta: {
                    title: '对公终审'
                }
            },
            {
                path: 'lastAudit/pendingWork/pendingInfo',
                component: _import('publicRepayment/lastAudit/pendingWork/pendingInfo/pendingIndex'),
                name: 'pendingInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            {
                path: 'lastAudit/handledWork/handledInfo',
                component: _import('publicRepayment/lastAudit/handledWork/handledInfo/handledIndex'),
                name: 'handledInfo',
                meta: {
                    title: '详情'
                },
                hidden: true
            },
            // {
            //     path: 'lastAudit/pendingWork',
            //     component: _import('publicRepayment/lastAudit/pendingWork/pendingWorkIndex'),
            //     meta: {
            //         title: '对公终审-待处理任务'
            //     }
            // },
            // {
            //     path: 'lastAudit/handingWork',
            //     component: _import('publicRepayment/lastAudit/handingWork/handingWorkIndex'),
            //     meta: {
            //         title: '对公终审-处理中任务'
            //     }
            // },
            // {
            //     path: 'lastAudit/handledWork',
            //     component: _import('publicRepayment/lastAudit/handledWork/handledWorkIndex'),
            //     meta: {
            //         title: '对公终审-已处理任务'
            //     }
            // },

        ]
    },
    // 车贷贷后--罚息调整
    {
        path: '/penaltyAdjustment',
        component: Layout,
        name: 'penaltyAdjustment',
        meta: {
            title: '罚息调整'
        },
        children: [{
                path: 'carLoanAjustment/pendingWork',
                component: _import('penaltyAdjustment/carLoanAjustment/index'),
                name:'carLoanAjustment',
                meta: {
                    title: '车贷罚息违约金调整'
                }
            },
            {
                path: 'carLoanAjustmentCheck/pendingWork',
                component: _import('penaltyAdjustment/carLoanAjustmentCheck/index'),
                name:'carLoanAjustmentCheck',
                meta: {
                    title: '车贷罚息违约金调整复核'
                }
            },
        ]
    },
    // 车贷贷后--参数配置
    {
        path: '/configurationParam',
        component: Layout,
        name: 'configurationParam',
        meta: {
            title: '参数配置'
        },
        children: [{
                path: '',
                component: _import('configurationParam/configIndex'),
                meta: {
                    title: '限额配置'
                }
            },

        ]
    },
    // 车贷贷后--展期设置
    {
        path: '/extendsSet',
        component: Layout,
        name: 'extendsSet',
        meta: {
            title: '展期操作'
        },
        children: [{
                path: '',
                component: _import('extendsSet/index'),
                meta: {
                    title: '展期操作'
                }
            },

        ]
    },

    // 车贷贷后--报表查看
    //  {
    //     path: '/carLoanReport',
    //     component: Layout,
    //     name: 'carLoanReport',
    //     meta: {
    //         title: '报表查看'
    //     },
    //     children: [{
    //             path: 'loanOverdue',
    //             component: _import('carLoanReport/loanOverdue/loanOverdueList/loanOverdueIndex'),
    //             meta: {
    //                 title: '车贷逾期明细报表'
    //             }
    //         },
    //         {
    //             path: 'loanOverdueInfo',
    //             component: _import('carLoanReport/loanOverdue/loanOverdueInfo/loanOverdueInfoIndex'),
    //             name: 'pendingInfo',
    //             meta: {
    //                 title: '详情'
    //             },
    //             hidden: true
    //         },
    //         {
    //             path: 'loanRepayment',
    //             component: _import('carLoanReport/loanRepayment/loanRepaymentList/loanRepaymentIndex'),
    //             name: 'loanRepayment',
    //             meta: {
    //                 title: '车贷还款明细报表'
    //             }
    //         },
    //         {
    //             path: 'loanRepaymentInfo',
    //             component: _import('carLoanReport/loanRepayment/loanRepaymentInfo/loanRepaymentInfoIndex'),
    //             name: 'loanRepaymentInfo',
    //             meta: {
    //                 title: '详情'
    //             },
    //             hidden: true
    //         },
    //         {
    //             path: 'loanBorrow',
    //             component: _import('carLoanReport/loanBorrow/loanBorrowList/loanBorrowIndex'),
    //             name: 'loanBorrow',
    //             meta: {
    //                 title: '车贷借款合同明细报表'
    //             }
    //         },
    //         {
    //             path: 'loanBorrowInfo',
    //             component: _import('carLoanReport/loanBorrow/loanBorrowInfo/loanBorrowInfoIndex'),
    //             name: 'loanBorrowInfo',
    //             meta: {
    //                 title: '详情'
    //             },
    //             hidden: true
    //         },


    //     ]
    // }
    //     // 车贷贷后--日中
    //   {
    //     path: '/carLoanMiddle',
    //     component: Layout,
    //     name: 'carLoanMiddle',
    //     meta: {
    //       title: '日切项目列表'
    //     },
    //     children: [
    //     	{
    // 	        path: 'loanAfter',
    // 	        component: _import('carLoanMiddle/loanAfter/loanAfterIndex'),
    // 	        meta: {
    // 	            title: '任务列表'
    // 	        }
    //     	},

    //     ]
    //   },

]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})