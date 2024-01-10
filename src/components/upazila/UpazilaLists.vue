<template>
    <div class="mt-5 ml-10">
        <h2 class="text-3xl font-bold underline">Upazila List</h2>
        <input v-model="searchQuery" placeholder="Search" class="border border-gray-300 rounded-lg ">
        <table class="w-full flex-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                    <!-- <th>ID</th> -->
                    <th>Name</th>
                        <th>Zip Code</th>
                    <th>Dist. Name</th>
                    <th>Div. Name</th>
                    <th>redx_id</th>
                    <th>pathao_name</th>
                    <th>pathao_id</th>
                    <th>edesh_id</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="upazila in filteredData" :key="upazila.id"
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <!-- <td class="text-xs text-gray-900 dark:text-white">{{ upazila.id }}</td> -->
                    <td>
                        <button class="text-blue-500 hover:text-blue-700"  @click="sendDataToInput(upazila)">
                            {{ upazila.name }}
                        </button>
                    </td>
                    <td>{{ upazila.zip_code }}</td>
                        <td>{{ upazila.dist_name}}</td>
                    <td>{{ upazila.div_name }}</td>
                    <td>{{ upazila.rdx_id }}</td>
                    <td>{{ upazila.pathao_id }}</td>
                    <td>{{ upazila.edesh_id }}</td>
                    <td>
                        <router-link :to="{ name: 'union', params: { id: upazila.id } }"
                            class="text-blue-500 hover:text-blue-700">
                            View Union
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../../config/firebaseConfig.js';
export default {
    props:
        ['dist_id'],
    data() {
        return {
            showModal: false,
            upazilas: [],
            searchQuery: '',
        };
    },
    mounted() {
        // Fetch data when the component is mounted
        this.getAllUpazilas();
    },
    components: {
        // EditModel
    },
    computed: {
        filteredData() {
            const query = this.searchQuery.toLowerCase();
            return this.upazilas.filter(item =>
                Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(query)
                )
            );
        },
    },
    methods: {

        sendDataToInput(upazila){
            // this.updateFunction(upazila);
            // console.log("upazila : ", upazila);
            this.$emit('updateFunction', upazila);
        },
        async getAllUpazilas() {
            try {
                const db = getDatabase(app);
                const upazilasRef = ref(db, 'upazilas');
                const snapshot = await get(upazilasRef);
                const upazilasArray = [];

                snapshot.forEach((childSnapshot) => {
                    const upazila = { id: childSnapshot.key, ...childSnapshot.val() };
                    // districtsArray.push(division);
                    if(this.dist_id){
                    if (upazila.dist_id === this.dist_id) {
                        upazilasArray.push(upazila);
                    }
                }
                else{
                    upazilasArray.push(upazila);
                }
                });

                this.upazilas = upazilasArray;
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
