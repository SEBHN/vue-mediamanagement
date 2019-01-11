<template>
  <div>
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
        <v-btn icon class="mx-4" @click="dialog = true">
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

    <!-- Create folder dialog -->
     <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Create new folder?</v-card-title>
            <v-text-field
            class="ma-4"
            label="Enter folder name..."
            hide-details
            color="black"/>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              flat
              @click="dialog=false">Cancel</v-btn>
            <v-btn
              color="success"
              flat
              @click="dialog=false">Create</v-btn>  
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      dialog: false
    }
  }
}
</script>

<style>

</style>
