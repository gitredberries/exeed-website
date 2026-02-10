<template>
  <div class="fullscreen-video">
    <Play :isShow="props.isShow" @onPlayClick="onPlayClick" />
    <el-dialog
      v-model="dialogVisible"
      :append-to-body="true"
      title=""
      :fullscreen="true"
      header-class="fullscreen-header"
      class="fullscreen-dialog"
    >
      <video
        :src="props.url"
        muted
        preload="metadata"
        loop
        :poster="poster"
        controls
        style="width: 100%;height: 100%;object-fit: cover;"
      ></video>
    </el-dialog>
  </div>
</template>
<script setup>
const props = defineProps({
  poster: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  isShow: {
    type: Boolean,
    default: false,
  },
});
const dialogVisible = ref(false);
watch(() => props.dialogVisible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
})
const onPlayClick = () => {
  dialogVisible.value = true;
};
</script>
<style lang="scss">
.fullscreen-header{
  padding: 0;
}
.fullscreen-dialog {
  padding: 0.4rem 0.3rem;
  background-color: rgba(0, 0, 0, 0.8);
  .el-dialog__body{
    height: 100%;
  }
}
</style>
