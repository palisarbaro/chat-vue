// eslint-disable-next-line vue/multi-word-component-names
<template>
    <div class="message">
        <span class="author" >
            {{message.author}}:
        </span>
        <span class="text">
            {{message.text}}
        </span>
    </div>
</template>
<script>

export default {
    props: {
        message: {
            type    : Object,
            required: true,
        },
    },
}
</script>
<style scoped lang="scss">
.author{
    font-weight: bold;
    color: rgb(85, 10, 10)
}
.message{
    background-color: rgb(223, 164, 76);
    border-radius: 4px;
    margin: 10px;
    padding: 5px;
    word-wrap: break-word;
}

</style>