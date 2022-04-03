<template>
  <div class="container">
    <el-card class="questions">
      <!-- 新增面试题按钮 -->
      <el-row type="flex" justify="end">
        <el-button
          type="success"
          icon="el-icon-edit"
          class="add"
          size="small"
          @click="addTestQuestions"
          >新增试题</el-button
        >
      </el-row>
      <el-form ref="question" label-width="80px" :model="formData">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select
                v-model="formData.subjectID"
                placeholder="请选择"
                style="width: 100%"
                size="small"
                @focus="subjectsSimple"
                @change="directoryList"
              >
                <el-option
                  v-for="item in list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二级目录">
              <el-select
                v-model="formData.catalogID"
                placeholder="请选择"
                style="width: 100%"
                size="small"
              >
                <el-option
                  v-for="item in directory"
                  :key="item.id"
                  :label="item.directoryName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签">
              <el-select
                v-model="formData.tags"
                placeholder="请选择"
                style="width: 100%"
                size="small"
                @focus="tagList"
              >
                <el-option
                  v-for="item in tag"
                  :key="item.id"
                  :label="item.tagName"
                  :value="item.tagName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键字" style="width: 100%">
              <el-input
                v-model="formData.keyword"
                size="small"
                placeholder="根据题干搜索"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="试题类型">
              <el-select
                v-model="formData.questionType"
                placeholder="请选择活动区域"
                style="width: 100%"
                size="small"
              >
                <el-option
                  v-for="item in questionType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="难度">
              <el-select
                v-model="formData.difficulty"
                placeholder="请选择"
                style="width: 100%"
                size="small"
              >
                <el-option
                  v-for="item in difficulty"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="方向">
              <el-select
                v-model="formData.direction"
                placeholder="请选择"
                style="width: 100%"
                size="small"
              >
                <el-option
                  v-for="(item, id) in direction"
                  :key="id"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入人">
              <el-select
                v-model="formData.creatorID"
                placeholder="请选择"
                style="width: 100%"
                size="small"
                @focus="userList"
              >
                <el-option
                  v-for="item in user"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题目备注">
              <el-input
                v-model="formData.remarks"
                style="width: 100%"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input
                v-model="formData.shortName"
                style="width: 100%"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-col :span="12">
                <el-form-item prop="region">
                  <el-select
                    v-model="formData.city"
                    placeholder="请选择"
                    style="width: 96%; margin-right: 6px"
                    size="small"
                    @focus="province"
                    @change="city"
                  >
                    <el-option
                      v-for="(item, id) in cityList"
                      :key="id"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="region">
                  <el-select
                    v-model="formData.province"
                    placeholder="请选择"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option
                      v-for="(item, id) in provinceList"
                      :key="id"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item style="text-align: right">
              <el-button size="small" @click="clear">清除</el-button>
              <el-button size="small" type="primary" @click="search"
                >搜索</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
        <el-alert
          type="info"
          :closable="false"
          show-icon
          style="margin-bottom: 15px"
        >
          <template slot="title"> 数据一共 {{ page.total }}条 </template>
        </el-alert>
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="已审核" name="three"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
      </el-tabs>
      <el-table style="width: 100%" :data="ChoiceList">
        <el-table-column fixed prop="number" label="试题编号" width="150">
        </el-table-column>
        <el-table-column prop="subject" label="学科" width="120">
        </el-table-column>
        <el-table-column prop="catalog" label="目录" width="100">
        </el-table-column>
        <el-table-column
          prop="questionType"
          label="题型"
          width="150"
          :formatter="questionTypes"
        >
        </el-table-column>
        <el-table-column label="题干" width="150">
          <template v-slot="{ row }">
            {{ row.question | html2Text }}
          </template>
        </el-table-column>
        <el-table-column label="录入时间" width="150">
          <template v-slot="{ row }">
            {{ row.addDate | parseTimeByString }}
          </template>
        </el-table-column>
        <el-table-column
          prop="difficulty"
          label="难度"
          width="150"
          :formatter="difficultys"
        >
        </el-table-column>
        <el-table-column prop="creator" label="录入人" width="150">
        </el-table-column>
        <el-table-column
          prop="chkState"
          label="审核状态"
          width="150"
          :formatter="chkTypes"
        >
        </el-table-column>
        <el-table-column prop="chkRemarks" label="审核意见" width="150">
        </el-table-column>
        <el-table-column prop="chkUser" label="审核人" width="150">
        </el-table-column>
        <el-table-column prop="publishState" label="发布状态" width="150">
          <template v-slot="{ row }">
            <span v-if="row.publishState == 1">已发布</span>
            <span v-else-if="row.publishState == 0">已下架</span>
            <span v-else>未发布</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="date" label="操作" width="200">
          <template v-slot="{ row }">
            <el-button type="text" size="mini" @click="Details(row.id)"
              >预览</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="Dialogaudit(row.id)"
              :disabled="row.chkState === 2"
              >审核</el-button
            >
            <el-button type="text" size="small" @click="xiugai(row.id)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="shelves(row)"
              :disabled="idUpDown(row)"
              >{{ row.publishState === 1 ? "下架" : "上架" }}</el-button
            >
            <el-button type="text" size="small" @click="btnDelete(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :total="page.total"
          :page-size="page.pagesize"
          :current-page="page.page"
          @size-change="changeSize"
          @current-change="changePage"
          :page-sizes="[1, 5, 10, 20]"
        />
      </el-row>
    </el-card>
    <question-preview
      :show-dialog.sync="showDialog"
      :question-detail="questionDetail"
      :difficulty="difficulty"
      :questionType="questionType"
    />
    <el-dialog
      title="题目审核"
      :visible="showDialogaudit"
      width="400px"
      @close="btnCancel"
    >
      <el-form ref="auditFormRef" :model="auditList" :rules="auditRules">
        <el-form-item style="margin-bottom: 18px" prop="chkState">
          <el-radio v-model="auditList.chkState" label="2">通过</el-radio>
          <el-radio v-model="auditList.chkState" label="1">拒绝</el-radio>
        </el-form-item>
        <el-form-item prop="chkRemarks">
          <el-input
            type="textarea"
            size="small"
            :rows="1"
            placeholder="请输入审核意见"
            v-model="auditList.chkRemarks"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="end">
        <el-button size="medium" @click="btnCancel">取消</el-button>
        <el-button size="medium" type="primary" @click="btnOK">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// 精选题库
