<template>
  <div class="container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>试题录入</span>
      </div>

      <el-form
        ref="dataForm"
        label-width="120px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="学科：" prop="subjectID">
          <el-select
            v-model="formData.subjectID"
            @focus="getSubjectsSimple"
            style="width: 600px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in subjectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录：" prop="catalogID">
          <el-select
            v-model="formData.catalogID"
            @focus="getDirectorys"
            style="width: 600px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in directorysList"
              :key="item.id"
              :label="item.directoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业：" prop="enterpriseID">
          <el-select
            v-model="formData.enterpriseID"
            @focus="getCompanys"
            style="width: 600px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in companysList"
              :key="item.id"
              :label="item.company"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" required>
          <el-form-item prop="province" style="display: inline-block">
            <el-select
              v-model="formData.province"
              placeholder="请选择省"
              @change="chooseProvince"
              style="width: 295px; margin-right: 10px"
            >
              <el-option
                v-for="item in provinces"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city" style="display: inline-block">
            <el-select
              v-model="formData.city"
              placeholder="请选择市"
              style="width: 295px"
            >
              <el-option
                v-for="item in cityData"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item label="方向：" prop="direction">
          <el-select
            v-model="formData.direction"
            style="width: 600px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in directionsList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型：" prop="questionType">
          <el-radio-group v-model="formData.questionType" @change="questionTypeChange">
            <el-radio :label="'1'">单选</el-radio>
            <el-radio :label="'2'">多选</el-radio>
            <el-radio :label="'3'">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度：" prop="difficulty">
          <el-radio-group v-model="formData.difficulty">
            <el-radio :label="'1'">简单</el-radio>
            <el-radio :label="'2'">一般</el-radio>
            <el-radio :label="'3'">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题干：" prop="question">
          <quill-editor
            :options="editorOption"
            style="height: 200px; margin-bottom: 70px"
            v-model="formData.question"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="选项：" v-if="formData.questionType !== '3'">
          <div
            class="option-box"
            v-for="(item, index) in formData.options"
            :key="index"
          >
            <el-radio
              v-if="formData.questionType === '1'"
              v-model="radio"
              :label="index"
            >{{String.fromCharCode(ASCII[index]) + '：'}}</el-radio>
            <el-checkbox
            v-if="formData.questionType === '2'"
            v-model="item.isRight"
            :true-label="1"
            :false-label="0"
            >{{String.fromCharCode(ASCII[index]) + '：'}}</el-checkbox>
            <el-input
              class="option-input"
              style="width: 200px"
              v-model="formData.options[index].title"
            ></el-input>
            <upload-image
              class="uploadImage"
              @loaded="loaded($event, index)"
              @delImg="delImg(index)"
            ></upload-image>
          </div>
          <el-button
            :disabled="formData.questionType === '1'"
            @click="addOption"
            type="danger"
            icon="el-icon-plus"
            style="display: block; margin-bottom: 20px"
            >增加选项与答案</el-button
          >
        </el-form-item>
        <el-form-item label="解析视频：">
          <el-input style="width: 600px" v-model="formData.videoURL"></el-input>
        </el-form-item>
        <el-form-item label="答案解析：" prop="answer">
          <quill-editor
            v-model="formData.answer"
            :options="editorOption"
            style="height: 200px; margin-bottom: 50px"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="题目备注：">
          <el-input
            v-model="formData.remarks"
            type="textarea"
            rows="5"
            style="width: 600px"
          />
        </el-form-item>
        <el-form-item label="试题标签：">
          <el-select
            multiple
            v-model="formData.tags"
            @focus="getTags"
            style="width: 600px"
            placeholder="请选择试题标签"
          >
            <el-option
              v-for="item in tagsList"
              :key="item.id"
              :label="item.tagName"
              :value="item.tagName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-row style="padding-left: 120px">
        <el-button :type="this.formData.id ? 'success' : 'primary'" @click="btnOK">{{this.formData.id?'确认修改':'确认提交'}}</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getSubjectsSimple, getDirectorys, getCompanys, getTags, addQuestion, getQuestion, editQuestion } from '@/api/hmmm/questions.js'
