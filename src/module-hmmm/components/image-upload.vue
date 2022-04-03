<template>
  <div class="box">
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="load"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
    >
      <span>上传图片</span>
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" style="width: 100px; height: 50px" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDvgCSUGn46tRjma8QTHp8BzYruiHadQyH',
  SecretKey: '4sVt1tWu2uXv3vXv4xay6zua1C7mCMGu'
})
export default {
  name: 'ImageUpload',
  data () {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null
    }
  },
  computed: {
    fileComputed () {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview (file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
      this.$emit('delImg')
    },
    changeFile (file, fileList) {
      // console.log(file)
      // console.log(fileList)
      // if (!this.fileList.some(item => item.uid === file.uid)) {
      //   this.fileList.push(file)
      // }
      // this.fileList = fileList.map(item => item)
      this.fileList = fileList
    },
    beforeUpload (file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      return true
    },
    load (params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'hrsaas-1310651695', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: params.file// 上传文件对象
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            this.$emit('loaded', this.fileList[0].url)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}

.el-upload--picture-card {
  width: 100px;
  height: 50px;
  line-height: 50px;
}

.el-upload-list__item {
  width: 100px!important;
  height: 50px!important
}
</style>
