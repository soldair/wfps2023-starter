<style>
body {
  margin: 0;
  padding: 0;

  font-family: Helvetica, Arial, sans-serif;
  background-color: #e8e8e8;
}

nav {
  display: block;
  padding: 25px 20px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, .3);
  font-size: 20px;
  background-color: #fff;
}

nav ul {
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin: 0 15px 0 0;
}

nav ul li a {
  text-decoration: none;
}

nav ul li a.router-link-active {
  font-weight: bold;
}

main {
  padding: 20px;
}
</style>
<template>
  <nav>
    <ul>
      <li><NuxtLink to="/">Discussions</NuxtLink></li>
      <li><NuxtLink to="/about">About</NuxtLink></li>
    </ul>
  </nav>
  <main>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </main>
</template>
