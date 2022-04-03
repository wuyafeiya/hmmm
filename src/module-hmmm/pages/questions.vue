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
          @click="addQuestion"
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
      <el-alert
        type="info"
        :closable="false"
        show-icon
        style="margin-bottom: 15px"
      >
        <template slot="title"> 数据一共 {{ page.total }}条 </template>
      </el-alert>
      <el-table :data="questionList" style="width: 100%">
        <el-table-column label="试题编号" prop="number"></el-table-column>
        <el-table-column label="学科" prop="subject"></el-table-column>
        <el-table-column label="目录" prop="catalog"></el-table-column>
        <el-table-column
          label="题型"
          prop="questionType"
          :formatter="questionTypes"
        ></el-table-column>
        <el-table-column label="题干" prop="question">
          <template v-slot="{ row }">
            {{ row.question | html2Text }}
          </template>
        </el-table-column>
        <el-table-column label="录入时间" width="180">
          <template v-slot="{ row }">
            {{ row.addDate | parseTimeByString }}
          </template>
        </el-table-column>
        <el-table-column
          label="难度"
          prop="difficulty"
          :formatter="difficultys"
        ></el-table-column>
        <el-table-column label="录入人" prop="creator"></el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              plain
              icon="el-icon-view"
              circle
              size="small"
              title="预览"
              @click="Details(row.id)"
            />
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              size="small"
              plain
              title="修改"
              @click="btnNew(row.id)"
            />
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              circle
              size="small"
              title="删除"
              @click="btnDelete(row.id)"
            />
            <el-button
              type="warning"
              plain
              icon="el-icon-check"
              circle
              size="small"
              title="加入精选"
              @click="add(row.id, 1)"
            />
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
  </div>
</template>
<script>
// 基础题库
import {
  subjectsSimple,
  directoryList,
  tagList,
  userList,
  questionList,
  questionDelete,
  questionDetails,
  choiceAdd,
} from "../../api/hmmm/questions";
import { difficulty, questionType, direction } from "@/api/hmmm/constants";
import { provinces, citys } from "@/api/hmmm/citys";
import questionPreview from "../components/questions-preview.vue";
export default {
  components: {
    questionPreview,
  },
  data() {
    return {
      showDialog: false,
      list: [],
      directory: [],
      tag: [],
      direction: [],
      user: [],
      provinceList: [],
      cityList: [],
      questionList: [],
      difficulty,
      questionType,
      direction,
      questionDetail: {},
      page: {
        page: 1,
        pagesize: 10,
        total: null,
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
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 学科列表
    async subjectsSimple() {
      const { data } = await subjectsSimple(this.page);
      this.list = data;
    },
    // 目录列表
    async directoryList() {
      this.formData.catalogID = "";
      this.formData.tags = "";
      const {
        data: { items },
      } = await directoryList({
        ...this.page,
        subjectID: this.formData.subjectID,
      });
      this.directory = items;
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
      this.getDataList();
    },
    // 基础题库列表
    async getDataList() {
      const { data } = await questionList(this.page);
      this.questionList = data.items;
      this.page.total = data.counts;
    },
    // 搜索
    async search() {
      const { data } = await questionList(this.formData);
      this.questionList = data.items;
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
    // 分页
    changePage(newpage) {
      this.page.page = newpage;
      this.getDataList();
    },
    // 每页显示条数
    changeSize(newSize) {
      this.page.pagesize = newSize;
      this.getDataList();
    },
    // 删除
    async btnDelete(id) {
      await this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        type: "warning",
      });
      try {
        await questionDelete(id);
        this.getDataList();
        this.$message.success("删除成功");
        if (this.questionList.length === 1 && this.page.page > 1) {
          this.page.page--;
        }
      } catch (err) {
        this.$message.fail("删除失败");
      }
    },
    //基础题库详情
    async Details(id) {
      this.showDialog = true;
      const { data } = await questionDetails(id);
      this.questionDetail = data;
    },
    //修改
    btnNew(id) {
      this.$router.push({ path: "/questions/new", query: { id } });
    },

    // 加入精选
    add(id) {
      this.$confirm("此操作将该题目加入精选, 是否继续? ", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          await choiceAdd({ id, choiceState: 1 });
          this.$message.success("添加成功");
          this.getDataList();
        })
        .catch(() => {
          this.$message.info("已取消加入精选");
        });
    },
    // 新增试题
    addQuestion() {
      this.$router.push({ path: "/questions/new" });
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
