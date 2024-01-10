<template>
  <div class="mt-5 ml-10">
    <h2 class="text-3xl font-bold underline">Division List</h2>
    <table class="w-1/2 flex-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
       
      <tbody>
        <tr v-for="division in divisions" :key="division.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td class="text-xs text-gray-900 dark:text-white">{{ division.id }}</td>
          <td>
            <router-link :to="{ name: 'edit', params: { id: division.id } }"  class="text-blue-500 hover:text-blue-700">
                {{ division.name }}
              </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'DistrictsComponent', params: { id: division.id, name: division.name } }"  class="text-blue-500 hover:text-blue-700">
                  View Distict
                </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../config/firebaseConfig.js'; 

export default {
  data() {
    return {
      divisions: []
    };
  },
  mounted() {
    // Fetch data when the component is mounted
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Get a reference to the database
        const db = getDatabase(app);

        // Specify the path in the database from where you want to fetch the division data
        const divisionsRef = ref(db, 'divisions');

        // Fetch data from Firebase
        const snapshot = await get(divisionsRef);

        // Transform the snapshot into an array of objects
        const divisionsArray = [];
        snapshot.forEach((childSnapshot) => {
          const division = { id: childSnapshot.key, ...childSnapshot.val() };
          divisionsArray.push(division);
        });

        // Set the divisions data in the component's state
        this.divisions = divisionsArray;
      } catch (error) {
        console.error('Error fetching data from Firebase:', error.message);
      }
    },
    formatTimestamp(timestamp) {
      // Implement your own timestamp formatting logic if needed
      // For example, you can use the Date constructor to format the timestamp
      return new Date(timestamp).toLocaleString();
    }
  }
};
</script>