import {
  subjectsSimple,
  directoryList,
  tagList,
  userList,
  questionList,
  questionDelete,
  questionsChoice,
  questionDetails,
  questionsAudit,
  choicePublish,
} from "../../api/hmmm/questions";
import {
  difficulty,
  questionType,
  direction,
  chkType,
  publishType,
} from "@/api/hmmm/constants";
import { provinces, citys } from "@/api/hmmm/citys";
import questionPreview from "../components/questions-preview.vue";
export default {
  components: {
    questionPreview,
  },
  computed: {
    idUpDown() {
      return (data) => {
        if (data.chkState === 1) {
          return true;
        } else {
          return false;
        }
      };
    },
  },

  data() {
    return {
      showDialogaudit: false,
      activeName: "first",
      showDialog: false,
      list: [],
      directory: [],
      tag: [],
      direction: [],
      user: [],
      provinceList: [],
      cityList: [],
      questionList: [],
      ChoiceList: [],
      difficulty,
      questionType,
      direction,
      chkType,
      publishType,
      questionDetail: {},
      page: {
        page: 1,
        pagesize: 10,
        total: null,
      },
      auditList: {
        id: "",
        chkState: "",
        chkRemarks: "",
      },
      formData: {
        subjectID: "",
        difficulty: "",
        questionType: "",
        tags: "",
        province: "",
        city: "",
        keyword: "",
        remarks: "",
        shortName: "",
        direction: "",
        creatorID: "",
        catalogID: "",
      },
      auditRules: {
        chkState: [
          { required: true, message: "请选择是否通过", trigger: "blur" },
        ],
        chkRemarks: [
          { required: true, message: "请输入审核意见", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.questionsChoiceList();
  },
  methods: {
    //新增跳转
    addTestQuestions() {
      this.$router.push("/questions/new");
    },
    // 学科列表
    async subjectsSimple() {
      const { data } = await subjectsSimple(this.page);
      this.list = data;
    },
    // 目录列表
    async directoryList() {
      this.formData.catalogID = "";
      this.formData.tags = "";
      const { data } = await directoryList({
        page: 1,
        pagesize: 10,
        subjectID: this.formData.subjectID,
      });
      this.directory = data.items;
    },
    // 标签列表
    async tagList() {
      const { data } = await tagList({
        page: 1,
        pagesize: 10,
        subjectID: this.formData.subjectID,
      });
      this.tag = data.items;
    },
    //用户列表
    async userList() {
      const { data } = await userList({
        ...this.page,
        keyword: this.formData.keyword,
      });
      this.user = data.list;
    },
    // 城市列表
    province() {
      if (this.cityList.length === 0) {
        this.cityList = provinces();
      } else {
        return;
      }
    },
    //地区选择
    city() {
      this.formData.province = "";
      this.provinceList = citys(this.formData.city);
    },
    // 清除
    clear() {
      (this.formData = {
        subjectID: "",
        difficulty: "",
        questionType: "",
        tags: "",
        province: "",
        city: "",
        keyword: "",
        remarks: "",
        shortName: "",
        direction: "",
        creatorID: "",
        catalogID: "",
      }),
        this.$refs.question.resetFields();
      this.questionsChoiceList();
    },
    // 搜索
    async search() {
      const { data } = await questionList(this.formData);
      this.ChoiceList = data.items;
    },
    // 题型过滤
    questionTypes(row, column, cellValue, index) {
      const obj = this.questionType.find((item) => item.value == cellValue);
      return obj ? obj.label : "未知";
    },
    // 难度过滤
    difficultys(row, column, cellValue, index) {
      const obj = this.difficulty.find((item) => item.value == cellValue);
      return obj ? obj.label : "未知";
    },
    // 审核状态
    chkTypes(row, column, cellValue, index) {
      console.log(cellValue);
      const obj = this.chkType.find((item) => item.value == cellValue);
      return obj ? obj.label : "未知";
    },
    // 发布状态
    publishTypes(row, column, cellValue, index) {
      const obj = this.publishType.find((item) => item.value == cellValue);
      return obj ? obj.label : "已下架";
    },
    // 分页
    changePage(newpage) {
      this.page.page = newpage;
      console.log(newpage);
      this.questionsChoiceList();
    },
    // 每页显示条数
    changeSize(newSize) {
      this.page.pagesize = newSize;
      this.questionsChoiceList();
    },
    // 删除
    async btnDelete(id) {
      await this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        type: "warning",
      });
      try {
        await questionDelete(id);
        this.questionsChoiceList();
        this.$message.success("删除成功");
        if (this.ChoiceList.length === 1 && this.page.page > 1) {
          this.page.page--;
        }
      } catch (err) {
        this.$message.fail("删除失败");
      }
    },
    //精选题库详情
    async Details(id) {
      const { data } = await questionDetails(id);
      this.showDialog = true;
      this.questionDetail = data;
    },
    //精选题库列表
    async questionsChoiceList() {
      const { data } = await questionsChoice(this.page);
      this.ChoiceList = data.items;
      this.page.total = data.counts;
    },
    // 审核
    Dialogaudit(id) {
      this.auditList.id = id;
      this.showDialogaudit = true;
    },

    // 关闭 弹窗
    btnCancel() {
      this.auditList = { chkState: "", chkRemarks: "", id: "" };
      this.showDialogaudit = false;
    },
    // 题目审核确定按钮
    async btnOK() {
      this.$refs.auditFormRef.validate(async (isOK) => {
        if (isOK) {
          try {
            this.auditList.chkState = parseInt(this.auditList.chkState);
            await questionsAudit(this.auditList);
            this.$message.success("操作成功");
            this.showDialogaudit = false;
          } catch (err) {
            this.$message.fail("操作失败");
          }
        }
        this.questionsChoiceList();
      });
    },
    // 编辑修改
    xiugai(id) {
      this.$router.push({ path: "/questions/new", query: { id } });
    },
    //上下架
    shelves(row) {
      if (row.publishState == 0) {
        this.$confirm("您确上架这道题目吗？", "提示", {
          type: "warning",
        }).then(() => {
          const date = {
            id: row.id,
            publishState: 1,
          };
          this.onup(date);
          row.publishState = 1;
        });
      } else {
        this.$confirm("您确认下架这道题目吗？", "提示", {
          type: "warning",
        }).then(() => {
          const date = {
            id: row.id,
            publishState: 0,
          };
          this.onup(date);
          row.publishState = 0;
        });
      }
    },
    // 精选题目 上下架 请求
    async onup(date) {
      try {
        await choicePublish(date);
        this.$message.success("操作成功！");
      } catch (err) {
        this.$message.error("操作失败！");
      }
    },
    // tab 切换
    async tabClick() {
      if (this.activeName === "first") {
        const { data: res } = await questionsChoice();
        this.page.total = res.counts;
        this.ChoiceList = res.items;
        this.questionsChoiceList();
      }
      if (this.activeName === "second") {
        const { data: res } = await questionsChoice({ chkState: 1 });
        this.page.total = res.counts;
        this.ChoiceList = res.items;
      }
      if (this.activeName === "three") {
        const { data: res } = await questionsChoice({ chkState: 2 });
        this.page.total = res.counts;
        this.ChoiceList = res.items;
      }
      if (this.activeName === "fourth") {
        const { data: res } = await questionsChoice({ chkState: 3 });
        this.page.total = res.counts;
        this.ChoiceList = res.items;
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.questions {
  margin: 10px 10px;
}
.add {
  margin-bottom: 10px;
}
</style>


