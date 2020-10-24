<template lang="pug">
    .container
        .columns
            .column.is-5.is-offset-4
                .notification(:class="typeNotification")
                    slot(name="body") Parece que algo esta mal
</template>

<script>
export default {
  props: {
    typeNotification: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
    .notification {
        margin: 10px;
        border-radius: 3em;
    }
</style>
