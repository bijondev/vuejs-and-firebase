<template>
    <div>
        <div v-if="this.divisionId">
        <h1 v-if="updated" class="text-4xl font-semibold text-red-600">Distict Added successfully</h1>
        <h2 class="text-3xl font-semibold text-blue-600 mb-10">Division Name: <span class="text-3xl font-semibold text-green-600">{{ divisionName }}</span></h2>
        <label for="dataInput">Distict Name:</label>
        <input v-model="distict" id="dataInput" type="text" class="input-text" />
        <button @click="saveData" class="btn-blue ml-4">Save Data</button>
    </div>
<div>
    <DistrictList v-bind:div_id="divisionId" />
</div>
    </div>
</template>

<script>
import firebaseConfig from '../../config/firebaseConfig.js' 
import { getDatabase, ref, push, get } from 'firebase/database';
// import { signIn } from '../../config/authService.js';

import DistrictList from './district/DistrictList.vue';

export default {
    components: {
        DistrictList
    },
    data() {
        return {
            distict: '',
            updated: false,
            divisionId: this.$route.params.id,
            divisionName: '',
        };
    },
    mounted() {
        if(this.divisionId){
           this.getDivision(); 
        }
        
    },
    methods: {
        async getDivision(){
            try {
                const db = getDatabase(firebaseConfig.app);
                const divisionRef = ref(db, `divisions/${this.divisionId}`);
                const snapshot = await get(divisionRef);
                this.divisionName = snapshot.val().name;
            } catch (error) {
                console.error('Error fetching division data from Firebase:', error.message);
            }
        },
        async saveData() {
            try {

                const db = getDatabase(firebaseConfig.app);
                const dataRef = ref(db, 'districts');

                await push(dataRef, { name: this.distict, div_id: this.divisionId, div_name: this.divisionName });

     
                this.distict = '';
                this.updated = true
            } catch (error) {
                console.error('Authentication error:', error.message);
            }

        }
    }
};
</script>
