<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h1>User Details</h1>
            <fieldset>
                <div>
                    <label for="id_user">User ID (leave empty to add new)</label>
                    <input type="text" id="id_user" v-model="user.id_user" placeholder="Enter User ID if updating">
                </div>

                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="user.username" placeholder="Enter the username" required>
                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="user.password" placeholder="Enter the password" required>
                </div>

                <div>
                    <label for="surname">Surname</label>
                    <input type="text" id="surname" v-model="user.surname" placeholder="Enter a surname">
                </div>

                <div>
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="user.name" placeholder="Enter a name">
                </div>

                <div>
                    <label for="contact_info">Contact Info (phone number)</label>
                    <input type="text" id="contact_info" v-model="user.contact_info" placeholder="Enter a phone number">
                </div>

                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="user.email" placeholder="Enter an email">
                </div>

                <div>
                    <label for="role">Role (client or employee)</label>
                    <input type="text" id="role" v-model="user.role" placeholder="Enter the role">
                </div>

                <div>
                    <label for="address">Address</label>
                    <input type="text" id="address" v-model="user.address" placeholder="Enter the address">
                </div>

                <div>
                    <label for="city">City</label>
                    <input type="text" id="city" v-model="user.city" placeholder="Enter the city">
                </div>

                <div>
                    <label for="province">Province</label>
                    <input type="text" id="province" v-model="user.province" placeholder="Enter the province">
                </div>

                <div>
                    <label for="country">Country</label>
                    <input type="text" id="country" v-model="user.country" placeholder="Enter the country">
                </div>

                <div>
                    <label for="postal_code">Postal Code</label>
                    <input type="text" id="postal_code" v-model="user.postal_code" placeholder="Enter the postal code">
                </div>

                <div>
                    <label for="image">Profile Image</label>
                    <input type="file" id="image" @change="handleFileChange">
                </div>

                <button type="submit">Submit</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const route = useRoute();
        const user = ref({
            id_user: '',
            username: '',
            password: '',
            surname: '',
            name: '',
            contact_info: '',
            email: '',
            role: '',
            address: '',
            city: '',
            province: '',
            country: '',
            postal_code: ''
        });
        const image = ref(null);

        // Fetch user details if modifying
        const fetchUser = async () => {
            const userId = route.params.id;
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
                    if (response.data && response.data.data) {
                        Object.assign(user.value, response.data.data);
                    } else {
                        alert('User not found');
                    }
                } catch (error) {
                    alert(`Failed to fetch user: ${error.response?.data.message || error.message}`);
                }
            }
        };

        onMounted(fetchUser);

        const handleFileChange = event => {
            image.value = event.target.files[0];
        };

        const handleSubmit = async () => {
            const formData = new FormData();
            Object.keys(user.value).forEach(key => {
                if (user.value[key] && key !== 'id_user') { // Exclude id_user from formData unless it's necessary for a specific endpoint
                    formData.append(key, user.value[key]);
                }
            });
            if (image.value) {
                formData.append('Image', image.value);
            }

            const method = user.value.id_user ? 'patch' : 'post';
            const url = `http://localhost:5000/api/user/${user.value.id_user ? `${user.value.id_user}` : ''}`;

            try {
                await axios({
                    method: method,
                    url: url,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert('User successfully added or updated');
            } catch (error) {
                alert(`Failed to submit user: ${error.response?.data.message || error.message}`);
            }
        };

        return { user, image, handleFileChange, handleSubmit };
    }
}
</script>



<style scoped>
</style>
