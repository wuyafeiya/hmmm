<template>
  <div class='container'>
    <el-card>
      <!-- 第一列 -->
      <el-row type="flex" justify="space-around">
        <el-col :span="18">
          <el-form :inline="true" :model="searchData" class="demo-form-inline" ref="clearData">
            <el-form-item label="标签名称">
              <el-input v-model="searchData.basenameStatus"></el-input>
            </el-form-item>
            <el-form-item label="状态" class="move">
              <el-select placeholder="请选择" v-model="searchData.baseApiStatus">
                <el-option v-for="item in baseApi.status" :label="item.value" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="clear">清除</el-button>
              <el-button type="primary" size="small" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="6">
          <el-row type="flex" justify="end">
            <el-button type="text" icon="el-icon-back" v-if="subjectID" @click="$router.push('/subjects/list')">返回学科</el-button>
            <el-button type="success" size="small" icon="el-icon-edit" @click="add"
              >新增标签</el-button
            >
          </el-row>
        </el-col>
      </el-row>
      <!-- 第二列 -->
      <div class="before">
        <i class="el-icon-info" />
        <span>数据一共 {{ page.counts }} 条</span>
      </div>

      <!-- 第三列 -->
      <el-table border="" :data="list">
        <el-table-column
          label="序号"
          type="index"
          width="60px"
        ></el-table-column>
        <el-table-column label="所属学科" prop="subjectName"></el-table-column>
        <el-table-column label="标签名称" prop="tagName"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="addDate">
          <template slot-scope="{ row }">
              {{ row.addDate | parseTimeByString }}
            </template>
        </el-table-column>
        <el-table-column label="状态" prop="state" :formatter="formatter"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="negation(row)">{{  row.state == 0 ? '启用' : '禁用' }}</el-button>
          <el-button type="text" size="small" :disabled="row.state == 1" @click="put(row)">修改</el-button>
          <el-button type="text" size="small" :disabled="row.state == 1" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px" v-if="boolean">
        <el-pagination
          :hide-on-single-page="subjectID"
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pagesize"
          layout=" prev, pager, next, sizes, jumper"
          :total="page.counts"
        >
        </el-pagination>
      </el-row>
    </el-card>

    <!-- 新增目录弹窗 -->
    <el-dialog :visible.sync="showDialog" :title="dirtitle" width="400px" @close="btnCancel">
      <el-form ref="addEmployee" :model="formData" :rules="rules" label-width="80px">
      <el-form-item prop="subjectName" label="所属学科" v-if="!subjectID">
      <el-select placeholder="请选择" v-model="formData.subjectID" style="width:100%">
        <el-option v-for="item in result" :key="item.id" :value="item.subjectID" :label="item.subjectName"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item prop="directoryName" label="标签名称">
        <el-input type="text" v-model="formData.tagName" placeholder="请输入标签名称" />
      </el-form-item>
      </el-form>

      <el-row slot="footer" type="flex" justify="end">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOk">确定</el-button>
    </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, remove, update } from '../../api/hmmm/tags.js'

// import baseApi from '@/api/base/baseApi'

