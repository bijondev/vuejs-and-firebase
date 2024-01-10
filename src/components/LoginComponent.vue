<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md w-96">
            <h2 v-if="loginError" class="text-2xl font-semibold mb-4 text-red-600">Login fail, check email and password!!!</h2>
            <h2 class="text-2xl font-semibold mb-4">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input v-model="email" type="email" id="email"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input v-model="password" type="password" id="password"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                </div>
                <button type="submit"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Login</button>
            </form>
        </div>
</div></template>

<script>
// import firebaseConfig from '../../config/firebaseConfig.js'
import { mapActions } from 'vuex';
import { signIn } from '../../config/authService.js';

export default {
    data() {
        return {
            email: "",
            password: "",
            loginError:false,
            // loginUser:''
        };
    },
    methods: {
        async login() {
            try {
            const loginUserData = await signIn(this.email, this.password);
            // console.log("loginUser : ", loginUserData);
            this.loginUser(loginUserData);
            this.$router.push("/");
            } catch (error) {
                console.error('Login Fail:', error.message);
                this.loginError=true;
                // throw error;
            }
        
        },
        ...mapActions(['loginUser']),
    },
};
</script>
