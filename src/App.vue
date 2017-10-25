<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

@font-face {
  font-family: "BMJUAOTF";
  src: url('../static/fonts/BMJUA.otf');
}

@font-face {
  font-family: "NotoSansCJKkr";
  src: url('../static/fonts/NotoSansKR-Regular.otf');
}

@font-face {
  font-family: "NotoSansCJKkr-light";
  src: url('../static/fonts/NotoSansKR-Light.otf');
}

@font-face {
  font-family: "NotoSansCJKkr-medium";
  src: url('../static/fonts/NotoSansKR-Medium.otf');
}

@font-face {
  font-family: "NotoSans";
  src: url('../static/fonts/NotoSans-Regular.ttf');
}

@font-face {
  font-family: "Pacifico";
  src: url('../static/fonts/Pacifico-Regular.ttf');
}
</style>
