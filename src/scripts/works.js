import Vue from "vue"




const thumbs = {
    props: ["works", "currentWork"],
    template: "#preview-thumbs"

};

const btns = {
    template: "#preview-btns",

};

const display = {
    props: ["currentWork", "works", "currentIndex"],
    template: "#preview-display",
    components: { thumbs, btns },
    computed: {
        reveseWorks() {
            const works = [...this.works]
            return works.slice(0, 3).reverse();
        }
    }
}

const tags = {
    props: ["tags"],
    template: "#preview-tags",


};

const info = {
    props: ["currentWork"],
    template: "#preview-info",
    components: { tags },
    computed: {
        tagsArray() {
            return this.currentWork.skills.split(",")
        }
    }

};

new Vue({
    el: "#preview-component",
    template: "#preview-container",
    components: { display, info },

    data() {
        return {
            works: [],
            currentIndex: 0
        }
    },
    computed: {
        currentWork() {
            return this.works[0];
        }
    },
    watch: {
        currentIndex(value) {
            this.makeInfiniteLoopsForNdx(value)
        }
    },
    methods: {
        makeInfiniteLoopsForNdx(index) {
            const worksNumber = this.works.length - 1
            if (index < 0) this.currentIndex = worksNumber;
            if (index > worksNumber) this.currentIndex = 0;
        },
        requireImageToArray(data) {
            return data.map(item => {
                const requireImage = require(`../images/content/${item.photo}`).default;
                item.photo = requireImage;
                return item
            });
        },
        slide(direction) {
            const LastItem = this.works[this.works.length - 1];
            switch (direction) {
                case "next":
                    this.works.push(this.works[0]);
                    this.works.shift();
                    this.currentIndex++
                    break;
                case "prev":
                    this.works.unshift(LastItem);
                    this.works.pop();
                    this.currentIndex--
                    break;
            }
        },
    },
    created() {
        const data = require("../data/works.json");
        this.works = this.requireImageToArray(data);
    }

})