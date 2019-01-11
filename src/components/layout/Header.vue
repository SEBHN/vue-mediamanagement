<template>
  <v-toolbar absolute scroll-off-screen color="amber accent-4">
    <v-btn icon>
      <v-icon>home</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-text-field
          class="mx-4 mt-2"
          label="Search tags..."
          hide-details
          color="black"/>
      <!-- Create new folder button -->
      <v-btn icon class="mx-4">
        <v-icon>create_new_folder</v-icon>
      </v-btn>
      <!-- Upload button -->
      <v-btn flat class="mx-4">
        <v-icon class="mr-2">cloud_upload</v-icon>
        Upload
      </v-btn>
      <v-btn flat class="mx-4">Sign Out</v-btn>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>

</style>
