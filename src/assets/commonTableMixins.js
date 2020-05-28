export default {
    mounted() {
        document.getElementById('table').addEventListener('mousedown', this.mousedownHandle)
        document.getElementById('table').addEventListener('mouseup', this.mouseupHandle)
        document.body.addEventListener('click', this.removeClickHoverMore)
    },
    beforeDestroy() {
        document.getElementById('table').removeEventListener('mousedown', this.mousedownHandle)
        document.getElementById('table').removeEventListener('mouseup', this.mouseupHandle)
        document.body.removeEventListener('click', this.removeClickHoverMore)
    },
    methods: {
        multipleSelectHandleOptions(row) {
            let adminuseraccess = JSON.parse(localStorage.getItem('adminuseraccess'))
            if (this.isSelected(row, this.tableConfig.primaryKey)) {
                if (this.tableConfig.pageName == 'userBaseInfo' && adminuseraccess.indexOf('200044') > -1) {
                    return [
                        { name: '设为平台推荐创作者' },
                        { name: '添加至黑名单' }
                    ]
                }
                if (this.tableConfig.pageName == 'workInfo' && adminuseraccess.indexOf('200307') > -1) {
                    return [
                        { name: '修改平台推荐等级' }
                    ]
                }
            }
            return [{ name: '暂无权限', disabled: true }]
        },
        isSelected(row, key) {
            return !!this.multipleSelection.filter(s => s[key] == row[key]).length
        },
        multipleClickHandle(index) {
            if(index == 0) {
                if (this.$parent.selectData.length != 0 || this.$parent.seltotal) {
                    this.$parent.centerDialogVisible = true;
                } else {
                    this.$message({
                        message: '请勾选用户',
                        type: 'warning'
                    });
                }
                
            }
            
            if(index == 1) {
                if (this.$parent.selectData.length != 0 || this.$parent.seltotal) {
                    // this.$parent.centerDialogVisible = true;
                    this.router.push({path:"/userManager/blackList/addblack",query:{rows:JSON.stringify(this.$parent.selectData)}});
                } else {
                    this.$message({
                        message: '请勾选用户',
                        type: 'warning'
                    });
                }
                
            }
        },
        clickHoverMore(event) {
            let e = event || window.event;
            let target = e.target || e.srcElement;
            let _target = target.parentElement.parentElement.parentElement;
            if (_target && _target.classList.contains('hover-more')) _target.classList.add('hover-more-fix')
        },
        removeClickHoverMore(event) {
            let e = event || window.event;
            let target = e.target || e.srcElement;
            if (target.tagName === 'I' && target.classList.contains('el-icon-more')) return
            document.body.querySelectorAll('.hover-more-fix').forEach(dom => {
                if (dom.classList.contains('hover-more-fix')) dom.classList.remove('hover-more-fix')
            })
        },
        mouseEnterRow(row, column, cell, event) {
            let e = event || window.event;
            let target = e.target || e.srcElement;
            let _target = target.parentElement.querySelector('.hover-more');
            if (_target && !_target.classList.contains('hover-more-show')) _target.classList.add('hover-more-show')
        },
        mouseLeaveRow(row, column, cell, event) {
            let e = event || window.event;
            let target = e.target || e.srcElement;
            let _target = target.parentElement.querySelector('.hover-more');
            if (_target && _target.classList.contains('hover-more-show')) _target.classList.remove('hover-more-show')
        },
        mousedownHandle() {
            document.querySelector('.el-table__header-wrapper').querySelectorAll('.cell').forEach(headCell => {
                headCell.parentElement.classList.remove('hover-border')
            })
        },
        mouseupHandle() {
            document.querySelector('.el-table__header-wrapper').querySelectorAll('.cell').forEach(headCell => {
                let list = headCell.parentElement.classList
                list.add('hover-border')
            })
        },
    }
}