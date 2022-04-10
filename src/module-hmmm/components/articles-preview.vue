<!-- 预览 -->
<template>
  <div>
    <el-dialog
      title="预览文章"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeFn"
    >
      <el-container>
        <el-header>
          <div class="title">
            <h4 style="margin-bottom: 10px">{{ articleContent.title }}</h4>
          </div>
          <div class="remarks">
            <span style="margin-right: 10px">
              {{
                articleContent.createTime | convertTime("YYYY-MM-DD HH:mm:ss")
              }}
            </span>
            <span style="margin-right: 10px">{{
              articleContent.username
            }}</span>
            <span style="margin-right: 10px">
              <i class="el-icon-magic-stick"></i>
              {{ articleContent.visits }}</span
            >
          </div>
        </el-header>
        <el-main>
          <div
            class="article-content markdown-body"
            v-html="articleContent.articleBody"
          ></div>
        </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import "github-markdown-css/github-markdown.css";
// import moment from "moment";

export default {
  data() {
    return {};
  },

  methods: {
    closeFn() {
      //关闭
      this.$emit("update:dialogVisible", false);
    },
  },

  props: {
    dialogVisible: {
      //控制显示隐藏
      type: Boolean,
      required: true,
    },
    articleContent: {
      type: [Boolean, String, Object],
      // required: true,
    },
  },

  watch: {},

  computed: {},

  created() {},

  mounted() {},

  components: {},
};
</script>

<style lang='less' scoped>
/deep/.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>