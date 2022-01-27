<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>出入口柱状图</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">
      黑龙江大学 <span class="fw-semi-bold">出入口柱状图</span>
    </h1>
    <b-row>
      <b-col xs="12" md="10">
        <Widget
                title="<h5>柱状图 <small class='text-muted'>woc怎么出不来就离谱</small></h5>"
                customHeader close collapse
        >
          <GmapMap
                  :center="{lat: 45.708255, lng: 126.623186}"
                  :zoom="18"
                  style="width: 100%; height: 60vh"
                  :options="options"
          >
            <GmapMarker
                    :position="{lat: 45.708255, lng: 126.623186}"
            />
          </GmapMap>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Widget from '@/components/Widget/Widget';

  export default {
    name: 'Maps',
    data() {
      return {
        options: {},
      }
    },
    created() {
      this.$gmapApiPromiseLazy().then(() => {
        this.options = {
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT
          }
        }
      })
    },
    components: { Widget }
  };
</script>

<style src="./Maps.scss" lang="scss" scoped />
