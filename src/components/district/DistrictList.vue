<template>
    <div class="mt-5 ml-10">
        <h2 class="text-3xl font-bold underline">District List</h2>
        <table class="w-1/2 flex-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="district in districts" :key="district.id"
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="text-xs text-gray-900 dark:text-white">{{ district.id }}</td>
                    <td>
                        <button @click="openModal(district)" class="text-blue-500 hover:text-blue-700">
                            {{ district.name }}
                        </button>
                    </td>
                    <td>
                        <router-link :to="{ name: 'upazila', params: { id: district.id } }"
                            class="text-blue-500 hover:text-blue-700">
                            View Thana
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <EditModel v-if="showModal" v-model:isVisible.sync="showModal"  :modalData="modalData" />
    </div>
</template>

<script>
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../../config/firebaseConfig.js';
import EditModel from './EditModel.vue';
export default {
    props: ['div_id'],
    data() {
        return {
            showModal: false,
            districts: [],
            modalData:[]
            // divisionId:0
        };
    },
    mounted() {
        // Fetch data when the component is mounted
        this.getDistricts();
    },
    components: {
        EditModel
    },
    methods: {
         openModal(data) {
            // console.log("data : ", data);
            this.modalData = data;
            this.showModal = true;
        },
        async getDistricts() {
            try {
                const db = getDatabase(app);
                const districtsRef = ref(db, 'districts');
                const snapshot = await get(districtsRef);
                const districtsArray = [];
                
                snapshot.forEach((childSnapshot) => {
                    const district = { id: childSnapshot.key, ...childSnapshot.val() };
                    // districtsArray.push(division);
                    if(this.div_id){
                    if (district.div_id === this.div_id) {
                        districtsArray.push(district);
                    }
                }
                else{
                    districtsArray.push(district);
                }
                });

                this.districts = districtsArray;
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
