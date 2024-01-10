<template>
  <div>
    <!-- <label for="dataInput">Division Name:</label>
    <input v-model="division" id="dataInput" type="text" class="input-text" />
    <button @click="saveData" class="btn-blue ml-4">Save Data</button> -->

    <div>
      <DivisionList />
    </div>
  </div>
</template>

<script>
import firebaseConfig from '../../config/firebaseConfig.js' // Import the firebase configuration file
import DivisionList from './DivisionList.vue';
// import firebaseConfig from '@/path-to-config-firebase'; // Adjust the path accordingly
import { getDatabase, ref, push } from 'firebase/database';
// import { signIn } from '../../config/authService.js'; 

export default {
  components: {
    DivisionList
  },
  data() {
    return {
      division: '',
      rdx_id: new Date().getTime()
    };
  },
  methods: {
    async saveData() {

try {

      const db = getDatabase(firebaseConfig.app);
      const dataRef = ref(db, 'divisions');

      await push(dataRef, { name: this.division, rdx_id: this.rdx_id });

      // set(dataRef, {
      //   data: this.division
      // }).catch((error) => {
      //   console.error('Error writing to database:', error.message);
      // });
      
      // Push data to a specific node in the database
      // db.ref('your-data-node').push({
      //   data: this.data
      // });

      // Clear the input field after saving data
      this.division = '';
      this.rdx_id = new Date().getTime();
} catch (error) {
        console.error('Authentication error:', error.message);
      }

    }
  }
};
</script>
