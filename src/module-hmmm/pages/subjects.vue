<template>
  <div class="homebox">
    <el-form :inline="true" :model="tableList" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="22"
          ><div class="grid-content bg-purple">
            <el-form-item label="学科名称" class="demo-form-inline">
              <el-input
                v-model="tableList.subjectName"
                style="height: 32px"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="clearSub">清除</el-button>
              <el-button type="primary" @click="getSubjectsList"
                >搜索</el-button
              >
            </el-form-item>
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <el-form-item>
              <el-button
                class="colright"
                size="mini"
                type="success"
                icon="el-icon-edit"
                @click="addSubjects"
                >新增学科</el-button
              >
            </el-form-item>
          </div></el-col
        >
      </el-row>

      <!-- 消息文案 -->
      <el-alert
        :title="`数据一共 ${counts} 条`"
        :closable="false"
        type="info"
        show-icon
      ></el-alert>
      <template>
        <el-table
          max-height="2500"
          border
          style="width: 100%"
          :data="subjectsList"
        >
          <el-table-column label="序号" width="60" prop="id"> </el-table-column>
          <el-table-column label="学科名称" prop="subjectName" width="180">
          </el-table-column>
          <el-table-column label="创建者" prop="username"> </el-table-column>
          <el-table-column label="创建日期" prop="addDate"> </el-table-column>
          <el-table-column label="前台是否显示" prop="isFrontDisplay">
            <template slot-scope="scope">
              {{ scope.row.isFrontDisplay === 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column label="二级目录" prop="twoLevelDirectory">
          </el-table-column>
          <el-table-column label="标签" prop="tags"> </el-table-column>
          <el-table-column label="题目数量" prop="totals"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small">学科分类</el-button>
              <el-button type="text" size="small">学科标签</el-button>
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click="deleteSub(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="total, prev, pager, next,jumper"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </el-row>
    </el-form>

    <!-- 添加的弹框 -->
    <el-dialog
      title="新增学科"
      :visible.sync="addDialogVisible"
      width="20%"
      @close="resetSub"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            :model="addSubjectsFrom"
            :rules="Rules"
            ref="addSubjectsFromRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="学科名称" prop="subjectName">
              <el-input
                v-model="addSubjectsFrom.subjectName"
                placeholder="请输入学科名称"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <span class="subspan">是否显示</span>
        <el-switch
          v-model="SubSwitchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-row>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubFrom">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Subject from "../../api/hmmm/subjects";
export default {
  components: {},
  data() {
    return {
      // 修改的id
      userId: "",
      // 修改的默认表单值
      editSubjectsFrom: {
        subjectName: "",
        isFrontDisplay: "",
      },
      // 修改的验证
      editSubjectsFromRules: {
        subjectName: [
          { required: true, message: "请输入学科名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
      // 修改学科的弹框显示
      editDialogVisible: false,
      // 添加学科是否显示的开关
      SubSwitchValue: true,
      // 添加的验证
      addSubjectsFromRules: {
        subjectName: [
          { required: true, message: "请输入学科名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
      // 添加的输入框数据
      addSubjectsFrom: {
        subjectName: "",
      },
      // 添加的弹框显示与隐藏
      addDialogVisible: false,
      // 获取学科列表的请求参数
      tableList: {
        page: 1,
        pagesize: 10,
        subjectName: "",
      },
      // 学科的数据列表
      subjectsList: [],
      // 学科列表总条数
      counts: 0,
    };
  },
  created() {
    this.getSubjectsList();
  },
  methods: {
    // 删除学科
    async deleteSub(row) {
      const configRuselt = await this.$confirm(
        "此操作将永久删除该学科, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (configRuselt !== "confirm") {
        return this.$message("您取消了删除操作!");
      }
      try {
        const { data } = await Subject.remove(row);
        console.log(data);
        this.$message.success("删除成功!");
        this.getSubjectsList();
      } catch (e) {
        this.$message.error("删除失败!");
      }
    },
    // 添加学科
    async addSubFrom() {
      try {
        await Subject.add({
          subjectName: this.addSubjectsFrom.subjectName,
          isFrontDisplay: this.isFrontDisplay,
        });
        this.$message.success("新增学科成功");
        this.addDialogVisible = false;
        this.getSubjectsList();
      } catch (e) {
        this.$message.error("新增学科失败");
      }
    },
    // 重置输入框
    resetSub() {
      this.$refs.addSubjectsFromRef.resetFields();
    },
    // 点击新增学科显示弹出框
    addSubjects() {
      this.addDialogVisible = true;
    },

    // 点击清除按钮清空input输入框
    clearSub() {
      this.tableList.subjectName = "";
      this.getSubjectsList();
    },
    // 获取学科的列表数据
    async getSubjectsList() {
      try {
        const { data } = await Subject.list(this.tableList);
        data.items.forEach((item) => {
          item.addDate = this.$dayjs(item.addDate).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        });
        this.subjectsList = data.items;
        this.counts = data.counts;
        console.log(data);
      } catch (error) {
        this.$message.error("请求数据失败");
        console.log(error);
      }
    },
    // 一页多少条
    handleSizeChange(newSize) {
      this.tableList.pagesize = newSize;
      this.getSubjectsList();
    },
    // 多少页
    handleCurrentChange(newPage) {
      this.tableList.page = newPage;
      this.getSubjectsList();
    },
  },
};
</script>

<style>
.homebox {
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 10px;
  background-color: #fff;
}
.alert {
  margin-bottom: 20px;
}
</style>
