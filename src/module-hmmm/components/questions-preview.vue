<template>
  <div class="container">
    <el-dialog
      title="题目预览"
      :visible="showDialog"
      width="900px"
      @close="btnCancel"
    >
      <el-row>
        <el-col :span="6"> 【题型】: {{ questionTypes }} </el-col>
        <el-col :span="6"> 【编号】: {{ questionDetail.id }} </el-col>
        <el-col :span="6"> 【难度】: {{ difficultys }} </el-col>
        <el-col :span="6"> 【标签】: {{ questionDetail.tags }} </el-col>
        <el-col :span="6"> 【学科】: {{ questionDetail.subjectName }} </el-col>
        <el-col :span="6">
          【目录】: {{ questionDetail.directoryName }}
        </el-col>
        <el-col :span="6"> 【方向】: {{ questionDetail.direction }} </el-col>
      </el-row>
      <hr />
      <el-row>【题干】:</el-row>
      <el-row style="color: blue; margin: 10px 0px">{{
        questionDetail.question | html2Text
      }}</el-row>
      <el-row>
        <el-row style="padding-bottom: 5px">
          {{ questionTypes }}:（以下选中的选项为正确答案)
        </el-row>
        <!-- 单选 -->
        <el-row v-if="questionDetail.questionType == 1">
          <el-row v-for="item in questionDetail.options" :key="item.id">
            <el-radio
              :label="item.title"
              :value="item.isRight ? item.title : ''"
            ></el-radio>
          </el-row>
        </el-row>
        <!-- 多选 -->
        <el-row v-if="questionDetail.questionType == 2">
          <el-row
            style="padding: 10px"
            v-for="item in questionDetail.options"
            :key="item.id"
          >
            <el-checkbox
              :label="item.title"
              :checked="item.isRight == 1 ? true : false"
            ></el-checkbox>
          </el-row>
        </el-row>
      </el-row>
      <hr />
      <el-row>
        【参考答案】：
        <el-button type="danger" size="small" @click="showVideo = true"
          >视频答案预览</el-button
        ></el-row
      >
      <el-row style="margin: 10px">
        <video
          v-if="showVideo"
          :src="questionDetail.videoURL"
          controls
          muted
        ></video
      ></el-row>
      <hr />
      <el-row style="height: 30px; line-height: 30px">
        【答案解析】: {{ questionDetail.answer | html2Text }}
      </el-row>
      <hr />
      <el-row style="height: 30px; line-height: 30px">
        【题目备注】: {{ questionDetail.remarks }}
      </el-row>
      <el-row style="text-align: center">
        <el-button type="primary" @click="btnCancel">关闭</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { difficulty, questionType } from '@/api/hmmm/constants'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    questionDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showVideo: false
    }
  },
  methods: {
    btnCancel () {
      this.showVideo = false
      this.$emit('update:showDialog', false)
    }
  },
  computed: {
    questionTypes () {
      const obj = questionType.find(
        (item) => item.value == this.questionDetail.questionType
      )
      return obj ? obj.label : '未知'
    },
    difficultys () {
      const obj = difficulty.find(
        (item) => item.value == this.questionDetail.difficulty
      )
      return obj ? obj.label : '未知'
    }
  }
}
</script>
<style scoped lang='scss'>
.el-col {
  padding: 10px 0;
}
.el-radio {
  padding: 10px 0px;
}
</style>
