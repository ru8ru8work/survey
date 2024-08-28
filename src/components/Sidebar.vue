<script>
import backgroundcolor from '../stores/backgroundcolor'


export default {
    setup() {
        const color = backgroundcolor();
        return { color };
    },
    components: {

    },
    mounted() {

    },
};
</script>

<template>
    <!--sidebar-->
    <div id="sidebar-wrapper">
        <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
            <i class="fa-solid fa-house ">選單</i>
        </div>

        <div class="list-group list-group-flush my-3">

            <router-link to="/" class="list-group-item bg-transparent" router-link-exact-active><i
                    class="fa-solid fa-star "></i>主頁</router-link>

            <router-link to="/profile" class="list-group-item bg-transparent  fw-bold test" router-link-exact-active><i
                    class="fa-solid fa-user "></i>個人資料</router-link>

            <router-link to="/Front" class="list-group-item bg-transparent fw-bold" router-link-exact-active><i
                    class="fa-solid fa-poo "></i>前台</router-link>

            <router-link to="/Back" class="list-group-item bg-transparent fw-bold" router-link-exact-active><i
                    class="fa-solid fa-poo "></i>後台</router-link>
        </div>
    </div>
    <!--sidebar-->
</template>

<style lang="scss">
#sidebar-wrapper {
    background-color: v-bind('color.sidebarColor');
    color: v-bind('color.secondColor');
    min-height: 100vh;
    margin-left: -15rem;
    transition: margin 0.25s ease-out;
    letter-spacing: 6px;
}

#sidebar-wrapper .sidebar-heading {
    padding: 0.875rem 1.25rem;
    font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
    width: 15rem;
}

#page-content-wrapper {
    min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
}

#menu-toggle {
    cursor: pointer;
}

.list-group-item {
    border: none;
    padding: 20px 30px;
    color: v-bind('color.secondColor');
    // letter-spacing: 6px;
}

.list-group-item.router-link-exact-active {
    background-color: transparent;
    color: #47b2f0;
    font-weight: bold;
    border: none;
}

@media (min-width: 768px) {
    #sidebar-wrapper {
        margin-left: 0;
    }

    #page-content-wrapper {
        min-width: 0;
        width: 100%;
    }

    #wrapper.toggled #sidebar-wrapper {
        margin-left: -15rem;
    }
}

.test {
    pointer-events: none;
}

.list-group-item:hover {
    background-color: rgb(40 52 69) !important;
}
</style>
