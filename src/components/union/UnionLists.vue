<template>
    <div class="mt-5 ml-10">
        <h2 class="text-3xl font-bold underline">Union List</h2>
        <input v-model="searchQuery" placeholder="Search" class="border border-gray-300 rounded-lg ">
        <table class="w-full flex-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                    <!-- <th>ID</th> -->
                    <th>Union Name</th>
                    <th>Zip Code</th>
                    <th>Upazila</th>
                        
                    <th>District</th>
                    <th>divisions</th>
                    <th>redx Id</th>
                    <th>Pathao Name</th>
                    <th>Pathao Id</th>
                    <th>Edesh Id</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="union in filteredData" :key="union.id"
                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <!-- <td class="text-xs text-gray-900 dark:text-white">{{ union.id }}</td> -->
                    <td>
                        <button class="text-blue-500 hover:text-blue-700"  @click="sendDataToInput(union)">
                            {{ union.name }}
                        </button>
                    </td>
                    <td>{{ union.zip_code }}</td>
                        <td>{{ union.upazila_name }}</td>
                    <td>{{ union.dist_name }}</td>
                    <td>{{ union.div_name }}</td>
                    <td>{{ union.rdx_id }}</td>
                    <td>{{ union.pathao_name }}</td>
                    <td>{{ union.pathao_id }}</td>
                    <td>{{ union.edesh_id }}</td>
                    
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
        ['upz_id'],
    data() {
        return {
            showModal: false,
            unions: [],
            searchQuery: '',
        };
    },
    mounted() {
        // Fetch data when the component is mounted
        this.getAllUnion();
    },
    components: {
        // EditModel
    },
    computed: {
        filteredData() {
            const query = this.searchQuery.toLowerCase();
            return this.unions.filter(item =>
                Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(query)
                )
            );
        },
    },
    methods: {

        sendDataToInput(union){
            this.$emit('updateFunction', union);
        },
        async getAllUnion() {
            try {
                const db = getDatabase(app);
                const unionRef = ref(db, 'unions');
                const snapshot = await get(unionRef);
                const unionArray = [];

                snapshot.forEach((childSnapshot) => {
                    const unionList = { id: childSnapshot.key, ...childSnapshot.val() };
                    // districtsArray.push(division);
                    if(this.upz_id){
                    if (unionList.upazila_id === this.upz_id) {
                        unionArray.push(unionList);
                    }
                }
                else{
                   unionArray.push(unionList); 
                }
                });

                this.unions = unionArray;
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
