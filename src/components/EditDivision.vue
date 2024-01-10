<!-- EditDivision.vue -->
<template>
    <div>
        <h1 v-if="updated" class="text-4xl font-semibold text-red-600">Division updated successfully</h1>
        <h2 class="text-3xl font-bold underline">Edit Division</h2>
        <label for="editedDivision">Edit Division:</label>
        <!-- Access the division data from the route params -->
        <input v-model="editedDivision" id="editedDivision" type="text" class="input-text" />
        <button @click="updateDivision" class="btn-blue ml-4">Update Division</button>
    </div>
</template>

<script>
import { getDatabase, ref, set, get } from 'firebase/database';
import { app } from '../../config/firebaseConfig.js';  // Adjust the path accordingly

export default {
    // props: ['divisionData'],
    data() {
        return {
            editedDivision: '',
            // divisionData: '',
            divisionId: this.$route.params.id,
            updated: false
        };
    },
    created() {
        // console.log(this.$route.params.divisionData);
        // this.divisionData = this.$route.params.divisionData;
    },
     mounted() {
        this.fetchDivisionData();
    },
    methods: {
         async fetchDivisionData() {
            try {
                // Get a reference to the database
                const db = getDatabase(app);

                // Specify the path in the database to fetch the division data
                const divisionRef = ref(db, `divisions/${this.divisionId}`);

                // Fetch data from Firebase
                const snapshot = await get(divisionRef);

                // Set the existing division name in the component's state
                this.editedDivision = snapshot.val().name;
            } catch (error) {
                console.error('Error fetching division data from Firebase:', error.message);
            }
        },
        async updateDivision() {
            try {
                // Get a reference to the database
                const db = getDatabase(app);

                // Specify the path in the database where you want to update the division data
                const divisionRef = ref(db, `divisions/${this.divisionId}`);

                // Update the division data in Firebase
                await set(divisionRef, { name: this.editedDivision, rdx_id: 0 });
                this.updated = true
                console.log('Division updated successfully');
            } catch (error) {
                console.error('Error updating division:', error.message);
            }
        }
    }
};
</script>
