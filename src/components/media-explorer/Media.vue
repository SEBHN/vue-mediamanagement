<template>
 <v-btn icon>
   <v-icon>insert_drive_file</v-icon>
 </v-btn>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  // props: {
  //   media: { id, name, isFolder, filepath, tags, fileId, fileExtension },
  //   type: Array
  // },
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
