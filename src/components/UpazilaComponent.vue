<template>

    <div class="grid grid-cols-2 grid-rows-1 gap-4">
        <div>
                    <UpazilaLists  v-bind:dist_id="districtId"  @updateFunction="updateFunction"/>
                </div>
        <div v-if="this.districtId">
            <h3 v-if="processing" class="text-2xl font-semibold text-red-600">Upazial Added successfully</h3>
            <h3 class="text-2xl font-semibold text-blue-600">Division : <span
                    class="text-2xl font-semibold text-green-600">{{ divisionName }}</span></h3>
                    <h2 class="text-2xl font-semibold text-blue-600">District : <span
                        class="text-2xl font-semibold text-green-600">{{ districtName }}</span></h2>
                        <div class="w-2/4 m-auto">
                        <div>
                <label for="upazila_name" class="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upazila Name <span class="text-red-500 text-2xl">*</span>
                    <span v-if="errors.upazila_name" class="text-red-500">{{ errors.upazila_name }}</span>
                </label>
                <input v-model="upazila_name" type="text" id="upazila_name" class="btn-text-input" placeholder="Upazila Name" required>
                
                </div>

                <div>
                    <label for="zip_code" class="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip Code <span class="text-red-500 text-2xl">*</span>
                        <span v-if="errors.zip_code" class="text-red-500">{{ errors.zip_code }}</span>
                    </label>
                    <input v-model="zip_code" type="text" id="zip_code" class="btn-text-input" placeholder="Zip Code" required>
                    
                    </div>

                <div>
                    <label for="rdx_id" class="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">redx id</label>
                    <input v-model="rdx_id" type="text" id="rdx_id" class="btn-text-input" placeholder="redx id" required>
                    </div>
                <div>
                        <label for="pathao_name" class="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pathao Name</label>
                        <input v-model="pathao_name" type="text" id="pathao_name" class="btn-text-input" placeholder="Pathao Name" required>
                        </div>
                <div>
                    <label for="pathao_id" class="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pathao ID</label>
                    <input v-model="pathao_id" type="text" id="pathao_id" class="btn-text-input" placeholder="Pathao ID" required>
                    </div>
                <div>
                        <label for="edesh_id" class="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edesh ID</label>
                        <input v-model="edesh_id" type="text" id="edesh_id" class="btn-text-input" placeholder="Edesh ID" required>
                        </div>
            </div>
    <button @click="updateUpazila" v-if="updated" class="btn-blue ml-4 mt-4">Update Upazila</button>
            <button @click="saveUpazila"  v-else class="btn-blue ml-4 mt-4">Save Upazila</button>
                

            
        </div>
    </div>
    
    
</template>

<script>
import firebaseConfig from '../../config/firebaseConfig.js'
import { getDatabase, ref, push, get, set } from 'firebase/database';
import UpazilaLists from './upazila/UpazilaLists.vue';
// import { signIn } from '../../config/authService.js';

// import DistrictList from './district/DistrictList.vue';

