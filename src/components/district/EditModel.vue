<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div class="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Edit District</h3>
        <div class="mt-2 px-7 py-3">
            <h1 v-if="updated" class="text-4xl font-semibold text-red-600">Districe updated successfully</h1>
          <label for="districName">Distict Name:</label>
            <input v-model="distict" id="districName" type="text" class="input-text" />
            <button @click="updateDistrict" class="btn-blue ml-4">Update</button>
        </div>
        <div class="items-center px-4 py-3">
          <button id="ok-btn" @click="closeModal" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getDatabase, ref, update } from 'firebase/database';
import { app } from '../../../config/firebaseConfig.js';  // Adjust the path accordingly

export default {
    name: 'ModalComponent',
    props: ['isVisible','modalData'],
    
    data() {
        return {
            distict: '',
            updated: false,
            divisionId: '',
            districtId: '',
            divisionName: '',
        };
    },
    mounted() {
        // console.log(">>>>>>", this.modalData.name);
        this.distict = this.modalData.name;
        this.districtId = this.modalData.id;
        this.divisionId = this.modalData.div_id;
    this.divisionName = this.modalData.div_name;
    },
    methods: {
         closeModal() {
            this.$emit('update:isVisible', false);
        },
        async updateDistrict() {
            try {
                const db = getDatabase(app);

                const districtRef = ref(db, `districts/${this.districtId}`);

                await update(districtRef, {
                    name: this.distict,
                    div_id: this.divisionId, 
                    div_name: this.divisionName
                });
                
                this.updated = true;
                console.log('District updated successfully');
            } catch (error) {
                console.error('Error updating division:', error.message);
            }
        }
    }
};

</script>

