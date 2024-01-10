<template>

    <div class="grid grid-cols-2 grid-rows-1 gap-4">
        <div>
            <UnionLists v-bind:upz_id="upazila_id"  @updateFunction="updateUnionFunction"/>
                    <!-- <UpazilaLists  v-bind:dist_id="districtId"  @updateFunction="updateFunction"/> -->
                </div>
        <div v-if="this.upazila_id">
            <h3 v-if="processing" class="text-2xl font-semibold text-red-600">Upazial Added successfully</h3>
            <h3 class="text-2xl font-semibold text-blue-600">Division : <span
                    class="text-2xl font-semibold text-green-600">{{ divisionName }}</span></h3>

                    <h2 class="text-2xl font-semibold text-blue-600">District : <span
                        class="text-2xl font-semibold text-green-600">{{ districtName }}</span></h2>
    <h2 class="text-2xl font-semibold text-blue-600">Upazila : <span
                            class="text-2xl font-semibold text-green-600">{{ upazila_name }}</span></h2>

                        <div class="w-2/4 m-auto">
                        <div>
                <label for="union_name" class="float-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Union Name <span class="text-red-500 text-2xl">*</span>
                <span v-if="errors.union_name" class="text-red-500">{{ errors.union_name }}</span>
            </label>
                <input v-model="union_name" type="text" id="union_name" class="btn-text-input" placeholder="Union Name" required>
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

            <button @click="updateUnion" v-if="updated" class="btn-blue ml-4 mt-4">Update Upazila</button>
            <button @click="saveUnion"  v-else class="btn-blue ml-4 mt-4">Save Upazila</button>

        </div>
    </div>
    
    
</template>

<script>
import firebaseConfig from '../../config/firebaseConfig.js'
import { getDatabase, ref, push, get, set } from 'firebase/database';
import UnionLists from './union/UnionLists.vue';

export default {
    components: {
    UnionLists
},
    data() {
        return {
            errors: {},
            upazila_id: this.$route.params.id,
            upazila_name: '',
            union_id: '',
            union_name: '',
            zip_code: '',
            districtId: '',
            rdx_id:'',
            pathao_name:'',
            pathao_id:'',
            edesh_id:'',
            updated: false,
            processing: false,
            districtName: '',
            divisionId: '',
            divisionName: '',
        };
    },
    mounted() {
        if(this.upazila_id){
            this.getUpazila();
        }
        

        // if(this.divisionId){
        //     this.getDivision()
        // }
    },
    methods: {
        validateForm() {
            this.errors = {};

            if (!this.union_name.trim()) {
                this.errors.union_name = 'Union is required.';
            } else if (this.union_name.length < 3) {
                this.errors.union_name = 'Union must be at least 3 characters.';
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
        updateUnionFunction(union) {
            this.union_id= union.id;
            this.union_name=union.name;
            this.zip_code = union.zip_code;
            this.upazila_id = union.upazila_id;
            this.upazila_name = union.upazila_name;
            this.divisionId = union.div_id;
            this.divisionName = union.div_name;
            this.districtId = union.dist_id;
            this.districtName = union.dist_name;
            this.rdx_id = union.rdx_id;
            this.pathao_name = union.pathao_name;
            this.pathao_id = union.pathao_id;
            this.edesh_id = union.edesh_id;
            this.updated = true;
        },
        async updateUnion(){
            if (this.validateForm()) {
            try {

                const db = getDatabase(firebaseConfig.app);
                const dataRef = ref(db, `unions/${ this.union_id }`);

                await set(dataRef, {
                    name: this.union_name.trim(),
                    zip_code: this.zip_code.trim(),
                    upazila_id: this.upazila_id.trim(),
                    upazila_name: this.upazila_name.trim(),
                    div_id: this.divisionId.trim(),
                    div_name: this.divisionName.trim(),
                    dist_id: this.districtId.trim(),
                    dist_name: this.districtName.trim(),
                    rdx_id: this.rdx_id.trim(),
                    pathao_name: this.pathao_name.trim(),
                    pathao_id: this.pathao_id.trim(),
                    edesh_id: this.edesh_id.trim(),
                });

                this.upazila_name = '';

                this.divisionId = '';
                // this.divisionName = '';
                this.districtId = '';
                // this.districtName = '';
                this.rdx_id = '';
                this.pathao_name = '';
                this.pathao_id = '';
                this.edesh_id = '';
                this.processing = false;
                this.union_id = '';
                this.union_name = '';
                this.zip_code = '';
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
                console.error('Error fetching division data from Firebase:', error.message);
            }
        },
        async getDistrict() {
            try {
                const db = getDatabase(firebaseConfig.app);
                const divisionRef = ref(db, `disticts/${this.districtId}`);
                const snapshot = await get(divisionRef);
                this.districtName = snapshot.val().name;
                this.divisionId= snapshot.val().div_id;
                if (this.divisionId) {
                this.getDivision();
                }
            } catch (error) {
                console.error('Error fetching division data from Firebase:', error.message);
            }
        },
        async getUpazila() {
            try {
                const db = getDatabase(firebaseConfig.app);
                const upazilaRef = ref(db, `upazilas/${this.upazila_id}`);
                const snapshot = await get(upazilaRef);
                console.log("snapshot.val() : ", snapshot.val());
                this.divisionName = snapshot.val().div_name;
                this.districtId= snapshot.val().dist_id;
                this.districtName = snapshot.val().dist_name;
                this.upazila_name= snapshot.val().name;
                this.divisionId = snapshot.val().div_id;
   
            } catch (error) {
                console.error('Error fetching division data from Firebase:', error.message);
            }
        },
        async saveUnion() {
            if (this.validateForm()) {
            try {

                const db = getDatabase(firebaseConfig.app);
                const dataRef = ref(db, 'unions');

                await push(dataRef, { 
                    name: this.union_name.trim(), 
                    zip_code: this.zip_code.trim(),
                    upazila_id: this.upazila_id.trim(),
                    upazila_name: this.upazila_name.trim(),
                    div_id: this.divisionId.trim(),
                    div_name: this.divisionName.trim(),
                    dist_id: this.districtId.trim(),
                    dist_name: this.districtName.trim(),
                    rdx_id: this.rdx_id.trim(),
                    pathao_name: this.pathao_name.trim(),
                    pathao_id: this.pathao_id.trim(),
                    edesh_id: this.edesh_id.trim(),
                 });


                this.union_name = '';
                this.zip_code = '';
                this.upazila_id='';
                this.upazila_name='';
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
