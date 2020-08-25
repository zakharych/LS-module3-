import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

new Vue({
    el: "#slider-component",
    template: "#slider-container",
    components: {
        Swiper,
        SwiperSlide,
      },
    data(){
        return {
            reviews:[],
            sliderOptions: {
                slidesPerView:2
            }
        }
    },
    methods:{
        slide(direction){
            const slider = this.$refs["slider"].$swiper;
            switch(direction) {
                case "next" :
                    slider.slideNext();
                    break;
                case "prev" :
                    slider.slidePrev();
                    break;
            }
        }
    },
    created() {
        const data = require("../data/reviews.json");
        this.reviews = data;
    }
  })