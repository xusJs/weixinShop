<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
   /* created() {
      this.$store.dispatch("wxlogin")
        .then(response => {
          alert(JSON.stringify(response))
        })
    }*/
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }

  html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: "Microsoft YaHei";
    font-size: 14px;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  ul, ol {
    list-style: none;
  }

  img {
    border: none;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    color: #232323;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  input, textarea {
    outline: none;
    border: none;
  }

  textarea {
    resize: none;
    overflow: auto;
  }

  button {
    border: 0;
    background-color: transparent;
  }

  .clearfix {
    zoom: 1;
  }

  .clearfix:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow: hidden;
  }

  .fl {
    float: left
  }

  .fr {
    float: right
  }

  .tl {
    text-align: left;
  }

  .tc {
    text-align: center
  }

  .tr {
    text-align: right;
  }

  .ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /********************************  页面 布局  *************************************************/

  .page {
    display: flex;
    height: 100%;
    flex-direction: column;
    .contents {
      flex: 1;
      overflow: auto;
    }
  }

  .xlist {
    margin-top: 11px;
    margin-bottom: 10px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    /*border-right: 1px solid #ccc;*/
    .xitem {
      height: 43px;
      line-height: 43px;
      border-bottom: 1px solid #ccc;
      margin-left: 20px;
      display: flex;
      div {
        padding: 0 10px;
        img {
          width: 30px;
          height: 30px;
        }
        span {
          font-size: 13px;
        }
      }
      & .center {
        flex: 1;
      }
    }
    :last-child {
      border-bottom: 0
    }
  }


</style>
