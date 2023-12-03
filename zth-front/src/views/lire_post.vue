<template>
    <p> {{ postData }} </p>
    <div>
        <div v-if="creator">
        <h3> {{ postData.title }} </h3>
        <h3> {{ creator }} </h3>
        </div>
        <div>
            <img src="http://localhost:8080/data/14/pp_bouc.png" alt="Description de l'image">
            <iframe src="http://localhost:8080/data/14/test_pdf.pdf" type="application/pdf" ></iframe>
            <iframe id="textFrame" width="50" height="100" src="http://localhost:8080/data/14/test.txt"></iframe>
        </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      postData: null,
      creator: null,
      creator: null,
    };
  },
  created() {
    fetch("http://localhost:8080/post/" + this.$route.params.id).then((Response)=>{
        return Response.json()
    }).then((data)=>{
        console.log(data)
        this.postData = data;
        return fetch("http://localhost:8080/user/name/" + data.id_creator).then((Response)=>{
        return Response.json()
    }).then((data)=>{
        console.log(data)
        this.creator = data.username;
    })
    })
  },
};
</script>

<style scoped>

</style>