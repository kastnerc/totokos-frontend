<template>
    <div>
        <form>
            <h1>Add/Modify a user</h1>
            <fieldset>
            <div>
                <label for="id_user">User ID (required)</label>
                <div>
                <input type="text" name="id_user" id="id_user" placeholder="Enter the user ID">
                </div>
            </div>

            <div>
                <label for="username">Username</label>
                <div>
                <input type="text" name="username" id="username" placeholder="Enter the username">
                </div>
            </div>

            <div>
                <label for="password">Password</label>
                <div>
                <input type="text" name="password" id="password" placeholder="Enter the password">
                </div>
            </div>

            <div>
                <label for="surname">Surname</label>
                <div>
                <input type="text" name="surname" id="surname" placeholder="Enter a surname">
                </div>
            </div>

            <div>
                <label for="name">Name</label>
                <div>
                    <input type="text" name="name" id="name" placeholder="Enter a name">
                </div>
            </div>

            <div>
                <label for="contact_info">Contact Info (phone number)</label>
                <div>
                    <input type="text" name="contact_info" id="contact_info" placeholder="Enter a phone number">
                </div>
            </div>

            <div>
                <label for="email">Email</label>
                <div>
                    <input type="text" name="email" id="email" placeholder="Enter an email">
                </div>
            </div>

            <div>
                <label for="role">Role: client/employe (leave empty if modifying)</label>
                <div>
                    <input type="text" name="role" id="role" placeholder="Enter the role">
                </div>
            </div>

            <div>
                <label for="address">Address</label>
                <div>
                    <input type="text" name="address" id="address" placeholder="Enter the address">
                </div>
            </div>

            <div>
                <label for="city">City</label>
                <div>
                    <input type="text" name="city" id="city" placeholder="Enter the city">
                </div>
            </div>

            <div>
                <label for="province">Province</label>
                <div>
                    <input type="text" name="province" id="province" placeholder="Enter the province">
                </div>
            </div>

            <div>
                <label for="country">Country</label>
                <div>
                    <input type="text" name="country" id="country" placeholder="Enter the country">
                </div>
            </div>

            <div>
                <label for="postal_code">Postal Code</label>
                <div>
                    <input type="text" name="postal_code" id="postal_code" placeholder="Enter the postal code">
                </div>
            </div>
    
            <button type="submit">Submit</button>
            </fieldset>
        </form>
    </div>
</template>
  
  <script>
  
  </script>
  
  <style lang="css" scoped>
  
  </style>