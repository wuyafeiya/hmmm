<!-- 新增文章组件 -->
<template>
  <div>
    <el-dialog
      title="新增文章"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeFn"
    >
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="文章标题">
          <el-input
            v-model="article.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="文章内容">
          <quillEditor
            :options="editorOption"
            v-model="article.articleBody"
          ></quillEditor>
        </el-form-item>

        <el-form-item label="视频地址">
          <el-input
            v-model="article.videoURL"
            placeholder="请输入视频地址"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btnFn">确 定</el-button>
        <el-button @click="closeFn">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { add, update } from "@/api/hmmm/articles";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      // content: "", //文章内容,
      editorOption: {
        //富文本框
        placeholder: "请输入内容", // 占位文字
        modules: {
          toolbar: [
            //工具菜单栏配置
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            [{ align: [] }], // 对齐方式
            ["blockquote", "code-block"], // 引用  代码块
            ["image", "link"], // 链接、图片、视频
          ],
        },
        placeholder: "请输入文章内容", //提示
      },

      article: {
        //表单
        title: "",
        videoURL: "",
        articleBody: "", //文章内容,
      },
    };
  },

  methods: {
    closeFn() {
      //取消按钮
      this.$emit("update:dialogVisible", false);
    },

    async btnFn() {
      if (this.article.id) {
        //修改文章
        try {
          await update(this.article);
          this.$message.success("保存成功");
          this.$emit("update:dialogVisible", false);
          this.$parent.getArticleList(); //重新渲染数据
        } catch (err) {
          this.$message.fail("保存失败请稍后重试");
        }
      } else {
        //增加文章
        try {
          await add(this.article);
          this.$message.success("保存成功");
          this.$emit("update:dialogVisible", false);

          this.$parent.getArticleList(); //重新渲染数据
        } catch (err) {
          this.$message.fail("保存失败请稍后重试");
        }
      }
      this.article = {
        //表单
        title: "",
        videoURL: "",
        articleBody: "", //文章内容,
      };
    },
  },

  props: {
    dialogVisible: {
      //控制显示隐藏
      type: Boolean,
      required: true,
    },
 
  },

  watch: {},

  computed: {},

  created() {},

  mounted() {},

  components: {
    quillEditor,
  },
};
</script>

<style lang='less' scoped>
/deep/.ql-blank {
  height: 125px;
}

/deep/.ql-editor {
  height: 125px;
}
</style>