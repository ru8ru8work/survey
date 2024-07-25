<script>
import backgroundcolor from '../stores/backgroundcolor'

export default {
    setup(){
        const color = backgroundcolor();
        return  { color } ;
    },
    components: {},
    mounted() {
        const el = document.querySelector("#wrapper");
        const toggleButton = document.querySelector("#menu-toggle");

        toggleButton.addEventListener("click", function () {
            el.classList.toggle("toggled");
        });
    },
};
</script>

<template>
    <!--nav-->
    <nav class="navbar navbar-expand-lg  py-4 px-4">
        <div class="d-flex align-items-center">
            <i
                class="fas fa-align-left primary-text fs-4 me-3"
                id="menu-toggle"
            ></i>
            <h2 class="fs-2 m-0">主頁</h2>
        </div>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle second-text fw-bold"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i class="fas fa-user me-2"></i>JIA
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <a class="dropdown-item" href="#">個人資料</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">設定</a>
                        </li>
                        <li>
                            <a
                                class="dropdown-item"
                                href="./login.html"
                                id="logout"
                                >登出</a
                            >
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    <!--nav-->
</template>

<style lang="scss">
    .navbar{
        
        width: calc(100dvw - 15rem);
        background-color: v-bind('color.mainColor');
        transition: width 0.25s ease-out;

    }
    #wrapper.toggled .navbar {
        width: 100dvw;
    }

    @media (max-width: 768px) {
    .navbar {
        width: 100%;
    }
}
</style>
