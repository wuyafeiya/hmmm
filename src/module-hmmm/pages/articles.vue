<!-- 面试技巧 -->
<template>
  <div>
    <div class="container">
      <el-container>
        <!-- 顶部 -->
        <el-header>
          <el-row :gutter="20">
            <el-col :span="4"
              ><div class="grid-content bg-purple keywords">
                <span class="spankeywords">关键字</span>
                <el-input
                  v-model="keywords"
                  size="small"
                  style="width: 150px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple status">
                <span class="spanstatus">状态</span>
                <el-select
                  v-model="status"
                  placeholder="请选择"
                  style="width: 150px"
                >
                  <el-option label="屏蔽" value="1"></el-option>
                  <el-option label="启用" value="0"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-button @click="clearFn">清除</el-button>
                <el-button type="primary" @click="searchFn">搜索</el-button>
              </div>
            </el-col>

            <el-col :span="12"
              ><div class="grid-content bg-purple newSkills">
                <el-button
                  type="success"
                  @click="articlesAdd"
                  icon="el-icon-edit"
                  >新增技巧</el-button
                >
              </div>
            </el-col>
          </el-row>
        </el-header>

        <!-- 数据总量 -->
        <el-row class="quality">
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <span class="qualitynum">数据一共{{ total }}条</span>
            </div></el-col
          >
        </el-row>

        <!-- 内容区域 -->
        <el-main>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="date"
              type="index"
              align="center"
              label="序号"
            ></el-table-column>
            <el-table-column
              prop="title"
              label="文章标题"
              align="center"
              width="300px"
            ></el-table-column>
            <el-table-column
              prop="visits"
              align="center"
              label="阅读数"
              width="100px"
            >
            </el-table-column>
            <el-table-column
              prop="username"
              align="center"
              label="录入人"
              width="100px"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              align="center"
              label="录入时间"
              width="300px"
            >
            </el-table-column>
            <el-table-column
              prop="state"
              align="center"
              :formatter="formatterFn"
              label="状态"
            >
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  style="margin-right: 5px"
                  >预览</el-link
                >
                <el-link
                  type="primary"
                  :underline="false"
                  style="margin-right: 5px"
                  >禁用</el-link
                >
                <el-link
                  type="primary"
                  :underline="false"
                  style="margin-right: 5px"
                  @click="updateFn(scope.row)"
                  >修改</el-link
                >
                <el-link
                  type="primary"
                  :underline="false"
                  style="margin-right: 5px"
                  @click="deleteFn(scope.row.id)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>

        <!-- 底部 -->
        <el-footer>
          <div class="block">
            <el-pagination
              background
              @size-change="sizeChangeFn"
              @current-change="currentChangeFn"
              :current-page="currentPage4"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              layout="prev, pager, next, sizes, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-footer>
      </el-container>
    </div>

    <articlesAdd ref="articlesAdd" :dialogVisible.sync="articlesAddShow" />
  </div>
</template>

<script>
import { list, remove } from "@/api/hmmm/articles";
import articlesAdd from "../components/articles-add.vue";
// import articleEdit from "../components/articles-edit.vue";

export default {
  data() {
    return {
      keywords: null, //关键字
      status: null, //状态
      currentPage4: 1, //当前页数
      total: 0, //数据总和
      pagesize: 5, //每页数据

      tableData: [], //文章列表数据
      articlesAddShow: false, //文章新增显示
      // articleEditShow: false, //文章编辑显示
      // editDate: "", //编辑数据
    };
  },

  methods: {
    updateFn(data) {
      //更改数据
      // console.log(data);
      this.articlesAddShow = true;
      // this.editDate = data;
      // console.log(this.editDate);
      // console.log(this.$refs.articlesAdd);
      this.$refs.articlesAdd.article = data;
    },

    async deleteFn(id) {
      //删除数据
      try {
        // console.log(id);
        await remove(id);
        this.$message.success("删除成功");
        this.getArticleList();
      } catch (err) {
        // console.log(err);
        this.$message.error("删除失败请稍后重试");
      }
    },

    articlesAdd() {
      //新增文章按钮
      this.articlesAddShow = true;
      this.$refs.articlesAdd.article = {
        //表单
        title: "",
        videoURL: "",
        articleBody: "", //文章内容,
      };
    },

    formatterFn(row, column, cellValue, index) {
      //格式化状态
      return cellValue === 0 ? "开启 " : "屏蔽";
    },

    async sizeChangeFn(val) {
      //每页数量变化
      // console.log(val);
      this.pagesize = val;
      await this.getArticleList();
    },
    async currentChangeFn(val) {
      //当前页变化
      // console.log(val);
      this.currentPage4 = val;
      await this.getArticleList();
    },

    async getArticleList() {
      //渲染文章数据
      try {
        const { data } = await list({
          page: this.currentPage4,
          pagesize: this.pagesize,
          keyword: this.keywords,
          state: this.status,
        });
        this.total = data.counts;
        this.tableData = data.items;
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    },

    clearFn() {
      //清除按钮
      this.keywords = "";
      this.status = "";
    },
    async searchFn() {
      //搜索按钮
      await this.getArticleList();
    },
  },

  props: {},

  watch: {},

  computed: {},

  created() {
    this.getArticleList(); //获取文章列表
  },

  mounted() {},

  components: {
    articlesAdd,
  },
};
</script>
<style scoped lang='less'>
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-row {
  background-color: #fff;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.keywords,
.status {
  display: flex;
}

.spankeywords,
.spanstatus {
  display: block;
  width: 100px;
}

.newSkills {
  text-align: right;
}

.quality {
  margin-top: 10px;
  height: 30px;
}

.qualitynum {
  display: block;
  // vertical-align: middle;
  margin-left: 20px;
}

.block {
  text-align: right;
}

/deep/.is-background {
  margin-top: 12px;
}

/deep/.ql-blank {
  height: 125px;
}

/deep/.ql-editor {
  height: 125px;
}
</style>

























