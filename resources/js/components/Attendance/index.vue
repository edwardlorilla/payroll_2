<template>
    <table v-if="days">
        <tr>
            <th v-for="day in no_of_days.getDate()">{{day}}</th>
        </tr>
        <tr>
            <td v-for="no in days" class="dot"
                :style="{'background-color': no ? 'green' : 'red'}"></td>
        </tr>
    </table>
</template>

<script>
    export default {
        props: {
            attendances: Array
        },
        data() {
            var d = new Date(),
                month = d.getMonth(),
                year = d.getYear();
            return {
                month: month,
                year: year,
                no_of_days: new Date(year, month + 1, 0),
            }
        },
        computed: {
            days() {
                var vm = this,
                    index = 0,
                    days = {}
                    if(vm.attendances){
                        while (index < vm.no_of_days.getDate()) {
                            days[index + 1] = false
                            index++
                        }
                        index = 0 //back to 0

                        while (index < vm.attendances.length) {
                            console.log(1, vm.attendances[index].start_date)

                            var d = new Date(vm.attendances[index].start_date.split(" ")[0])
                            if (d.getDate()) {

                                days[d.getDate()] = true
                            }
                            index++
                        }

                    }


                return index ? days : {}
            }
        },
    }
</script>

<style scoped>
    .dot {
        height: 15pt;
        width: 15pt;
        border-radius: 50%;
    }
    table {
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid black;
    }
</style>