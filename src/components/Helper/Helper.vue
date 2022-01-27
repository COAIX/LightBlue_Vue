<template>
    <div :class="{ 'theme-helper': true, 'theme-helper-opened': opened }">
        <section class="widget theme-helper-content">
            <header class="theme-helper-header d-flex p-0">
                <div class="theme-helper-toggler" @click="toggle">
                    <div class="theme-helper-spinner text-white">
                        <i class="la la-cog"></i>
                        <i class="la la-cog"></i>
                    </div>
                </div>
                <h6>About The Team</h6>

            </header>
            <div class="widget-body mt-3" style="text-align: center;">
                <h6>廖维</h6>
                <h6>杨柏盛</h6>
                <h6>杨世昌</h6>
                <h6>陈柏宏</h6>
                <h6>温佰霖</h6>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Helper',
    data() {
        return {
            opened: false,
        }
    },
    methods: {
        toggle() {
            this.opened = !this.opened;
        }
    }
};
</script>

<style src="./Helper.scss" lang="scss" scoped />
