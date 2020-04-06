<template>
  <div style="border-radius: 20px;background-color:white;padding:50px;">
    <div class="login-form">
      <form action="#" @submit.prevent="login">

        <div class="form-control">
          <label for="email">Username/Email</label>
          <input type="email" name="username" id="username" class="login-input" v-model="username">
        </div>

        <div class="form-control mb-more">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" class="login-input" v-model="password" value="test">
        </div>

        <div class="form-control">
          <button :disabled="(username.length == 0 || password.length == 0)" type="submit" class="btn-submit">Login</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      disable: '',
    }
  },
  methods: {
    login() {
      window.location.href = "./todos"
    }
  }
}
</script>

<style>
  body{
    background-color: #DCDCDC;
  }
  label {
    display: block;
    margin-bottom: 4px;
  }
  .login-heading {
    margin-bottom: 16px;
  }
  .form-control {
    margin-bottom: 24px;
  }
  .mb-more {
    margin-bottom: 42px;
  }
  .login-form {
    max-width: 500px;
    margin: auto;
  }
  .login-input {
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    outline: 0;
    border-radius: 3px;
    border: 1px solid lightgrey;
  }
  .btn-submit {
    width: 100%;
    padding: 14px 12px;
    font-size: 18px;
    font-weight: bold;
    background: #41B783;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>