<template>
 
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  props: {
    media: { id, name, isFolder, filepath, tags, fileId, fileExtension },
    type: Array
  },
  methods: {
      addTag(tag) {
        this.tags.push(tag);
      },
      removeTag(tag) {
        throw new Error('Not yet implemented');
      }
  }
}
</script>

<style>

</style>
