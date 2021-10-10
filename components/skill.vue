<template>
    <v-row
        style="max-width: 500px"
    >
        <v-progress-linear
            v-model="power"
            color="amber"
            height="25"
        >
            <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
            </template>
        </v-progress-linear>

        <br>

        <v-progress-linear
            v-model="skill"
            color="blue-grey"
            height="25"
        >
            <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
            </template>
        </v-progress-linear>

        <br>

        <v-progress-linear
            v-model="knowledge"
            height="25"
        >
            <strong>{{ Math.ceil(knowledge) }}%</strong>
        </v-progress-linear>


    </v-row>
</template>


<script>
export default {
  data: () => ({
    power: 78,
    knowledge: 25,
    skill: 20
  })
}
</script>