export default {
  name: 'Tags',
  data () {
    return {
      // 定义状态数据
      baseApi: {
        status: [{
          id: '1',
          value: '已启用'
        },
        {
          id: '0',
          // id: '2',
          value: '已禁用'
        }
        ]
      },
      searchData: {
        basenameStatus: '', // 定义筛选选择的条件
        baseApiStatus: '' // 定义筛选选择的条件
      },
      list: [], // 目录
      page: {
        page: 1, // 当前页码
        pagesize: 10,
        counts: 0 // 总数
      },
      showDialog: false, // 新增目录弹层
      // 新增目录信息
      formData: {
        tagName: '', // 标签名称
        subjectID: '' // 所属学科
      },
      rules: {
        tagName: [{ required: true, message: '目录名称不能为空', trigger: 'blur' }]
      },
      subjectID: (this.$route.params.id) >= 0 ? this.$route.params.id : false, // 传递过来的id
      searchList: [], // 定义搜索值
      result: [], // 筛选后用来存储下拉值
      boolean: '' // 用于判断是否分页显示
    }
  },
  computed: {
    // 标题目录
    dirtitle () {
      return this.formData.id ? '修改标签' : '新增标签'
    }
  },
  created () {
    this.lists()
    // console.log(this.subjectID)
  },
  methods: {
    // 总列表
    async lists () {
      const { data } = await list(this.page)
      if (this.searchList.length > 0) {
        // console.log(this.search())
        this.list = this.searchList
        this.page.counts = this.list.length
        if (this.list.length < 10) {
          this.boolean = false
        }
      } else {
        // console.log(this.subjectID)
        if (this.subjectID) {
          this.list = data.items.filter(item => item.subjectID == this.subjectID)
          this.page.counts = this.list.length
          // this.page.counts = data.counts
        } else {
          // const { data } = await list(this.page)
          // this.page.counts = data.counts
          this.list = data.items
          this.page.counts = data.counts
          this.boolean = true
        }
      }
    },
    // 格式化状态
    formatter (row, column, cellValue, index) {
      const obj = this.baseApi.status.find(item => item.id == cellValue)
      return obj ? obj.value : '未知'
    },
    // 新增目录
    async add () {
      this.showDialog = true
    },
    // 修改目录
    put (data) {
      for (var i = 0; i < this.list.length; i++) {
        var flag = true
        for (var j = 0; j < this.result.length; j++) {
          if (this.list[i].subjectID === this.result[j].subjectID) {
            flag = false
          }
        }
        if (flag) {
          this.result.push(this.list[i])
        }
      }
      this.showDialog = true
      this.formData = data
    },
    // 确定和取消
    async btnOk () {
      try {
        await this.$refs.addEmployee.validate()
        // await add(this.formData)
        if (this.formData.id) {
          await update(this.formData)
          this.$message.success('修改目录名称成功')
          this.lists()
        } else {
          this.list.push(await add(this.formData))
          this.$message.success('新增目录名称成功')
          this.lists()
        }
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel () {
      this.formData = {
        directoryName: '', // 目录名称
        subjectID: '' // 所属学科
      }
      this.$refs.addEmployee.resetFields()
      this.showDialog = false
    },
    // 删除目录
    async del (id) {
      try {
        await this.$confirm('此操作将永久删除此目录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cacelButtonText: '取消',
          type: 'warning'
        })
        await remove(id)
        this.lists()
        this.$message.success('删除目录成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 每页条数
    handleSizeChange (num) {
      this.page.pagesize = num
      // this.lists()
      this.lists(this.page)
    },
    // 当前页
    handleCurrentChange (num) {
      this.page.page = num
      // this.lists()
      this.lists(this.page)
    },
    // 筛选 搜索 和 清除
    async search () {
      // this.searchList = this.list.filter(item => (item.tagName || item.state) == (this.searchData.basenameStatus || this.searchData.baseApiStatus))
      if (this.list.length > 10) {
        this.searchList = this.list.filter(item => {
          if (this.searchData.basenameStatus > '' && this.searchData.baseApiStatus == '') {
            return item.tagName == this.searchData.basenameStatus
          } else if (this.searchData.basenameStatus == '' && this.searchData.baseApiStatus > '') {
            return item.state == this.searchData.baseApiStatus
          } else if (this.searchData.basenameStatus > '' && this.searchData.baseApiStatus > '') {
            return item.tagName == this.searchData.basenameStatus && item.state == this.searchData.baseApiStatus
          }
        })

        this.lists()
      } else {
        const { data } = await list(this.page)
        this.list = data.items
        this.searchList = this.list.filter(item => {
          if (this.searchData.basenameStatus > '' && this.searchData.baseApiStatus == '') {
            return item.tagName == this.searchData.basenameStatus
          } else if (this.searchData.basenameStatus == '' && this.searchData.baseApiStatus > '') {
            return item.state == this.searchData.baseApiStatus
          } else if (this.searchData.basenameStatus > '' && this.searchData.baseApiStatus > '') {
            return item.tagName == this.searchData.basenameStatus && item.state == this.searchData.baseApiStatus
          }
        })

        this.lists()
      }
    },
    clear () {
      this.searchData = {
        basenameStatus: '', // 定义筛选选择的条件
        baseApiStatus: '' // 定义筛选选择的条件
      }
      this.$refs.clearData.resetFields()
      this.searchList = []
      this.search()
    },
    // 启用或禁用按钮
    negation (row) {
      if (row.state === 1) {
        row.state = 0
      } else {
        row.state = 1
      }
    }

  }
}
</script>

<style scoped>
.move {
  margin-left: 40px;
}
.before {
  width: 100%;
  font-size: 14px;
  color: rgba(144, 148, 156);
  border-radius: 5px;
  line-height: 34px;
  display: inline-block;
  padding: 0px 10px;
  background: rgba(244, 244, 245);
  margin-bottom: 18px;
}
i {
  margin-left: 5px;
  margin-right: 8px;
  color: rgba(144, 147, 153);
}
</style>