import { provinces, citys } from '@/api/hmmm/citys'
import { direction } from '@/api/hmmm/constants'
import uploadImage from '@/module-hmmm/components/image-upload.vue'
export default {
  components: {
    quillEditor,
    uploadImage
  },
  data () {
    return {
      editorOption: {
        placeholder: '请在这里输入',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            ['blockquote'], // 引用，代码块
            ['code-block', 'image', 'link'] // 上传图片、上传视频
          ]
        }
      },
      subjectList: [],
      directorysList: [],
      companysList: [],
      provinces: [],
      cityData: [],
      directionsList: direction,
      tagsList: [],
      formData: {
        subjectID: '',
        catalogID: '',
        enterpriseID: '',
        province: '',
        city: '',
        direction: '',
        questionType: '1',
        difficulty: '1',
        question: '',
        options: [{
          code: '',
          title: '',
          img: '',
          isRight: 0
        }, {
          code: '',
          title: '',
          img: '',
          isRight: 0
        }, {
          code: '',
          title: '',
          img: '',
          isRight: 0
        }, {
          code: '',
          title: '',
          img: '',
          isRight: 0
        }],
        videoURL: '',
        answer: '',
        remarks: '',
        tags: ''
      },
      ASCII: [65, 66, 67, 68],
      rules: {
        subjectID: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        catalogID: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        enterpriseID: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        questionType: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        difficulty: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        question: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '本项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    radio: {
      get: function () {
        let num = null
        this.formData.options.forEach((item, index) => {
          if (item.isRight === 1) {
            num = index
          }
        })
        return num
      },
      set: function (value) {
        this.formData.options.forEach(item => {
          item.isRight = 0
        })
        this.formData.options[value].isRight = 1

        console.log(this.formData.options)
      }
    }
  },
  created () {
    this.getSubjectsSimple()
    this.getDirectorys()
    this.getCompanys()
    this.getProvinces()
    if (this.$route.query?.id) {
      this.editQuestion()
    } else {
      //
    }
  },
  methods: {
    // 获取简单学科列表
    async getSubjectsSimple () {
      const { data } = await getSubjectsSimple()
      this.subjectList = data
    },
    // 获取目录列表
    async getDirectorys () {
      const { data } = await getDirectorys({ page: 1, pagesize: 20 })
      this.directorysList = data.items
    },
    // 获取企业列表
    async getCompanys () {
      const { data } = await getCompanys({ page: 1, pagesize: 20 })
      this.companysList = data.items
    },
    // 获取城市列表
    getProvinces () {
      this.provinces = provinces()
    },
    // 根据城市获取地区列表
    chooseProvince (value) {
      this.formData.city = ''
      this.cityData = citys(value)
    },
    // 图片加载完成
    loaded (url, index) {
      this.formData.options[index].img = url
      console.log(this.formData.options)
    },
    // 删除图片
    delImg (index) {
      this.formData.options[index].img = ''
      console.log(this.formData.options)
    },
    async getTags () {
      const { data } = await getTags({ page: 1, pagesize: 20 })
      this.tagsList = data.items
    },
    addOption () {
      this.formData.options.push({
        code: '',
        title: '',
        img: '',
        isRight: 0
      })
      this.ASCII.push(this.ASCII[this.ASCII.length - 1] + 1)
      this.formData.options.forEach((item, index) => {
        item.code = String.fromCharCode(this.ASCII[index])
      })
    },
    questionTypeChange () {
      this.formData.options.forEach(item => {
        item.isRight = 0
        item.title = ''
        item.img = ''
      })
    },
    async btnOK () {
      try {
        this.formData.tags = this.formData.tags.join()
        await this.$refs.dataForm.validate()
        if (this.formData.id) {
          await editQuestion(this.formData)
        } else {
          await addQuestion(this.formData)
        }
        this.$message.success('提交题库成功！')
        this.$router.push('/questions/list')
      } catch (error) {
        console.log(error)
      }
    },
    // 获取编辑题库数据
    async editQuestion () {
      try {
        const { data } = await getQuestion(this.$route.query.id)
        data.tags = data.tags.split(',')
        this.formData = data
        this.$message.success('获取数据成功！')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
}

.option-box {
  position: relative;
  margin-bottom: 40px;
  .option-input {
    position: absolute;
    left: 50px;
  }
}

.uploadImage {
  display: inline-block;
  position: absolute;
  left: 270px;
  top: -10px;
}
</style>