export default {
    components: {
    UpazilaLists
},
    data() {
        return {
            errors: {},
            distict: '',
            upazila_name: '',
            upazila_id:'',
            zip_code:'',
            rdx_id:'',
            pathao_name:'',
            pathao_id:'',
            edesh_id:'',
            updated: false,
            processing: false,
            districtId: this.$route.params.id,
            districtName: '',
            divisionId: '',
            divisionName: '',
        };
    },
    mounted() {
        if(this.districtId){
            this.getDistrict();
        }
        

        // if(this.divisionId){
        //     this.getDivision()
        // }
    },
    methods: {
        validateForm() {
            this.errors = {};

            if (!this.upazila_name.trim()) {
                this.errors.upazila_name = 'Upazila is required.';
            } else if (this.upazila_name.length < 3) {
                this.errors.upazila_name = 'Upazila must be at least 3 characters.';
            }

            if (!this.zip_code.trim()) {
                this.errors.zip_code = 'zip code is required.';
            } else if (this.zip_code.length < 4) {
                this.errors.zip_code = 'zip code must be at least 4 Digit.';
            } else if (!/^\d+$/.test(this.zip_code.trim())) {
                this.errors.zip_code = 'Zip Code must contain only numbers.';
            }

            return Object.keys(this.errors).length === 0;
        },
        updateFunction(upazila) {
            this.upazila_id =upazila.id;
            this.upazila_name = upazila.name;
            this.zip_code=upazila.zip_code;
            this.divisionId = upazila.div_id;
            this.divisionName = upazila.div_name;
            this.districtId = upazila.dist_id;
            this.districtName = upazila.dist_name;
            this.rdx_id = upazila.rdx_id;
            this.pathao_name = upazila.pathao_name;
            this.pathao_id = upazila.pathao_id;
            this.edesh_id = upazila.edesh_id;
            this.updated = true;
        },
        async updateUpazila(){
            if (this.validateForm()) {
            try {

                const db = getDatabase(firebaseConfig.app);
                const dataRef = ref(db, `upazilas/${ this.upazila_id }`);

                await set(dataRef, {
                    name: this.upazila_name, 
                    zip_code:this.zip_code,
                    div_id: this.divisionId,
                    div_name: this.divisionName,
                    dist_id: this.districtId,
                    dist_name: this.districtName,
                    rdx_id: this.rdx_id,
                    pathao_name: this.pathao_name,
                    pathao_id: this.pathao_id,
                    edesh_id: this.edesh_id,
                });

                this.upazila_name = '';
                this.zip_code = '';
                this.divisionId = '';
                // this.divisionName = '';
                this.districtId = '';
                // this.districtName = '';
                this.rdx_id = '';
                this.pathao_name = '';
                this.pathao_id = '';
                this.edesh_id = '';
                this.processing = false;
                this.updated=false;
            } catch (error) {
                console.error('Authentication error:', error.message);
            }
            } else {
                console.log('Form validation failed.');
            }
        },
        async getDivision() {
            try {
                const db = getDatabase(firebaseConfig.app);
                const divisionRef = ref(db, `divisions/${this.divisionId}`);
                const snapshot = await get(divisionRef);
                this.divisionName = snapshot.val().name;
            } catch (error) {
                console.error('Error fetching getDivision data from Firebase:', error.message);
            }
        },
        async getDistrict() {
            try {
                const db = getDatabase(firebaseConfig.app);
                const divisionRef = ref(db, `districts/${this.districtId}`);
                const snapshot = await get(divisionRef);
                this.districtName = snapshot.val().name;
                this.divisionId= snapshot.val().div_id;
                if (this.divisionId) {
                this.getDivision();
                }
            } catch (error) {
                console.error('Error fetching getDistrict data from Firebase:', error.message);
            }
        },
        async saveUpazila() {
            if (this.validateForm()) {
            try {

                const db = getDatabase(firebaseConfig.app);
                const dataRef = ref(db, 'upazilas');

                await push(dataRef, { 
                    name: this.upazila_name, 
                    zip_code:this.zip_code,
                    div_id: this.divisionId,
                    div_name: this.divisionName,
                    dist_id: this.districtId,
                    dist_name: this.districtName,
                    rdx_id: this.rdx_id,
                    pathao_name: this.pathao_name,
                    pathao_id: this.pathao_id,
                    edesh_id: this.edesh_id,
                 });


                this.upazila_name = '';
                this.zip_code='';
                this.divisionId = '';
                this.divisionName = '';
                this.districtId = '';
                this.districtName = '';
                this.rdx_id = '';
                this.pathao_name = '';
                this.pathao_id = '';
                this.edesh_id = '';
                this.processing = false;
            } catch (error) {
                console.error('Authentication error:', error.message);
            }
            } else {
                console.log('Form validation failed.');
            }
        }
    }
};
</script>
