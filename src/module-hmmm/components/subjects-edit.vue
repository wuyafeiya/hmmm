<template>
  <div class="container">
    <!-- 修改的弹框 -->
    <el-dialog
      title="修改学科"
      :visible="editDialogVisible"
      width="20%"
      @close="editResetSub"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            :model="editSubjectsFrom"
            :rules="editSubjectsFromRules"
            ref="editSubjectsFromRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="学科名称" prop="subjectName">
              <el-input v-model="editSubjectsFrom.subjectName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <span class="subspan">是否显示</span>
        <el-switch
          v-model="editSubjectsFrom.isFrontDisplay"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-row>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('changeFn')">取 消</el-button>
        <el-button type="primary" @click="editSubFrom">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Subject from "../../api/hmmm/subjects";
export default {
  props: {
    editDialogVisible: {
      type: Boolean,
      required: true
    },
    editSubjectsFrom: {
      type: Object,
      require: true
    },
    userId: {
      type: String | Number,
      require: true
    }
  },

  data() {
    return {
      // 修改的验证
      editSubjectsFromRules: {
        subjectName: [
          { required: true, message: "请输入学科名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 修改学科
    async editSubFrom() {
      if (this.editSubjectsFrom.isFrontDisplay === true) {
        this.editSubjectsFrom.isFrontDisplay = 1;
      } else {
        this.editSubjectsFrom.isFrontDisplay = 0;
      }
      try {
        await Subject.update({
          id: this.userId,
          subjectName: this.editSubjectsFrom.subjectName,
          isFrontDisplay: this.editSubjectsFrom.isFrontDisplay
        });
        this.$message.success("修改学科成功");
        this.$emit("changeFn");
      } catch (error) {
        this.$message.error("修改学科失败");
      }
    },
    // 修改清空
    editResetSub() {
      this.$refs.editSubjectsFromRef.resetFields();
    }
  }
};
</script>

<style scoped lang="less"></style>
